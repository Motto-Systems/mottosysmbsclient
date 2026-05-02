import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation, Output, HostListener, EventEmitter, ViewChild } from "@angular/core";
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { SearchFilterModalService } from "../advanceSearchChipList/service/searchFilterModelService.service";

@Component({
    selector: 'srch-filter-modal',
    templateUrl: './searchFilterModel.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SearchFilterModelComponent implements OnInit, OnDestroy {
    
    @Input() id: string = "";
    private element: any;

    constructor(private modalService: SearchFilterModalService, private el: ElementRef, private eRef: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click',( el : any)=> {
            if (el.target.className === 'srch-filter-modal') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        // document.body.classList.add('srch-filter-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        // document.body.classList.remove('srch-filter-modal-open');
    }


    
        
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
        
            closex() {
            this.element.style.display = 'none';
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