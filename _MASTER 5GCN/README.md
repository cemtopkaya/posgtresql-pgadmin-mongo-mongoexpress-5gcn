### IP Blokları

#### Tools
* 20.20.255.1 MongoDB
* 20.20.255.2 PostgreSQL (10 Sürümü)
* 20.20.255.3 RabbitMQ
* 20.20.255.4 MongoDB-express
* 20.20.255.5 pgadmin
* 20.20.255.6 nicolaka/netshoot
* 20.20.255.7 ueransim
* 20.20.255.8 init_config

#### AMF
Geliştirme ortamında AMF_COMMON bir devcontainer içinde açıldığında 20.20.1.1 IP'sinde ayaklanır:
* 20.20.1.1 AMF_COMMON

Monolith çalışırken ve devcontainer içinde geliştirilirken AMF'in IP adresi:
* 20.20.1.2 AMF

Mikroservis olarak çalışan AMF için:
* 20.20.1.3 AMF_CORE
* 20.20.1.4 AMF_GTP
* 20.20.1.5 AMF_GUI
* 20.20.1.6 AMF_LI
* 20.20.1.7 AMF_RAN
* 20.20.1.8 AMF_SBI

#### AUSF
* 20.20.2.1 AUSF

#### NEF
* 20.20.3.1 NEF_COMMON
* 20.20.3.2 NEF
* 20.20.3.3 NEF_AFPMS
* 20.20.3.4 NEF_AFSS
* 20.20.3.5 NEF_ATS
* 20.20.3.6 NEF_BDTS
* 20.20.3.7 NEF_DTS
* 20.20.3.8 NEF_EES
* 20.20.3.9 NEF_MES
* 20.20.3.10 NEF_NRFS
* 20.20.3.11 NEF_PFDMS
* 20.20.3.12 NEF_PPS
* 20.20.3.13 NEF_TIS

#### NRF
* 20.20.4.1 NRF

#### NSSF
* 20.20.5.1 NSSF_COMMON
* 20.20.5.2 NSSF
* 20.20.5.3 NSSF_AVAIL
* 20.20.5.4 NSSF_CONF
* 20.20.5.5 NSSF_NRFCM
* 20.20.5.6 NSSF_SEL
* 20.20.5.7 NSSF_SUBS

#### PCF
* 20.20.6.1 PCF_COMMON
* 20.20.6.2 PCF_AMS
* 20.20.6.3 PCF_CS
* 20.20.6.4 PCF_IWS
* 20.20.6.5 PCF_NFRS
* 20.20.6.6 PCF_OMS
* 20.20.6.7 PCF_PES
* 20.20.6.8 PCF_SMS

#### SMF
* 20.20.7.1 SMF_COMMON
* 20.20.7.2 SMF
* 20.20.7.3 SMF_AMFEventClientManager
* 20.20.7.4 SMF_CHFClient
* 20.20.7.5 SMF_EventExposureServer
* 20.20.7.6 SMF_GUIServer
* 20.20.7.7 SMF_NEFClient
* 20.20.7.8 SMF_NRFRegManager
* 20.20.7.9 SMF_PDUAMFClient
* 20.20.7.10 SMF_PDUAMFServer
* 20.20.7.11 SMF_PDUPCFClientManager
* 20.20.7.12 SMF_PDUUDMClientManager
* 20.20.7.13 SMF_PDUUPFClientManager

#### SMSF
* 20.20.8.1 SMSF_COMMON
* 20.20.8.2 SMSF

#### UDM
* 20.20.9.1 UDM
* 20.20.9.2 UDM_EE
* 20.20.9.3 UDM_LI
* 20.20.9.4 UDM_MT
* 20.20.9.5 UDM_PP
* 20.20.9.6 UDM_SDM
* 20.20.9.7 UDM_UEAU
* 20.20.9.8 UDM_UECM

#### UDR
* 20.20.10.1 UDR

#### UPF
* 20.20.11.1 UPF

### Ortak Mongo Ayarları

- Kullanıcı Listeleme
- Kullanıcı Oluşturma
- DB Listesini Çek

#### Kullanıcıları Listele

```sh
clear
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0) }')
export MONGO_USERNAME="cekirdekSebekeKullanicisi"
export MONGO_PASS="sifreCokGizli"
echo '
use admin
db.getUsers()

const dbs = db.adminCommand("listDatabases").databases
dbs.forEach(dbInfo => {
    print("Veritabanı: " + dbInfo.name);
    try {
        const currentDb = db.getSiblingDB(dbInfo.name);
        // Bu veritabanındaki kullanıcıları listele
        const users = currentDb.getUsers();
        if (users.length > 0) {
            print("Kullanıcılar:");
            users.forEach(user => {
                print(" - " + user.user + " (Rol: " + user.roles.map(r => r.role).join(", ") + ")");
            });
        } else {
            print("Bu veritabanında kullanıcı yok.");
        }
    } catch (e) {
        print("Hata: " + e);
    }
    print("--------------------");
});' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"
```

#### Kullanıcıyı Veritabanına Yetkilendir

```sh
clear
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0) }')
export MONGO_USERNAME="cekirdekSebekeKullanicisi"
export MONGO_PASS="sifreCokGizli"
echo '
db.grantRolesToUser("cekirdekSebekeKullanicisi", [ { role: "readWrite", db: "cinarnrftest" } ])

use admin
// admin DBde tanımlı tüm kullanıcılar
db.getUsers()

// cekirdekSebekeKullanicisi Kullanıcısının bilgileri
db.getUser("cekirdekSebekeKullanicisi")

// cekirdekSebekeKullanicisi Kullanıcısının tüm bilgiler (yetkili olduğu DB ve rolleri)
db.runCommand({ usersInfo: { user: "cekirdekSebekeKullanicisi", db: "admin" }, showPrivileges: true })
' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"
```

#### Kullanıcıları Oluştur

```sh
clear
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0) }')
export PAAS_MONGO_USER="cekirdekSebekeKullanicisi"
export MONGO_PASS="sifreCokGizli"
echo '
    db.createUser(
        {
          user: "cekirdekSebekeKullanicisi",
          pwd: "sifreCokGizli",
          roles: [
            {
              role: "root",
              db: "admin"
            }
          ]
        }
    );
    db.getSiblingDB("AmfDB").createCollection("AmfList", { capped : true, size : 6142800, max : 10000 } );' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"
```

#### DB Listesini Çek

```sh
clear
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0) }')
export MONGO_USERNAME="cekirdekSebekeKullanicisi"
export MONGO_PASS="sifreCokGizli"
echo '
// Mevcut veritabanlarının listesini görüntüleyin
const databases = db.adminCommand("listDatabases").databases;
print("------ DBs -------")
print(databases)

databases.forEach(dbInfo => {
    print("Veritabanı: " + dbInfo.name);
    // Veritabanına geçiş yap (doğrudan JavaScript kullanımıyla)
    const currentDb = db.getSiblingDB(dbInfo.name);
    // Koleksiyonları listele
    const collections = currentDb.getCollectionNames();
    print("Koleksiyonlar: ");
    collections.forEach(collection => {
        print(" - " + collection);
    });
});
' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"
```

### NRF Mongo Ayarları

```sh
clear
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0) }')
# create db and collections
echo '
    db.getSiblingDB("cinarnrftest").createCollection("cinarnfcollection", { capped : true, size : 6142800, max : 10000 } );
    db.getSiblingDB("cinarnrftest").createCollection("cinarsubscollection", { capped : true, size : 6142800, max : 10000 } );
    db.getSiblingDB("cinarnrftest").createCollection("cinarnfstatecollection", { capped : true, size : 6142800, max : 10000 } );' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"
```

### AMF Mongo Ayarları

```sh
clear
# amf'in settings.json dosyasındaki Mongo DB adıyla ile aynı olmalı
export $(yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0) }')
export MONGO_AMF_DB_NAME="amf"
export MONGO_USERNAME="cekirdekSebekeKullanicisi"
export MONGO_PASS="sifreCokGizli"

# _id:0 silinsin ki tekrar oluşturulsun

echo '
db.getSiblingDB("AmfDB").getCollection("AmfList").deleteOne({ _id: "0" })
' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"

# Tekrar oluşturalım
export JSON=`cat << EOF
{
        "_id": "0",
        "amfKpi" : {
            "maxNOfRegisteredSubscribers" : 588,
            "meanNofRegisteredSubscribers" : 0,
            "nOf5gPagingProcedures" : 4,
            "nOf5gToEpsHoAttempt" : 0,
            "nOf5gToEpsHoFailCause" : {},
            "nOf5gToEpsHoSucc" : 0,
            "nOfEmergencyRegistrationRequestsPerSNSSAI" : {
                " " : 4
            },
            "nOfEpsTo5gHoAttempt" : 0,
            "nOfEpsTo5gHoFailCause" : {},
            "nOfEpsTo5gHoSucc" : 0,
            "nOfInitialRegistrationRequestsPerSNSSAI" : {
                " " : 51917,
                "1" : 116093,
                "2" : 3
            },
            "nOfMobilityRegistrationUpdateRequestsPerSNSSAI" : {
                " " : 4,
                "1" : 4
            },
            "nOfPduSessionFailPerCause" : {},
            "nOfPduSessionFailPerSNSSAI" : {},
            "nOfPduSessionReqPerSNSSAI" : {},
            "nOfPeriodicRegistrationUpdateRequestsPerSNSSAI" : {
                " " : 2
            },
            "nOfRegRequestsforSMSoverNAS" : 5,
            "nOfSucc5gPagingProcedures" : 4,
            "nOfSuccEmergencyRegistrationsPerSNSSAI" : {
                " " : 4
            },
            "nOfSuccInitialRegistrationsPerSNSSAI" : {
                " " : 39,
                "1" : 83922
            },
            "nOfSuccMobilityRegistrationUpdatesPerSNSSAI" : {
                " " : 4,
                "1" : 4
            },
            "nOfSuccPeriodicRegistrationUpdatesPerSNSSAI" : {
                " " : 1
            },
            "nOfSuccRegistrationsAllowedforSMSoverNAS" : 5,
            "nOfSuccUEConfigUpdate" : 3,
            "nOfTotalRegistrationRequests" : 168027,
            "nOfTotalSuccRegistration" : 83974,
            "nOfUEConfigUpdate" : 8,
            "registeredSubscribersOfNwSlice" : {}
        },
        "emergencyConfigurationData" : {
            "dnn" : "dnn.emergency.com",
            "emergencySmfUuid" : "",
            "snssai" : {
                "sst" : 1
            },
            "supportEmergencyRegForUnauthenticatedSUPIs" : true
        },
        "generalParameters" : {
            "allowPagingAtOverload" : false,
            "discoverNFsInSamePlmnAtStartup" : false,
            "gtpInterfaceAmfInfo" : {
                "amfName" : "AMF_GTP_FQDN",
                "ipv4EndpointAddress" : [
                    "$ULAK_AMF"
                ],
                "ipv6EndpointAddress" : []
            },
            "gtpInterfaceMmeInfo" : {
                "ipv4EndpointAddress" : [
                    "$ULAK_AMF"
                ],
                "ipv6EndpointAddress" : [],
                "mmeName" : "MME"
            },
            "kpiSamplingPeriod" : 3600,
            "nrfCallbackPort" : "6287",
            "pagingRetransmissionCount" : 4,
            "pagingRetransmissionTimerValue" : 6,
            "prometheusServerPort" : "6224",
            "sbiCallbackPort" : "6286",
            "udsfDeployment" : false
        },
        "ladnList" : [
            {
                "ladnDnn" : "dnn.ladn0.com",
                "ladnServiceArea" : [
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000001"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000002"
                    }
                ]
            }
        ],
        "liConfigurations" : {
            "liAdmfServiceEndPoint" : {
                "ipv4Address" : "$ULAK_AMF",
                "port" : 6294
            },
            "liMdfServiceEndPoint" : {
                "ipv4Address" : "$ULAK_AMF",
                "port" : 6295
            },
            "liNeServiceEndPoint" : {
                "ipv4Address" : "$ULAK_AMF",
                "port" : 6292
            }
        },
        "nfProfile" : {
            "allowedNfTypes" : [
                "SMF",
                "PCF",
                "UDM",
                "AUSF",
                "NSSF",
                "AMF",
                "SMSF"
            ],
            "allowedNssais" : [
                {
                    "sst" : 1
                }
            ],
            "allowedPlmns" : [
                {
                    "mcc" : "001",
                    "mnc" : "002"
                }
            ],
            "amfInfo" : {
                "amfRegionId" : "01",
                "amfSetId" : "002",
                "backupInfoAmfFailure" : [],
                "backupInfoAmfRemoval" : [
                    {
                        "amfId" : "010081",
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        }
                    }
                ],
                "guamiList" : [
                    {
                        "amfId" : "010080",
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        }
                    }
                ],
                "n2InterfaceAmfInfo" : {
                    "amfName" : "AmfSto1",
                    "ipv4EndpointAddress" : [
                        "$ULAK_AMF"
                    ]
                },
                "taiList" : [
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000000"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000001"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000002"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000004"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000005"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000006"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000007"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000008"
                    },
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tac" : "000009"
                    }
                ],
                "taiRangeList" : [
                    {
                        "plmnId" : {
                            "mcc" : "001",
                            "mnc" : "002"
                        },
                        "tacRangeList" : [
                            {
                                "end" : "000009",
                                "start" : "000000"
                            }
                        ]
                    }
                ]
            },
            "capacity" : 15,
            "fqdn" : "",
            "ipv4Addresses" : [
                "$ULAK_AMF"
            ],
            "ipv6Addresses" : [],
            "load" : 0,
            "locality" : "geographic location",
            "nfInstanceId" : "529ba60e-0e57-4f73-804f-1548bf76cb2f",
            "nfServices" : [
                {
                    "defaultNotificationSubscriptions" : [
                        {
                            "callbackUri" : "http://$ULAK_AMF:6286/namf-comm/v1/onN1N2MessageNotify/n1MessageNotify",
                            "n1MessageClass" : "5GMM",
                            "notificationType" : "N1_MESSAGES"
                        }
                    ],
                    "fqdn" : "",
                    "ipEndPoints" : [
                        {
                            "ipv4Address" : "$ULAK_AMF",
                            "port" : 6210,
                            "transport" : "TCP"
                        }
                    ],
                    "nfServiceStatus" : "REGISTERED",
                    "scheme" : "http",
                    "serviceInstanceId" : "1",
                    "serviceName" : "namf-comm",
                    "versions" : [
                        {
                            "apiFullVersion" : "1.0.2",
                            "apiVersionInUri" : "v1"
                        }
                    ]
                },
                {
                    "fqdn" : "",
                    "ipEndPoints" : [
                        {
                            "ipv4Address" : "$ULAK_AMF",
                            "port" : 6211,
                            "transport" : "TCP"
                        }
                    ],
                    "nfServiceStatus" : "REGISTERED",
                    "scheme" : "http",
                    "serviceInstanceId" : "2",
                    "serviceName" : "namf-evts",
                    "versions" : [
                        {
                            "apiFullVersion" : "1.0.2",
                            "apiVersionInUri" : "v1"
                        }
                    ]
                },
                {
                    "fqdn" : "",
                    "ipEndPoints" : [
                        {
                            "ipv4Address" : "$ULAK_AMF",
                            "port" : 6212,
                            "transport" : "TCP"
                        }
                    ],
                    "nfServiceStatus" : "REGISTERED",
                    "scheme" : "http",
                    "serviceInstanceId" : "3",
                    "serviceName" : "namf-mt",
                    "versions" : [
                        {
                            "apiFullVersion" : "1.0.2",
                            "apiVersionInUri" : "v1"
                        }
                    ]
                },
                {
                    "fqdn" : "",
                    "ipEndPoints" : [
                        {
                            "ipv4Address" : "$ULAK_AMF",
                            "port" : 6213,
                            "transport" : "TCP"
                        }
                    ],
                    "nfServiceStatus" : "REGISTERED",
                    "scheme" : "http",
                    "serviceInstanceId" : "4",
                    "serviceName" : "namf-loc",
                    "versions" : [
                        {
                            "apiFullVersion" : "1.0.2",
                            "apiVersionInUri" : "v1"
                        }
                    ]
                }
            ],
            "nfStatus" : "REGISTERED",
            "nfType" : "AMF",
            "perPlmnSnssaiList" : [
                {
                    "plmnId" : {
                        "mcc" : "001",
                        "mnc" : "002"
                    },
                    "sNssaiList" : [
                        {
                            "sst" : 1
                        }
                    ]
                }
            ],
            "plmnList" : [
                {
                    "mcc" : "001",
                    "mnc" : "002"
                }
            ],
            "priority" : 0,
            "sNssais" : [
                {
                    "sst" : 1
                }
            ]
        },
        "nrfServicesConfigurations" : {
            "accessTokenServiceEndPoint" : {
                "ipv4Address" : "$ULAK_NRF",
                "port" : 8007
            },
            "nfDiscoveryServiceEndPoint" : {
                "ipv4Address" : "$ULAK_NRF",
                "port" : 8006
            },
            "nfManagementServiceEndPoint" : {
                "ipv4Address" : "$ULAK_NRF",
                "port" : 8001
            },
            "scheme" : "http"
        },
        "overloadControlParameters" : {
            "n2OverloadLimit" : 50000,
            "nasCongestionLimitAfterOverload_DNN" : 100000,
            "nasCongestionLimitAfterOverload_General" : 100000,
            "nasCongestionLimitAfterOverload_perSNSSAI" : [
                {
                    "nasCongestionLimitAfterOverload_SNSSAI" : 100000,
                    "snssai" : {
                        "sst" : 1
                    }
                }
            ]
        },
        "sctpConfigurations" : {
            "sctpFlags" : {
                "o_nonblock" : true,
                "sctp_nodelay" : true,
                "sctp_peer_addr_params" : true,
                "sctp_rtoinfo" : true,
                "so_reuseaddr" : true,
                "so_reuseport" : true
            },
            "sctpOptions" : {
                "ngap_port_number" : 38412,
                "sctp_heartbeat_interval" : 5000,
                "sctp_max_attempts" : 5,
                "sctp_max_initial_timeout" : 5000,
                "sctp_max_num_of_istreams" : 64,
                "sctp_max_num_of_ostreams" : 8,
                "sctp_number_of_listeners" : 4,
                "sctp_poll_timeout" : 3000,
                "sctp_rto_initial" : 3000,
                "sctp_rto_max" : 5000,
                "sctp_rto_min" : 1000,
                "sctp_time_to_live" : 6000
            }
        }
    }
EOF`

echo '
    db.getSiblingDB("'$MONGO_AMF_DB_NAME'").createCollection("AmfList", { capped : true, size : 6142800, max : 10000 } );
    db.getSiblingDB("'$MONGO_AMF_DB_NAME'").getCollection("AmfList").insertOne('$JSON')' | mongosh --host $PAAS_MONGO --port 27017 -u $MONGO_USERNAME -p $MONGO_PASS --authenticationDatabase "admin"
```

### Yardımcı Konsol Komutları

#### Tüm servislerin IP adreslerini Listele
```sh
yq eval '.services | to_entries | .[] | .key + "=" + .value.networks.privnet.ipv4_address' ./docker-compose.yaml | awk '{ print toupper($0)}'
```

#### 10 Saniye sonraki günlükleri göster
```sh
docker compose --file './docker-compose.yaml' --project-name 'master5gcn' logs --follow --since `date --date="+10 seconds" +%s`
```

#### br-ulak Arayüzünü tshark ile izle
```sh
tshark -D
tshark -i br-ulak
```
