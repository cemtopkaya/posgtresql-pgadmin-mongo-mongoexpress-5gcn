--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.3

-- Started on 2021-08-04 15:05:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- DROP DATABASE "UdrDB";
--
-- TOC entry 3071 (class 1262 OID 32897)
-- Name: UdrDB; Type: DATABASE; Schema: -; Owner: cekirdekSebekeKullanicisi
--

CREATE USER postgres SUPERUSER;
CREATE USER cekirdekSebekeKullanicisi SUPERUSER;

-- IF EXISTS ( SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') 
-- THEN
-- RAISE NOTICE 'Role "postgres" already exists. Skipping.';
-- ELSE
-- CREATE USER postgres SUPERUSER;
-- END IF;

-- IF EXISTS ( SELECT FROM pg_catalog.pg_roles WHERE rolname = 'cekirdekSebekeKullanicisi') 
-- THEN
-- RAISE NOTICE 'Role "cekirdekSebekeKullanicisi" already exists. Skipping.';
-- ELSE
-- CREATE USER cekirdekSebekeKullanicisi SUPERUSER;
-- END IF;

CREATE DATABASE "UdrDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE "UdrDB" OWNER TO "cekirdekSebekeKullanicisi";

\connect "UdrDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 236 (class 1255 OID 32898)
-- Name: FAddMultipleUE(integer, integer, character varying, integer, integer, integer, integer); Type: FUNCTION; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE FUNCTION "public"."FAddMultipleUE"("startUEId" integer, "stopUEId" integer, "plmnid" character varying, "ipv4address_1" integer DEFAULT '-1'::integer, "ipv4address_2" integer DEFAULT '-1'::integer, "ipv4address_3" integer DEFAULT '-1'::integer, "ipv4address_4" integer DEFAULT '-1'::integer) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
currentId integer:=$1;
ueidStr char varying;
ipV4Adddress char varying;
ip1 integer:=ipV4Address_1;
ip2 integer:=ipV4Address_2;
ip3 integer:=ipV4Address_3;
ip4 integer:=ipV4Address_4;
begin
--raise notice 'Start:% Stop:%', $1, $2;

loop
	if currentId > $2 then
		exit;
	end if;
   
	if ip1 = -1 OR ip2 = -1 OR ip3 = -1 OR ip4 = -1 then
		ipV4Adddress := '';
	else
		ipV4Adddress := CAST( ip1 AS character varying) 
						|| '.' || CAST( ip2 AS character varying) 
						|| '.' || CAST( ip3 AS character varying) 
						|| '.' || CAST( ip4 AS character varying);

		ip4 := ip4 +1;
		if ip4 > 254 then ip4 := 1; ip3 := ip3 + 1; end if;
		if ip3 > 254 then ip3 := 0; ip2 := ip2 + 1; end if;
		if ip2 > 254 then ip2 := 0; ip1 := ip1 + 1; end if;
		if ip1 > 254 then ip1 := 1; end if;

	end if;
   
   ueidStr := 'imsi-' || plmnid || trim(leading ' ' from to_char(currentId, '000000000D')) ;
   raise notice 'Value:% Length:% IP:%', ueidStr, char_length(ueidStr),ipV4Adddress;
	
	PERFORM public."FAddNewUeSubscriptionData"( ueidStr, plmnid, ipV4Adddress);
	currentId := currentId +1;
end loop;

return;
end;
$_$;


ALTER FUNCTION "public"."FAddMultipleUE"("startUEId" integer, "stopUEId" integer, "plmnid" character varying, "ipv4address_1" integer, "ipv4address_2" integer, "ipv4address_3" integer, "ipv4address_4" integer) OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 242 (class 1255 OID 32899)
-- Name: FAddNewUeSubscriptionData(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE FUNCTION "public"."FAddNewUeSubscriptionData"("newueid" character varying, "plmnid" character varying, "staticipv4address" character varying) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$begin

delete from public."AccessAndMobilitySubscriptionData" WHERE "ueId" = newueid AND "servingPlmnId" = plmnid; 
INSERT INTO public."AccessAndMobilitySubscriptionData"("ueId","servingPlmnId","data") VALUES(newueid, plmnid,
'{"activeTime":0,"coreNetworkTypeRestrictions":[],"dlPacketCount":0,"forbiddenAreas":[],"gpsis":[""],"internalGroupIds":[],"mcsPriority":false,"micoAllowed":false,"mpsPriority":false,"nssai":{"defaultSingleNssais":[{"sst":1}],"singleNssais":[{"sst":1},{"sst":2},{"sst":3}],"supportedFeatures":""},"odbPacketServices":"","ratRestrictions":[],"rfspIndex":1,"serviceAreaRestriction":{"areas":[{"tacs":["000005","000006"]}],"maxNumOfTAsForNotAllowedAreas":1,"restrictionType":"NOT_ALLOWED_AREAS"},"sharedAmDataIds":[],"sorInfo":{"ackInd":true,"countersor":"","sorMacIausf":"","steeringContainer":{"securedPacket":"","steeringInfos":[]},"provisioningTime":"2020-08-07T23:36:33Z"},"subsRegTimer":240,"subscribedDnnList":["dnn.test1.com","dnn.test2.com","dnn.test3.com","dnn.ims.com"],"subscribedUeAmbr":{"downlink":"4000000000 bps","uplink":"3000000000 bps"},"supportedFeatures":"","ueUsageType":0,"upuInfo":{"counterUpu":"","provisioningTime":"2020-08-07T23:36:33Z","upuAckInd":true,"upuDataList":[{"defaultConfNssai":[{"sst":1}]}],"upuMacIausf":"","upuRegInd":false}}');

delete from public."SessionManagementSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid; 
INSERT INTO public."SessionManagementSubscriptionData"("ueId","servingPlmnId","data") VALUES(newueid, plmnid,
CAST( '[{"singleNssai":{"sst":1},"dnnConfigurations":{"dnn.test1.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test2.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test3.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.ims.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.emergency.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]}}},{"singleNssai":{"sst":2},"dnnConfigurations":{"dnn.test1.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test2.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test3.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.ims.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.emergency.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]}}},{"singleNssai":{"sst":3},"dnnConfigurations":{"dnn.test1.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test2.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test3.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.ims.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.emergency.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]}}}]' AS json));

delete from public."AuthenticationSubscription" where "ueId" = newueid; 
INSERT INTO public."AuthenticationSubscription" ("ueId", "AuthData", "AuthEvent", "updatetime") VALUES(newueid, 
'{"algorithmId":"MILENAGE","authenticationManagementField":"8000","authenticationMethod":"5G_AKA","encOpcKey":"","encPermanentKey":"000102030405060708090a0b0c0d0e0f","encTopcKey":"","protectionParameterId":"","sequenceNumber":{"difSign":"","indLength":8,"lastIndexes":{},"sqn":"4E00000A5BD2","sqnScheme":"NON_TIME_BASED"}}',
'{"authType":"5G_AKA","servingNetworkName":"5G:mnc001.mcc001.3gppnetwork.org","success":true,"timeStamp":"2020-09-08T12:29:29Z"}', '2020-09-07 12:29:29.218901');

delete from public."AmPolicyData" where "ueId" = newueid;
INSERT INTO public."AmPolicyData"("ueId","data") VALUES(newueid, '{"subscCats":["silver","gold"]}');

delete from public."SmPolicyData" where "ueId" = newueid;
INSERT INTO public."SmPolicyData"("ueId","UsageMonDataLimit","UsageMonData", "smPolicySnssaiData") VALUES(newueid, '{}','{}', 
'{"1":{"smPolicyDnnData":{"dnn.test1.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test1.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.test2.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test2.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.test3.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test3.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.ims.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.ims.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false}},"snssai":{"sst":1}},"2":{"smPolicyDnnData":{"dnn.test1.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test1.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.test2.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test2.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.test3.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test3.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.ims.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.ims.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false}},"snssai":{"sst":2}},"3":{"smPolicyDnnData":{"dnn.test1.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test1.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.test2.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test2.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.test3.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.test3.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false},"dnn.ims.com":{"adcSupport":false,"allowedServices":[],"chfInfo":{"primaryChfAddress":"","secondaryChfAddress":""},"dnn":"dnn.ims.com","gbrDl":"1024 Kbps","gbrUl":"512 Kbps","imsSignallingPrio":false,"ipv4Index":0,"ipv6Index":0,"mpsPriority":false,"mpsPriorityLevel":0,"offline":false,"online":false,"refUmDataLimitIds":{},"subscCats":["silver","gold"],"subscSpendingLimits":false}},"snssai":{"sst":3}}}');

delete from public."SMSSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid;
INSERT INTO public."SMSSubscriptionData"("ueId","servingPlmnId", "data") VALUES(newueid, plmnid
,'{"smsSubscribed": true}');

delete from public."SMSManagementSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid;
INSERT INTO public."SMSManagementSubscriptionData"("ueId","servingPlmnId","data")VALUES(newueid,plmnid,'{}');

delete from public."SmfSelectionSubscriptionData" where "ueId" = newueid;
INSERT INTO public."SmfSelectionSubscriptionData"("ueId","servingPlmnId","data")VALUES(newueid,plmnid,'{"sharedSnssaiInfosId":"","subscribedSnssaiInfos":{"1":{"dnnInfos":[{"defaultDnnIndicator":true,"dnn":"dnn.test1.com","iwkEpsInd":false,"ladnIndicator":false,"lboRoamingAllowed":false}]}},"supportedFeatures":""}');

return;
end;
$$;


ALTER FUNCTION "public"."FAddNewUeSubscriptionData"("newueid" character varying, "plmnid" character varying, "staticipv4address" character varying) OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 237 (class 1255 OID 32902)
-- Name: add_new_ue(character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE FUNCTION "public"."add_new_ue"("newueid" character varying, "plmnid" character varying, "staticipv4address" character varying) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$begin

delete from public."AccessAndMobilitySubscriptionData" WHERE "ueId" = newueid AND "servingPlmnId" = plmnid; 
INSERT INTO public."AccessAndMobilitySubscriptionData"("ueId","servingPlmnId","data") VALUES(newueid, plmnid,
'{"activeTime":0,"dlPacketCount":0,"gpsis":[""],"mcsPriority":false,"micoAllowed":false,"mpsPriority":false,"nssai":{"defaultSingleNssais":[{"sst":1}],"singleNssais":[{"sst":1},{"sst":2},{"sst":3}]},"odbPacketServices":"","ratRestrictions":[],"rfspIndex":1,"serviceAreaRestriction":{"areas":[{"tacs":["4305","4306"]}],"maxNumOfTAsForNotAllowedAreas":1,"restrictionType":"ALLOWED_AREAS"},"sorInfo":{"ackInd":true,"countersor":"","sorMacIausf":"","steeringContainer":{"securedPacket":"","steeringInfos":[]},"provisioningTime":""},"subsRegTimer":240,"subscribedDnnList":["dnn.test1.com","dnn.test2.com","dnn.test3.com","dnn.ims.com"],"subscribedUeAmbr":{"downlink":"4000000000 bps","uplink":"3000000000 bps"},"ueUsageType":0,"upuInfo":{"counterUpu":"","provisioningTime":"","upuAckInd":true,"upuDataList":[{"defaultConfNssai":[{"sst":1}]}],"upuMacIausf":"","upuRegInd":false}}');

delete from public."SessionManagementSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid; 
INSERT INTO public."SessionManagementSubscriptionData"("ueId","servingPlmnId","data") VALUES(newueid, plmnid,
CAST( '[{"singleNssai":{"sst":1},"dnnConfigurations":{"internet":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"default":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test1.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test2.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test3.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.ims.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]}}},{"singleNssai":{"sst":2},"dnnConfigurations":{"dnn.test1.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test2.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test3.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.ims.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]}}},{"singleNssai":{"sst":3},"dnnConfigurations":{"dnn.test1.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test2.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.test3.com":{"5gQosProfile":{"5qi":9,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]},"dnn.ims.com":{"5gQosProfile":{"5qi":5,"arp":{"preemptCap":"NOT_PREEMPT","preemptVuln":"NOT_PREEMPTABLE","priorityLevel":2},"priorityLevel":0},"pduSessionTypes":{"defaultSessionType":"IPV4V6"},"iwkEpsInd":true,"ladnIndicator":false,"sessionAmbr":{"downlink":"2 bps","uplink":"1 bps"},"sscModes":{"allowedSscModes":["SSC_MODE_1","SSC_MODE_2","SSC_MODE_3"],"defaultSscMode":"SSC_MODE_1"},"staticIpAddress":[{"ipv4Addr":"'||staticIPV4Address||'","ipv6Addr":"2001:db8:a0b:12f0::1","ipv6Prefix":"2001:db8:a0b:12f0::1/64"}]}}}]' AS json));

delete from public."AuthenticationSubscription" where "ueId" = newueid; 
INSERT INTO public."AuthenticationSubscription" ("ueId", "AuthData", "AuthEvent", "updatetime") VALUES(newueid, 
'{"algorithmId":"MILENAGE","authenticationManagementField":"8000","authenticationMethod":"5G_AKA","encOpcKey":"","encPermanentKey":"000102030405060708090a0b0c0d0e0f","encTopcKey":"","protectionParameterId":"","sequenceNumber":{"difSign":"","indLength":8,"lastIndexes":{},"sqn":"4E00000A5BD2","sqnScheme":"NON_TIME_BASED"}}',
'{"authType":"5G_AKA","servingNetworkName":"5G:mnc001.mcc001.3gppnetwork.org","success":true,"timeStamp":"2020-09-08T12:29:29Z"}', '2020-09-07 12:29:29.218901');

delete from public."AmPolicyData" where "ueId" = newueid;
INSERT INTO public."AmPolicyData"("ueId","data") VALUES(newueid, '{"subscCats":["silver","gold"]}');

delete from public."SmPolicyData" where "ueId" = newueid;
INSERT INTO public."SmPolicyData"("ueId","UsageMonDataLimit","UsageMonData", "smPolicySnssaiData") VALUES(newueid, '{}','{}', 
'{"1":{"smPolicyDnnData":{"dnn.keysight.com":{"dnn":"dnn.keysight.com","gbrDl":"512 Kbps","gbrUl":"1024 Kbps","subscCats":["silver","gold"]}},"snssai":{"sst":1}}}');

delete from public."SMSSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid;
INSERT INTO public."SMSSubscriptionData"("ueId","servingPlmnId", "data") VALUES(newueid, plmnid
,'{"smsSubscribed": true}');

delete from public."SMSManagementSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid;
INSERT INTO public."SMSManagementSubscriptionData"("ueId","servingPlmnId","data")VALUES(newueid,plmnid,'{}');

delete from public."SmfSelectionSubscriptionData" where "ueId" = newueid;
INSERT INTO public."SmfSelectionSubscriptionData"("ueId","servingPlmnId","data")VALUES(newueid,plmnid,'{"sharedSnssaiInfosId":"","subscribedSnssaiInfos":{"1":{"dnnInfos":[{"defaultDnnIndicator":true,"dnn":"dnn.test1.com","iwkEpsInd":true,"ladnIndicator":false,"lboRoamingAllowed":false}]}},"supportedFeatures":""}');

return;
end;
$$;


ALTER FUNCTION "public"."add_new_ue"("newueid" character varying, "plmnid" character varying, "staticipv4address" character varying) OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 240 (class 1255 OID 32905)
-- Name: am_policy_change_notification(); Type: FUNCTION; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE FUNCTION "public"."am_policy_change_notification"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$declare resource text := '/policy-data/ues/' || old."ueId" ||  '/am-data';
declare idval integer;
begin
	IF NEW."data" IS NULL THEN
		INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'resource', '/am-data',
					'ueId', OLD."ueId",
				    'subscriptions', (select json_agg(t) from (
						select data ->'notificationUri' as "notificationUri" from "PolicyDataSubscriptions" 
						where status = 1 AND (data ->'monitoredResourceUris')::jsonb ? resource 
						ORDER BY "createtime") t)
				)) RETURNING id INTO idval;
		PERFORM pg_notify('subscription_notify', json_build_object('type', 'policy_remove', 'id', idval)::text);	
	ELSE
		INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'resource', '/am-data',
					'new', json_build_object('ueId', NEW."ueId", 'amPolicyData', NEW."data"),
				    'subscriptions', (select json_agg(t) from (
						select data ->'notificationUri' as "notificationUri" from "PolicyDataSubscriptions" 
						where status = 1 AND (data ->'monitoredResourceUris')::jsonb ? resource 
						ORDER BY "createtime") t)
				)) RETURNING id INTO idval;
		PERFORM pg_notify('subscription_notify', json_build_object('type', 'policy_update', 'id', idval)::text);	
	END IF;
	return null;
end;$$;


ALTER FUNCTION "public"."am_policy_change_notification"() OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 239 (class 1255 OID 32906)
-- Name: application_change_notification(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION "public"."application_change_notification"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare idval integer;
begin
	IF TG_OP = 'DELETE' THEN
		INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'op', 'DELETE', 
					'data', OLD."data"::json,
				    'notificationUris', (select json_agg(t) from (
						select data ->'notificationUri' as "value" from "InfluenceDataSubscriptions" where status = 1 
						AND CASE 
								WHEN LENGTH((OLD."data"->>'dnn')::text) > 2
								THEN (data ->'dnns')::jsonb ? (OLD."data"->>'dnn')::text
								ELSE 1=1 
							END
						AND CASE 
								WHEN LENGTH((OLD."data"->>'snssai')::text) > 2
								THEN (data->'snssais')::jsonb @> ('[' || (OLD."data"->'snssai')::text || ']')::jsonb
								ELSE 1=1 
							END
						--AND CASE 
						--		WHEN LENGTH((OLD."data"->>'interGroupId')::text) > 2
						--		THEN (data ->'internalGroupIds')::jsonb ? (OLD."data"->>'interGroupId')::text
						--		ELSE 1=1 
						--	END
						AND CASE 
								WHEN LENGTH((OLD."data"->>'supi')::text) > 2
								THEN (data ->'supis')::jsonb ? (OLD."data"->>'supi')::text
								ELSE 1=1 
							END) t)
				)) RETURNING id INTO idval;
		PERFORM pg_notify('subscription_notify', json_build_object('type', 'application', 'id', idval)::text);			
	ELSE 
		INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'op', 'UPDATE', 
					'data', NEW."data"::json,
				    'notificationUris', (select json_agg(t) from (
						select data ->'notificationUri' as "value" from "InfluenceDataSubscriptions" where status = 1 
						AND CASE 
								WHEN LENGTH((NEW."data"->>'dnn')::text) > 2
								THEN (data ->'dnns')::jsonb ? (NEW."data"->>'dnn')::text
								ELSE 1=1 
							END
						AND CASE 
								WHEN LENGTH((NEW."data"->>'snssai')::text) > 2
								THEN (data->'snssais')::jsonb @> ('[' || (NEW."data"->'snssai')::text || ']')::jsonb
								ELSE 1=1 
							END
						--AND CASE 
						--		WHEN LENGTH((NEW."data"->>'interGroupId')::text) > 2
						--		THEN (data ->'internalGroupIds')::jsonb ? (NEW."data"->>'interGroupId')::text
						--		ELSE 1=1 
						--	END
						AND CASE 
								WHEN LENGTH((NEW."data"->>'supi')::text) > 2
								THEN (data ->'supis')::jsonb ? (NEW."data"->>'supi')::text
								ELSE 1=1 
							END) t)
				)) RETURNING id INTO idval;
		PERFORM pg_notify('subscription_notify', json_build_object('type', 'application', 'id', idval)::text);			
	END IF;
	return null;
end;
$$;


ALTER FUNCTION "public"."application_change_notification"() OWNER TO "postgres";

--
-- TOC entry 223 (class 1255 OID 34124)
-- Name: delete_ue(character varying, character varying); Type: FUNCTION; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE FUNCTION "public"."delete_ue"("newueid" character varying, "plmnid" character varying) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE RowRount integer;
begin
delete from public."AccessAndMobilitySubscriptionData" WHERE "ueId" = newueid AND "servingPlmnId" = plmnid; 
delete from public."SessionManagementSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid; 
delete from public."AuthenticationSubscription" where "ueId" = newueid; 
delete from public."AmPolicyData" where "ueId" = newueid;
delete from public."SmPolicyData" where "ueId" = newueid;
delete from public."SMSSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid;
delete from public."SMSManagementSubscriptionData" where "ueId" = newueid AND "servingPlmnId" = plmnid;
delete from public."SmfSelectionSubscriptionData" where "ueId" = newueid;
GET DIAGNOSTICS RowRount = ROW_COUNT;
RETURN RowRount;
end;
$$;


ALTER FUNCTION "public"."delete_ue"("newueid" character varying, "plmnid" character varying) OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 241 (class 1255 OID 32908)
-- Name: sm_policy_change_notification(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION "public"."sm_policy_change_notification"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$declare resource text := '/policy-data/ues/' || old."ueId" ||  '/sm-data';
declare idval integer;
begin
	IF NEW."smPolicySnssaiData" IS NULL THEN
		INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'resource', '/sm-data', 
					'ueId', NEW."ueId",
				    'subscriptions', (select json_agg(t) from (
						select data ->'notificationUri' as "notificationUri" from "PolicyDataSubscriptions" 
						where status = 1 AND (data ->'monitoredResourceUris')::jsonb ? resource 
						ORDER BY "createtime") t)
				)) RETURNING id INTO idval;
		PERFORM pg_notify('subscription_notify', json_build_object('type', 'policy_remove', 'id', idval)::text);			
	ELSE
		INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'resource', '/sm-data',
					'new', json_build_object('ueId', NEW."ueId", 
											 'umData', NEW."UsageMonData", 
											 'umDataLimits', NEW."UsageMonDataLimit",
											 'smPolicySnssaiData', NEW."smPolicySnssaiData"),
					'subscriptions', (select json_agg(t) from (
						select data ->'notificationUri' as "notificationUri" from "PolicyDataSubscriptions" 
						where status = 1 AND (data ->'monitoredResourceUris')::jsonb ? resource 
						ORDER BY "createtime" LIMIT(10)) t)
				)) RETURNING id INTO idval;
		PERFORM pg_notify('subscription_notify', json_build_object('type', 'policy_update', 'id', idval)::text);			
	END IF;
	return null;
end;$$;


ALTER FUNCTION "public"."sm_policy_change_notification"() OWNER TO "postgres";

--
-- TOC entry 238 (class 1255 OID 32909)
-- Name: subscription_change_notification(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION "public"."subscription_change_notification"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$declare resource text := '/subscription-data/' || old."ueId"  || '/' ||  old."servingPlmnId" || '/provisioned-data'|| TG_ARGV[0];
declare idval integer;
BEGIN
	INSERT INTO "NotifyEvents" (data) VALUES(json_build_object(
					'resource', resource, 
					'ueId', old."ueId", 
					'old', row_to_json(OLD), 
					'new', row_to_json(NEW),
				    'subscriptions', (select json_agg(t) from (
						SELECT data ->'callbackReference' AS "callbackReference", data ->'originalCallbackReference' AS "originalCallbackReference" 
						FROM "SubscriptionDataSubscriptions"
						WHERE status = 1 AND data ->> 'ueId' = old."ueId" AND (data ->'monitoredResourceUris')::jsonb ? resource  
						ORDER BY "createtime") t)
				)) RETURNING id INTO idval;
	PERFORM pg_notify('subscription_notify', json_build_object('type', 'subscription', 'id', idval)::text);			
	RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."subscription_change_notification"() OWNER TO "postgres";

SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 32910)
-- Name: AMFSubscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."AMFSubscriptions" (
    "ueId" character varying(50) NOT NULL,
    "subscriptionId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "createtime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."AMFSubscriptions" OWNER TO "postgres";

--
-- TOC entry 197 (class 1259 OID 32917)
-- Name: AccessAndMobilitySubscriptionData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."AccessAndMobilitySubscriptionData" (
    "ueId" character varying(50) NOT NULL,
    "data" "jsonb" NOT NULL,
    "servingPlmnId" character varying(10) DEFAULT '001001'::character varying NOT NULL
);


ALTER TABLE "public"."AccessAndMobilitySubscriptionData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 198 (class 1259 OID 32924)
-- Name: AmPolicyData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."AmPolicyData" (
    "ueId" character varying(50) NOT NULL,
    "data" "json"
);


ALTER TABLE "public"."AmPolicyData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 199 (class 1259 OID 32930)
-- Name: Amf3GppAccessRegistration; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."Amf3GppAccessRegistration" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."Amf3GppAccessRegistration" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 200 (class 1259 OID 32937)
-- Name: AmfNon3GppAccessRegistration; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."AmfNon3GppAccessRegistration" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."AmfNon3GppAccessRegistration" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 201 (class 1259 OID 32944)
-- Name: AuthenticationSoR; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."AuthenticationSoR" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."AuthenticationSoR" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 202 (class 1259 OID 32951)
-- Name: AuthenticationSubscription; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."AuthenticationSubscription" (
    "ueId" character varying(50) NOT NULL,
    "AuthData" "json" NOT NULL,
    "AuthEvent" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."AuthenticationSubscription" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 203 (class 1259 OID 32958)
-- Name: AuthenticationUPU; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."AuthenticationUPU" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."AuthenticationUPU" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 204 (class 1259 OID 32965)
-- Name: BdtData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."BdtData" (
    "bdtReferenceId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "processdate" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."BdtData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 205 (class 1259 OID 32972)
-- Name: EESubscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."EESubscriptions" (
    "ueId" character varying(50) NOT NULL,
    "callbackReference" character varying(200) NOT NULL,
    "subscriptionId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "createtime" timestamp without time zone DEFAULT "now"() NOT NULL,
    "expiry" integer NOT NULL,
    "status" smallint DEFAULT 1 NOT NULL
);


ALTER TABLE "public"."EESubscriptions" OWNER TO "postgres";

--
-- TOC entry 206 (class 1259 OID 32980)
-- Name: InfluenceData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."InfluenceData" (
    "influenceId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "processdate" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."InfluenceData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 207 (class 1259 OID 32987)
-- Name: InfluenceDataSubscriptions; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."InfluenceDataSubscriptions" (
    "subscriptionId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "createtime" timestamp without time zone DEFAULT "now"() NOT NULL,
    "expiry" integer DEFAULT 86400 NOT NULL,
    "status" smallint DEFAULT 1 NOT NULL
);


ALTER TABLE "public"."InfluenceDataSubscriptions" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 222 (class 1259 OID 33193)
-- Name: NotifyEvents; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."NotifyEvents" (
    "id" integer NOT NULL,
    "data" "json",
    "status" integer DEFAULT 1,
    "createtime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."NotifyEvents" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 221 (class 1259 OID 33191)
-- Name: NotifyEvents_id_seq; Type: SEQUENCE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE SEQUENCE "public"."NotifyEvents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."NotifyEvents_id_seq" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 3072 (class 0 OID 0)
-- Dependencies: 221
-- Name: NotifyEvents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER SEQUENCE "public"."NotifyEvents_id_seq" OWNED BY "public"."NotifyEvents"."id";


--
-- TOC entry 208 (class 1259 OID 32996)
-- Name: PFDData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."PFDData" (
    "appId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "processdate" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."PFDData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 209 (class 1259 OID 33003)
-- Name: PolicyDataSubscriptions; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."PolicyDataSubscriptions" (
    "subscriptionId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "createtime" timestamp without time zone DEFAULT "now"() NOT NULL,
    "expiry" integer NOT NULL,
    "status" smallint DEFAULT 1 NOT NULL
);


ALTER TABLE "public"."PolicyDataSubscriptions" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 210 (class 1259 OID 33011)
-- Name: PpData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."PpData" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL
);


ALTER TABLE "public"."PpData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 211 (class 1259 OID 33017)
-- Name: SMSManagementSubscriptionData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SMSManagementSubscriptionData" (
    "ueId" character varying(50) NOT NULL,
    "servingPlmnId" character varying(10) NOT NULL,
    "data" "json"
);


ALTER TABLE "public"."SMSManagementSubscriptionData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 212 (class 1259 OID 33023)
-- Name: SMSSubscriptionData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SMSSubscriptionData" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "servingPlmnId" character varying(10) NOT NULL
);


ALTER TABLE "public"."SMSSubscriptionData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 213 (class 1259 OID 33029)
-- Name: SdmSubscription; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SdmSubscription" (
    "ueId" character varying(50) NOT NULL,
    "nfInstanceId" character varying(50) NOT NULL,
    "subscriptionId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."SdmSubscription" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 214 (class 1259 OID 33036)
-- Name: SessionManagementSubscriptionData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SessionManagementSubscriptionData" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "servingPlmnId" character varying(10) DEFAULT '001001'::character varying NOT NULL
);


ALTER TABLE "public"."SessionManagementSubscriptionData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 215 (class 1259 OID 33043)
-- Name: SmPolicyData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SmPolicyData" (
    "ueId" character varying(50) NOT NULL,
    "UsageMonDataLimit" "json" NOT NULL,
    "UsageMonData" "json" NOT NULL,
    "smPolicySnssaiData" "json"
);


ALTER TABLE "public"."SmPolicyData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 216 (class 1259 OID 33049)
-- Name: SmfRegistration; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SmfRegistration" (
    "ueId" character varying(50) NOT NULL,
    "pduSessionId" integer NOT NULL,
    "data" "json" NOT NULL,
    "processdate" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."SmfRegistration" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 217 (class 1259 OID 33056)
-- Name: SmfSelectionSubscriptionData; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SmfSelectionSubscriptionData" (
    "ueId" character varying(50) NOT NULL,
    "servingPlmnId" character varying(10) NOT NULL,
    "data" "json" DEFAULT '{}'::"json" NOT NULL
);


ALTER TABLE "public"."SmfSelectionSubscriptionData" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 218 (class 1259 OID 33062)
-- Name: Smsf3GppAccessRegistration; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."Smsf3GppAccessRegistration" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."Smsf3GppAccessRegistration" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 219 (class 1259 OID 33069)
-- Name: SmsfNon3GppAccessRegistration; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SmsfNon3GppAccessRegistration" (
    "ueId" character varying(50) NOT NULL,
    "data" "json" NOT NULL,
    "updatetime" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."SmsfNon3GppAccessRegistration" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 220 (class 1259 OID 33076)
-- Name: SubscriptionDataSubscriptions; Type: TABLE; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TABLE "public"."SubscriptionDataSubscriptions" (
    "subscriptionId" character varying(50) NOT NULL,
    "ueId" character varying(50) NOT NULL,
    "callbackReference" character varying(200) NOT NULL,
    "originalCallbackReference" character varying(200) DEFAULT ''::character varying NOT NULL,
    "data" "json" NOT NULL,
    "createtime" timestamp without time zone DEFAULT "now"() NOT NULL,
    "expiry" integer NOT NULL,
    "status" smallint DEFAULT 1 NOT NULL
);


ALTER TABLE "public"."SubscriptionDataSubscriptions" OWNER TO "cekirdekSebekeKullanicisi";

--
-- TOC entry 2871 (class 2604 OID 33196)
-- Name: NotifyEvents id; Type: DEFAULT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."NotifyEvents" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."NotifyEvents_id_seq"'::"regclass");


--
-- TOC entry 2875 (class 2606 OID 33089)
-- Name: AMFSubscriptions AMFSubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."AMFSubscriptions"
    ADD CONSTRAINT "AMFSubscriptions_pkey" PRIMARY KEY ("ueId", "subscriptionId");


--
-- TOC entry 2877 (class 2606 OID 33091)
-- Name: AccessAndMobilitySubscriptionData AccessAndMobilitySubscriptionData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."AccessAndMobilitySubscriptionData"
    ADD CONSTRAINT "AccessAndMobilitySubscriptionData_pkey" PRIMARY KEY ("ueId", "servingPlmnId");


--
-- TOC entry 2880 (class 2606 OID 33093)
-- Name: AmPolicyData AmPolicyData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."AmPolicyData"
    ADD CONSTRAINT "AmPolicyData_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2882 (class 2606 OID 33095)
-- Name: Amf3GppAccessRegistration Amf3GppAccessRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."Amf3GppAccessRegistration"
    ADD CONSTRAINT "Amf3GppAccessRegistration_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2884 (class 2606 OID 33097)
-- Name: AmfNon3GppAccessRegistration AmfNon3GppAccessRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."AmfNon3GppAccessRegistration"
    ADD CONSTRAINT "AmfNon3GppAccessRegistration_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2886 (class 2606 OID 33099)
-- Name: AuthenticationSoR AuthenticationSoR_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."AuthenticationSoR"
    ADD CONSTRAINT "AuthenticationSoR_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2888 (class 2606 OID 33101)
-- Name: AuthenticationSubscription AuthenticationSubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."AuthenticationSubscription"
    ADD CONSTRAINT "AuthenticationSubscription_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2890 (class 2606 OID 33103)
-- Name: AuthenticationUPU AuthenticationUPU_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."AuthenticationUPU"
    ADD CONSTRAINT "AuthenticationUPU_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2892 (class 2606 OID 33105)
-- Name: BdtData BdtData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."BdtData"
    ADD CONSTRAINT "BdtData_pkey" PRIMARY KEY ("bdtReferenceId");


--
-- TOC entry 2894 (class 2606 OID 33107)
-- Name: EESubscriptions EESubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."EESubscriptions"
    ADD CONSTRAINT "EESubscriptions_pkey" PRIMARY KEY ("ueId", "callbackReference");


--
-- TOC entry 2898 (class 2606 OID 33109)
-- Name: InfluenceDataSubscriptions InfluenceDataSubscriptions_index; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."InfluenceDataSubscriptions"
    ADD CONSTRAINT "InfluenceDataSubscriptions_index" UNIQUE ("subscriptionId");


--
-- TOC entry 2900 (class 2606 OID 33111)
-- Name: InfluenceDataSubscriptions InfluenceDataSubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."InfluenceDataSubscriptions"
    ADD CONSTRAINT "InfluenceDataSubscriptions_pkey" PRIMARY KEY ("subscriptionId");


--
-- TOC entry 2896 (class 2606 OID 33113)
-- Name: InfluenceData InfluenceData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."InfluenceData"
    ADD CONSTRAINT "InfluenceData_pkey" PRIMARY KEY ("influenceId");


--
-- TOC entry 2936 (class 2606 OID 33203)
-- Name: NotifyEvents NotifyEvents_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."NotifyEvents"
    ADD CONSTRAINT "NotifyEvents_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2902 (class 2606 OID 33115)
-- Name: PFDData PFDData_index; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."PFDData"
    ADD CONSTRAINT "PFDData_index" PRIMARY KEY ("appId");


--
-- TOC entry 2904 (class 2606 OID 33117)
-- Name: PolicyDataSubscriptions PolicyDataSubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."PolicyDataSubscriptions"
    ADD CONSTRAINT "PolicyDataSubscriptions_pkey" PRIMARY KEY ("subscriptionId");


--
-- TOC entry 2906 (class 2606 OID 33119)
-- Name: PpData PpData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."PpData"
    ADD CONSTRAINT "PpData_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2908 (class 2606 OID 33121)
-- Name: SMSManagementSubscriptionData SMSManagementSubscriptionData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SMSManagementSubscriptionData"
    ADD CONSTRAINT "SMSManagementSubscriptionData_pkey" PRIMARY KEY ("ueId", "servingPlmnId");


--
-- TOC entry 2910 (class 2606 OID 33123)
-- Name: SMSSubscriptionData SMSSubscriptionData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SMSSubscriptionData"
    ADD CONSTRAINT "SMSSubscriptionData_pkey" PRIMARY KEY ("ueId", "servingPlmnId");


--
-- TOC entry 2912 (class 2606 OID 33125)
-- Name: SdmSubscription SdmSubscription_Index; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SdmSubscription"
    ADD CONSTRAINT "SdmSubscription_Index" UNIQUE ("ueId", "nfInstanceId");


--
-- TOC entry 2914 (class 2606 OID 33127)
-- Name: SdmSubscription SdmSubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SdmSubscription"
    ADD CONSTRAINT "SdmSubscription_pkey" PRIMARY KEY ("ueId", "nfInstanceId");


--
-- TOC entry 2916 (class 2606 OID 33129)
-- Name: SessionManagementSubscriptionData SessionManagementSubscriptionData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SessionManagementSubscriptionData"
    ADD CONSTRAINT "SessionManagementSubscriptionData_pkey" PRIMARY KEY ("ueId", "servingPlmnId");


--
-- TOC entry 2918 (class 2606 OID 33131)
-- Name: SmPolicyData SmPolicyData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SmPolicyData"
    ADD CONSTRAINT "SmPolicyData_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2920 (class 2606 OID 33133)
-- Name: SmfRegistration SmfRegistration_index; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SmfRegistration"
    ADD CONSTRAINT "SmfRegistration_index" UNIQUE ("ueId", "pduSessionId");


--
-- TOC entry 2922 (class 2606 OID 33135)
-- Name: SmfRegistration SmfRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SmfRegistration"
    ADD CONSTRAINT "SmfRegistration_pkey" PRIMARY KEY ("ueId", "pduSessionId");


--
-- TOC entry 2924 (class 2606 OID 41434)
-- Name: SmfSelectionSubscriptionData SmfSelectionSubscriptionData_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SmfSelectionSubscriptionData"
    ADD CONSTRAINT "SmfSelectionSubscriptionData_pkey" PRIMARY KEY ("ueId", "servingPlmnId");


--
-- TOC entry 2926 (class 2606 OID 33139)
-- Name: Smsf3GppAccessRegistration Smsf3GppAccessRegistration_index; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."Smsf3GppAccessRegistration"
    ADD CONSTRAINT "Smsf3GppAccessRegistration_index" UNIQUE ("ueId");


--
-- TOC entry 2928 (class 2606 OID 33141)
-- Name: Smsf3GppAccessRegistration Smsf3GppAccessRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."Smsf3GppAccessRegistration"
    ADD CONSTRAINT "Smsf3GppAccessRegistration_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2930 (class 2606 OID 33143)
-- Name: SmsfNon3GppAccessRegistration SmsfNon3GppAccessRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SmsfNon3GppAccessRegistration"
    ADD CONSTRAINT "SmsfNon3GppAccessRegistration_pkey" PRIMARY KEY ("ueId");


--
-- TOC entry 2932 (class 2606 OID 33145)
-- Name: SubscriptionDataSubscriptions SubscriptionDataSubscriptions_Index; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SubscriptionDataSubscriptions"
    ADD CONSTRAINT "SubscriptionDataSubscriptions_Index" UNIQUE ("ueId", "callbackReference", "originalCallbackReference");


--
-- TOC entry 2934 (class 2606 OID 33147)
-- Name: SubscriptionDataSubscriptions SubscriptionDataSubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: cekirdekSebekeKullanicisi
--

ALTER TABLE ONLY "public"."SubscriptionDataSubscriptions"
    ADD CONSTRAINT "SubscriptionDataSubscriptions_pkey" PRIMARY KEY ("ueId", "callbackReference", "originalCallbackReference");


--
-- TOC entry 2878 (class 1259 OID 33826)
-- Name: idx_gpsi_gin; Type: INDEX; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE INDEX "idx_gpsi_gin" ON "public"."AccessAndMobilitySubscriptionData" USING "gin" ((("data" -> 'gpsis'::"text")));


--
-- TOC entry 2937 (class 2620 OID 33148)
-- Name: AccessAndMobilitySubscriptionData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE ON "public"."AccessAndMobilitySubscriptionData" FOR EACH ROW EXECUTE PROCEDURE "public"."subscription_change_notification"('/am-data');


--
-- TOC entry 2938 (class 2620 OID 33151)
-- Name: AmPolicyData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE OF "data" ON "public"."AmPolicyData" FOR EACH ROW EXECUTE PROCEDURE "public"."am_policy_change_notification"();


--
-- TOC entry 2939 (class 2620 OID 33150)
-- Name: InfluenceData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER INSERT OR DELETE OR UPDATE ON "public"."InfluenceData" FOR EACH ROW EXECUTE PROCEDURE "public"."application_change_notification"();


--
-- TOC entry 2940 (class 2620 OID 33155)
-- Name: SMSManagementSubscriptionData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE ON "public"."SMSManagementSubscriptionData" FOR EACH ROW EXECUTE PROCEDURE "public"."subscription_change_notification"('/sms-mng-data');


--
-- TOC entry 2941 (class 2620 OID 33154)
-- Name: SMSSubscriptionData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE ON "public"."SMSSubscriptionData" FOR EACH ROW EXECUTE PROCEDURE "public"."subscription_change_notification"('/sms-data');


--
-- TOC entry 2942 (class 2620 OID 33149)
-- Name: SessionManagementSubscriptionData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE ON "public"."SessionManagementSubscriptionData" FOR EACH ROW EXECUTE PROCEDURE "public"."subscription_change_notification"('/sm-data');


--
-- TOC entry 2943 (class 2620 OID 33152)
-- Name: SmPolicyData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE OF "smPolicySnssaiData" ON "public"."SmPolicyData" FOR EACH ROW EXECUTE PROCEDURE "public"."sm_policy_change_notification"();


--
-- TOC entry 2944 (class 2620 OID 41431)
-- Name: SmfSelectionSubscriptionData change_notify; Type: TRIGGER; Schema: public; Owner: cekirdekSebekeKullanicisi
--

CREATE TRIGGER "change_notify" AFTER UPDATE ON "public"."SmfSelectionSubscriptionData" FOR EACH ROW EXECUTE PROCEDURE "public"."subscription_change_notification"('/smf-selection-data');


-- Completed on 2021-08-04 15:05:27

--
-- PostgreSQL database dump complete
--
