import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[mousehoverout]',
    standalone: false
})

export class MouseHoverOut {

    @Input() allowMouseEvt: boolean = false;

    constructor(private elm: ElementRef) { }

    @HostListener('click', ['$event']) onMouseEnter(event: any) {

        if (this.allowMouseEvt) {
            var parentNode = this.elm.nativeElement.parentNode.parentNode;
            var isClosed: any = (parentNode.nextElementSibling.style['display'] == 'none');
            document.querySelectorAll('#ChildGrid').forEach((item: any, index: number) => {
                if (item['style']['display'] == '-webkit-box') {
                    item['style'] = 'display :none;';
                }
            });


            document.querySelectorAll('.ParentGrid').forEach((item: any, index: number) => {
                item['style'] = "background-color: #fff;";
                if (item.children["extAction"])
                    item.children["extAction"].children[0].innerHTML = '<span class="fa-icon-angle-down-light"></span>';
            })

            if (isClosed) {
                parentNode.nextElementSibling.style = "display :-webkit-box; background-color: rgb(250 250 250);";
                parentNode.style = "border:none;background-color: #f5f5f5;";
                this.elm.nativeElement.innerHTML = '<span class="fa-icon-angle-up-light"></span>';
            }
        }
    }

    @HostListener('mouseleave') onMouseLeave(event: Event) {
    }
}
