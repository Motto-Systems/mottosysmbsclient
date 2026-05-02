import { defaultEnvironment } from "./environment.default";

export const environment = {
    ...defaultEnvironment,
    production: true,

    baseUrl: "http://192.168.1.5:8084/ltstqrcsapidemo/api/",
    workFlowApiUrl: "http://192.168.1.5:8084/ltstworkflowapidemo/api/",

    fmeBaseUrl: "http://192.168.1.5:8084/ltstfmeapidemo/api/",
    usmApiUrl: "http://192.168.1.5:8084/ltstusmapidemo/api/",
    utilApiUrl: "http://192.168.1.5:8084/ltstutilapidemo/api/",
    invApiUrl: "http://192.168.1.5:8084/ltstinvapidemo/api/",
    intApiUrl: "http://192.168.1.5:8084/ltstintegrationapidemo/api/",
    ebprApiUrl: "http://192.168.1.5:8084/ltstebprapidemo/api/",
    usmurl: "http://192.168.1.5:8084/ltstusmclientdemo/",
    docmrgApiUrl: "http://192.168.1.5:8084/ltstdocmgmtapidemo/api/",
    ebprUrl: "http://192.168.1.5:8084/ltstebprclientdemo/",
    limsApiUrl: "http://192.168.1.5:8084/ltstlimsapidemo/api/",
    hubUrl: "http://192.168.1.8:9291/mspl20qrmanagementservice/pairingHub",

    isScanApp: false,

    recordsPerPage: 10,
    dateFormat: "dd/MM/yyyy",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    timeFormat: "HH:mm",
    usrMngUrlMode: "LTST_TOKEN_QA",
    usrSetDomain: "192.168.1.5",

};
