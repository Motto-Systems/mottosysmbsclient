import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, catchError, take } from 'rxjs/operators';
import { FormType, FormGroup, MigrationHistoryItem, CreateFormGroupRequest } from '../interfaces/form.interfaces';
import { API_CONFIG, getApiUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  // Form Types API methods
  getFormTypes(): Observable<FormType[]> {
    console.log('Getting form types...');
    // Load directly from assets folder
    return this.http.get<FormType[]>('/assets/mock-data/form-types.json').pipe(
      map(formTypes => {
        console.log('Loaded form types:', formTypes);
        return formTypes.map(ft => ({
          ...ft,
          createdOn: new Date(ft.createdOn),
          statusHistory: ft.statusHistory.map(sh => ({
            ...sh,
            timestamp: new Date(sh.timestamp)
          }))
        }));
      }),
      catchError(error => {
        console.error('Error loading form types:', error);
        return of([]);
      })
    );
  }

  createFormType(formType: Omit<FormType, 'id' | 'createdOn' | 'statusHistory'>): Observable<FormType> {
    // Simulate API call with delay
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
    
    // TODO: Replace with actual POST request
    // return this.http.post<FormType>('/api/form-types', newFormType);
    return of(newFormType).pipe(delay(500));
  }

  updateFormType(id: string, updates: Partial<FormType>): Observable<FormType> {
    // Simulate API call with delay
    // TODO: Replace with actual PUT request
    // return this.http.put<FormType>(`/api/form-types/${id}`, updates);
    return of({ ...updates, id } as FormType).pipe(delay(500));
  }

  deleteFormType(id: string): Observable<boolean> {
    // Simulate API call with delay
    // TODO: Replace with actual DELETE request
    // return this.http.delete<boolean>(`/api/form-types/${id}`);
    return of(true).pipe(delay(500));
  }

  // Form Groups API methods
  getFormGroups(): Observable<FormGroup[]> {
    console.log('Getting form groups...');
    
    if (API_CONFIG.USE_MOCK_DATA) {
      // Load directly from assets folder
      return this.http.get<FormGroup[]>('/assets/mock-data/form-groups.json').pipe(
        map(formGroups => {
          console.log('Loaded form groups:', formGroups);
          return formGroups.map(fg => ({
            ...fg,
            statusHistory: fg.statusHistory.map(sh => ({
              ...sh,
              timestamp: new Date(sh.timestamp)
            })),
            assignments: fg.assignments.map(a => ({
              ...a,
              effectiveFrom: new Date(a.effectiveFrom),
              effectiveUpto: a.effectiveUpto ? new Date(a.effectiveUpto) : null
            }))
          }));
        }),
        catchError(error => {
          console.error('Error loading form groups:', error);
          return of([]);
        })
      );
    } else {
      // Call real backend API
      return this.http.get<any>(getApiUrl('FORM_GROUPS')).pipe(
        map(response => {
          console.log('API Response:', response);
          if (response.success && response.data) {
            // Transform backend response to match our FormGroup interface
            return response.data.map((backendGroup: any) => ({
              id: backendGroup.id,
              name: backendGroup.name,
              code: backendGroup.code,
              description: backendGroup.description,
              status: backendGroup.status,
              statusHistory: [{ 
                status: backendGroup.status, 
                reason: 'Initial creation', 
                user: backendGroup.createdBy, 
                timestamp: new Date(backendGroup.createdOn) 
              }],
              assignments: []
            } as FormGroup));
          } else {
            throw new Error(response.message || 'Failed to load form groups');
          }
        }),
        catchError(error => {
          console.error('Error loading form groups:', error);
          return of([]);
        })
      );
    }
  }

  createFormGroup(group: CreateFormGroupRequest): Observable<FormGroup> {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API call with delay (mock mode)
      const newGroup: FormGroup = {
        ...group,
        id: `GRP-${Date.now()}`,
        status: 'In-Progress',
        statusHistory: [{ 
          status: 'In-Progress', 
          reason: 'Initial creation', 
          user: 'Admin', 
          timestamp: new Date() 
        }],
        assignments: []
      };
      return of(newGroup).pipe(delay(500));
    } else {
      // Call real backend API
      const createRequest = {
        name: group.name,
        code: group.code,
        description: group.description || ''
      };
      
      return this.http.post<any>(getApiUrl('FORM_GROUPS'), createRequest).pipe(
        take(1), // Ensure the observable only emits once
        map(response => {
          if (response.success && response.data) {
            // Transform backend response to match our FormGroup interface
            const backendGroup = response.data;
            return {
              id: backendGroup.id,
              name: backendGroup.name,
              code: backendGroup.code,
              description: backendGroup.description,
              status: backendGroup.status,
              statusHistory: [{ 
                status: backendGroup.status, 
                reason: 'Initial creation', 
                user: backendGroup.createdBy, 
                timestamp: new Date(backendGroup.createdOn) 
              }],
              assignments: []
            } as FormGroup;
          } else {
            throw new Error(response.message || 'Failed to create form group');
          }
        }),
        catchError(error => {
          console.error('Error creating form group:', error);
          throw error;
        })
      );
    }
  }

  checkFormGroupCodeUniqueness(code: string, excludeId?: string): Observable<boolean> {
    if (API_CONFIG.USE_MOCK_DATA) {
      // Mock implementation - always return true for simplicity
      return of(true).pipe(delay(300));
    } else {
      // Call real backend API
      let url = `${getApiUrl('FORM_GROUPS')}/check-code-uniqueness?code=${encodeURIComponent(code)}`;
      if (excludeId) {
        url += `&excludeId=${excludeId}`;
      }
      
      return this.http.get<any>(url).pipe(
        map(response => {
          if (response.success) {
            return response.data; // Returns true if code is unique, false if already exists
          } else {
            throw new Error(response.message || 'Failed to check code uniqueness');
          }
        }),
        catchError(error => {
          console.error('Error checking code uniqueness:', error);
          // If there's an error, assume the code is not unique to be safe
          return of(false);
        })
      );
    }
  }

  updateFormGroup(id: string, updates: Partial<FormGroup>): Observable<FormGroup> {
    // Simulate API call with delay
    // TODO: Replace with actual PUT request
    // return this.http.put<FormGroup>(`/api/form-groups/${id}`, updates);
    return of({ ...updates, id } as FormGroup).pipe(delay(500));
  }

  deleteFormGroup(id: string): Observable<boolean> {
    // Simulate API call with delay
    // TODO: Replace with actual DELETE request
    // return this.http.delete<boolean>(`/api/form-groups/${id}`);
    return of(true).pipe(delay(500));
  }

  // Assignment API methods
  assignFormTypesToGroup(groupId: string, formIds: string[]): Observable<boolean> {
    // Simulate API call with delay
    // TODO: Replace with actual POST request
    // return this.http.post<boolean>(`/api/form-groups/${groupId}/assignments`, { formIds });
    return of(true).pipe(delay(500));
  }

  unassignFormTypesFromGroup(groupId: string, formIds: string[]): Observable<boolean> {
    // Simulate API call with delay
    // TODO: Replace with actual DELETE request
    // return this.http.delete<boolean>(`/api/form-groups/${groupId}/assignments`, { body: { formIds } });
    return of(true).pipe(delay(500));
  }

  // Migration API methods
  getMigrationHistory(): Observable<MigrationHistoryItem[]> {
    console.log('Getting migration history...');
    // Load directly from assets folder
    return this.http.get<MigrationHistoryItem[]>('/assets/mock-data/migration-history.json').pipe(
      map(history => {
        console.log('Loaded migration history:', history);
        return history.map(item => ({
          ...item,
          performedOn: new Date(item.performedOn)
        }));
      }),
      catchError(error => {
        console.error('Error loading migration history:', error);
        return of([]);
      })
    );
  }

  migrateFormTypes(sourceGroupId: string, targetGroupId: string, formIds: string[]): Observable<MigrationHistoryItem[]> {
    // Simulate API call with delay
    const migrationItems: MigrationHistoryItem[] = formIds.map(formId => ({
      id: `MIG-${Date.now()}-${formId}`,
      formType: 'Unknown', // Will be resolved by the service
      formId,
      previousGroup: 'Unknown',
      previousGroupId: sourceGroupId,
      revisedGroup: 'Unknown',
      revisedGroupId: targetGroupId,
      performedBy: 'Admin',
      performedOn: new Date()
    }));

    // TODO: Replace with actual POST request
    // return this.http.post<MigrationHistoryItem[]>('/api/migrations', { sourceGroupId, targetGroupId, formIds });
    return of(migrationItems).pipe(delay(500));
  }

  revertMigration(migrationId: string): Observable<boolean> {
    // Simulate API call with delay
    // TODO: Replace with actual DELETE request
    // return this.http.delete<boolean>(`/api/migrations/${migrationId}`);
    return of(true).pipe(delay(500));
  }

  // User/Auth API methods (for future use)
  getCurrentUser(): Observable<any> {
    // Simulate API call with delay
    // TODO: Replace with actual GET request
    // return this.http.get<any>('/api/auth/current-user');
    return of({
      id: 'user123',
      name: 'Admin',
      email: 'admin@example.com',
      role: 'Administrator'
    }).pipe(delay(300));
  }

  // Audit/Logging API methods (for future use)
  logUserAction(action: string, details: any): Observable<boolean> {
    // Simulate API call with delay
    // TODO: Replace with actual POST request
    // return this.http.post<boolean>('/api/audit/log', { action, details, timestamp: new Date() });
    return of(true).pipe(delay(200));
  }
}
