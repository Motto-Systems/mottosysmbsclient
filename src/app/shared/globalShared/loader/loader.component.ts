import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { debounceTime, filter, merge, Subscription } from 'rxjs';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})

export class LoaderComponent {

  subscriptions$: Subscription = new Subscription();
  @Input() isLoading = false;

  constructor(private _loader: LoaderService,) { }

  ngOnInit() {
    this.subscriptions$ = this._loader.loaderSubject$.pipe(debounceTime(100)).subscribe(resp => {
      this.isLoading = resp;
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false; // Hide loader after 10 seconds if no activity
    }, 10000);
  }


  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }


}
