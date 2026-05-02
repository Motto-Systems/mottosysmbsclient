import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonBehaviorService } from "../../../core/services/buttonBehavior";

@Component({
    selector: 'custom-link',
    templateUrl: './customLink.html',
    styleUrl: './customLink.scss',
    standalone: false
})
export class CustomLinkComponent {
  @Input() disabled: boolean = false;
  @Output() linkClick: EventEmitter<any> = new EventEmitter();
  @Input() className: string = "link_button";
  @Input() icon: IconProp = "link";
  private _linkText: string = "Link";
  id!: string;
  loaderId!: string;
  faIconId!: string;
  linkTextId!: string;

  public get linkText(): string {
      return this._linkText;
  }

  @Input('linkText') public set linkText(val: string) {
      this._linkText = val;
      this.buttonBehaviorService.setButtonText(this.id, val);
  }

  constructor(private buttonBehaviorService: ButtonBehaviorService) {
      this.id = 'link-' + (Math.floor(Math.random() * 1000) + 1).toString();
      this.loaderId = this.id.replace('link-', 'loader-');
      this.faIconId = this.id.replace('link-', 'faIcon-');
      this.linkTextId = this.id.replace('link-', 'linkText-');
  }

  click(evt: any) {
      if (!this.disabled) {
          this.buttonBehaviorService.setButtonAndLoaderIds(this.id, this.loaderId);
          this.buttonBehaviorService.setButtonText(this.id, this._linkText);
          this.linkClick.emit(evt);
      }
  }

  getClassFromPlaceholder(placeholder: string): string {
    return placeholder
      ? placeholder
          .replace(/\//g, '')
          .toLowerCase()          // Convert to lowercase
          .split(' ')             // Split by spaces
          .join('-')              // Join with hyphens
      : '';
  }

  appendClassName() {
      return ' ' + this.className + (this.disabled ? ' disabled' : '');
  }

}
