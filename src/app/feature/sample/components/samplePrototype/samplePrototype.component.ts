import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  SampleBO, SampleFieldsInfo,
  SampleGridColumnsInfo, SampleGridActions,
  DropdownChangeEvent, LookupSelectEvent
} from '../../sample.model';
import { CommonMethods } from '../../../../shared/utility/commonMethods';
import { ICustomDropdownNCheckListData } from '../../../../shared/globalShared/customCheckList/customChecklistModel';
import { GridColumnBO } from '../../../../shared/utility/commonModel';
import { ActionBO } from '../../../../shared/globalShared/appGrid/appGrid.model';

@Component({
  selector: 'app-sample-prototype',
  standalone: false,
  templateUrl: './samplePrototype.html',
  styleUrls: ['./samplePrototype.scss'],
})
export class SamplePrototypeComponent {

  fieldsInfo: SampleFieldsInfo = new SampleFieldsInfo();
  sampleBO: SampleBO = new SampleBO();

  // ─── Grid ─────────────────────────────────────────────────────────────────

  gridHeaders: GridColumnBO[]              = CommonMethods.prepareGridColumns(SampleGridColumnsInfo);
  gridActions: ActionBO[]                  = SampleGridActions;
  dataSource: MatTableDataSource<SampleBO> = CommonMethods.bindMaterialGridData([
    { sNo: 1, fullName: 'Alice Johnson',  email: 'alice@example.com',  department: 'Information Technology' },
    { sNo: 2, fullName: 'Bob Martinez',   email: 'bob@example.com',    department: 'Finance' },
    { sNo: 3, fullName: 'Carol Williams', email: 'carol@example.com',  department: 'Human Resources' },
  ]) as MatTableDataSource<SampleBO>;

  // ─── Modal ────────────────────────────────────────────────────────────────

  isModalOpen: boolean = false;

  openModal(): void  { this.isModalOpen = true; }
  closeModal(): void { this.isModalOpen = false; }

  // ─── Dropdown handlers ────────────────────────────────────────────────────

  setDepartment(event: DropdownChangeEvent): void {
    this.sampleBO.departmentId = event.value as number;
  }

  setRole(event: DropdownChangeEvent): void {
    this.sampleBO.roleIds = Array.isArray(event.value) ? event.value as number[] : [event.value as number];
  }

  // ─── Checklist handler ────────────────────────────────────────────────────

  onSkillsChange(event: ICustomDropdownNCheckListData[]): void {
    this.sampleBO.skillIds = event;
  }

  // ─── Lookup handler ───────────────────────────────────────────────────────

  onEmployeeSelect(event: LookupSelectEvent): void {
    this.sampleBO.employee = event.val;
  }

  // ─── Date handler ─────────────────────────────────────────────────────────

  onDateChange(event: Date | null): void {
    this.sampleBO.joiningDate = event;
  }

  // ─── Grid action handler ──────────────────────────────────────────────────

  onGridAction(event: { action: string; data: SampleBO }): void {
    console.log('Grid action:', event.action, event.data);
  }

  // ─── Link handler ─────────────────────────────────────────────────────────

  onLinkClick(): void {
    console.log('Link clicked');
  }

  // ─── Button actions ───────────────────────────────────────────────────────

  save(): void {
    console.log('Sample BO (Save):', this.sampleBO);
  }

  clear(): void {
    this.sampleBO   = new SampleBO();
    this.fieldsInfo = new SampleFieldsInfo();
  }

  cancel(): void {
    console.log('Cancelled');
  }
}
