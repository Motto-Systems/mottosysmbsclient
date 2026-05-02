import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: true,

    baseUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslqrcsapiuatv2/api/",
    workFlowApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslworkflowapiuatv2/api/",
    fmeBaseUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslfmeapiuatv2/api/",
    usmApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslusmapiuatv2/api/",
    utilApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslutilapiuatv2/api/",
    invApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslinvapiuatv2/api/",
    ebprApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslebprapiuatv2/api/",
    docmrgApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slsldocmgmtapiuatv2/api/",
    limsApiUrl: "http://sl04srtgmp1.saplcorp.com:8081/slsllimsapiuatv2/api/",
    usmurl: "http://sl04srtgmp1.saplcorp.com:8081/slslusmuatv2/",
    hubUrl: "http://sl04srtgmp1.saplcorp.com:8081/slslqrcsapiuatv2/pairingHub",

    dateFormat: "dd-MMM-yyyy",
    dateTimeFormat: "dd-MMM-yyyy HH:mm",
    timeFormat: "HH:mm",
    
    isScanApp: false,
    isMMICIntegrated: true,
    usrMngUrlMode: "SLSL_TOKEN_UAT_V2",
    usrSetDomain: "sl04srtgmp1.saplcorp.com",


}