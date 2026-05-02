import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: true,

    baseUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslqrcsapiuatv1/api/",
    workFlowApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslworkflowapiuatv1/api/",
    fmeBaseUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslfmeapiuatv1/api/",
    usmApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslusmapiuatv1/api/",
    utilApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslutilapiuatv1/api/",
    invApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslinvapiuatv1/api/",
    ebprApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslebprapiuatv1/api/",
    docmrgApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slsldocmgmtapiuatv1/api/",
    limsApiUrl: "http://sl04srtgmp1.saplcorp.com:8082/slsllimsapiuatv1/api/",
    usmurl: "http://sl04srtgmp1.saplcorp.com:8082/slslusmuatv1/",
    hubUrl: "http://sl04srtgmp1.saplcorp.com:8082/slslqrcsapiuatv1/pairingHub",

    dateFormat: "dd-MMM-yyyy",
    dateTimeFormat: "dd-MMM-yyyy HH:mm",
    timeFormat: "HH:mm",
    
    isScanApp: false,
    isMMICIntegrated: true,
    usrMngUrlMode: "SLSL_TOKEN_UAT_V1",
    usrSetDomain: "sl04srtgmp1.saplcorp.com",


}