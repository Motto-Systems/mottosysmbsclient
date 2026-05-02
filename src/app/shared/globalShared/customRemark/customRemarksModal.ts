export class ManageRemarksBO {
  submissionID: string = "";
  remarks: string = "";
  remarksID: string = "";
  type: string = "";
  propertyName: string = "";
  moduleCode: string = "";
  parentNode: string = "";
}

export class RemarksServiceUrls {
  public static manageRemarks = "FormSubmission/ManageRemarks";
}

export class RemarkMessages {
  public static commentedUser = "Created user only allow to invalidate remarks";
}