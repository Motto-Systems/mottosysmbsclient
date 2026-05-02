import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormType, FormGroup, MigrationHistoryItem } from '../interfaces/form.interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formTypesSubject = new BehaviorSubject<FormType[]>([]);
  private formGroupsSubject = new BehaviorSubject<FormGroup[]>([]);
  private migrationHistorySubject = new BehaviorSubject<MigrationHistoryItem[]>([]);

  public formTypes$ = this.formTypesSubject.asObservable();
  public formGroups$ = this.formGroupsSubject.asObservable();
  public migrationHistory$ = this.migrationHistorySubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    // Load form types
    this.apiService.getFormTypes().pipe(
      catchError(error => {
        console.error('Error loading form types:', error);
        return of([]);
      })
    ).subscribe(formTypes => {
      this.formTypesSubject.next(formTypes);
    });

    // Load form groups
    this.apiService.getFormGroups().pipe(
      catchError(error => {
        console.error('Error loading form groups:', error);
        return of([]);
      })
    ).subscribe(formGroups => {
      console.log('FormDataService - Loaded form groups:', formGroups);
      this.formGroupsSubject.next(formGroups);
    });

    // Load migration history
    this.apiService.getMigrationHistory().pipe(
      catchError(error => {
        console.error('Error loading migration history:', error);
        return of([]);
      })
    ).subscribe(history => {
      this.migrationHistorySubject.next(history);
    });
  }

  // Form Types methods
  getFormTypes(): FormType[] {
    return this.formTypesSubject.value;
  }

  getFormTypes$(): Observable<FormType[]> {
    return this.formTypes$;
  }

  addFormType(formType: Omit<FormType, 'id' | 'createdOn' | 'statusHistory'>): FormType {
    const newFormType: FormType = {
      ...formType,
      id: `FT-${Date.now()}`,
      createdOn: new Date(),
      statusHistory: [{ 
        status: 'Active', 
        reason: 'Initial creation', 
        user: 'Admin', 
        timestamp: new Date() 
      }]
    };
    
    // Update local state immediately
    const currentFormTypes = this.formTypesSubject.value;
    this.formTypesSubject.next([...currentFormTypes, newFormType]);
    
    // Call API service (in a real app, this would sync with backend)
    this.apiService.createFormType(formType).pipe(
      catchError(error => {
        console.error('Error creating form type:', error);
        // In case of error, remove the form type from local state
        const currentFormTypes = this.formTypesSubject.value;
        this.formTypesSubject.next(currentFormTypes.filter(ft => ft.id !== newFormType.id));
        return of(null);
      })
    ).subscribe();
    
    return newFormType;
  }

  updateFormType(id: string, updates: Partial<FormType>): void {
    this.apiService.updateFormType(id, updates).pipe(
      tap(() => {
        const currentFormTypes = this.formTypesSubject.value;
        const index = currentFormTypes.findIndex(ft => ft.id === id);
        if (index > -1) {
          currentFormTypes[index] = { ...currentFormTypes[index], ...updates };
          this.formTypesSubject.next([...currentFormTypes]);
        }
      }),
      catchError(error => {
        console.error('Error updating form type:', error);
        return of(null);
      })
    ).subscribe();
  }

  // Form Groups methods
  getFormGroups(): FormGroup[] {
    return this.formGroupsSubject.value;
  }

  getFormGroups$(): Observable<FormGroup[]> {
    return this.formGroups$;
  }

  getActiveGroups(): FormGroup[] {
    return this.formGroupsSubject.value.filter(group => group.status === 'Active');
  }

  addFormGroup(group: Omit<FormGroup, 'id' | 'statusHistory' | 'assignments'>): FormGroup {
    const newGroup: FormGroup = {
      ...group,
      id: `GRP-${Date.now()}`,
      statusHistory: [{ 
        status: 'Active', 
        reason: 'Initial creation', 
        user: 'Admin', 
        timestamp: new Date() 
      }],
      assignments: []
    };
    
    // Update local state only - API call is handled by the component
    const currentGroups = this.formGroupsSubject.value;
    this.formGroupsSubject.next([...currentGroups, newGroup]);
    
    return newGroup;
  }

  // Add a group that was already created via API to the local state
  addCreatedFormGroup(group: FormGroup): void {
    const currentGroups = this.formGroupsSubject.value;
    this.formGroupsSubject.next([...currentGroups, group]);
  }

  updateFormGroup(id: string, updates: Partial<FormGroup>): void {
    this.apiService.updateFormGroup(id, updates).pipe(
      tap(() => {
        const currentGroups = this.formGroupsSubject.value;
        const index = currentGroups.findIndex(g => g.id === id);
        if (index > -1) {
          currentGroups[index] = { ...currentGroups[index], ...updates };
          this.formGroupsSubject.next([...currentGroups]);
        }
      }),
      catchError(error => {
        console.error('Error updating form group:', error);
        return of(null);
      })
    ).subscribe();
  }

  // Utility methods
  getFormTypeName(formId: string): string {
    const formType = this.formTypesSubject.value.find(ft => ft.id === formId);
    return formType ? formType.name : 'Unknown';
  }

  getFormTypeCode(formId: string): string {
    const formType = this.formTypesSubject.value.find(ft => ft.id === formId);
    return formType ? formType.code : 'Unknown';
  }

  getActiveAssignmentsCount(group: FormGroup): number {
    return group.assignments.filter(a => a.effectiveUpto === null).length;
  }

  // Migration methods
  getMigrationHistory(): MigrationHistoryItem[] {
    return this.migrationHistorySubject.value;
  }

  addMigrationHistory(item: MigrationHistoryItem): void {
    const currentHistory = this.migrationHistorySubject.value;
    this.migrationHistorySubject.next([item, ...currentHistory]);
  }

  removeMigrationHistory(id: string): void {
    const currentHistory = this.migrationHistorySubject.value;
    this.migrationHistorySubject.next(currentHistory.filter(item => item.id !== id));
  }
}
