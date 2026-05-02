import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: false,
    ebprUrl: "",

    //Dev URL's - kindly do comment/uncomment on your need without removing.
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
    hubUrl: "http://192.168.1.8:9291/mspl20qrmanagementservice/pairingHub",
    isScanApp: true,

    // usrMngUrlMode: "MSPL_TOKEN_QA2",
    usrSetDomain: "192.168.1.8",
    useMockApi: true,

};
