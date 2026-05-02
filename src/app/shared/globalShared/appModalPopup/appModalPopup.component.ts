import { Component, ElementRef, HostListener, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './appModalPopup.html',
  standalone: false
})

export class AppModalPopupComponent {

  @Input() pageTitle: string = '';
  @Input() isShowDialog: boolean = true;
  @Input() isModalPopup: boolean = true;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @ViewChild('myDiv') myDivRef!: ElementRef;



  constructor(private eRef: ElementRef) { }

  isMinimized: boolean = false;
  blinkMinimizedBar: boolean = false;

  minimizePopup() {
    this.isMinimized = true;
    document.body.classList.add('popup-minimized');

    setTimeout(() => {
      this.popupDrag?.reset(); // Resets the transform
    });

  }

  @ViewChild('popupDrag') popupDrag!: CdkDrag;
  @ViewChild('popupHandle') popupHandle!: ElementRef;




  maximizePopup() {
    this.isMinimized = false;
    this.blinkMinimizedBar = false;
    document.body.classList.remove('popup-minimized');

    setTimeout(() => {
      this.popupDrag?.reset(); // Resets the transform
    });

  }

  close() {
    this.closeModal.emit();
    this.isMinimized = false;
    this.blinkMinimizedBar = false;
    document.body.classList.remove('popup-minimized');
  }

  // Detect clicks outside
  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (
      this.isMinimized &&
      !this.eRef.nativeElement.contains(target) &&
      !target.closest('.maximize-popup-click')
    ) {
      this.triggerBlink();
    }
  }

  triggerBlink() {
    this.blinkMinimizedBar = true;
    setTimeout(() => this.blinkMinimizedBar = false, 1200); // 3x 0.4s
  }


  onDragMoved(event: CdkDragMove) {
    const handleRect = this.popupHandle.nativeElement.getBoundingClientRect();

    const isHandleOutOfBounds =
      handleRect.left < 0 ||
      handleRect.right > window.innerWidth ||
      handleRect.top < 0 ||
      handleRect.bottom > window.innerHeight;

    if (isHandleOutOfBounds) {
      this.popupDrag.reset();
    }
  }


  isLeftHidden = false;
  isClicked = false;

  toggleLeftSection() {
    this.isLeftHidden = !this.isLeftHidden;
    this.isClicked = !this.isClicked; // Toggle clicked class
  }

}