import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ButtonBehaviorService } from '../../../core/services/buttonBehavior';
import { ButtonType } from '../../utility/constant';

@Component({
    selector: 'custom-button',
    templateUrl: './customButton.html',
    styleUrl: './customButton.scss',
    standalone: false
})
export class CustomButtonComponent {
  isLoading: boolean = false;

  @Input() disabled: boolean = false;
  @Output() btnClick: EventEmitter<any> = new EventEmitter();
  @Input() className: string = 'primary_button';
  @Input() icon: IconProp = 'save';
  private _btnText: string = 'Save';
  id!: string;
  loaderId!: string;
  faIconId!: string;
  buttonTextId!: string;
  @Input() faFontName: string = 'fa-icon-floppy-disk-light';

  public get btnText(): string {
    return this._btnText;
  }

  @Input('btnText') public set btnText(val: string) {
    this._btnText = val;
    this.buttonBehaviorService.setButtonText(this.id, val);
    switch (this._btnText) {
      case 'Add':
        this.faFontName = 'fa-icon-plus-regular';
        break;
      case 'Clear':
      case 'Cancel':
        this.faFontName = 'fa-icon-xmark-regular';
        break;
      case 'Ok':
      case 'Confirm':
        this.faFontName = 'fa-icon-check-duotone-regular';
        break;
      case 'Assign':
        this.faFontName = 'fa-icon-check-to-slot-solid';
        break;
      case 'Un Assign':
        this.faFontName = 'fa-icon-xmark-to-slot-solid';
        break;
      case 'Add Multiple':
        this.faFontName = 'fa-icon-plus-regular';
        break;
      case 'Go':
        this.faFontName = 'fa-icon-angle-right-duotone-light';
        break;
      case 'Filter':
        this.faFontName = 'fa-icon-filter-regular';
        break;
      case 'Change':
        this.faFontName = 'fa-icon-arrow-right-arrow-left-duotone-regular';
        break;
      case 'Save':
        this.faFontName = 'fa-icon-circle-check-light';
        break;
      case 'Update':
        this.faFontName = 'fa-icon-pen-regular-full';
        break;
      case 'Upload':
        this.faFontName = 'fa-icon-cloud-arrow-up-regular';
        break;
      case 'Manage Order':
        this.faFontName = 'fa-icon-ballot-check-light';
        break;
      case 'Add Lots':
        this.faFontName = 'fa-icon-box-taped-regular';
        break;
      case 'Start Batch Execution':
        this.faFontName = 'fa-icon-clock-regular';
        break;

      case 'Send Sample Info':
        this.faFontName = 'fa-icon-circle-info-regular';
        break;

      case 'Send Sample':
        this.faFontName = 'fa-icon-paper-plane-light';
        break;

      case 'Discard':
        this.faFontName = 'fa-icon-trash-light';
        break;

      case 'Discard Sample':
        this.faFontName = 'fa-icon-trash-light';
        break;

      case 'Submit Occupancy':
        this.faFontName = 'fa-icon-circle-check-light';
        break;

      case 'Discard Occupancy':
        this.faFontName = 'fa-icon-trash-light';
        break;

      case 'Confirm Batch':
        this.faFontName = 'fa-icon-circle-check-light';
        break;

      case 'Close Batch':
        this.faFontName = ' fa-icon-xmark-regular';
        break;

      case 'Declare Quantity':
        this.faFontName = 'fa-icon-flask-gear-light';
        break;

      case 'Discard Output':
        this.faFontName = 'fa-icon-xmark-regular';
        break;

      case 'Send To Inventory':
        this.faFontName = 'fa-icon-circle-check-light';
        break;

      case 'Submit Consumption':
        this.faFontName = 'fa-icon-circle-check-light';
        break;

      case 'Submit':
        this.faFontName = 'fa-icon-check-duotone-regular';
        break;

      case 'Auto Consumption':
        this.faFontName = 'fa-icon-arrows-spin-sharp-light';
        break;

      case 'Check or Uncheck For KSM / KIM':
        this.faFontName = 'fa-icon-circle-k';
        break;

      case 'Check or Uncheck For Main Input':
        this.faFontName = 'fa-icon-result-check-right';
        break;

      case 'Add Material':
        this.faFontName = 'fa-icon-plus-regular';
        break;

      case 'Add Lot(s)':
        this.faFontName = 'fa-icon-plus-regular';
        break;

      case 'Back':
        this.faFontName = 'fa-icon-arrow-left-light';
        break;

      case 'Add Materials / Items':
        this.faFontName = 'fa-icon-plus-light';
        break;

      case 'Vendor List':
        this.faFontName = 'fa-icon-memo-light';
        break;

      case 'Manage Checklist':
        this.faFontName = 'fa-icon-check-to-slot-light';
        break;
      case 'Add MRN Items':
        this.faFontName = 'fa-icon-plus-light';
        break;

      case 'Auto Dispensing Packs':
        this.faFontName = 'fa-icon-cube-light';
        break;

      case 'Search':
        this.faFontName = 'fa-icon-magnifying-glass-regular';
        break;

      case 'Search All':
        this.faFontName = 'fa-icon-search-all';
        break;

      case 'Apply':
        this.faFontName = 'fa-icon-task-alt-mat-icon';
        break;

      case 'Weighing Information':
        this.faFontName = 'fa-icon-weight-ver-action';
        break;

      case 'Generate':
        this.faFontName = 'fa-icon-stars-light';
        break;

      case 'Generate Report':
        this.faFontName = 'fa-icon-stars-light';
        break;

      case 'Handling Loss':
        this.faFontName = 'fa-icon-chart-sine-regular';
        break;

      case 'Reset':
        this.faFontName = 'fa-icon-clock-rotate-left-light';
        break;

      case 'Weighing':
        this.faFontName = 'fa-icon-weight-ver-action';
        break;

      case 'Auto Dispensing':
        this.faFontName = 'fa-icon-clock-regular';
        break;

      case 'Check / Uncheck Full Container Dispensing':
        this.faFontName = 'fa-icon-check-to-slot-regular';
        break;

      case 'Auto Assign Batches':
        this.faFontName = 'fa-icon-circle-check-light';
        break;

      case 'Include / Exclude Item':
        this.faFontName = 'fa-icon-arrow-right-arrow-left-duotone-regular';
        break;

      case 'Receive':
        this.faFontName = 'fa-icon-verified-mat-icon';
        break;

      case 'Send To Authorization':
        this.faFontName = 'fa-icon-shield-check-light';
        break;

      case 'Set Location':
        this.faFontName = 'fa-icon-location-crosshairs-light';
        break;

      case 'Approved Vendor List':
        this.faFontName = 'fa-icon-check-duotone-regular';
        break;

      case 'QMS Entries':
        this.faFontName = 'fa-icon-square-list-light';
        break;

      case 'Switch':
        this.faFontName = 'fa-icon-arrow-right-arrow-left-duotone-regular';
        break;
      case ButtonType.viewDoc:
        this.faFontName = 'fa-icon-eye-solid-full';
        break;

      case 'Confirm Dispensing':
        this.faFontName = 'fa-icon-circle-check-light';
        break;

        case 'Get Details':
        this.faFontName = 'fa-icon-square-list-light';
        break;

        case 'Manage Inventory Details':
        this.faFontName = 'fa-icon-gear-regular-full';
        break;
        case 'Print':
        this.faFontName = 'fa-icon-print-light';
        break;


      default:
        this.faFontName = 'fa-icon-floppy-disk-light'; // Fallback icon if no match
    }
  }

  constructor(private buttonBehaviorService: ButtonBehaviorService) {
    this.id = 'btn-' + (Math.floor(Math.random() * 1000) + 1).toString();
    this.loaderId = this.id.replace('btn-', 'loader-');
    this.faIconId = this.id.replace('btn-', 'faIcon-');
    this.buttonTextId = this.id.replace('btn-', 'buttonText-');
  }

  click(evt: any) {
    this.isLoading = true;

    this.buttonBehaviorService.setButtonAndLoaderIds(this.id, this.loaderId);
    this.buttonBehaviorService.setButtonText(this.id, this._btnText);
    this.btnClick.emit(evt);
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  getClassFromPlaceholder(placeholder: string): string {
    return placeholder
      ? placeholder
        .replace(/\//g, '')
        .replace(/\./g, '-')    // Replace periods with hyphens
        .replace(/[()]/g, '-')   // Replace parentheses with hyphens
        .toLowerCase() // Convert to lowercase
        .split(' ') // Split by spaces
        .join('-') // Join with hyphens
      : '';
  }

  appendClassName() {
    return 'btnbase ' + this.className;
  }
}
