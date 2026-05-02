// Interfaces for type safety
export interface FormType {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  createdOn: Date;
  statusHistory: StatusHistoryEntry[];
}

export interface FormGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Inactive' | 'In-Progress';
  statusHistory: StatusHistoryEntry[];
  assignments: Assignment[];
}

// Create request interfaces
export interface CreateFormGroupRequest {
  name: string;
  code: string;
  description: string;
}

export interface Assignment {
  formId: string;
  assignedBy: string;
  effectiveFrom: Date;
  effectiveUpto: Date | null;
}

export interface StatusHistoryEntry {
  status: 'Active' | 'Inactive' | 'In-Progress';
  reason: string;
  user: string;
  timestamp: Date;
}

export interface MigrationHistoryItem {
  id: string;
  formId: string;
  formType: string;
  previousGroup: string;
  previousGroupId: string;
  revisedGroup: string;
  revisedGroupId: string;
  performedBy: string;
  performedOn: Date;
}

export interface ModalState {
  isManageGroupOpen: boolean;
  isChangeStatusOpen: boolean;
  isManageFormTypeOpen: boolean;
  isChangeFormTypeStatusOpen: boolean;
  editableGroup: FormGroup | null;
  statusChangeTarget: FormGroup | FormType | null;
  editableFormType: FormType | null;
  newStatus: string;
  statusChangeReason: string;
}
