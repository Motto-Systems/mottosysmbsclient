import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: true,

    baseUrl: "https://192.168.1.2:9296/mspl20qrcsapiqa/api/",
    workFlowApiUrl: "https://192.168.1.2:9296/mspl20workflowapiqa/api/",
    fmeBaseUrl: "https://192.168.1.2:9296/mspl20fmeapiqa/api/",
    usmApiUrl: "https://192.168.1.2:9296/mspl20usmapiqa/api/",
    utilApiUrl: "https://192.168.1.2:9296/mspl20utilapiqa/api/",
    invApiUrl: "https://192.168.1.2:9296/mspl20invapiqa/api/",
    ebprApiUrl: "https://192.168.1.2:9296/mspl20ebprapiqa/api/",
    docmrgApiUrl: "https://192.168.1.2:9296/mspl20docmgrapiqa/api/",
    limsApiUrl: "https://192.168.1.2:9296/mspl20limsapiqa/api/",
    usmurl: "https://192.168.1.2:9296/mspl20usmqa/",
    hubUrl: "https://192.168.1.2:9296/mspl20qrcsapiqa/pairingHub",

    isScanApp: true,

    dateFormat: "dd-MMM-yyyy",
    dateTimeFormat: "dd-MMM-yyyy HH:mm",
    timeFormat: "HH:mm",

    usrMngUrlMode: "MSPL_TOKEN_QA",
    usrSetDomain: "192.168.1.2",


}