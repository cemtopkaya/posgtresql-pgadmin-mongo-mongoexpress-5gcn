#!/bin/bash

# Log mesajını oluşturma fonksiyonu
log() {
  local message="$1"

  user=$(whoami)
  host=$(hostname)
  logger -t "init_config" "$(date +"%Y-%m-%d %H:%M:%S") [$user]@[$host]: $message"
  echo "$(date +"%Y-%m-%d %H:%M:%S") [$user]@[$host]: $message"
}

log "-------> Exporting environment variables "
# MONGO
export PAAS_MONGO_USER="cekirdekSebekeKullanicisi"
export PAAS_MONGO_PASS="sifreCokGizli"
export PAAS_MONGO_PORT="27017"

# POSTGRES
export PAAS_POSTGRES_USER="cekirdekSebekeKullanicisi"
export PAAS_POSTGRES_PASS="sifreCokGizli"
export PAAS_POSTGRES_PORT="5432"

# AMF
export AMF_MONGO_DB_NAME="AmfDB"
export AMF_INSTANCE_ID=$(uuidgen)

# AUSF
export AUSF_INSTANCE_ID=$(uuidgen)

# NEF
export NEF_MONGO_DB_NAME="NefDB"
export NEF_INSTANCE_ID=$(uuidgen)

# NRF
export NRF_MONGO_DB_NAME="NrfDB"
export NRF_INSTANCE_ID=$(uuidgen)

# NSSF
export NSSF_MONGO_DB_NAME="NssfDB"
export NSSF_INSTANCE_ID=$(uuidgen)

# PCF
export PCF_MONGO_DB_NAME="PcfDB"
export PCF_INSTANCE_ID=$(uuidgen)
export PCF_INSTANCE_ID_2=$(uuidgen)
export PCF_INSTANCE_ID_3=$(uuidgen)

# PCF_AMS
export PCF_AMS_SERVICE_INSTANCE_ID=$(uuidgen)

# PCF_CS
export PCF_CS_SERVICE_INSTANCE_ID=$(uuidgen)

# PCF_IWS
export PCF_IWS_SERVICE_INSTANCE_ID=$(uuidgen)

# PCF_NFRS
export PCF_NFRS_SERVICE_INSTANCE_ID=$(uuidgen)

# PCF_OMS
export PCF_OMS_SERVICE_INSTANCE_ID=$(uuidgen)

# PCF_PES
export PCF_PES_SERVICE_INSTANCE_ID=$(uuidgen)

# PCF_SMS
export PCF_SMS_SERVICE_INSTANCE_ID=$(uuidgen)

# SMF
export SMF_MONGO_DB_NAME="SmfDB"
export SMF_INSTANCE_ID=$(uuidgen)

# UDM
export UDM_INSTANCE_ID=$(uuidgen)

# UDR
export UDR_POSTGRES_DB_NAME="UdrDB"
export UDR_INSTANCE_ID=$(uuidgen)

log "-------- Creating environment variables from docker-compose.yaml "
# docker-compose.yaml Dosyası içinde servislerin IP adreslerini ortam değişkeni olarak tanımlayacağız
# $ yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml
# ulak_gui=20.20.255.4
# paas_mongo=20.20.0.4
# paas_postgres=20.20.0.2
# paas_rabbitmq=20.20.0.3
# paas_mongo_express=20.20.255.1
# paas_pgadmin=20.20.255.2
# netshoot=20.20.10.10
# init_config=20.20.255.3
# ulak_amf=20.20.1.2
# ulak_ausf=20.20.2.1
# ulak_nef=20.20.3.2
# ulak_nrf=20.20.4.1
# ...
#
# Tüm bu bilgileri ULAK_NRF=20.20.4.1 şeklinde ortam değişkenlerine atayıp,
# envsubst ile place holder olarak $ULAK_NRF gördüğü metinleri değiştirir.
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' /docker-compose.yaml | awk '{ print toupper($0) }')

log "-------- Environment variables "
printenv

create_config_scripts() {
  rm -rf /ready_config/*
  cd /config

  log "Creating ready config files"
  for file in $(find . -name "*.json" -o -name "*.yaml"); do
    log "------------ Creating ready config file for $file "
    mkdir -p /ready_config/$(dirname $file)
    hedefDosya=/ready_config/$file
    envsubst < $file > $hedefDosya
    chmod --reference=$file $hedefDosya
    chown --reference=$file $hedefDosya
    log "------------ Ready config file for $hedefDosya created "
  done
}

run_mongodb_script() {
  # RUN_MONGODB_SCRIPTS ortam değişkenini kontrol et
  if [ -z "$RUN_MONGODB_SCRIPTS" ]; then
    log "RUN_MONGODB_SCRIPTS ortam değişkeni atanmadı."
  elif [ "$RUN_MONGODB_SCRIPTS" == "True" ]; then
    log "MongoDB scriptini çalıştırıyorum..."

    # mongo-init.js Dosyasını mongo konteynerinde
    log "------------ Creating ready config file for mongo-init.js "
    envsubst <init_config/mongo-init.js >/ready_config/mongo-init.js
    log "------------ Ready config file for mongo-init.js created "

    log "------------ Copying sql files "
    cp init_config/*.sql /ready_config/
    log "------------ Copying sql copied "

    mongosh --host $PAAS_MONGO --username $PAAS_MONGO_USER --password $PAAS_MONGO_PASS --port $PAAS_MONGO_PORT --authenticationDatabase admin </ready_config/mongo-init.js
  else
    log "RUN_MONGODB_SCRIPTS ortam değişkeni True değil, script çalıştırılmadı."
  fi
}

run_postgresql_script() {
  # RUN_POSTGRESQL_SCRIPTS ortam değişkenini kontrol et
  if [ -z "$RUN_POSTGRESQL_SCRIPTS" ]; then
    log "RUN_POSTGRESQL_SCRIPTS ortam değişkeni atanmadı."
  elif [ "$RUN_POSTGRESQL_SCRIPTS" == "True" ]; then
    log "PostgreSQL scriptini çalıştırıyorum..."
    until pg_isready -h $PAAS_POSTGRES -p $PAAS_POSTGRES_PORT; do
      log "Waiting for PostgreSQL to be ready..."
      sleep 1
    done

    PGPASSWORD=$PAAS_POSTGRES_PASS psql -h $PAAS_POSTGRES -p $PAAS_POSTGRES_PORT -U $PAAS_POSTGRES_USER --dbname admin -f /ready_config/postgres-init.sql
    PGPASSWORD=$PAAS_POSTGRES_PASS psql -h $PAAS_POSTGRES -p $PAAS_POSTGRES_PORT -U $PAAS_POSTGRES_USER --dbname $UDR_POSTGRES_DB_NAME -f /ready_config/postgres-extra.sql
  else
    log "RUN_POSTGRESQL_SCRIPTS ortam değişkeni True değil, script çalıştırılmadı."
  fi
}

main() {
  #-------- json Dosyalarının Ayarları Yapılır -------------------------------------------
  create_config_scripts

  #-------- MONGO Veritabanı Ayarları ----------------------------------------------
  run_mongodb_script

  #-------- POSTGRESQL Veritabanı Ayarları ----------------------------------------------
  run_postgresql_script
}

main
