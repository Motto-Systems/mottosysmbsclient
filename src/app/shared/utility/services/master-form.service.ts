import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map, catchError } from 'rxjs';

export interface MasterForm {
  id: number;
  title: string;
  code: string;
  group: string;
  type: string;
  createdOn: string;
  status: 'Published' | 'Draft' | 'Archived';
  createdBy?: string;
}

export interface FormConfiguration {
  formTypes: string[];
  dataTypes: string[];
  formulaOperators: string[];
  mandatoryOptions: string[];
  statusOptions: string[];
  mockExtractedFields: string[];
  mockStructureTemplates: any[];
}

export interface ExtractedField {
  name: string;
  dataType: string;
  formula?: string;
  isCustom?: boolean;
  id?: string;
}

export interface ConfiguredItem {
  id: string;
  type: 'Tab' | 'Section';
  title: string;
  mandatory: 'Yes' | 'No';
  skip: 'Yes' | 'No';
  sections?: ConfiguredSection[];
  mappedFields?: ExtractedField[];
  customFields?: ExtractedField[];
}

export interface ConfiguredSection {
  id: string;
  title: string;
  mandatory: 'Yes' | 'No';
  skip: 'Yes' | 'No';
  mappedFields: ExtractedField[];
  customFields: ExtractedField[];
}

@Injectable({
  providedIn: 'root'
})
export class MasterFormService {
  private masterFormsData: MasterForm[] = [];
  private formConfigurationData: FormConfiguration | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Get all master forms
   */
  getMasterForms(): Observable<MasterForm[]> {
    // If data is already cached, return it
    if (this.masterFormsData.length > 0) {
      return of(this.masterFormsData).pipe(delay(300));
    }

    // Otherwise fetch from JSON file
    return this.http.get<MasterForm[]>('/assets/mock-data/master-forms.json').pipe(
      map(data => {
        this.masterFormsData = data; // Cache the data
        return data;
      }),
      delay(300), // Simulate network delay
      catchError(error => {
        console.error('Error loading master forms:', error);
        return of([]);
      })
    );
  }

  /**
   * Get form configuration data
   */
  getFormConfiguration(): Observable<FormConfiguration> {
    // If data is already cached, return it
    if (this.formConfigurationData) {
      return of(this.formConfigurationData).pipe(delay(100));
    }

    // Otherwise fetch from JSON file
    return this.http.get<FormConfiguration>('/assets/mock-data/form-configuration.json').pipe(
      map(data => {
        this.formConfigurationData = data; // Cache the data
        return data;
      }),
      delay(100), // Simulate network delay
      catchError(error => {
        console.error('Error loading form configuration:', error);
        // Return default configuration in case of error
        return of({
          formTypes: ["Standard Form", "Checklist", "Survey"],
          dataTypes: ["Text Box", "Drop Down", "Checkbox"],
          formulaOperators: ["+", "-", "*", "/"],
          mandatoryOptions: ["Yes", "No"],
          statusOptions: ["Draft", "Published", "Archived"],
          mockExtractedFields: [],
          mockStructureTemplates: []
        });
      })
    );
  }

  /**
   * Simulate AI-based placeholder suggestion
   */
  suggestPlaceholders(remarks: string): Observable<string[]> {
    return this.getFormConfiguration().pipe(
      map(config => {
        // Simulate AI processing based on remarks content
        const suggestions = config.mockExtractedFields.slice(0, 5);
        return suggestions;
      }),
      delay(2000) // Simulate AI processing time
    );
  }

  /**
   * Simulate AI-based structure suggestion
   */
  suggestFormStructure(formData: any): Observable<ConfiguredItem[]> {
    return this.getFormConfiguration().pipe(
      map(config => {
        // Generate structure based on form data
        const templates = config.mockStructureTemplates.map(template => ({
          ...template,
          id: 'tab-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
        }));
        return templates;
      }),
      delay(2000) // Simulate AI processing time
    );
  }

  /**
   * Simulate file processing for placeholder extraction
   */
  processUploadedFile(file: File): Observable<{ status: string; extractedFields: string[] }> {
    return new Observable(observer => {
      // Simulate file processing
      observer.next({ status: `Processing ${file.name}...`, extractedFields: [] });
      
      setTimeout(() => {
        const mockFields = ['@#employee_name#@', '@#department#@', '@#position#@', '@#start_date#@'];
        const extractedFields = mockFields.map(f => f.substring(2, f.length - 2));
        
        observer.next({ 
          status: `Successfully processed ${file.name}.`, 
          extractedFields 
        });
        observer.complete();
      }, 2000);
    });
  }

  /**
   * Save form data (mock implementation)
   */
  saveForm(formData: any): Observable<{ success: boolean; message: string }> {
    console.log('Saving form:', formData);
    return of({ 
      success: true, 
      message: 'Form saved successfully!' 
    }).pipe(delay(500));
  }

  /**
   * Filter forms based on search criteria
   */
  searchForms(searchTerm: string, filters: any): Observable<MasterForm[]> {
    return this.getMasterForms().pipe(
      map(allForms => {
        let filteredForms = [...allForms];

        // Apply search term filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredForms = filteredForms.filter(form =>
            form.title.toLowerCase().includes(term) ||
            form.code.toLowerCase().includes(term) ||
            form.group.toLowerCase().includes(term) ||
            form.type.toLowerCase().includes(term) ||
            (form.createdBy && form.createdBy.toLowerCase().includes(term))
          );
        }

        // Apply advanced filters
        if (filters.title) {
          filteredForms = filteredForms.filter(form =>
            form.title.toLowerCase().includes(filters.title.toLowerCase())
          );
        }
        if (filters.code) {
          filteredForms = filteredForms.filter(form =>
            form.code.toLowerCase().includes(filters.code.toLowerCase())
          );
        }
        if (filters.group) {
          filteredForms = filteredForms.filter(form =>
            form.group.toLowerCase().includes(filters.group.toLowerCase())
          );
        }
        if (filters.type) {
          filteredForms = filteredForms.filter(form => form.type === filters.type);
        }
        if (filters.status) {
          filteredForms = filteredForms.filter(form => form.status === filters.status);
        }
        if (filters.dateCreated) {
          filteredForms = filteredForms.filter(form => form.createdOn === filters.dateCreated);
        }
        if (filters.createdBy) {
          filteredForms = filteredForms.filter(form =>
            form.createdBy && form.createdBy.toLowerCase().includes(filters.createdBy.toLowerCase())
          );
        }

        return filteredForms;
      }),
      delay(200) // Simulate search delay
    );
  }
}
