//navigate Urls
export class NavigateUrls {
  public static emptyPath = '';
  public static home = "/root/home";
  public static dynamicSearch = "/root/search";
  // Label Design
  public static newLabelDesign = "/root/labelDesign/newLblDesign?id={0}&bid={1}&formID={2}";
  public static viewLabelDesign = "/root/labelDesign/viewLblDesign?id={0}&bid={1}&formID={2}";
  public static searchLabelDesign = "/root/labelDesign/search";
  // Label Generation
  public static viewLabelScan = '/root/labelGen/labelscan';
  public static searchGenReq = '/root/labelGen/searchGenReq';
  // Print Request
  public static searchPrintReq = "/root/printReq/search";
  public static newPrintReq = '/root/printReq/manage?id={0}&bid={1}&formID={2}';
  public static viewPrintReq = '/root/printReq/view?id={0}&bid={1}&formID={2}';

  //User Master
  public static createNewUserMaster = "/root/userMaster/createNewUserMaster?{0}&bid={1}&formID={2}";

  //SCAN Auth
  public static scanAuth = "/scanRoot/scanAuth";

}

