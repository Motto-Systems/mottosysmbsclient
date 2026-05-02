# MBS Angular Prototype Repository

> **Purpose:** This repository is a base Angular application that serves as a **prototype generator** for frontend features.  
> It ships with fully implemented shared components, common methods, and standardized patterns so that every new feature can be built by composition — not by reinvention.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Feature Development Guidelines](#feature-development-guidelines)
4. [Shared Components Reference](#shared-components-reference)
5. [Common Models & Utilities](#common-models--utilities)
6. [Code Generation Rules](#code-generation-rules)
7. [AI Integration — Build AI Frontend Engineer](#ai-integration--build-ai-frontend-engineer)
8. [Mock Data Configuration](#mock-data-configuration)
9. [Development Workflow](#development-workflow)

---

## Project Overview

This Angular application is integrated with **Build AI — Frontend Engineer** to automatically generate feature module prototypes.  
The repository acts as a living template: the AI reads this document, understands the codebase conventions, and produces Angular feature code that works out-of-the-box without requiring structural modification.

### Key Principles

| Principle | Rule |
|-----------|------|
| **Reuse first** | Always use shared components. Never create new UI components unless they do not exist in the shared folder. |
| **Strongly typed** | No `any`. All models, inputs, and outputs must use explicit TypeScript types. |
| **Thin features** | Feature folders contain only `.ts` and `.html` files. No new component libraries, no new CSS frameworks. |
| **Pattern consistency** | Every feature must follow the same model / component / routing pattern used in `userMasters`. |

---

## Project Structure

```
src/
└── app/
    ├── app.config.ts               # Root providers
    ├── app.routes.ts               # Top-level lazy routes
    ├── app.material.module.ts      # Centralized Angular Material re-exports
    │
    ├── core/
    │   ├── context/                # App-wide context service
    │   └── services/               # HTTP, alert, loader, auth-guard, etc.
    │
    ├── feature/                    # ← ALL NEW FEATURES GO HERE
    │   ├── sample/                 # Reference prototype (see below)
    │   ├── userMasters/            # Reference feature implementation
    │   ├── approval/               # Approval workflow module
    │   └── dynamicModule/          # Dynamic form engine models
    │
    └── shared/
        ├── globalShared/           # Reusable UI components (source of truth)
        │   ├── appGrid/
        │   ├── appHeader/
        │   ├── appEditor/
        │   ├── appModalPopup/
        │   ├── appPagination/
        │   ├── customButton/
        │   ├── customCheckList/
        │   ├── customDateTimePicker/
        │   ├── customDropdown/
        │   ├── customLabel/
        │   ├── customLink/
        │   ├── customPageHeader/
        │   ├── customRemark/
        │   ├── customTextbox/
        │   ├── msplLookUp/
        │   ├── noDataAvailable/
        │   ├── searchPage/
        │   └── viewHistory/
        │
        ├── home/                   # Shell layout components
        ├── login/                  # Authentication screen
        └── utility/                # CommonMethods, models, constants, pipes
```

---

## Feature Development Guidelines

### Folder Anatomy

Every feature under `src/app/feature/` must follow this structure:

```
feature/
└── <featureName>/
    ├── components/
    │   └── <componentName>/
    │       ├── <componentName>.component.ts   ← logic only, no inline styles
    │       └── <componentName>.html           ← template using shared components
    ├── <featureName>.model.ts                 ← constants, FieldsInfo class, BO class
    ├── <featureName>.module.ts                ← NgModule declaring components
    └── <featureName>Routing.module.ts         ← child routes
```

> Feature folders must contain **only `.ts` and `.html` files**.  
> No `.scss` / `.css` files — all styling is handled by the global stylesheet and shared component classes.

### Anatomy of a Model File

Every feature model file must export three things:

```typescript
// 1. String constants (avoid magic strings in templates)
export const myFeatureConstants = {
  fieldLabel: "Field Label",
};

// 2. FieldsInfo class — one property per UI control
export class MyFeatureFieldsInfo {
  fieldName: TextBoxInputs = new TextBoxInputs(myFeatureConstants.fieldLabel, 100, true, true, "all", "TextBox");
  category:  DropdownDetails = new DropdownDetails(myFeatureConstants.category, true, true, "", MODE_TYPE.MANAGE);
  categoryList: ICustomDropdownNCheckListData[] = [];
}

// 3. Business Object — one property per data field
export class MyFeatureBO {
  fieldName: string  = "";
  categoryId: number = 0;
}
```

### Anatomy of a Component File

```typescript
@Component({ selector: 'app-my-feature', standalone: false, templateUrl: '...' })
export class MyFeatureComponent {

  fieldsInfo: MyFeatureFieldsInfo = new MyFeatureFieldsInfo();
  formBO:     MyFeatureBO         = new MyFeatureBO();

  setCategory(event: DropdownChangeEvent): void {
    this.formBO.categoryId = event.value;
  }

  save(): void { /* call service */ }
  clear(): void { this.formBO = new MyFeatureBO(); }
}
```

### Routing

Register each feature as a **lazy-loaded** child route inside `app.routes.ts`:

```typescript
{ path: 'myFeature', loadChildren: () => import("./feature/myFeature/myFeature.module").then(x => x.MyFeatureModule) }
```

---

## Shared Components Reference

All components below are declared in `HelpersModule` (`src/app/shared/globalShared/globalShared.module.ts`).  
Import `HelpersModule` in any feature module to use all of them.

### `app-textbox` — Text Input / Textarea

```html
<app-textbox
  #validate
  [input]="fieldsInfo.name"
  [inputValue]="formBO.name"
  (value)="formBO.name = $event">
</app-textbox>
```

| Input | Type | Description |
|-------|------|-------------|
| `[input]` | `TextBoxInputs` | Configuration (label, maxLength, required, inputType, type) |
| `[inputValue]` | `string \| number` | Bound value |
| `(value)` | `string \| number` | Emits on change |

**TextBoxInputs constructor:**
```typescript
new TextBoxInputs(placeholder, maxLength, isMandatory, isRequired, inputType, type)
// inputType: "all" | "number" | "alphaNumeric" | ...
// type:      "TextBox" | "TextArea"
```

---

### `app-dropdown` — Single / Multi Select

```html
<app-dropdown
  #validate
  [dropdownDetails]="fieldsInfo.category"
  [dropdownList]="fieldsInfo.categoryList"
  [selectedValues]="formBO.categoryId"
  (changeOfdropdownValue)="setCategory($event)">
</app-dropdown>
```

| Input | Type | Description |
|-------|------|-------------|
| `[dropdownDetails]` | `DropdownDetails` | Configuration (label, mandatory, multiple, viewType) |
| `[dropdownList]` | `ICustomDropdownNCheckListData[]` | Options list |
| `[selectedValues]` | `number \| number[]` | Current selection |
| `(changeOfdropdownValue)` | `{ value, obj }` | Emits on selection change |

**For multi-select:** set `dropdownDetails.isMultiple = true`.

---

### `app-checklist` — Checkbox Group

```html
<app-checklist
  [checklistDetails]="fieldsInfo.skills"
  [list]="fieldsInfo.skillList"
  (changeOfValue)="onSkillsChange($event)">
</app-checklist>
```

| Input | Type | Description |
|-------|------|-------------|
| `[checklistDetails]` | `CustomCheckListDetails` | Configuration (heading, mandatory, single mode) |
| `[list]` | `ICustomDropdownNCheckListData[]` | Checkbox items |
| `(changeOfValue)` | `ICustomDropdownNCheckListData[]` | Emits selected items |

---

### `mspl-lookup` — Lookup / Search Popup

```html
<mspl-lookup
  lookupCode="LOOKUP_CODE"
  lookupTitle="Field Label"
  [disableBtn]="false"
  [selectedValue]="formBO.employee"
  (onSelect)="onEmployeeSelect($event)">
</mspl-lookup>
```

| Input | Type | Description |
|-------|------|-------------|
| `lookupCode` | `string` | Registered lookup identifier |
| `lookupTitle` | `string` | Display label |
| `[disableBtn]` | `boolean` | Readonly mode |
| `[selectedValue]` | `object` | Pre-selected value |
| `(onSelect)` | `{ action, text, val }` | Emits on selection |

---

### `app-grid` — Data Table

```html
<app-grid
  [headers]="headers"
  [dataSource]="dataSource"
  [extraColumns]="extraColumns"
  (templateActions)="onAction($event)">
</app-grid>
```

| Input | Type | Description |
|-------|------|-------------|
| `[headers]` | `GridColumnBO[]` | Column definitions |
| `[dataSource]` | `MatTableDataSource<T>` | Table data |
| `[extraColumns]` | `GridColumnBO[]` | Optional extra columns |
| `(templateActions)` | `ActionBO` | Row action events |

**Prepare columns using CommonMethods:**
```typescript
this.headers = CommonMethods.prepareGridColumns(MyGridColumnsInfo);
this.dataSource = CommonMethods.bindMaterialGridData(result);
```

---

### `custom-button` — Action Button

```html
<custom-button btnText="Save"   className="primary_button"   (btnClick)="save()"></custom-button>
<custom-button btnText="Clear"  className="secondary_button" (btnClick)="clear()"></custom-button>
<custom-button btnText="Cancel" className="secondary_button" (btnClick)="cancel()"></custom-button>
```

| Input | Type | Values |
|-------|------|--------|
| `btnText` | `string` | `"Save"` `"Add"` `"Clear"` `"Cancel"` `"Search"` etc. |
| `className` | `string` | `"primary_button"` `"secondary_button"` |

---

### `custom-pageHead` — Page Header

```html
<custom-pageHead [pageTitle]="'My Feature'" [status]="status" [refNo]="refNo">
</custom-pageHead>
```

---

### `app-modal-popup` — Dialog Wrapper

```html
<app-modal-popup [pageTitle]="'Dialog Title'" [isModalPopup]="true" (closeModal)="close()">
  <!-- content -->
</app-modal-popup>
```

---

### `noDataAvailable` — Empty State

```html
<app-no-data-available *ngIf="dataSource.data.length === 0"></app-no-data-available>
```

---

## Common Models & Utilities

### `ICustomDropdownNCheckListData`
Used for dropdown lists, checklist items, and lookup options.

```typescript
import { ICustomDropdownNCheckListData } from '../../shared/globalShared/customCheckList/customChecklistModel';

const list: ICustomDropdownNCheckListData[] = [
  { itemID: 1, itemCode: "CODE1", item: "Label 1", isSelected: false },
];
```

### `GridColumnBO`
Used to define grid column headers.

```typescript
import { GridColumnBO } from '../../shared/utility/commonModel';

export const MyGridColumnsInfo = [
  new GridColumnBO('fieldName', 'Column Header', 'grid-col-25'),
];
```

### `CommonMethods`
Central utility class. Key methods:

```typescript
CommonMethods.prepareGridColumns(columnsInfo)  // → GridColumnBO[]
CommonMethods.bindMaterialGridData(array)       // → MatTableDataSource<T>
CommonMethods.hasValue(val)                     // → boolean
CommonMethods.increaseSNo(array)                // → array with S.No
CommonMethods.BuildUpload(...)                  // → UploadRequestBO
```

### `TransactionService`
Base class for components that call APIs.

```typescript
export class MyComponent extends TransactionService {
  private handlers: Record<string, PurposeHandler> = {
    [MyPurposeCodes.GetData]: (result) => this.handleData(result),
  };

  ngAfterViewInit() {
    this.subscription$ = this._service.subject$.subscribe(resp => {
      const handler = this.handlers[resp.purpose];
      if (handler) handler(resp.result);
    });
  }
}
```

---

## Code Generation Rules

The following rules are **mandatory** for all AI-generated and human-written code:

### ✅ Always Do

1. **One model file per feature** — export `<Feature>Constants`, `<Feature>FieldsInfo`, `<Feature>BO`.
2. **FieldsInfo for every control** — `TextBoxInputs`, `DropdownDetails`, `CustomCheckListDetails` for every UI field.
3. **Strongly typed everything** — no `any`. Use `ICustomDropdownNCheckListData`, `GridColumnBO`, explicit interfaces.
4. **`HelpersModule` in every feature module** — provides all shared components.
5. **Lazy-loaded routes** — add a `loadChildren` entry in `app.routes.ts`.
6. **`#validate` on every input** — attach template ref to all form controls for validation support.
7. **`standalone: false`** — all feature components are declared in an NgModule, not standalone.

### ❌ Never Do

1. ❌ Do not use `any` type anywhere.
2. ❌ Do not create new UI components (buttons, inputs, modals) — reuse from shared.
3. ❌ Do not add `.scss` files inside feature folders.
4. ❌ Do not use inline styles in templates.
5. ❌ Do not import `AppMaterialModule` directly in feature modules — it is re-exported by `HelpersModule`.
6. ❌ Do not add `providers` to feature modules unless bridging an HTTP interceptor.
7. ❌ Do not use `standalone: true` on feature components.
8. ❌ Do not repeat constants as raw strings in templates — always reference `<Feature>Constants`.

---

## AI Integration — Build AI Frontend Engineer

This repository is attached to **Build AI — Frontend Engineer** for automated feature generation.

### How Build AI Uses This Repository

| Step | What happens |
|------|-------------|
| 1 | AI reads this README to understand the project structure, conventions, and rules. |
| 2 | AI reads the `sample` feature (`src/app/feature/sample/`) as the canonical code template. |
| 3 | AI inspects the `shared/globalShared/` folder to understand available components and their APIs. |
| 4 | AI generates a new feature module following the exact same file layout and naming conventions. |
| 5 | Generated code is placed in `src/app/feature/<newFeature>/` ready to run without modification. |

### Reference Feature — `sample`

The `sample` feature (`src/app/feature/sample/`) is the **golden template** for AI generation.  
It demonstrates every supported UI pattern:

| Pattern | File |
|---------|------|
| Model / FieldsInfo / BO | `sample.model.ts` |
| Component logic | `components/samplePrototype/samplePrototype.component.ts` |
| Template with all controls | `components/samplePrototype/samplePrototype.html` |
| NgModule | `sample.module.ts` |
| Routing | `sampleRouting.module.ts` |

**Route:** `/root/sample/prototype`

---

## Mock Data Configuration

To add new modules or forms to the application menu without backend integration, update the mock data configuration.

### Adding Modules & Forms

**File:** `src/app/core/services/mock-data.ts`

Add your module to the `"Workflow/GetMenuListByAppCode"` array:

```typescript
{
    moduleID: 1234,
    moduleTitle: "Sample Master",
    moduleCode: "SMP_MASTER",
    routerNavigation: "/root/sampleMaster",
    cssClass: "fa-icon-flask-light",
    moduleGroup: "MASTERS",
    formsInfo: [
        {
            formsID: 3861,
            formsTitle: "List of Sample Masters",
            formsCode: "LIST_SMP_MASTER",
            formRoute: "/root/sampleMaster/listSmpMaster",
            formType: "SUB_FORM",
            approvalType: "CAPABILITY",
            capability: "LIST_SMP_MASTER",
            moduleCode: "SMP_MASTER"
        },
        {
            formsID: 3860,
            formsTitle: "Create New Sample Master",
            formsCode: "CRT_SMP_MASTER",
            formRoute: "/root/sampleMaster/crtSampleMstr",
            formType: "MAIN_FORM",
            approvalType: "WORKFLOW",
            capability: "MANAGE",
            moduleCode: "SMP_MASTER"
        }
    ]
}
```

### Module Structure

| Field | Description |
|-------|-------------|
| `moduleID` | Unique numeric identifier |
| `moduleTitle` | Display name in menu |
| `moduleCode` | Unique code identifier |
| `routerNavigation` | Base route path |
| `cssClass` | Icon class (e.g., `fa-icon-flask-light`) |
| `moduleGroup` | Group category: `"MASTERS"` or `"Transactions"` |
| `formsInfo` | Array of forms under this module |

### Form Structure

| Field | Description |
|-------|-------------|
| `formsID` | Unique numeric identifier |
| `formsTitle` | Display name in submenu |
| `formsCode` | Unique form code |
| `formRoute` | Full route path |
| `formType` | `"MAIN_FORM"` (create) or `"SUB_FORM"` (list/view) |
| `approvalType` | `"WORKFLOW"` or `"CAPABILITY"` |
| `capability` | Permission code |

### Enabling Mock API

**File:** `src/app/shared/utility/constant.ts`

Ensure `GetMenuListByAppCode` is added to `MockApiServiceUrls`:

```typescript
export const MockApiServiceUrls = {
  GetMenuListByAppCode: "Workflow/GetMenuListByAppCode",
  // other mock endpoints...
}
```

> **Note:** Remove or comment out `GetMenuListByAppCode` from `MockApiServiceUrls` to switch back to the real backend API.

---

## Development Workflow

```
1. Manager defines a new screen prototype requirement
         │
         ▼
2. Developer creates <featureName>/ inside src/app/feature/
   (or Build AI generates it automatically)
         │
         ▼
3. Add <featureName>.model.ts  ──  constants + FieldsInfo + BO
         │
         ▼
4. Add component .ts + .html   ──  use shared components only
         │
         ▼
5. Add <featureName>.module.ts ──  import HelpersModule
         │
         ▼
6. Add <featureName>Routing.module.ts
         │
         ▼
7. Register lazy route in app.routes.ts
         │
         ▼
8. Run:  npm run build          ──  must succeed with 0 errors
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm start

# Production build
npm run build

# Unit tests
npm test
```

The app is served at `http://localhost:4200`.  
Navigate to `/root/sample/prototype` to see the full control reference prototype.

---

*This README is read by Build AI — Frontend Engineer. Keep it accurate and up to date.*
