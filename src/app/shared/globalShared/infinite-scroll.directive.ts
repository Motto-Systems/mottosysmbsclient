import { Directive, HostListener, Output, EventEmitter, input, Input } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: false
})
export class InfiniteScrollDirective {


  @Output() scrolled = new EventEmitter<void>();
  @Input() actualData: any;
  @Input() loadMore: any;
  @Input() InitialSize: number = 100;

  constructor() {
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const tableViewHeight = target.offsetHeight;
    const tableScrollHeight = target.scrollHeight;
    const scrollLocation = target.scrollTop;
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit) {
      const currentGridDataLength = this.loadMore.length;

      if (currentGridDataLength >= this.actualData.length)
        return;

      const loadingGridData = this.actualData.slice(
        currentGridDataLength,
        currentGridDataLength + this.InitialSize
      );

      if (loadingGridData.length > 0)
        this.loadMore = [...this.loadMore, ...loadingGridData];

      this.scrolled.emit(this.loadMore);
    }
  }

}
