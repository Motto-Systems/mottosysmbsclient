import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: false,

    // baseUrl: "",
    // baseUrl: "http://localhost:5009/api/",
    // fmeBaseUrl: "https://localhost:7282/api/",
    // usmApiUrl: "https://localhost:7212/api/",
    // invApiUrl: "https://localhost:7264/api/",
    // utilApiUrl: "https://localhost:7204/api/",
    usmurl: "",
    ebprUrl: "",

    baseUrl: "http://192.168.1.8:9291/mspl20qrcsapidev/api",
    fmeBaseUrl: "http://192.168.1.8:9291/mspl20fmeapidev/api/",
    usmApiUrl: "http://192.168.1.8:9291/mspl20usmapidev/api/",
    utilApiUrl: "http://192.168.1.8:9291/mspl20utilapidev/api/",
    invApiUrl: "http://192.168.1.8:9291/mspl20invapidev/api/",
    ebprApiUrl: "http://192.168.1.8:9292/mottosysebprqaapi/api/",
    docmrgApiUrl: "http://192.168.1.8:9291/mspl20docmrgapidev/api/",
    limsApiUrl: "http://192.168.1.8:9291/mspl20limsapidev/api/",
    workFlowApiUrl: "http://192.168.1.8:9291/mspl20workflowservicedev/api/",
    hubUrl: "http://192.168.1.8:9291/mspl20qrcsapidev/pairingHub/",
    dmsvwrUrl: "http://192.168.1.8:8131/slsldmsvwrqa/UserFiles/Documents/QRCS\\",

    isScanApp: false,

    // qa
    // baseUrl: "http://192.168.1.8:9292/mottosysmmicapiqa/api/",
    // fmeBaseUrl: "http://192.168.1.8:9292/mottosysformengineqaapi/api/",
    // usmApiUrl: "http://192.168.1.8:9292/mottosysusmapiqa/api/",
    // intApiUrl: "http://192.168.1.8:9292/mottosysblendqaapi/api/",
    // utilApiUrl: "http://192.168.1.8:9292/mottosysutilqaapi/api/",
    // invApiUrl: "http://192.168.1.8:9292/mottosysinvapiqa/api/",
    // usmurl: "http://192.168.1.8:9292/mottosysusmqa/",
    // production: true,

    usrMngUrlMode: "SLSL_TOKEN_LOCAL",
    usrSetDomain: "localhost",
    //To round figure the "remaining qty to be selected" in pack selection
    useMockApi: false,
    // isMMICIntegrated: false


};
