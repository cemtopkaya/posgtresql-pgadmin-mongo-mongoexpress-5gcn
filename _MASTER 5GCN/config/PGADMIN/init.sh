#!/bin/sh

# apk add gettext nano

# echo '{
#   "Servers": {
#     "1": {
#       "Name": "UDR PostgreSQL 10.1",
#       "Group": "Servers",
#       "Host": "'"$PAAS_POSTGRES"'",
#       "Port": "'"$PAAS_POSTGRES_PORT"'",
#       "MaintenanceDB": "postgres",
#       "Username": "'"$PAAS_POSTGRES_USER"'",
#       "Favorite": true,
#       "SSLMode": "prefer",
#       "PassFile": "/pgpass"
#     }
#   }
# }' | envsubst | install --mode=664 /dev/stdin /pgadmin4/servers.json



# pgadmin Web konsolunda login için ortam değişkenlerinde kullanılan bilgiler geçerli
# Ancak pgadmin içinde bağlanılabilecek sunucuları tanımlamak için servers.json dosyasına
# sunucu bilgilerinizi yazmamız gerekiyor. Bu sunuculara bağlanmak için 
# kullanıcı adı ve şifre bilgisini pgadmin'e bağlanırken kullandığınız kullanıcı adına göre
# bir dizinde ve dizin + dosya haklarını düzgün ayarladığınız taktirde ikinci bir şifre girmeye 
# gerek kalmadan bu sunuculara bağlanabilirsiniz.
#
# docker exec -itu0 paas_pgadmin sh
# /pgadmin4 # mkdir -m 700 /var/lib/pgadmin/storage/admin_example.com
# /pgadmin4 # echo 20.20.255.2:5432:*:cekirdekSebekeKullanicisi:sifreCokGizli > /var/lib/pgadmin/storage/admin_example.com/pgpass
# /pgadmin4 # chmod 600 /var/lib/pgadmin/storage/admin_example.com/pgpass
# /pgadmin4 # chown pgadmin /var/lib/pgadmin/storage/admin_example.com/pgpass
#
# Yahut yüm bunları tek satırda
# mkdir -m 700 /var/lib/pgadmin/storage/admin_example.com/ && install --mode 600 --owner pgadmin <(echo 20.20.255.2:5432:*:cekirdekSebekeKullanicisi:sifreCokGizli) /var/lib/pgadmin/storage/admin_acme.com/pgpass
#
# PGPASS_DIR değişkenini tanımla
# export PGPASS_DIR="/var/lib/pgadmin/storage/admin_example.com"
pgpass_dir=${PGPASS_DIR:-/var/lib/pgadmin/storage/${PGADMIN_DEFAULT_EMAIL//@/_}}
pgpass_file=${PGPASS_FILE:-pgpass}
pgpass_full_path="$pgpass_dir/$pgpass_file"
pgpassfile_content="$PAAS_POSTGRES:$PAAS_POSTGRES_PORT:*:$PAAS_POSTGRES_USER:$PAAS_POSTGRES_PASS"
printenv

# Dizin yoksa oluştur ve izinlerini ayarla
mkdir -p "$pgpass_dir"
chmod 700 "$pgpass_dir"

# install [-cdDsp] [-o USER] [-g GRP] [-m MODE] [-t DIR] [SOURCE]... DEST
install -m 600 -o pgadmin <(echo $pgpassfile_content) $pgpass_full_path

/entrypoint.sh
