import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: false,
    // usmurl: "",
    ebprUrl: "",
    // ebprUrl: "http://localhost:1001/",
     //baseUrl: "https://localhost:7169/api/",
    // fmeBaseUrl: "https://localhost:7282/api/",
    // baseUrl: "https://localhost:7079/api/",
    // fmeBaseUrl: "https://localhost:7282/api/",
     //usmApiUrl: "https://localhost:7212/api/",
    // invApiUrl: "https://localhost:7264/api/",
    // utilApiUrl: "https://localhost:7012/api/",
    // usmApiUrl: "http://192.168.1.8:9291/mspl20usmapidev/api/",
    // ebprApiUrl: "https://localhost:7293/api/",
    // docmrgApiUrl: "https://localhost:7173/api/",
    //workFlowApiUrl: " https://localhost:7116/api/",

    //QA Urls
    // baseUrl: "https://192.168.1.2:9296/mspl20qrcsapiqa/api/",
    // workFlowApiUrl: "https://192.168.1.2:9296/mspl20workflowapiqa/api/",
    // fmeBaseUrl: "https://192.168.1.2:9296/mspl20fmeapiqa/api/",
    // usmApiUrl: "https://192.168.1.2:9296/mspl20usmapiqa/api/",
    // utilApiUrl: "https://192.168.1.2:9296/mspl20utilapiqa/api/",
    // invApiUrl: "https://192.168.1.2:9296/mspl20invapiqa/api/",
    // ebprApiUrl: "https://192.168.1.2:9296/mspl20ebprapiqa/api/",
    // docmrgApiUrl: "https://192.168.1.2:9296/mspl20docmgrapiqa/api/",
    // limsApiUrl: "https://192.168.1.2:9296/mspl20limsapiqa/api/",
    // usmurl: "https://192.168.1.2:9296/mspl20usmqa/",
    // hubUrl: "https://192.168.1.2:9296/mspl20qrcsapiqa/pairingHub",

    //Dev URL's - kindly do comment/uncomment on your need without removing.
    // baseUrl: "http://192.168.1.100/dev/qrcs-api/api/",
    baseUrl: "http://192.168.1.8:9291/mspl20qrcsapidev/api/",
    workFlowApiUrl: "http://192.168.1.8:9291/mspl20workflowservicedev/api/",
    fmeBaseUrl: "http://192.168.1.8:9291/mspl20fmeapidev/api/",
    usmApiUrl: "http://192.168.1.8:9291/mspl20usmapidev/api/",
    utilApiUrl: "http://192.168.1.8:9291/mspl20utilapidev/api/",
    invApiUrl: "http://192.168.1.8:9291/mspl20invapidev/api/",
    ebprApiUrl: "http://192.168.1.8:9291/mspl20ebprapidev/api/",
    docmrgApiUrl: "http://192.168.1.8:9291/mspl20docmrgapidev/api/",
    limsApiUrl: "http://192.168.1.8:9291/mspl20limsapidev/api/",
    usmurl: "http://192.168.1.8:9291/mspl20usmdev/",
    hubUrl: "http://192.168.1.8:9291/mspl20qrcsapidev/pairingHub",
    dmsvwrUrl: "http://192.168.1.8:8131/slsldmsvwrqa/UserFiles/Documents/QRCS\\",
    isScanApp: false,

    dateFormat: "dd-MMM-yyyy",
    dateTimeFormat: "dd-MMM-yyyy HH:mm",
    timeFormat: "HH:mm",

    // usrMngUrlMode: "MSPL_TOKEN_QA2",
    // usrSetDomain: "192.168.1.8",
    useMockApi: true,
    // isMMICIntegrated: false

};
