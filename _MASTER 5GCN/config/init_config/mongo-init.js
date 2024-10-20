print('#'.repeat(100));
print('#'.repeat(40) + ' MONGO INIT START ' + '#'.repeat(40));

////////////////////////////// Genel Ayarlar //////////////////////////////

try {
  print('#'.repeat(40) + ' CREATE USER START ' + '#'.repeat(40));
  db.createUser({
    user: '$PAAS_MONGO_USER',
    pwd: '$PAAS_MONGO_PASS',
    roles: [
      {
        role: 'root',
        db: 'admin'
      }
    ]
  });
  print('#'.repeat(40) + ' CREATE USER END ' + '#'.repeat(40));
} catch (error) {
  print('#'.repeat(40) + ' CREATE USER ERROR START ' + '#'.repeat(40));
  print('Kullanıcı oluşturulurken hata oluştu: ', error);
  print('#'.repeat(40) + ' CREATE USER ERROR END ' + '#'.repeat(40));
}

////////////////////////////// AMF için ön ayarlar //////////////////////////////

try {
  print('#'.repeat(40) + ' AMF MONGO DB START ' + '#'.repeat(40));

  print(
    '#'.repeat(40) + ' AMF MONGO COLLECTION CREATE START ' + '#'.repeat(40)
  );
  db = db.getSiblingDB('$AMF_MONGO_DB_NAME');
  db.createCollection('AmfList', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  print('#'.repeat(40) + ' AMF MONGO COLLECTION CREATE END ' + '#'.repeat(40));

  var amfLists = [
    {
      _id: '0',
      amfKpi: {
        maxNOfRegisteredSubscribers: 588,
        meanNofRegisteredSubscribers: 0,
        nOf5gPagingProcedures: 1,
        nOf5gToEpsHoAttempt: 0,
        nOf5gToEpsHoFailCause: {},
        nOf5gToEpsHoSucc: 0,
        nOfEmergencyRegistrationRequestsPerSNSSAI: {},
        nOfEpsTo5gHoAttempt: 0,
        nOfEpsTo5gHoFailCause: {},
        nOfEpsTo5gHoSucc: 0,
        nOfInitialRegistrationRequestsPerSNSSAI: {
          ' ': 51894,
          1: 115975,
          2: 3
        },
        nOfMobilityRegistrationUpdateRequestsPerSNSSAI: {
          ' ': 2,
          1: 2
        },
        nOfPduSessionFailPerCause: {},
        nOfPduSessionFailPerSNSSAI: {},
        nOfPduSessionReqPerSNSSAI: {},
        nOfPeriodicRegistrationUpdateRequestsPerSNSSAI: {
          ' ': 1
        },
        nOfRegRequestsforSMSoverNAS: 1223,
        nOfSucc5gPagingProcedures: 1,
        nOfSuccEmergencyRegistrationsPerSNSSAI: {},
        nOfSuccInitialRegistrationsPerSNSSAI: {
          ' ': 38,
          1: 83813
        },
        nOfSuccMobilityRegistrationUpdatesPerSNSSAI: {
          ' ': 2,
          1: 2
        },
        nOfSuccPeriodicRegistrationUpdatesPerSNSSAI: {
          ' ': 1
        },
        nOfSuccRegistrationsAllowedforSMSoverNAS: 13,
        nOfSuccUEConfigUpdate: 3,
        nOfTotalRegistrationRequests: 167877,
        nOfTotalSuccRegistration: 83856,
        nOfUEConfigUpdate: 7,
        registeredSubscribersOfNwSlice: {}
      },
      emergencyConfigurationData: {
        dnn: 'dnn.emergency.com',
        emergencySmfUuid: '',
        snssai: {
          sst: 1
        },
        supportEmergencyRegForUnauthenticatedSUPIs: true
      },
      generalParameters: {
        allowPagingAtOverload: false,
        discoverNFsInSamePlmnAtStartup: false,
        gtpInterfaceAmfInfo: {
          amfName: 'amf1',
          ipv4EndpointAddress: ['$ULAK_AMF'],
          ipv6EndpointAddress: []
        },
        gtpInterfaceMmeInfo: {
          ipv4EndpointAddress: [],
          ipv6EndpointAddress: ['$ULAK_AMF'],
          mmeName: 'MME'
        },
        kpiSamplingPeriod: 3600,
        nrfCallbackPort: '6287',
        pagingRetransmissionCount: 4,
        pagingRetransmissionTimerValue: 6,
        prometheusServerPort: '6224',
        sbiCallbackPort: '6286',
        udsfDeployment: true
      },
      ladnList: [
        {
          ladnDnn: 'dnn.ladn0.com',
          ladnServiceArea: [
            { plmnId: { mcc: '001', mnc: '002' }, tac: '000002' }
          ]
        }
      ],
      liConfigurations: {
        liAdmfServiceEndPoint: {
          ipv4Address: '$ULAK_AMF',
          port: 6294
        },
        liMdfServiceEndPoint: {
          ipv4Address: '$ULAK_AMF',
          port: 6295
        },
        liNeServiceEndPoint: {
          ipv4Address: '$ULAK_AMF',
          port: 6292
        }
      },
      nfProfile: {
        allowedNfTypes: ['SMF', 'PCF', 'UDM', 'AUSF', 'NSSF', 'AMF', 'SMSF'],
        allowedNssais: [{ sst: 1 }, { sst: 2 }],
        allowedPlmns: [{ mcc: '001', mnc: '002' }],
        amfInfo: {
          amfRegionId: '1',
          amfSetId: '2',
          backupInfoAmfFailure: [],
          backupInfoAmfRemoval: [
            { amfId: '010081', plmnId: { mcc: '001', mnc: '002' } }
          ],
          guamiList: [{ amfId: '010080', plmnId: { mcc: '001', mnc: '002' } }],
          n2InterfaceAmfInfo: {
            amfName: 'amf1',
            ipv4EndpointAddress: ['0.0.0.0']
          },
          taiList: [],
          taiRangeList: [
            {
              plmnId: { mcc: '001', mnc: '002' },
              tacRangeList: [{ end: '000009', start: '000000' }]
            }
          ]
        },
        capacity: 15,
        fqdn: '',
        ipv4Addresses: ['$ULAK_AMF'],
        ipv6Addresses: [],
        load: 0,
        locality: 'geographic location',
        nfInstanceId: '$AMF_INSTANCE_ID',
        nfServices: [
          {
            defaultNotificationSubscriptions: [
              {
                callbackUri:
                  'http://$ULAK_AMF:6286/namf-comm/v1/onN1N2MessageNotify/n1MessageNotify',
                n1MessageClass: '5GMM',
                notificationType: 'N1_MESSAGES'
              }
            ],
            fqdn: '',
            ipEndPoints: [
              { ipv4Address: '$ULAK_AMF', port: 6210, transport: 'TCP' }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '1',
            serviceName: 'namf-comm',
            versions: [{ apiFullVersion: '1.0.2', apiVersionInUri: 'v1' }]
          },
          {
            fqdn: '',
            ipEndPoints: [
              { ipv4Address: '$ULAK_AMF', port: 6211, transport: 'TCP' }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '2',
            serviceName: 'namf-evts',
            versions: [{ apiFullVersion: '1.0.2', apiVersionInUri: 'v1' }]
          },
          {
            fqdn: '',
            ipEndPoints: [
              { ipv4Address: '$ULAK_AMF', port: 6212, transport: 'TCP' }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '3',
            serviceName: 'namf-mt',
            versions: [{ apiFullVersion: '1.0.2', apiVersionInUri: 'v1' }]
          },
          {
            fqdn: '',
            ipEndPoints: [
              { ipv4Address: '$ULAK_AMF', port: 6213, transport: 'TCP' }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '4',
            serviceName: 'namf-loc',
            versions: [{ apiFullVersion: '1.0.2', apiVersionInUri: 'v1' }]
          }
        ],
        nfStatus: 'REGISTERED',
        nfType: 'AMF',
        perPlmnSnssaiList: [
          {
            plmnId: { mcc: '001', mnc: '002' },
            sNssaiList: [{ sst: 1 }, { sst: 2 }]
          }
        ],
        plmnList: [{ mcc: '001', mnc: '002' }],
        priority: 0,
        sNssais: [{ sst: 1 }, { sst: 2 }]
      },
      nrfServicesConfigurations: {
        accessTokenServiceEndPoint: {
          ipv4Address: '$ULAK_NRF',
          port: 8007
        },
        nfDiscoveryServiceEndPoint: {
          ipv4Address: '$ULAK_NRF',
          port: 8006
        },
        nfManagementServiceEndPoint: {
          ipv4Address: '$ULAK_NRF',
          port: 8001
        },
        scheme: 'http'
      },
      overloadControlParameters: {
        n2OverloadLimit: 1000,
        nasCongestionLimitAfterOverload_DNN: 100000,
        nasCongestionLimitAfterOverload_General: 100000,
        nasCongestionLimitAfterOverload_perSNSSAI: [
          {
            nasCongestionLimitAfterOverload_SNSSAI: 100000,
            snssai: { sst: 1 }
          },
          { nasCongestionLimitAfterOverload_SNSSAI: 100000, snssai: { sst: 2 } }
        ]
      },
      sctpConfigurations: {
        sctpFlags: {
          o_nonblock: true,
          sctp_nodelay: true,
          sctp_peer_addr_params: true,
          sctp_rtoinfo: true,
          so_reuseaddr: true,
          so_reuseport: true
        },
        sctpOptions: {
          ngap_port_number: 38412,
          sctp_heartbeat_interval: 5000,
          sctp_max_attempts: 5,
          sctp_max_initial_timeout: 5000,
          sctp_max_num_of_istreams: 64,
          sctp_max_num_of_ostreams: 8,
          sctp_number_of_listeners: 4,
          sctp_poll_timeout: 3000,
          sctp_rto_initial: 3000,
          sctp_rto_max: 5000,
          sctp_rto_min: 1000,
          sctp_time_to_live: 6000
        }
      }
    }
  ];

  print('#'.repeat(40) + ' AMF MONGO DB INSERT START ' + '#'.repeat(40));
  db.getCollection('AmfList').insertMany(amfLists);
  print('#'.repeat(40) + ' AMF MONGO DB INSERT END ' + '#'.repeat(40));

  print('#'.repeat(40) + ' AMF MONGO DB END ' + '#'.repeat(40));
} catch (error) {
  // Print a noticable error message to the console
  print('#'.repeat(40) + ' AMF MONGO DB ERROR START ' + '#'.repeat(40));
  print('AMF için ön ayarlar oluşturulurken hata oluştu: ', error);

  print('AMF Data already exists. Dropping and recreating the collections.');
  print('Dropping collections...');
  db.getCollection('AmfList').drop();
  print('Collections dropped.');
  print('Recreating collections...');
  db.getCollection('AmfList').insertMany(amflists);
  print('Collections recreated.');

  print('#'.repeat(40) + ' AMF MONGO DB ERROR END ' + '#'.repeat(40));
}

////////////////////////////// AUSF için ön ayarlar //////////////////////////////

/*
  AUSF için bir mongo ayarı bulunmamaktadır.
*/

////////////////////////////// NEF için ön ayarlar //////////////////////////////

try {
  print('#'.repeat(40) + ' NEF MONGO DB START ' + '#'.repeat(40));

  print(
    '#'.repeat(40) + ' NEF MONGO COLLECTION CREATE START ' + '#'.repeat(40)
  );
  db = db.getSiblingDB('$NEF_MONGO_DB_NAME');
  db.createCollection('cinarpfdofappcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarpfdsubscriptioncollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundpfdmanagementcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundtrafficinfluencecollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundmonitoringeventcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundafcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundbdtcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundassessionwithqoscollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthboundscsasqosconfigcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnorthbounddevicetriggeringcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  print('#'.repeat(40) + ' NEF MONGO COLLECTION CREATE END ' + '#'.repeat(40));

  let qosList = [
    {
      _id: ObjectId('5f20768c1782f58e179dd55e'),
      qosReference: 'QoSRef1',
      contVer: 1.0,
      medCompN: 1.0,
      medType: 'DATA',
      marBwUl: '128 Mbps',
      marBwDl: '256 Mpbs',
      mirBwUl: '64 Kbps',
      mirBwDl: '100 Kbps',
      fStatus: 'ENABLED',
      dnn: 'dnn.test1.com'
    },
    {
      _id: ObjectId('5f218d2291b97b12923a4413'),
      qosReference: 'QoSRef2',
      contVer: 1.0,
      medCompN: 1.0,
      medType: 'DATA',
      marBwUl: '128 Mbps',
      marBwDl: '256 Mpbs',
      mirBwUl: '64 Kbps',
      mirBwDl: '100 Kbps',
      fStatus: 'DISABLED',
      dnn: 'dnn.test1.com'
    },
    {
      _id: ObjectId('5f20768c1782f58e179dd55a'),
      qosReference: 'QoSRef3',
      contVer: 1.0,
      medCompN: 1.0,
      medType: 'DATA',
      marBwUl: '128 Mbps',
      marBwDl: '256 Mpbs',
      mirBwUl: '2048 Kbps',
      mirBwDl: '2048 Kbps',
      fStatus: 'ENABLED',
      dnn: 'dnn.test1.com'
    }
  ];

  let afCollectionList = [
    {
      _id: 'Netflix',
      afId: 'Netflix',
      dnn: 'netflix.com',
      scope:
        '3gpp-as-session-with-qos 3gpp-traffic-influence 3gpp-pfd-management 3gpp-monitoring-event 3gpp-bdt 3gpp-cp'
    }
  ];

  print('#'.repeat(40) + ' NEF MONGO DB INSERT START ' + '#'.repeat(40));
  db.getCollection('cinarnorthboundscsasqosconfigcollection').insertMany(
    qosList
  );
  db.getCollection('cinarnorthboundafcollection').insertMany(afCollectionList);
  print('#'.repeat(40) + ' NEF MONGO DB INSERT END ' + '#'.repeat(40));

  print('#'.repeat(40) + ' NEF MONGO DB END ' + '#'.repeat(40));
} catch (error) {
  // Print a noticable error message to the console
  print('#'.repeat(40) + ' NEF MONGO DB ERROR START ' + '#'.repeat(40));
  print('NEF için ön ayarlar oluşturulurken hata oluştu: ', error);
  print('#'.repeat(40) + ' NEF MONGO DB ERROR END ' + '#'.repeat(40));
}

////////////////////////////// NRF için ön ayarlar //////////////////////////////

try {
  print('#'.repeat(40) + ' NRF MONGO DB START ' + '#'.repeat(40));

  print(
    '#'.repeat(40) + ' NRF MONGO COLLECTION CREATE START ' + '#'.repeat(40)
  );
  db = db.getSiblingDB('$NRF_MONGO_DB_NAME');
  db.createCollection('cinarnfcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarsubscollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnfstatecollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  print('#'.repeat(40) + ' NRF MONGO COLLECTION CREATE END ' + '#'.repeat(40));

  print('#'.repeat(40) + ' NRF MONGO DB END ' + '#'.repeat(40));
} catch (error) {
  print('#'.repeat(40) + ' NRF MONGO DB ERROR START ' + '#'.repeat(40));
  print('NRF için ön ayarlar oluşturulurken hata oluştu: ', error);
  print('#'.repeat(40) + ' NRF MONGO DB ERROR END ' + '#'.repeat(40));
}

////////////////////////////// NSSF için ön ayarlar //////////////////////////////

try {
  print('#'.repeat(40) + ' NSSF MONGO DB START ' + '#'.repeat(40));

  print(
    '#'.repeat(40) + ' NSSF MONGO COLLECTION CREATE START ' + '#'.repeat(40)
  );
  db = db.getSiblingDB('$NSSF_MONGO_DB_NAME');
  db.createCollection('cinarnssrulescollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarconfigurednssaicollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnssfsubscinarcollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinarnsicollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  db.createCollection('cinaramfavailabilitycollection', {
    capped: true,
    size: 6142800,
    max: 10000
  });
  print('#'.repeat(40) + ' NSSF MONGO COLLECTION CREATE END ' + '#'.repeat(40));

  var cinarconfigurednssaicollectionConfigs = [
    {
      _id: 'CinarConfiguredSliceRule1',
      amfId: '1',
      plmnId: { mcc: '001', mnc: '002' },
      salience: NumberInt(1),
      snssai: [{ sst: NumberInt(1) }],
      tac: '000001'
    }
  ];

  var cinarnsicollectionConfigs = [
    {
      _id: 'NSI001',
      name: 'NSI001',
      nrfAccessTokenUri: 'http://$ULAK_NRF:8007/oauth2/token',
      nrfId: 'http://$ULAK_NRF:8006/nnrf-disc/v1',
      nrfNfMgtUri: 'http://$ULAK_NRF:8001/nnrf-nfm/v1',
      nsiId: '1',
      targetAmfSets: [
        {
          regionId: '01',
          setFqdn: 'set002.region01.amfset.5gc.mnc002.mcc001.3gppnetwork.org',
          setId: '001'
        }
      ]
    },
    {
      _id: 'NSI002',
      name: 'NSI002',
      nrfAccessTokenUri: 'http://$ULAK_NRF:8007/oauth2/token',
      nrfId: 'http://$ULAK_NRF:8006/nnrf-disc/v1',
      nrfNfMgtUri: 'http://$ULAK_NRF:8001/nnrf-nfm/v1',
      nsiId: '2',
      targetAmfSets: [
        {
          regionId: '01',
          setFqdn: 'set002.region01.amfset.5gc.mnc002.mcc001.3gppnetwork.org',
          setId: '001'
        }
      ]
    }
  ];

  var cinarnssrulescollectionConfigs = [
    {
      _id: 'CinarEMBBSliceRule1',
      amfId: '1',
      behavior: {
        accessType: '3GPP_ACCESS',
        grant: 'ALLOWED',
        nsiProfiles: [{ name: 'NSI001', salience: NumberInt(1) }]
      },
      name: 'CinarEMBBSliceRule1',
      plmnId: { mcc: '001', mnc: '002' },
      salience: NumberInt(1),
      snssai: { sst: NumberInt(1) },
      tac: '000001'
    },
    {
      _id: 'CinarEMBBSliceRule2',
      amfId: '1',
      behavior: {
        accessType: '3GPP_ACCESS',
        grant: 'ALLOWED',
        nsiProfiles: [{ name: 'NSI002', salience: NumberInt(1) }]
      },
      name: 'CinarEMBBSliceRule2',
      plmnId: { mcc: '001', mnc: '002' },
      salience: NumberInt(1),
      snssai: { sst: NumberInt(2) },
      tac: '000001'
    },
    {
      _id: 'CinarEMBBSliceRule3',
      amfId: '1',
      behavior: {
        accessType: '3GPP_ACCESS',
        grant: 'ALLOWED',
        nsiProfiles: [{ name: 'NSI001', salience: NumberInt(1) }]
      },
      name: 'CinarEMBBSliceRule3',
      plmnId: { mcc: '001', mnc: '002' },
      salience: NumberInt(1),
      snssai: { sst: NumberInt(2) },
      tac: '000002'
    },
    {
      _id: 'CinarEMBBSliceRule4',
      amfId: '1',
      behavior: {
        accessType: '3GPP_ACCESS',
        grant: 'ALLOWED',
        nsiProfiles: [{ name: 'NSI001', salience: NumberInt(1) }]
      },
      name: 'CinarEMBBSliceRule1',
      plmnId: { mcc: '001', mnc: '002' },
      salience: NumberInt(1),
      snssai: { sst: NumberInt(3) },
      tac: '000001'
    },
    {
      _id: 'CinarEMBBSliceRule5',
      amfId: '1',
      behavior: {
        accessType: '3GPP_ACCESS',
        grant: 'ALLOWED',
        nsiProfiles: [{ name: 'NSI001', salience: 1 }]
      },
      name: 'CinarEMBBSliceRule1',
      plmnId: { mcc: '286', mnc: '99' },
      salience: 1,
      snssai: { sst: 1 },
      tac: '000003'
    }
  ];

  print('#'.repeat(40) + ' NSSF MONGO DB INSERT START ' + '#'.repeat(40));
  db.getCollection('cinarconfigurednssaicollection').insertMany(
    cinarconfigurednssaicollectionConfigs
  );
  db.getCollection('cinarnsicollection').insertMany(cinarnsicollectionConfigs);
  db.getCollection('cinarnssrulescollection').insertMany(
    cinarnssrulescollectionConfigs
  );
  print('#'.repeat(40) + ' NSSF MONGO DB INSERT END ' + '#'.repeat(40));

  print('#'.repeat(40) + ' NSSF MONGO DB END ' + '#'.repeat(40));
} catch (error) {
  print('#'.repeat(40) + ' NSSF MONGO DB ERROR START ' + '#'.repeat(40));
  print('NSSF için ön ayarlar oluşturulurken hata oluştu: ', error);

  print('NSSF Data already exists. Dropping and recreating the collections.');

  print('Dropping collections...');
  db.getCollection('cinarconfigurednssaicollection').drop();
  db.getCollection('cinarnsicollection').drop();
  db.getCollection('cinarnssrulescollection').drop();
  print('Collections dropped.');

  print('Recreating collections...');
  db.getCollection('cinarconfigurednssaicollection').insertMany(
    cinarconfigurednssaicollectionConfigs
  );
  db.getCollection('cinarnsicollection').insertMany(cinarnsicollectionConfigs);
  db.getCollection('cinarnssrulescollection').insertMany(
    cinarnssrulescollectionConfigs
  );
  print('Collections recreated.');

  print('#'.repeat(40) + ' NSSF MONGO DB ERROR END ' + '#'.repeat(40));
}

////////////////////////////// PCF için ön ayarlar //////////////////////////////
try {
  print('#'.repeat(40) + ' PCF MONGO DB START ' + '#'.repeat(40));

  print(
    '#'.repeat(40) + ' PCF MONGO COLLECTION CREATE START ' + '#'.repeat(40)
  );
  db = db.getSiblingDB('$PCF_MONGO_DB_NAME');
  db.createCollection('AMSConfig');
  db.createCollection('AmConditionGroup');
  db.createCollection('AppSession');
  db.createCollection('ApplicationServiceMapping');
  db.createCollection('BDTPolicyData');
  db.createCollection('CSNFSession');
  db.createCollection('CSSubscriberSession');
  db.createCollection('ChargingData');
  db.createCollection('DailyJob');
  db.createCollection('MonthlyJob');
  db.createCollection('OneTimeJob');
  db.createCollection('PCFProfile');
  db.createCollection('PCFSubscriptionInfo');
  db.createCollection('PDUSession');
  db.createCollection('PccRule');
  db.createCollection('PerfMeasData');
  db.createCollection('Policy');
  db.createCollection('QoSData');
  db.createCollection('RfspPolicy');
  db.createCollection('SMSConfig');
  db.createCollection('ServAreaResPolicy');
  db.createCollection('Service');
  db.createCollection('ServiceConflictGroup');
  db.createCollection('ServiceFlow');
  db.createCollection('SessionRule');
  db.createCollection('Slice');
  db.createCollection('SmConditionGroup');
  db.createCollection('SubscriberData');
  db.createCollection('SubscriberGroup');
  db.createCollection('SubscriberSmSessionData');
  db.createCollection('TrafficControlData');
  db.createCollection('UESession');
  db.createCollection('UsageLimitStatusMapping');
  db.createCollection('UsageMonData');
  print('#'.repeat(40) + ' PCF MONGO COLLECTION CREATE END ' + '#'.repeat(40));

  var amsConfigs = [
    {
      _id: 'AMS',
      udrQuerySupport: false,
      udrSubscriptionSupport: true,
      udrSuppFeat: {
        DomainNameProtocol: false,
        ResourceRemovalNotificationPolicyData: false,
        ResourceNotificationExposureDataFix: true
      }
    }
  ];

  var amConditionGroups = [
    {
      _id: 'ServAreaResAllowed',
      cgId: 'ServAreaResAllowed',
      condition: [
        {
          Description: '',
          Name: 'ServAreaResNrCellId',
          ObjectAttribute: 'useLocNrCellId',
          Operator: 'ANY',
          RightValue: ['000000001', '000000002'],
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'ServAreaRes',
          ObjectAttribute: 'userLocTaiPlmnId',
          Operator: 'Equal',
          RightValue: '28613',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'ServAreaResUserLoc',
          ObjectAttribute: 'userLocTac',
          Operator: 'Equal',
          RightValue: '4305',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'ServAreaResNrCellId',
          ObjectAttribute: 'userLocTac',
          Operator: 'ANY',
          RightValue: ['0001'],
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'ServAreaResNotAllowed',
      cgId: 'ServAreaResNotAllowed',
      condition: [
        {
          Description: '',
          Name: 'ServAreaResNotAllowedTac',
          ObjectAttribute: 'userLocTac',
          Operator: 'Equal',
          RightValue: '4306',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'ServAreaRes',
          ObjectAttribute: 'userLocTaiPlmnId',
          Operator: 'Equal',
          RightValue: '28613',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'ServAreaResNotAllowedCellId',
          ObjectAttribute: 'useLocNrCellId',
          Operator: 'ANY',
          RightValue: ['000000003', '000000004'],
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'ServAreaResPolicyDefault',
      cgId: 'ServAreaResPolicyDefault',
      description: '',
      relation: 'OR',
      condition: [
        {
          Description: '',
          Name: 'servAreaResAllowedTacs',
          ObjectAttribute: 'servAreaResAllowedTacs',
          Operator: 'ANY',
          RightValue: '000001',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'servAreaResAllowedTacs',
          ObjectAttribute: 'servAreaResAllowedTacs',
          Operator: 'ANY',
          RightValue: '4305',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'servAreaResAllowedTacs',
          ObjectAttribute: 'servAreaResAllowedTacs',
          Operator: 'ANY',
          RightValue: '4306',
          RightValueType: 'Value'
        }
      ]
    },
    {
      _id: 'ServAreaResPolicyUpdate',
      cgId: 'ServAreaResPolicyUpdate',
      description: '',
      relation: 'OR',
      condition: [
        {
          Description: '',
          Name: 'servAreaResAllowedTacs',
          ObjectAttribute: 'servAreaResAllowedTacs',
          Operator: 'ANY',
          RightValue: ['4305'],
          RightValueType: 'Value'
        }
      ]
    }
  ];

  var chargingData = [
    {
      _id: 'DefaultCharging',
      chgId: 'DefaultCharging',
      online: false,
      offline: true,
      meteringMethod: 'VOLUME',
      ratingGroup: 5,
      reportingLevel: 'RAT_GR_LEVEL'
    }
  ];

  var pccRules = [
    {
      _id: 'QoS_10M_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_Internet_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'QoS_10M_Pcc_Rule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(1),
      refChgData: [],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['10M_QoS'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'QoS_128K_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'QoS_128K_Pcc_Rule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(255),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['128K_QoS'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'QoS_512K_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_Internet_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'QoS_512K_Pcc_Rule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(3),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['512K_QoS'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'UEIRM_PccRule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['UEIRM_CG_5QI5'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'UEIRM_PccRule',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(4),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['UEIRM_QoS_5QI5'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'FUP_Pcc_Rule_Normal',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'FUP_Pcc_Rule_Normal',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(5),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['FUP_QoS_Normal'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'NetflixPccRule',
      appId: 'Netflix',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: [],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'NetflixPccRule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(6),
      refCondData: '',
      refQosData: ['NetflixQoS'],
      refTcData: ['Default_TC'],
      type: 'DYNAMIC'
    },
    {
      _id: 'IMS_Voice_Signalling_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_Default_IMS_DNN'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'IMS_Voice_Signalling_Pcc_Rule',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(0),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_IMS_Service_Flow'],
      refQosData: ['IMS_Voice_Signalling_Qos'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'IMS_Voice_Data_Pcc_Rule_Audio',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_Audio_Normal'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'IMS_Voice_Data_Pcc_Rule_Audio',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(51),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['IMS_Voice_Data_Audio_Qos'],
      refTcData: ['Default_TC_AUDIO'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'IMS_Voice_Data_Pcc_Rule_Video',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_Video_Normal'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'IMS_Voice_Data_Pcc_Rule_Video',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(52),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['IMS_Voice_Data_Video_Qos'],
      refTcData: ['Default_TC_VIDEO'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'FUP_Pcc_Rule_Level_Exhausted',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['FUP_CG_Level_Exhausted'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'FUP_Pcc_Rule_Level_Exhausted',
      pccRuleOperation: 'TERMINATESESSION',
      precedence: NumberInt(7),
      refChgData: [],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['FUP_QoS_Level_Exhausted'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'Multi_Player_Game_Pcc_Rule_SDF',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_Internet_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'Multi_Player_Game_Pcc_Rule_SDF',
      pccRuleOperation: '',
      precedence: NumberInt(0),
      refChgData: [],
      refCondData: '',
      refFlowInfos: ['Multi_Player_Game_Service_Flow_SDF'],
      refQosData: ['Multi_Player_Game_QoS'],
      refTcData: ['Default_TC'],
      refUmData: ['FUP_Default_Um'],
      type: 'DYNAMIC'
    },
    {
      _id: 'AF_Data_Signalling_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_Signaling_AF_App1_DNN'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'AF_Data_Signalling_Pcc_Rule',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(8),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['AF_Data_Signalling_Qos'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'AF_DATA_Data_PccRule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_MedType_DATA'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'AF_DATA_Data_PccRule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(9),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['AF_DATA_Data_Qos'],
      refTcData: ['Default_TC_DATA'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'Multi_Player_Game_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_Internet_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'Multi_Player_Game_Pcc_Rule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(10),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['Multi_Player_Game_QoS'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'AAR_IMS_REG_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_IMS_Reg_AAR'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'AAR_IMS_REG_Pcc_Rule',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(0),
      refChgData: ['DefaultCharging'],
      refQosData: ['IMS_AAR_Reg_Signalling_Qos'],
      refCondData: '',
      refFlowInfos: ['ANY_IMS_AAR_Reg_Service_Flow'],
      type: 'DYNAMIC'
    },
    {
      _id: 'FUP_SDF_Vol_Pcc_Rule_Normal',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['FUP_SDF_Vol_Normal_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'FUP_SDF_Vol_Pcc_Rule_Normal',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(11),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['SDF_Vol_Service_Flow'],
      refQosData: ['FUP_SDF_Vol_QoS_Normal'],
      refTcData: ['Default_TC'],
      refUmData: ['FUP_SDF_Vol_UmData'],
      type: 'DYNAMIC'
    },
    {
      _id: 'FUP_SDF_Vol_Pcc_Rule_Exhausted',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['FUP_SDF_Vol_Exhausted_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'FUP_SDF_Vol_Pcc_Rule_Exhausted',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(0),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['SDF_Vol_Service_Flow'],
      refQosData: ['FUP_SDF_Vol_QoS_Exhausted'],
      refTcData: ['Default_TC'],
      refUmData: ['FUP_SDF_Vol_UmData'],
      type: 'DYNAMIC'
    },
    {
      _id: 'IMS_Emergency_PccRule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: [],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'IMS_Emergency_PccRule',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(49),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_IMS_Service_Flow'],
      refQosData: ['IMS_Emergency_Qos'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'IMS_Emergency_Data_Pcc_Rule_Audio',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_Audio_Normal'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'IMS_Emergency_Data_Pcc_Rule_Audio',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(48),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['IMS_Voice_Data_Audio_Qos'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'AF_TEXT_Data_PccRule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['CG_MedType_TEXT'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'AF_TEXT_Data_PccRule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(13),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['AF_TEXT_Data_Qos'],
      refTcData: ['Default_TC_TEXT'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'FUP_Pcc_Rule_Normal_CHF',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'FUP_Pcc_Rule_Normal_CHF',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(0),
      refChgData: [],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['FUP_QoS_Normal'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'FUP_Duration_Pcc_Rule_Normal',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['DNN_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'FUP_Duration_Pcc_Rule_Normal',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(14),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['FUP_Duration_QoS_Normal'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    },
    {
      _id: 'Predefined_Pcc_Rule',
      afSigProtocol: '',
      appId: '',
      conditionGroup: ['DNN_Internet_CG'],
      contVer: NumberInt(0),
      pccRuleId: 'Predefined_Pcc_Rule',
      pccRuleOperation: 'CHANGERULE',
      precedence: NumberInt(55),
      refChgData: [],
      refCondData: '',
      refFlowInfos: [],
      refQosData: [],
      refTcData: [],
      refUmData: [],
      type: 'PREDEFINED'
    },
    {
      _id: 'Baicell_Pcc_Rule',
      afSigProtocol: '',
      appReloc: '',
      conditionGroup: ['Baicell_CG'],
      contVer: NumberInt(0),
      description: '',
      pccRuleId: 'Baicell_Pcc_Rule',
      pccRuleOperation: 'INSTALLRULE',
      precedence: NumberInt(2),
      refChgData: ['DefaultCharging'],
      refCondData: '',
      refFlowInfos: ['ANY_Service_Flow'],
      refQosData: ['Baicell_QoS'],
      refTcData: ['Default_TC'],
      refUmData: [],
      type: 'DYNAMIC'
    }
  ];

  var pcfProfiles = [
    {
      _id: '$PCF_INSTANCE_ID',
      nfProfile: {
        allowedNfTypes: ['AMF', 'SMF', 'UDR', 'NEF'],
        allowedNssais: [
          {
            sst: 1
          },
          {
            sst: 2
          }
        ],
        allowedPlmns: [
          {
            mcc: '001',
            mnc: '002'
          }
        ],
        capacity: 40,
        fqdn: '',
        heartBeatTimer: 1,
        interPlmnFqdn: '',
        ipv4Addresses: ['$ULAK_PCF_CS'],
        load: 0,
        locality: 'geographic location',
        nfInstanceId: '$PCF_INSTANCE_ID',
        nfServices: [
          {
            fqdn: 'npcf-bdtpolicycontrol',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-bdtpolicycontrol',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-policyauthorization',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-policyauthorization',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-smpolicycontrol',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-smpolicycontrol',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-am-policy-control',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_AMS',
                port: 7000
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_AMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-am-policy-control',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          }
        ],
        nfStatus: 'REGISTERED',
        nfType: 'PCF',
        nsiList: ['5G Control Plane'],
        pcfInfo: {
          dnnList: [
            'dnn.test1.com',
            'dnn.test2.com',
            'dnn.test3.com',
            'dnn.ims.com',
            'dnn.emergency.com',
            'dnn.ladn0.com'
          ]
        },
        plmnList: [
          {
            mcc: '001',
            mnc: '002'
          }
        ],
        priority: 10,
        sNssais: [
          {
            sst: 1
          },
          {
            sst: 2
          },
          {
            sst: 3
          }
        ]
      },
      pcfName: 'PCF'
    },
    {
      _id: '$PCF_INSTANCE_ID_2',
      nfProfile: {
        allowedNfTypes: ['AMF', 'SMF', 'UDR', 'NEF'],
        allowedNssais: [
          {
            sst: 1
          },
          {
            sst: 2
          }
        ],
        allowedPlmns: [
          {
            mcc: '001',
            mnc: '002'
          }
        ],
        capacity: 40,
        fqdn: '',
        heartBeatTimer: 1,
        interPlmnFqdn: '',
        ipv4Addresses: ['$ULAK_PCF_CS'],
        load: 0,
        locality: 'geographic location',
        nfInstanceId: '$PCF_INSTANCE_ID_2',
        nfServices: [
          {
            fqdn: 'npcf-bdtpolicycontrol',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$ULAK_PCF_SMS',
            serviceName: 'npcf-bdtpolicycontrol',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-policyauthorization',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-policyauthorization',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-smpolicycontrol',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-smpolicycontrol',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-am-policy-control',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_AMS',
                port: 7000
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_AMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-am-policy-control',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          }
        ],
        nfStatus: 'REGISTERED',
        nfType: 'PCF',
        nsiList: ['5G Control Plane'],
        pcfInfo: {
          dnnList: [
            'dnn.test1.com',
            'dnn.test2.com',
            'dnn.test3.com',
            'dnn.ims.com',
            'dnn.emergency.com',
            'dnn.ladn0.com'
          ]
        },
        plmnList: [
          {
            mcc: '001',
            mnc: '002'
          }
        ],
        priority: 10,
        sNssais: [
          {
            sst: 1
          },
          {
            sst: 2
          },
          {
            sst: 3
          }
        ]
      },
      pcfName: 'PCF'
    },
    {
      _id: '$PCF_INSTANCE_ID_3',
      nfProfile: {
        allowedNfTypes: ['AMF', 'SMF', 'UDR', 'NEF'],
        allowedNssais: [
          {
            sst: 1
          },
          {
            sst: 2
          }
        ],
        allowedPlmns: [
          {
            mcc: '001',
            mnc: '002'
          }
        ],
        capacity: 40,
        fqdn: '',
        heartBeatTimer: 1,
        interPlmnFqdn: '',
        ipv4Addresses: ['$ULAK_PCF_CS'],
        load: 0,
        locality: 'geographic location',
        nfInstanceId: '$PCF_INSTANCE_ID_3',
        nfServices: [
          {
            fqdn: 'npcf-bdtpolicycontrol',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-bdtpolicycontrol',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-policyauthorization',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-policyauthorization',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-smpolicycontrol',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_SMS',
                port: 7002
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-smpolicycontrol',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          },
          {
            fqdn: 'npcf-am-policy-control',
            ipEndPoints: [
              {
                ipv4Address: '$ULAK_PCF_AMS',
                port: 7000
              }
            ],
            nfServiceStatus: 'REGISTERED',
            scheme: 'http',
            serviceInstanceId: '$PCF_SMS_SERVICE_INSTANCE_ID',
            serviceName: 'npcf-am-policy-control',
            versions: [
              {
                apiFullVersion: '1.0.0.alpha-1',
                apiVersionInUri: 'v1'
              }
            ]
          }
        ],
        nfStatus: 'REGISTERED',
        nfType: 'PCF',
        nsiList: ['5G Control Plane'],
        pcfInfo: {
          dnnList: [
            'dnn.test1.com',
            'dnn.test2.com',
            'dnn.test3.com',
            'dnn.ims.com',
            'dnn.emergency.com',
            'dnn.ladn0.com'
          ]
        },
        plmnList: [
          {
            mcc: '001',
            mnc: '002'
          }
        ],
        priority: 10,
        sNssais: [
          {
            sst: 1
          },
          {
            sst: 2
          },
          {
            sst: 3
          }
        ]
      },
      pcfName: 'PCF'
    }
  ];

  var policies = [
    {
      _id: 'QoS_10M_Policy',
      description: '',
      policyId: 'QoS_10M_Policy',
      refPccRules: ['QoS_10M_Pcc_Rule'],
      refSessionRules: ['QoS_10M_Session_Rule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'QoS_128K_Policy',
      description: '',
      policyId: 'QoS_128K_Policy',
      refPccRules: ['QoS_128K_Pcc_Rule'],
      refSessionRules: ['QoS_128K_Session_Rule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'QoS_512K_Policy',
      description: '',
      policyId: 'QoS_512K_Policy',
      refPccRules: ['QoS_512K_Pcc_Rule'],
      refSessionRules: ['QoS_512K_Session_Rule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'UEIRM_Policy',
      description: '',
      policyId: 'UEIRM_Policy',
      refPccRules: ['UEIRM_PccRule'],
      refSessionRules: [],
      trigger: 'RES_MO_RE'
    },
    {
      _id: 'FUP_Policy_Create',
      description: '',
      policyId: 'FUP_Policy_Create',
      refPccRules: ['FUP_Pcc_Rule_Normal'],
      refSessionRules: ['FUP_Session_Rule_Normal'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'FUP_Policy_Update',
      description: '',
      policyId: 'FUP_Policy_Update',
      refPccRules: ['FUP_Pcc_Rule_Normal'],
      refSessionRules: [
        'FUP_Session_Rule_Normal',
        'FUP_Session_Rule_Level_Exhausted'
      ],
      trigger: 'US_RE'
    },
    {
      _id: 'IMS_Voice_Signalling_Policy',
      description: '',
      policyId: 'IMS_Voice_Signalling_Policy',
      refPccRules: ['IMS_Voice_Signalling_Pcc_Rule'],
      refSessionRules: ['IMS_Voice_Signalling_Session_Rule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'IMS_Voice_Data_Policy',
      description: '',
      policyId: 'IMS_Voice_Data_Policy',
      refPccRules: [
        'IMS_Voice_Data_Pcc_Rule_Audio',
        'IMS_Voice_Data_Pcc_Rule_Video',
        'AAR_IMS_REG_Pcc_Rule'
      ],
      refSessionRules: [],
      trigger: 'AF_SESSION_ESTABLISHMENT'
    },
    {
      _id: 'NetflixPolicy',
      description: '',
      policyId: 'NetflixPolicy',
      refPccRules: ['NetflixPccRule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'FUP_Policy_Create_SDF',
      description: '',
      policyId: 'FUP_Policy_Create_SDF',
      refPccRules: ['Multi_Player_Game_Pcc_Rule_SDF'],
      refSessionRules: ['FUP_Session_Rule_Normal_SDF'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'AF_Data_Signalling_Policy',
      description: '',
      policyId: 'AF_Data_Signalling_Policy',
      refPccRules: ['AF_Data_Signalling_Pcc_Rule'],
      refSessionRules: ['AF_Data_Signalling_Session_Rule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'AF_DATA_Data_Policy',
      description: '',
      policyId: 'AF_DATA_Data_Policy',
      refPccRules: ['AF_DATA_Data_PccRule'],
      refSessionRules: [],
      trigger: 'AF_SESSION_ESTABLISHMENT'
    },
    {
      _id: 'Multi_Player_Game_Policy',
      description: '',
      policyId: 'Multi_Player_Game_Policy',
      refPccRules: ['Multi_Player_Game_Pcc_Rule'],
      refSessionRules: [],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'FUP_SDF_Vol_Policy_Update',
      description: '',
      policyId: 'FUP_SDF_Vol_Policy_Update',
      refPccRules: [
        'FUP_SDF_Vol_Pcc_Rule_Normal',
        'FUP_SDF_Vol_Pcc_Rule_Exhausted'
      ],
      refSessionRules: [],
      trigger: 'US_RE'
    },
    {
      _id: 'FUP_SDF_Vol_Policy_Create',
      description: '',
      policyId: 'FUP_SDF_Vol_Policy_Create',
      refPccRules: [
        'FUP_SDF_Vol_Pcc_Rule_Normal',
        'FUP_SDF_Vol_Pcc_Rule_Exhausted'
      ],
      refSessionRules: [],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'IMS_Emergency_Policy',
      description: '',
      policyId: 'IMS_Emergency_Policy',
      refPccRules: ['IMS_Emergency_PccRule'],
      refSessionRules: ['IMS_Emergency_SessionRule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'IMS_Emergency_Data_Policy',
      description: '',
      policyId: 'IMS_Emergency_Data_Policy',
      refPccRules: ['IMS_Emergency_Data_Pcc_Rule_Audio'],
      refSessionRules: [],
      trigger: 'AF_SESSION_ESTABLISHMENT'
    },
    {
      _id: 'AF_TEXT_Data_Policy',
      description: '',
      policyId: 'AF_TEXT_Data_Policy',
      refPccRules: ['AF_TEXT_Data_PccRule'],
      refSessionRules: [],
      trigger: 'AF_SESSION_ESTABLISHMENT'
    },
    {
      _id: 'FUP_Policy_Create_CHF',
      description: '',
      policyId: 'FUP_Policy_Create_CHF',
      refPccRules: ['FUP_Pcc_Rule_Normal_CHF'],
      refSessionRules: ['FUP_Session_Rule_Normal_CHF'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'FUP_Duration_Policy_Update',
      description: '',
      policyId: 'FUP_Duration_Policy_Update',
      refPccRules: ['FUP_Duration_Pcc_Rule_Normal'],
      refSessionRules: ['FUP_Duration_Session_Rule_Level_Exhausted'],
      trigger: 'US_RE'
    },
    {
      _id: 'FUP_Duration_Policy_Create',
      description: '',
      policyId: 'FUP_Duration_Policy_Create',
      refPccRules: ['FUP_Duration_Pcc_Rule_Normal'],
      refSessionRules: [
        'FUP_Duration_Session_Rule_Normal',
        'FUP_Duration_Session_Rule_Level_Exhausted'
      ],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'Predefined_Policy',
      description: '',
      policyId: 'Predefined_Policy',
      refPccRules: ['Predefined_Pcc_Rule'],
      refSessionRules: [],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    },
    {
      _id: 'Baicell_Policy',
      description: '',
      policyId: 'Baicell_Policy',
      refPccRules: ['Baicell_Pcc_Rule'],
      refSessionRules: ['Baicell_Session_Rule'],
      trigger: 'SM_POLICY_CONTROL_CREATE'
    }
  ];

  var qosData = [
    {
      _id: '10M_QoS',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10 Mbps',
      maxbrUl: '10 Mbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: '10M_QoS',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: '128K_QoS',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'NOT_PREEMPTABLE',
        priorityLevel: NumberInt(3)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '3000000 Kbps',
      maxbrUl: '1000000 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: '128K_QoS',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: '512K_QoS',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '512 Kbps',
      maxbrUl: '512 Kbps',
      priorityLevel: NumberInt(1),
      qnc: false,
      qosId: '512K_QoS',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'Multi_Player_Game_QoS',
      '5qi': NumberInt(3),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '40 Mbps',
      maxbrUl: '40 Mbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'Multi_Player_Game_QoS',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'FUP_QoS_Normal',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10 Mbps',
      maxbrUl: '10 Mbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'FUP_QoS_Normal',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'IMS_Voice_Data_Audio_Qos',
      '5qi': NumberInt(1),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '88 Kbps',
      gbrUl: '88 Kbps',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '88 Kbps',
      maxbrUl: '88 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'IMS_Voice_Data_Audio_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'IMS_Voice_Signalling_Qos',
      '5qi': NumberInt(5),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10240 Kbps',
      maxbrUl: '10240 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'IMS_Voice_Signalling_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'IMS_Voice_Data_Video_Qos',
      '5qi': 2.0,
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: 1.0
      },
      averWindow: 0.0,
      defQosFlowIndication: false,
      gbrDl: '166 Kbps',
      gbrUl: '166 Kbps',
      maxDataBurstVol: 0.0,
      maxPacketLossRateDl: 0.0,
      maxPacketLossRateUl: 0.0,
      maxbrDl: '166 Kbps',
      maxbrUl: '166 Kbps',
      priorityLevel: 0.0,
      qnc: false,
      qosId: 'IMS_Voice_Data_Video_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'NetflixQoS',
      '5qi': 2.0,
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: 1.0
      },
      averWindow: 0.0,
      defQosFlowIndication: false,
      maxDataBurstVol: 0.0,
      maxPacketLossRateDl: 0.0,
      maxPacketLossRateUl: 0.0,
      maxbrDl: '950 Kbps',
      maxbrUl: '950 Kbps',
      priorityLevel: 1.0,
      qnc: false,
      qosId: 'NetflixQoS',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'FUP_QoS_Level_Exhausted',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '128 Kbps',
      maxbrUl: '128 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'FUP_QoS_Level_Exhausted',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'UEIRM_QoS_5QI5',
      '5qi': NumberInt(5),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '512 Kbps',
      maxbrUl: '512 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'UEIRM_QoS_5QI5',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'AF_DATA_Data_Qos',
      '5qi': NumberInt(3),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '88 Kbps',
      maxbrUl: '88 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'AF_DATA_Data_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'AF_Data_Signalling_Qos',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10240 Kbps',
      maxbrUl: '10240 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'AF_Data_Signalling_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'FUP_SDF_Vol_QoS_Normal',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10 Mbps',
      maxbrUl: '10 Mbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'FUP_SDF_Vol_QoS_Normal',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'FUP_SDF_Vol_QoS_Exhausted',
      '5qi': NumberInt(9),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '128 Kbps',
      maxbrUl: '128 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'FUP_SDF_Vol_QoS_Exhausted',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'IMS_Emergency_Qos',
      '5qi': NumberInt(5),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10240 Kbps',
      maxbrUl: '10240 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'IMS_Emergency_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'AF_TEXT_Data_Qos',
      '5qi': NumberInt(3),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: false,
      gbrDl: '88 Kbps',
      gbrUl: '88 Kbps',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '88 Kbps',
      maxbrUl: '88 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'AF_TEXT_Data_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'IMS_AAR_Reg_Signalling_Qos',
      '5qi': NumberInt(5),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(1)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '10240 Kbps',
      maxbrUl: '10240 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'IMS_AAR_Reg_Signalling_Qos',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    },
    {
      _id: 'Baicell_QoS',
      '5qi': NumberInt(3),
      arp: {
        preemptCap: 'MAY_PREEMPT',
        preemptVuln: 'PREEMPTABLE',
        priorityLevel: NumberInt(2)
      },
      averWindow: NumberInt(0),
      defQosFlowIndication: true,
      gbrDl: '',
      gbrUl: '',
      maxDataBurstVol: NumberInt(0),
      maxPacketLossRateDl: NumberInt(0),
      maxPacketLossRateUl: NumberInt(0),
      maxbrDl: '128 Kbps',
      maxbrUl: '128 Kbps',
      priorityLevel: NumberInt(0),
      qnc: false,
      qosId: 'Baicell_QoS',
      reflectiveQos: false,
      sharingKeyDl: '',
      sharingKeyUl: ''
    }
  ];

  var rfspPolicies = [
    {
      _id: 'RfspIndexPolicyDefault',
      rfspPolicyId: 'RfspIndexPolicyDefault',
      trigger: ['RFSP_CH', 'LOC_CH', 'AM_POLICY_CONTROL_CREATE'],
      rfspIndex: 1.0,
      precedence: 2.0
    },
    {
      _id: 'RfspIndexPolicyUpdate',
      rfspPolicyId: 'RfspIndexPolicyUpdate',
      trigger: ['RFSP_CH', 'LOC_CH', 'AM_POLICY_CONTROL_CREATE'],
      rfspIndex: 2.0,
      precedence: 1.0
    }
  ];

  var smsConfigs = [
    {
      _id: 'SMS',
      afSuppFeat: {
        influenceOnTrafficRouting: true,
        mediaComponentVersioning: true,
        sponsoredConnectivity: true
      },
      chfHost: '10.10.31.120',
      chfPort: NumberInt(25100),
      chfSubscriptionSupport: false,
      chfSuppFeat: {
        subscriptionExpirationTimeControl: true
      },
      policyControlRequestTriggers: [
        'PLMN_CH',
        'RES_MO_RE',
        'QOS_NOTIF',
        'UE_IP_CH'
      ],
      smfSuppFeat: {
        '3GPPPSDataOff': false,
        PCSCFRestorationEnhancement: true,
        RANNASCause: true,
        RANSupportInfo: true,
        adc: false,
        netLoc: true,
        policyUpdateWhenUESuspends: false,
        pra: true,
        provAFSignalFlow: true,
        resShare: true,
        ruleVersioning: true,
        sessionRuleErrorHandling: true,
        sponsoredConnectivity: true,
        tsc: true,
        umc: true
      },
      udrSubscriptionSupport: true,
      udrSuppFeat: {
        domainNameProtocol: true,
        resourceNotificationExposureDataFix: true,
        resourceRemovalNotificationPolicyData: true
      },
      udrSmDataQuerySupport: false,
      udrTrafficInfluenceSupport: false
    }
  ];

  var servAreaResPolicies = [
    {
      _id: 'ServAreaResNotAllowed',
      areas: [
        {
          areaCodes: '',
          tacs: ['000005']
        }
      ],
      conditionGroup: ['NotAllowedCG'],
      maxNumOfTAsForNotAllowedAreas: NumberInt(1),
      precedence: NumberInt(1),
      restrictionType: 'NOT_ALLOWED_AREAS',
      servAreaResId: 'ServAreaResNotAllowed',
      trigger: ['LOC_CH', 'AM_POLICY_CONTROL_CREATE']
    },
    {
      _id: 'ServAreaResNotAllowedForUpdate',
      areas: [
        {
          areaCodes: '',
          tacs: ['000005', '000006']
        }
      ],
      conditionGroup: ['NotAllowedCGForUpdate'],
      maxNumOfTAsForNotAllowedAreas: NumberInt(1),
      precedence: NumberInt(1),
      restrictionType: 'NOT_ALLOWED_AREAS',
      servAreaResId: 'ServAreaResNotAllowedForUpdate',
      trigger: ['SERV_AREA_CH', 'LOC_CH']
    },
    {
      _id: 'DefaultPolicy',
      areas: [
        {
          areaCodes: '',
          tacs: ['000002', '000001']
        }
      ],
      conditionGroup: [],
      maxNumOfTAs: 1,
      precedence: 2,
      restrictionType: 'ALLOWED_AREAS',
      servAreaResId: 'DefaultPolicy',
      trigger: ['LOC_CH', 'AM_POLICY_CONTROL_CREATE']
    }
  ];

  var services = [
    {
      _id: 'QoS_10M_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(1),
      refPolicy: ['QoS_10M_Policy'],
      serviceId: 'QoS_10M_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'QoS_128K_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(15),
      refPolicy: ['QoS_128K_Policy'],
      serviceId: 'QoS_128K_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'QoS_512K_Service',
      appId: '',
      description: 'dnn.test1.com',
      dnn: '',
      precedence: NumberInt(10),
      refPolicy: ['QoS_512K_Policy'],
      serviceId: 'QoS_512K_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'UEIRM_Service',
      appId: '',
      description: '',
      dnn: 'dnn.test1.com',
      precedence: NumberInt(8),
      refPolicy: ['UEIRM_Policy'],
      serviceId: 'UEIRM_Service',
      refUmData: [],
      initiatedBy: ['UE_INITIATED_RESOURCE']
    },
    {
      _id: 'FUP_Service',
      appId: '',
      description: '',
      dnn: 'dnn.test1.com',
      precedence: NumberInt(2),
      refPolicy: ['FUP_Policy_Update', 'FUP_Policy_Create'],
      serviceId: 'FUP_Service',
      refUmData: ['FUP_Default_Um'],
      initiatedBy: ['SMF']
    },
    {
      _id: 'IMS_Voice_Signalling_Service',
      appId: '',
      description: '',
      dnn: 'ims',
      precedence: NumberInt(3),
      refPolicy: ['IMS_Voice_Signalling_Policy'],
      serviceId: 'IMS_Voice_Signalling_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'IMS_Voice_Data_Service',
      appId: '',
      description: '',
      dnn: 'ims',
      precedence: NumberInt(4),
      refPolicy: ['IMS_Voice_Data_Policy'],
      serviceId: 'IMS_Voice_Data_Service',
      initiatedBy: ['AF']
    },
    {
      _id: 'NetflixService',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(6),
      refPolicy: ['NetflixPolicy'],
      serviceId: 'NetflixService',
      initiatedBy: ['SMF', 'AF']
    },
    {
      _id: 'AF_DATA_Signalling_Service',
      appId: '',
      description: '',
      dnn: 'dnn.app1.com',
      precedence: NumberInt(8),
      refPolicy: ['AF_Data_Signalling_Policy'],
      serviceId: 'AF_DATA_Signalling_Service',
      initiatedBy: ['AF']
    },
    {
      _id: 'AF_DATA_Data_Service',
      appId: '',
      description: '',
      dnn: 'dnn.test1.com',
      precedence: NumberInt(9),
      refPolicy: ['AF_DATA_Data_Policy'],
      serviceId: 'AF_DATA_Data_Service',
      initiatedBy: ['AF']
    },
    {
      _id: 'Multi_Player_Game_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(0),
      refPolicy: ['Multi_Player_Game_Policy'],
      serviceId: 'Multi_Player_Game_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'FUP_SDF_Vol_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(7),
      refPolicy: ['FUP_SDF_Vol_Policy_Create', 'FUP_SDF_Vol_Policy_Update'],
      serviceId: 'FUP_SDF_Vol_Service',
      refUmData: ['FUP_SDF_Vol_UmData'],
      initiatedBy: ['SMF']
    },
    {
      _id: 'IMS_Emergency_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(1),
      refPolicy: ['IMS_Emergency_Policy'],
      serviceId: 'IMS_Emergency_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'IMS_Emergency_Data_Service',
      appId: '',
      description: '',
      dnn: 'dnn.emergency.com',
      precedence: NumberInt(4),
      refPolicy: ['IMS_Emergency_Data_Policy'],
      serviceId: 'IMS_Emergency_Data_Service',
      initiatedBy: ['AF']
    },
    {
      _id: 'AF_TEXT_Data_Service',
      appId: '',
      description: '',
      dnn: 'dnn.test1.com',
      precedence: NumberInt(9),
      refPolicy: ['AF_TEXT_Data_Policy'],
      serviceId: 'AF_TEXT_Data_Service',
      initiatedBy: ['AF']
    },
    {
      _id: 'FUP_Service_CHF',
      appId: '',
      description: '',
      dnn: 'dnn.test1.com',
      precedence: NumberInt(2),
      refPolicy: ['FUP_Policy_Create_CHF'],
      serviceId: 'FUP_Service_CHF',
      refUmData: ['FUP_Default_Um_CHF'],
      initiatedBy: 'SMF'
    },
    {
      _id: 'Service_Daily',
      appId: '',
      dnn: 'dnn.test1.com',
      initiatedBy: [],
      refPolicy: ['FUP_Policy_Create'],
      refUmData: ['FUP_Daily'],
      serviceId: 'Service_Daily'
    },
    {
      _id: 'Service_onetime',
      appId: '',
      dnn: 'dnn.test1.com',
      initiatedBy: [],
      refPolicy: ['FUP_Policy_Create'],
      refUmData: ['FUP_OneTime'],
      serviceId: 'Service_onetime'
    },
    {
      _id: 'FUP_Duration_Service',
      appId: '',
      description: '',
      dnn: 'dnn.test1.com',
      precedence: NumberInt(2),
      refPolicy: ['FUP_Duration_Policy_Update', 'FUP_Duration_Policy_Create'],
      serviceId: 'FUP_Duration_Service',
      refUmData: ['FUP_Duration_Default_Um'],
      initiatedBy: ['SMF']
    },
    {
      _id: 'Predefined_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(88),
      refPolicy: ['Predefined_Policy'],
      serviceId: 'Predefined_Service',
      initiatedBy: ['SMF']
    },
    {
      _id: 'Baicell_Service',
      appId: '',
      description: '',
      dnn: '',
      precedence: NumberInt(3),
      refPolicy: ['Baicell_Policy'],
      serviceId: 'Baicell_Service',
      initiatedBy: ['SMF']
    }
  ];

  var serviceConflictGroups = [
    {
      _id: 'SMOpsSCG',
      description: '',
      operation: 'REPLACE',
      refServices: [
        'QoS_128K_Service',
        'QoS_512K_Service',
        'QoS_10M_Service',
        'FUP_Service',
        'UEIRM_Service',
        'FUP_Service_CHF'
      ],
      serviceConflictGroupId: 'SMOpsSCG',
      type: 'ACTIVATE'
    },
    {
      _id: 'AFPDUSessionSCG',
      description: '',
      operation: 'REPLACE',
      refServices: [
        'QoS_128K_Service',
        'IMS_Voice_Signalling_Service',
        'AF_DATA_Signalling_Service',
        'IMS_Voice_Data_Service',
        'Netflix',
        'AF_DATA_Data_Service',
        'IMS_Emergency_Service',
        'IMS_Emergency_Data_Service'
      ],
      serviceConflictGroupId: 'AFPDUSessionSCG',
      type: 'ACTIVATE'
    }
  ];

  var serviceFlows = [
    {
      _id: 'ANY_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'AnyFlowDescriptionDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(32),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'ANY',
            sourceIpAddress: '',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(32)
          },
          flowDirection: 'BIDIRECTIONAL',
          flowLabel: '',
          packetFilterId: 'ANY_Service_FlowDL',
          packetFilterUsage: true,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'ANY_Service_Flow'
    },
    {
      _id: 'Ethernet_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: 'ethernetFlowDescription',
            destMacAddr: '',
            ethType: '0800',
            fDir: 'DOWNLINK',
            flowDescription: {
              destIpAddress: '4ffe:1900:4545:3:200:e8ff:fe21:67cf',
              destIpMode: 'ASSIGNEDIP',
              destIpPrefixLength: NumberInt(32),
              maxDestPort1: NumberInt(6000),
              maxDestPort2: NumberInt(7000),
              maxSourcePort1: NumberInt(3000),
              maxSourcePort2: NumberInt(4000),
              minDestPort1: NumberInt(1000),
              minDestPort2: NumberInt(2000),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: 'IPV6',
              sourceIpAddress: '3ffe:1900:4545:3:200:f8ff:fe21:67cf',
              sourceIpMode: 'ASSIGNEDIP',
              sourceIpPrefixLength: NumberInt(32)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: '',
            destIpAddress: '',
            destIpMode: '',
            destIpPrefixLength: NumberInt(0),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: '',
            sourceIpAddress: '',
            sourceIpMode: '',
            sourceIpPrefixLength: NumberInt(0)
          },
          flowDirection: '',
          flowLabel: '',
          name: 'Ethernet_Service_Flow',
          packetFilterId: '',
          packetFilterUsage: false,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'Ethernet_Service_Flow'
    },
    {
      _id: 'IPV6_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'IPV6_Service_FlowDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(0),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'IPV4',
            sourceIpAddress: '',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(0)
          },
          flowDirection: 'BIDIRECTIONAL',
          flowLabel: '',
          packetFilterId: '32',
          packetFilterUsage: false,
          spi: '',
          tosTrafficClass: '32'
        },
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'IPV6_Service_FlowDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(0),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'IPV4',
            sourceIpAddress: '',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(0)
          },
          flowDirection: 'UPLINK',
          flowLabel: '',
          packetFilterId: '31',
          packetFilterUsage: false,
          spi: '',
          tosTrafficClass: '32'
        }
      ],
      serviceFlowId: 'IPV6_Service_Flow'
    },
    {
      _id: 'ANY_IMS_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'AnyImsFlowDescriptionDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(32),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'ANY',
            sourceIpAddress: '',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(32)
          },
          flowDirection: 'BIDIRECTIONAL',
          flowLabel: '',
          packetFilterId: 'ANY_IMS_Service_FlowDL',
          packetFilterUsage: true,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'ANY_IMS_Service_Flow'
    },
    {
      _id: 'ANY_UDP_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'AnyUdpFlowDescriptionDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(32),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'UDP',
            sourceIpAddress: '',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(32)
          },
          flowDirection: 'DOWNLINK',
          flowLabel: '',
          packetFilterId: 'ANY_UDP_Service_FlowDL',
          packetFilterUsage: true,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'ANY_UDP_Service_Flow'
    },
    {
      _id: 'SDF_Vol_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'SDFVolServiceFlowDescriptionDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(32),
            maxDestPort1: NumberInt(2002),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(2003),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'ANY',
            sourceIpAddress: '10.10.32.230',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(32)
          },
          flowDirection: 'BIDIRECTIONAL',
          flowLabel: '',
          packetFilterId: 'SDF_Vol_Service_FlowDL',
          packetFilterUsage: true,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'SDF_Vol_Service_Flow'
    },
    {
      _id: 'FUP_SDF_Vol_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'SDFVolServiceFlowDescriptionDL',
            destIpAddress: '172.30.0.47',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(32),
            maxDestPort1: NumberInt(2002),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(2003),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'UDP',
            sourceIpAddress: '10.10.22.240',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(32)
          },
          flowDirection: 'DOWNLINK',
          flowLabel: '',
          packetFilterId: 'FUP_SDF_Vol_Service_Flow',
          packetFilterUsage: true,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'FUP_SDF_Vol_Service_Flow'
    },
    {
      _id: 'ANY_IMS_AAR_Reg_Service_Flow',
      description: '',
      flowInfos: [
        {
          ethernetFlowDescription: {
            name: '',
            destMacAddr: '',
            ethType: '',
            fDir: '',
            flowDescription: {
              name: '',
              destIpAddress: '',
              destIpMode: '',
              destIpPrefixLength: NumberInt(0),
              maxDestPort1: NumberInt(0),
              maxDestPort2: NumberInt(0),
              maxSourcePort1: NumberInt(0),
              maxSourcePort2: NumberInt(0),
              minDestPort1: NumberInt(0),
              minDestPort2: NumberInt(0),
              minSourcePort1: NumberInt(0),
              minSourcePort2: NumberInt(0),
              protocol: '',
              sourceIpAddress: '',
              sourceIpMode: '',
              sourceIpPrefixLength: NumberInt(0)
            },
            sourceMacAddr: '',
            vlanTags: []
          },
          flowDescription: {
            name: 'AnyImsAARRegFlowDescriptionDL',
            destIpAddress: '',
            destIpMode: 'ASSIGNEDIP',
            destIpPrefixLength: NumberInt(32),
            maxDestPort1: NumberInt(0),
            maxDestPort2: NumberInt(0),
            maxSourcePort1: NumberInt(0),
            maxSourcePort2: NumberInt(0),
            minDestPort1: NumberInt(0),
            minDestPort2: NumberInt(0),
            minSourcePort1: NumberInt(0),
            minSourcePort2: NumberInt(0),
            protocol: 'ANY',
            sourceIpAddress: '',
            sourceIpMode: 'ASSIGNEDIP',
            sourceIpPrefixLength: NumberInt(32)
          },
          flowDirection: 'DOWNLINK',
          flowLabel: '',
          packetFilterId: 'ANY_IMS_AAR_Reg_Service_FlowDL',
          packetFilterUsage: false,
          spi: '',
          tosTrafficClass: ''
        }
      ],
      serviceFlowId: 'ANY_IMS_AAR_Reg_Service_Flow'
    }
  ];

  var sessionRules = [
    {
      _id: 'QoS_10M_Session_Rule',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10 Mbps',
        uplink: '10 Mbps'
      },
      conditionGroup: ['DNN_Internet_CG'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'QoS_10M_Session_Rule',
      sessionRuleOperation: ''
    },
    {
      _id: 'QoS_128K_Session_Rule',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'NOT_PREEMPTABLE',
          priorityLevel: NumberInt(3)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '3000000 Kbps',
        uplink: '1000000 Kbps'
      },
      conditionGroup: ['DNN_CG'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'QoS_128K_Session_Rule',
      sessionRuleOperation: ''
    },
    {
      _id: 'QoS_512K_Session_Rule',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(10)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '512 Kbps',
        uplink: '512 Kbps'
      },
      conditionGroup: ['DNN_Internet_CG'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'QoS_512K_Session_Rule',
      sessionRuleOperation: ''
    },
    {
      _id: 'FUP_Session_Rule_Normal',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'MAY_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10 Mbps',
        uplink: '10 Mbps'
      },
      conditionGroup: ['FUP_CG_Normal'],
      description: '',
      refCondData: '',
      refUmData: 'FUP_Default_Um',
      sessionRuleId: 'FUP_Session_Rule_Normal',
      sessionRuleOperation: 'INSTALLRULE'
    },
    {
      _id: 'FUP_Session_Rule_Level_Exhausted',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'MAY_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '128 Kbps',
        uplink: '128 Kbps'
      },
      conditionGroup: ['FUP_CG_Level_Exhausted'],
      description: '',
      refCondData: '',
      refUmData: 'FUP_Default_Um',
      sessionRuleId: 'FUP_Session_Rule_Level_Exhausted',
      sessionRuleOperation: 'TERMINATESESSION'
    },
    {
      _id: 'IMS_Voice_Signalling_Session_Rule',
      authDefQos: {
        '5qi': NumberInt(5),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'NOT_PREEMPTABLE',
          priorityLevel: NumberInt(3)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '3000000 Kbps',
        uplink: '3000000 Kbps'
      },
      conditionGroup: ['CG_Default_IMS_DNN'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'IMS_Voice_Signalling_Session_Rule',
      sessionRuleOperation: ''
    },
    {
      _id: 'FUP_Session_Rule_Normal_Duration',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'MAY_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10 Mbps',
        uplink: '10 Mbps'
      },
      conditionGroup: ['CG_Level_Normal'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'FUP_Session_Rule_Normal_Duration',
      sessionRuleOperation: 'INSTALLRULE'
    },
    {
      _id: 'FUP_Session_Rule_Level_A_Duration',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'MAY_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '8 Mbps',
        uplink: '8 Mbps'
      },
      conditionGroup: ['CG_Level_A'],
      description: '',
      refCondData: '',
      refUmData: 'FUP_Default_Um_Duration',
      sessionRuleId: 'FUP_Session_Rule_Level_A_Duration',
      sessionRuleOperation: 'CHANGERULE'
    },
    {
      _id: 'FUP_Session_Rule_Level_Exhausted_Duration',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: '',
          preemptVuln: '',
          priorityLevel: NumberInt(0)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '128 Kbps',
        uplink: '128 Kbps'
      },
      conditionGroup: ['CG_Level_Exhausted'],
      description: '',
      refCondData: '',
      refUmData: 'FUP_Default_Um_Duration',
      sessionRuleId: 'FUP_Session_Rule_Level_Exhausted_Duration',
      sessionRuleOperation: 'CHANGERULE'
    },
    {
      _id: 'AF_Data_Signalling_Session_Rule',
      authDefQos: {
        '5qi': NumberInt(5),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10240 Kbps',
        uplink: '10240 Kbps'
      },
      conditionGroup: ['CG_Signaling_AF_App1_DNN'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'AF_Data_Signalling_Session_Rule',
      sessionRuleOperation: ''
    },
    {
      _id: 'IMS_Emergency_SessionRule',
      authDefQos: {
        '5qi': NumberInt(5),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10240 Kbps',
        uplink: '10240 Kbps'
      },
      conditionGroup: [],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'IMS_Emergency_SessionRule',
      sessionRuleOperation: ''
    },
    {
      _id: 'FUP_Session_Rule_Normal_CHF',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'MAY_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10 Mbps',
        uplink: '10 Mbps'
      },
      conditionGroup: ['FUP_CG_Normal'],
      description: '',
      refCondData: '',
      refUmData: 'FUP1',
      sessionRuleId: 'FUP_Session_Rule_Normal_CHF',
      sessionRuleOperation: 'INSTALLRULE'
    },
    {
      _id: 'FUP_Duration_Session_Rule_Normal',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: 'MAY_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '10 Mbps',
        uplink: '10 Mbps'
      },
      conditionGroup: ['CG_Level_Normal'],
      description: '',
      refCondData: '',
      refUmData: 'FUP_Duration_Default_Um',
      sessionRuleId: 'FUP_Duration_Session_Rule_Normal',
      sessionRuleOperation: 'INSTALLRULE'
    },
    {
      _id: 'FUP_Duration_Session_Rule_Level_Exhausted',
      authDefQos: {
        '5qi': NumberInt(9),
        arp: {
          preemptCap: '',
          preemptVuln: '',
          priorityLevel: NumberInt(0)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '128 Kbps',
        uplink: '128 Kbps'
      },
      conditionGroup: ['CG_Level_Exhausted'],
      description: '',
      refCondData: '',
      refUmData: 'FUP_Duration_Default_Um',
      sessionRuleId: 'FUP_Duration_Session_Rule_Level_Exhausted',
      sessionRuleOperation: 'TERMINATESESSION'
    },
    {
      _id: 'Baicell_Session_Rule',
      authDefQos: {
        '5qi': NumberInt(3),
        arp: {
          preemptCap: 'NOT_PREEMPT',
          preemptVuln: 'PREEMPTABLE',
          priorityLevel: NumberInt(1)
        },
        averWindow: NumberInt(0),
        maxDataBurstVol: NumberInt(0),
        priorityLevel: NumberInt(0)
      },
      authSessAmbr: {
        downlink: '128 Kbps',
        uplink: '128 Kbps'
      },
      conditionGroup: ['Baicell_CG'],
      description: '',
      refCondData: '',
      refUmData: '',
      sessionRuleId: 'Baicell_Session_Rule',
      sessionRuleOperation: ''
    }
  ];

  var slices = [
    {
      _id: '1',
      allowedServices: [],
      description: '',
      sliceId: '1',
      snssai: {
        sst: NumberInt(1)
      }
    },
    {
      _id: '2',
      allowedServices: [],
      description: '',
      sliceId: '2',
      snssai: {
        sst: NumberInt(2)
      }
    }
  ];

  var smConditionGroups = [
    {
      _id: 'DNN_IMS_CG',
      cgId: 'DNN_IMS_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_IMS',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.ims.com',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'DNN_Internet_CG',
      cgId: 'DNN_Internet_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_INTERNET',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test1.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Test2',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test2.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Test3',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test3.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Baicell',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'ims',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_emergency',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.emergency.com',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'DNN_Internet_EUTRA_CG',
      cgId: 'DNN_Internet_EUTRA_CG',
      condition: [
        {
          Description: '',
          Name: 'RAT_TYPE_EUTRA',
          ObjectAttribute: 'ratType',
          Operator: 'Equal',
          RightValue: 'EUTRA',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_INTERNET',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'internet',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'DNN_Internet_NR_CG',
      cgId: 'DNN_Internet_NR_CG',
      condition: [
        {
          Description: '',
          Name: 'RAT_TYPE_NR',
          ObjectAttribute: 'ratType',
          Operator: 'Equal',
          RightValue: 'NR',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_INTERNET',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'internet',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'DNN_Turkcell_MIoT_CG',
      cgId: 'DNN_Turkcell_MIoT_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_INTERNET',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'turkcell.mIoT',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'UEIRM_CG_5QI',
      cgId: 'UEIRM_CG_5QI',
      condition: [
        {
          Description: '',
          Name: 'UEIRM_CG_5QI',
          ObjectAttribute: '5qi',
          Operator: 'EQUAL',
          RightValue: NumberInt(9),
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'FUP_CG_Normal',
      cgId: 'FUP_CG_Normal',
      condition: [
        {
          Description: '',
          Name: 'FUP_CG_Normal',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_NORMAL',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'FUP_CG_Level_Exhausted',
      cgId: 'FUP_CG_Level_Exhausted',
      condition: [
        {
          Description: '',
          Name: 'FUP_CG_Level_Exhausted',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_EXHAUSTED',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'ETHERNET_PDU_TYPE_CG',
      cgId: 'ETHERNET_PDU_TYPE_CG',
      condition: [
        {
          Description: '',
          Name: 'PDU_TYPE_ETHERNET',
          ObjectAttribute: 'pduSessionType',
          Operator: 'Equal',
          RightValue: 'ETHERNET',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'PDU_TYPE_IPV6',
          ObjectAttribute: 'pduSessionType',
          Operator: 'Equal',
          RightValue: 'IPV6',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'IPV6_PDU_TYPE_CG',
      cgId: 'IPV6_PDU_TYPE_CG',
      condition: [
        {
          Description: '',
          Name: 'PDU_TYPE_IPV6',
          ObjectAttribute: 'pduSessionType',
          Operator: 'Equal',
          RightValue: 'IPV6',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'CG_Audio_Normal',
      cgId: 'CG_Audio_Normal',
      condition: [
        {
          Description: 'Condition that mediaType is equal to AUDIO',
          Name: 'IMS_Condition_Audio',
          ObjectAttribute: 'appSessionMediaType',
          Operator: 'Equal',
          RightValue: 'AUDIO',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'CG_Default_Signalling',
      cgId: 'CG_Default_Signalling',
      condition: [
        {
          Description: 'Condition that media component number is equal to 0',
          Name: 'Signalling_Condition_Default',
          ObjectAttribute: 'appSessionMedCompN',
          Operator: 'Equal',
          RightValue: 'ims',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'CG_Default_IMS_DNN',
      cgId: 'CG_Default_IMS_DNN',
      relation: 'AND',
      condition: [
        {
          Name: 'Default_Qos_Condition_Default',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValueType: 'Value',
          RightValue: 'ims',
          Description: 'Condition that media component number is equal to 0'
        }
      ]
    },
    {
      _id: 'CG_Video_Normal',
      cgId: 'CG_Video_Normal',
      condition: [
        {
          Description: 'Condition that mediaType is equal to VIDEO',
          Name: 'IMS_Condition_Video',
          ObjectAttribute: 'appSessionMediaType',
          Operator: 'Equal',
          RightValue: 'VIDEO',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'UEIRM_CG_5QI5',
      cgId: 'UEIRM_CG_5QI5',
      condition: [
        {
          Description: '',
          Name: 'UEIRM_CG_5QI5',
          ObjectAttribute: '5qi',
          Operator: 'EQUAL',
          RightValue: NumberInt(5),
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'CG_Level_Normal',
      cgId: 'CG_Level_Normal',
      condition: [
        {
          Description: '',
          Name: 'CG_Level_Normal',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_NORMAL',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'CG_Level_A',
      cgId: 'CG_Level_A',
      condition: [
        {
          Description: '',
          Name: 'CG_Level_A',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_A',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'CG_Level_Exhausted',
      cgId: 'CG_Level_Exhausted',
      condition: [
        {
          Description: '',
          Name: 'CG_Level_Exhausted',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_EXHAUSTED',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'DNN_CG',
      cgId: 'DNN_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_internet',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'internet',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'ladNN_internet',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.ladn0.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Ims',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'ims',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Test1',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test1.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Default',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'default',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Test2',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test2.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_IMS',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.ims.com',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'CG_MedType_DATA',
      cgId: 'CG_MedType_DATA',
      condition: [
        {
          Description: 'Condition that mediaType is equal to DATA',
          Name: 'AF_Condition_DATA',
          ObjectAttribute: 'appSessionMediaType',
          Operator: 'Equal',
          RightValue: 'DATA',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'CG_Signaling_AF_App1_DNN',
      cgId: 'CG_Signaling_AF_App1_DNN',
      relation: 'AND',
      condition: [
        {
          Name: 'Default_Qos_Condition_Default',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValueType: 'Value',
          RightValue: 'dnn.app1.com',
          Description: ''
        }
      ]
    },
    {
      _id: 'CG_IMS_Reg_AAR',
      cgId: 'CG_IMS_Reg_AAR',
      condition: [
        {
          Name: 'IMS_Reg_Media_Number',
          ObjectAttribute: 'appSessionMedCompN',
          Operator: 'Equal',
          RightValue: NumberInt(0),
          RightValueType: 'Value'
        },
        {
          Name: 'IMS_Reg_Flow_Usage',
          ObjectAttribute: 'appSessionFlowUsage',
          Operator: 'Equal',
          RightValue: 'AF_SIGNALLING',
          RightValueType: 'Value'
        }
      ],
      description:
        'Condition group to check if AAR is a request for IMS registration',
      relation: 'AND'
    },
    {
      _id: 'FUP_SDF_DNN_CG',
      cgId: 'FUP_SDF_DNN_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_Test1',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test1.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Test2',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test2.com',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'Default_DNN_CG',
      cgId: 'Default_DNN_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_Test1',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test1.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_Test2',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.test2.com',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'DNN_IMS',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'dnn.ims.com',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'FUP_SDF_Vol_Normal_CG',
      cgId: 'FUP_SDF_Vol_Normal_CG',
      condition: [
        {
          Description: '',
          Name: 'FUP_SDF_Vol_Normal_CG',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_NORMAL',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'FUP_SDF_Vol_Exhausted_CG',
      cgId: 'FUP_SDF_Vol_Exhausted_CG',
      condition: [
        {
          Description: '',
          Name: 'FUP_SDF_Vol_Exhausted_CG',
          ObjectAttribute: 'umUsageLimitLevel',
          Operator: 'EQUAL',
          RightValue: 'LEVEL_EXHAUSTED',
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    },
    {
      _id: 'CG_MedType_TEXT',
      cgId: 'CG_MedType_TEXT',
      condition: [
        {
          Description: 'Condition that mediaType is equal to TEXT',
          Name: 'AF_Condition_TEXT',
          ObjectAttribute: 'appSessionMediaType',
          Operator: 'Equal',
          RightValue: 'TEXT',
          RightValueType: 'Value'
        }
      ],
      description: '',
      relation: 'AND'
    },
    {
      _id: 'Baicell_CG',
      cgId: 'Baicell_CG',
      condition: [
        {
          Description: '',
          Name: 'DNN_Default',
          ObjectAttribute: 'dnn',
          Operator: 'Equal',
          RightValue: 'default',
          RightValueType: 'Value'
        },
        {
          Description: '',
          Name: 'Baicell_CG_5QI',
          ObjectAttribute: '5qi',
          Operator: 'EQUAL',
          RightValue: NumberInt(3),
          RightValueType: ''
        }
      ],
      description: '',
      relation: 'OR'
    }
  ];

  var subscriberGroups = [
    {
      _id: 'IMS_DNN_Sub_Group',
      description: '',
      dnn: 'ims',
      operation: 'DEFAULT',
      precedence: NumberInt(1),
      refServices: ['IMS_Voice_Signalling_Service', 'IMS_Voice_Data_Service'],
      snssai: {
        sst: NumberInt(1)
      },
      subscCat: '',
      subscriberGroupId: 'IMS_DNN_Sub_Group'
    },
    {
      _id: 'Default_Subcriber_Group',
      description:
        'Subscriber Group for all type Subscribers (Undefined, Defined etc.)',
      dnn: '',
      operation: 'DEFAULT',
      precedence: NumberInt(10),
      refServices: [
        'QoS_128K_Service',
        'AF_DATA_Data_Service',
        'AF_TEXT_Data_Service'
      ],
      snssai: {
        sst: NumberInt(0)
      },
      subscCat: '',
      subscriberGroupId: 'Default_Subcriber_Group'
    },
    {
      _id: 'IMS_Emergency_Sub_Group',
      description: '',
      dnn: 'dnn.emergency.com',
      operation: 'DEFAULT',
      precedence: NumberInt(1),
      refServices: ['IMS_Emergency_Service', 'IMS_Emergency_Data_Service'],
      snssai: {
        sst: NumberInt(0)
      },
      subscCat: '',
      subscriberGroupId: 'IMS_Emergency_Sub_Group'
    }
  ];

  var trafficControlData = [
    {
      _id: 'Default_TC',
      flowStatus: 'ENABLED',
      muteNotif: false,
      redirectInfo: {
        redirectAddressType: '',
        redirectEnabled: false,
        redirectServerAddress: ''
      },
      routeToLocs: [],
      tcId: 'Default_TC',
      trafficSteeringPolIdDl: '',
      trafficSteeringPolIdUl: '',
      upPathChgEvent: {
        dnaiChgType: '',
        notifCorreId: '',
        notificationUri: ''
      }
    },
    {
      _id: 'Default_TC_AUDIO',
      flowStatus: 'ENABLED',
      muteNotif: false,
      redirectInfo: {
        redirectAddressType: '',
        redirectEnabled: false,
        redirectServerAddress: ''
      },
      routeToLocs: [],
      tcId: 'Default_TC_AUDIO',
      trafficSteeringPolIdDl: '',
      trafficSteeringPolIdUl: '',
      upPathChgEvent: {
        dnaiChgType: '',
        notifCorreId: '',
        notificationUri: ''
      }
    },
    {
      _id: 'Default_TC_TEXT',
      flowStatus: 'ENABLED',
      muteNotif: false,
      redirectInfo: {
        redirectAddressType: '',
        redirectEnabled: false,
        redirectServerAddress: ''
      },
      routeToLocs: [],
      tcId: 'Default_TC_TEXT',
      trafficSteeringPolIdDl: '',
      trafficSteeringPolIdUl: '',
      upPathChgEvent: {
        dnaiChgType: '',
        notifCorreId: '',
        notificationUri: ''
      }
    },
    {
      _id: 'Default_TC_DATA',
      flowStatus: 'ENABLED',
      muteNotif: false,
      redirectInfo: {
        redirectAddressType: '',
        redirectEnabled: false,
        redirectServerAddress: ''
      },
      routeToLocs: [],
      tcId: 'Default_TC_DATA',
      trafficSteeringPolIdDl: '',
      trafficSteeringPolIdUl: '',
      upPathChgEvent: {
        dnaiChgType: '',
        notifCorreId: '',
        notificationUri: ''
      }
    },
    {
      _id: 'Default_TC_VIDEO',
      flowStatus: 'ENABLED',
      muteNotif: false,
      redirectInfo: {
        redirectAddressType: '',
        redirectEnabled: false,
        redirectServerAddress: ''
      },
      routeToLocs: [],
      tcId: 'Default_TC_VIDEO',
      trafficSteeringPolIdDl: '',
      trafficSteeringPolIdUl: '',
      upPathChgEvent: {
        dnaiChgType: '',
        notifCorreId: '',
        notificationUri: ''
      }
    },
    {
      _id: 'TSC_TC',
      flowStatus: 'ENABLED',
      muteNotif: false,
      redirectInfo: {
        redirectAddressType: '',
        redirectEnabled: false,
        redirectServerAddress: ''
      },
      tcId: 'TSC_TC'
    }
  ];

  var usageMonData = [
    {
      _id: 'FUP_Default_Um',
      monitoringType: 'VOLUME',
      commonResetDateTimestamp: NumberLong(1611839204),
      exUsagePccRuleIds: [],
      monitoringKey: 'FUP_Um_Data_Limit',
      remainingUsageResetMethod: '',
      resetDateTimestamp: NumberInt(1611839204),
      resetPeriod: 'MONTHLY',
      scope: {
        dnn: ['dnn.test1.com'],
        snssai: {
          sst: NumberInt(0)
        }
      },
      udrEndDateTimestamp: NumberInt(0),
      udrResetDateTimestamp: NumberInt(0),
      udrResetPeriod: 'MONTHLY',
      udrStartDateTimestamp: NumberInt(0),
      udrUmDataLimitSupport: false,
      udrUsageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(0),
        uplinkVolume: NumberInt(0)
      },
      umId: 'FUP_Default_Um',
      umLevel: 'SESSION_LEVEL',
      usageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(1000000),
        uplinkVolume: NumberInt(0)
      },
      usageLimitStatus: [
        {
          level: 'LEVEL_EXHAUSTED',
          limit: NumberInt(100)
        }
      ],
      billingMethod: 'SUBSCRIBERBILLINGCYCLE',
      resetTime: '20:59:0',
      usageMonManager: 'PCF'
    },
    {
      _id: 'FUP_Default_Um_Duration',
      commonResetDateTimestamp: NumberLong(1612527300),
      exUsagePccRuleIds: [],
      monitoringType: 'BOTH',
      monitoringKey: 'FUP_Um_Data_Limit',
      remainingUsageResetMethod: '',
      resetDateTimestamp: NumberLong(1612527300),
      resetPeriod: 'MONTHLY',
      scope: {
        dnn: ['dnn.test1.com'],
        snssai: {
          sst: NumberInt(1)
        }
      },
      udrEndDateTimestamp: NumberInt(0),
      udrResetDateTimestamp: NumberInt(0),
      udrResetPeriod: '',
      udrStartDateTimestamp: NumberInt(0),
      udrUmDataLimitSupport: false,
      udrUsageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(0),
        uplinkVolume: NumberInt(0)
      },
      umId: 'FUP_Default_Um_Duration',
      umLevel: 'SESSION_LEVEL',
      usageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberLong(30),
        totalVolume: NumberLong(10000),
        uplinkVolume: NumberInt(0)
      },
      usageLimitStatus: [
        {
          level: 'LEVEL_A',
          limit: NumberInt(50)
        },
        {
          level: 'LEVEL_EXHAUSTED',
          limit: NumberInt(100)
        }
      ]
    },
    {
      _id: 'FUP_Default_Um_Service',
      monitoringType: 'VOLUME',
      commonResetDateTimestamp: NumberLong(1613298740),
      exUsagePccRuleIds: [],
      monitoringKey: 'FUP_Um_Data_Limit',
      remainingUsageResetMethod: '',
      resetDateTimestamp: NumberLong(1613298740),
      resetPeriod: 'MONTHLY',
      scope: {
        dnn: ['dnn.test1.com'],
        snssai: {
          sst: NumberInt(0)
        }
      },
      udrEndDateTimestamp: NumberInt(0),
      udrResetDateTimestamp: NumberInt(0),
      udrResetPeriod: 'MONTHLY',
      udrStartDateTimestamp: NumberInt(0),
      udrUmDataLimitSupport: false,
      udrUsageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(0),
        uplinkVolume: NumberInt(0)
      },
      umId: 'FUP_Default_Um_Service',
      umLevel: 'SERVICE_LEVEL',
      usageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(100000),
        uplinkVolume: NumberInt(0)
      },
      usageLimitStatus: [
        {
          level: 'LEVEL_EXHAUSTED',
          limit: NumberInt(100)
        }
      ]
    },
    {
      _id: 'FUP_SDF_Vol_UmData',
      monitoringType: 'VOLUME',
      commonResetDateTimestamp: NumberLong(1613298740),
      exUsagePccRuleIds: [],
      monitoringKey: 'FUP_SDF_Vol_UmData_Limit',
      remainingUsageResetMethod: '',
      resetDateTimestamp: NumberInt(1613298720),
      resetPeriod: '',
      scope: {
        dnn: ['dnn.test1.com'],
        snssai: {
          sst: NumberInt(1)
        }
      },
      udrEndDateTimestamp: NumberInt(0),
      udrResetDateTimestamp: NumberInt(0),
      udrResetPeriod: 'MONTHLY',
      udrStartDateTimestamp: NumberInt(0),
      udrUmDataLimitSupport: false,
      udrUsageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(0),
        uplinkVolume: NumberInt(0)
      },
      umId: 'FUP_SDF_Vol_UmData',
      umLevel: 'SERVICE_LEVEL',
      usageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(100000),
        uplinkVolume: NumberInt(0)
      },
      usageLimitStatus: [
        {
          level: 'LEVEL_EXHAUSTED',
          limit: NumberInt(100)
        },
        {
          level: 'LEVEL_A',
          limit: NumberInt(80)
        }
      ],
      usageMonManager: 'PCF',
      billingMethod: 'USAGEMONCALENDARCYCLE'
    },
    {
      _id: 'FUP1',
      monitoringType: 'VOLUME',
      scope: {
        dnn: ['dnn.test1.com'],
        snssai: {
          sst: NumberInt(1)
        }
      },
      umId: 'FUP1',
      umLevel: 'SESSION_LEVEL',
      usageMonManager: 'CHF',
      usageLimitStatus: [
        {
          level: 'LEVEL_NORMAL',
          limit: NumberInt(30)
        },
        {
          level: 'LEVEL_A',
          limit: NumberInt(50)
        }
      ]
    },
    {
      _id: 'FUP_Daily',
      billingMethod: 'USAGEMONCALENDARCYCLE',
      exUsagePccRuleIds: [],
      remainingUsageResetMethod: '',
      resetDateTimestamp: NumberInt(1611217646),
      resetPeriod: 'DAILY',
      resetTime: '8:0:0',
      scope: {
        dnn: [],
        snssai: {
          sst: NumberInt(1)
        }
      },
      umId: 'FUP_Daily',
      umLevel: 'SESSION_LEVEL',
      usageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(0),
        uplinkVolume: NumberInt(0)
      },
      usageLimitStatus: [],
      usageMonManager: 'PCF'
    },
    {
      _id: 'FUP_OneTime',
      billingMethod: '',
      exUsagePccRuleIds: [],
      remainingUsageResetMethod: '',
      resetDateTimestamp: NumberInt(1611219423),
      resetPeriod: '',
      resetTime: '00:00:00',
      scope: {
        dnn: [],
        snssai: {
          sst: NumberInt(1)
        }
      },
      umId: 'FUP_OneTime',
      umLevel: 'SESSION_LEVEL',
      usageLimit: {
        downlinkVolume: NumberInt(0),
        duration: NumberInt(0),
        totalVolume: NumberInt(0),
        uplinkVolume: NumberInt(0)
      },
      usageLimitStatus: [],
      usageMonManager: 'PCF'
    }
  ];

  var subscriberDataInserts = [
    {
      _id: 'imsi-001002001000068',
      amPolicyData: {
        refRfspPolicy: ['RfspIndexPolicyDefault']
      },
      smPolicyData: {
        sliceData: [
          {
            serviceData: [
              {
                expiryDateTimestamp: 0,
                refService: 'FUP_Service',
                serviceStatus: 'ACTIVE',
                startDateTimestamp: 1578050663,
                subscriptionDateTimestamp: 1578050663
              }
            ],
            snssai: {
              sd: '',
              sst: 1
            }
          }
        ]
      },
      subscCat: 'gold',
      subscStatus: 'NORMAL',
      supi: 'imsi-001002001000068'
    },
    {
      _id: 'imsi-001002001000069',
      amPolicyData: {
        refRfspPolicy: ['RfspIndexPolicyDefault']
      },
      smPolicyData: {
        sliceData: [
          {
            serviceData: [
              {
                expiryDateTimestamp: 0,
                refService: 'FUP_SDF_Vol_Service',
                serviceStatus: 'ACTIVE',
                startDateTimestamp: 1578050663,
                subscriptionDateTimestamp: 1578050663
              }
            ],
            snssai: {
              sd: '',
              sst: 1
            }
          }
        ]
      },
      subscCat: 'gold',
      subscStatus: 'NORMAL',
      supi: 'imsi-001002001000069'
    },
    {
      _id: 'imsi-001002001000070',
      amPolicyData: {
        refRfspPolicy: ['RfspIndexPolicyDefault']
      },
      smPolicyData: {
        sliceData: [
          {
            serviceData: [
              {
                expiryDateTimestamp: 0,
                refService: 'FUP_Duration_Service',
                serviceStatus: 'ACTIVE',
                startDateTimestamp: 1578050663,
                subscriptionDateTimestamp: 1578050663
              }
            ],
            snssai: {
              sd: '',
              sst: 1
            }
          }
        ]
      },
      subscCat: 'gold',
      subscStatus: 'NORMAL',
      supi: 'imsi-001002001000070'
    },
    {
      _id: 'imsi-001002001000071',
      amPolicyData: {
        refRfspPolicy: ['RfspIndexPolicyDefault']
      },
      smPolicyData: {
        sliceData: [
          {
            serviceData: [
              {
                expiryDateTimestamp: 0,
                refService: 'FUP_SDF_Duration_Service',
                serviceStatus: 'ACTIVE',
                startDateTimestamp: 1578050663,
                subscriptionDateTimestamp: 1578050663
              }
            ],
            snssai: {
              sd: '',
              sst: 1
            }
          }
        ]
      },
      subscCat: 'gold',
      subscStatus: 'NORMAL',
      supi: 'imsi-001002001000071'
    },
    {
      _id: 'imsi-001002001000101',
      amPolicyData: {
        refRfspPolicy: ['RfspIndexPolicyDefault']
      },
      smPolicyData: {
        sliceData: [
          {
            serviceData: [
              {
                expiryDateTimestamp: 0,
                refService: 'UEIRM_Service',
                serviceStatus: 'ACTIVE',
                startDateTimestamp: 1578050663,
                subscriptionDateTimestamp: 1578050663
              }
            ],
            snssai: {
              sd: '',
              sst: 1
            }
          }
        ]
      },
      subscCat: 'gold',
      subscStatus: 'NORMAL',
      supi: 'imsi-001002001000101'
    }
  ];

  print('#'.repeat(40) + ' PCF MONGO DB INSERT START ' + '#'.repeat(40));
  db.getCollection('AMSConfig').insertMany(amsConfigs);
  db.getCollection('AmConditionGroup').insertMany(amConditionGroups);
  db.getCollection('ChargingData').insertMany(chargingData);
  db.getCollection('PccRule').insertMany(pccRules);
  db.getCollection('PCFProfile').insertMany(pcfProfiles);
  db.getCollection('Policy').insertMany(policies);
  db.getCollection('QoSData').insertMany(qosData);
  db.getCollection('RfspPolicy').insertMany(rfspPolicies);
  db.getCollection('SMSConfig').insertMany(smsConfigs);
  db.getCollection('ServAreaResPolicy').insertMany(servAreaResPolicies);
  db.getCollection('Service').insertMany(services);
  db.getCollection('ServiceConflictGroup').insertMany(serviceConflictGroups);
  db.getCollection('ServiceFlow').insertMany(serviceFlows);
  db.getCollection('SessionRule').insertMany(sessionRules);
  db.getCollection('Slice').insertMany(slices);
  db.getCollection('SmConditionGroup').insertMany(smConditionGroups);
  db.getCollection('SubscriberGroup').insertMany(subscriberGroups);
  db.getCollection('SubscriberData').insertMany(subscriberDataInserts);
  db.getCollection('TrafficControlData').insertMany(trafficControlData);
  db.getCollection('UsageMonData').insertMany(usageMonData);
  print('#'.repeat(40) + ' PCF MONGO DB INSERT END ' + '#'.repeat(40));
  print('#'.repeat(40) + ' PCF MONGO DB END ' + '#'.repeat(40));
} catch (error) {
  print('Dropping collections and re-inserting data');
  db.getCollection('AMSConfig').drop();
  db.getCollection('AmConditionGroup').drop();
  db.getCollection('ChargingData').drop();
  db.getCollection('PccRule').drop();
  db.getCollection('PCFProfile').drop();
  db.getCollection('Policy').drop();
  db.getCollection('QoSData').drop();
  db.getCollection('RfspPolicy').drop();
  db.getCollection('SMSConfig').drop();
  db.getCollection('ServAreaResPolicy').drop();
  db.getCollection('Service').drop();
  db.getCollection('ServiceConflictGroup').drop();
  db.getCollection('ServiceFlow').drop();
  db.getCollection('SessionRule').drop();
  db.getCollection('Slice').drop();
  db.getCollection('SmConditionGroup').drop();
  db.getCollection('SubscriberGroup').drop();
  db.getCollection('SubscriberData').drop();
  db.getCollection('TrafficControlData').drop();
  db.getCollection('UsageMonData').drop();
  print(
    'Dropped collections are: AMSConfig, AmConditionGroup, ChargingData, PccRule, PCFProfile, Policy, QoSData, RfspPolicy, SMSConfig, ServAreaResPolicy, Service, ServiceConflictGroup, ServiceFlow, SessionRule, Slice, SmConditionGroup, SubscriberGroup, SubscriberData, TrafficControlData, UsageMonData'
  );

  db.getCollection('AMSConfig').insertMany(amsConfigs);
  db.getCollection('AmConditionGroup').insertMany(amConditionGroups);
  db.getCollection('ChargingData').insertMany(chargingData);
  db.getCollection('PccRule').insertMany(pccRules);
  db.getCollection('PCFProfile').insertMany(pcfProfiles);
  db.getCollection('Policy').insertMany(policies);
  db.getCollection('QoSData').insertMany(qosData);
  db.getCollection('RfspPolicy').insertMany(rfspPolicies);
  db.getCollection('SMSConfig').insertMany(smsConfigs);
  db.getCollection('ServAreaResPolicy').insertMany(servAreaResPolicies);
  db.getCollection('Service').insertMany(services);
  db.getCollection('ServiceConflictGroup').insertMany(serviceConflictGroups);
  db.getCollection('ServiceFlow').insertMany(serviceFlows);
  db.getCollection('SessionRule').insertMany(sessionRules);
  db.getCollection('Slice').insertMany(slices);
  db.getCollection('SmConditionGroup').insertMany(smConditionGroups);
  db.getCollection('SubscriberGroup').insertMany(subscriberGroups);
  db.getCollection('SubscriberData').insertMany(subscriberDataInserts);
  db.getCollection('TrafficControlData').insertMany(trafficControlData);
  db.getCollection('UsageMonData').insertMany(usageMonData);
  print(
    'Re-inserted collections are AMSConfig, AmConditionGroup, ChargingData, PccRule, PCFProfile, Policy, QoSData, RfspPolicy, SMSConfig, ServAreaResPolicy, Service, ServiceConflictGroup, ServiceFlow, SessionRule, Slice, SmConditionGroup, SubscriberGroup, SubscriberData, TrafficControlData, UsageMonData'
  );
}

////////////////////////////// SMF için ön ayarlar //////////////////////////////

/*
  SMF için bir mongo ayarı bulunmamaktadır.
*/

print('#'.repeat(40) + ' NO MONGO CONFIGURATION FOR SMF ' + '#'.repeat(40));

////////////////////////////// SMSF için ön ayarlar //////////////////////////////

/*
  SMSF için bir mongo ayarı bulunmamaktadır.
*/

print('#'.repeat(40) + ' NO MONGO CONFIGURATION FOR SMSF ' + '#'.repeat(40));

////////////////////////////// UDM için ön ayarlar //////////////////////////////

/*
  UDM için bir mongo ayarı bulunmamaktadır.
*/

print('#'.repeat(40) + ' NO MONGO CONFIGURATION FOR UDM ' + '#'.repeat(40));

////////////////////////////// UDR için ön ayarlar //////////////////////////////

/*
  UDR için bir mongo ayarı bulunmamaktadır.
*/

print('#'.repeat(40) + ' NO MONGO CONFIGURATION FOR UDR ' + '#'.repeat(40));

////////////////////////////// UPF için ön ayarlar //////////////////////////////

/*
  UPF için bir mongo ayarı bulunmamaktadır.
*/

print('#'.repeat(40) + ' NO MONGO CONFIGURATION FOR UPF ' + '#'.repeat(40));

print('#'.repeat(40) + ' END OF MONGO DB CONFIGURATION ' + '#'.repeat(40));
print('#'.repeat(100));
