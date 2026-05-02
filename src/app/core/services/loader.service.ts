import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  loaderSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    this.loaderSubject$.next(true);
  }

  hide() {
    this.loaderSubject$.next(false);
  }
}