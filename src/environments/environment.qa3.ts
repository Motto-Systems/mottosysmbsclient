import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: true,

    baseUrl: "http://192.168.1.8:9295/mspl20qrcsapiqa3/api/",
    workFlowApiUrl: "http://192.168.1.8:9295/mspl20workflowapiqa3/api/",
    fmeBaseUrl: "http://192.168.1.8:9295/mspl20fmeapiqa3/api/",
    usmApiUrl: "http://192.168.1.8:9295/mspl20usmapiqa3/api/",
    utilApiUrl: "http://192.168.1.8:9295/mspl20utilapiqa3/api/",
    invApiUrl: "http://192.168.1.8:9295/mspl20invapiqa3/api/",
    ebprApiUrl: "http://192.168.1.8:9295/mspl20ebprapiqa3/api/",
    docmrgApiUrl: "http://192.168.1.8:9295/mspl20docmgrapiqa3/api/",
    limsApiUrl: "http://192.168.1.8:9295/mspl20limsapiqa3/api/",
    usmurl: "http://192.168.1.8:9295/mspl20usmqa3/",
    hubUrl: "http://192.168.1.8:9295/mspl20qrmanagementserviceqa3/pairingHub",

    isScanApp: false,
    isMMICIntegrated: false,

    usrMngUrlMode: "MSPL_TOKEN_QA3",
    usrSetDomain: "192.168.1.8",


}