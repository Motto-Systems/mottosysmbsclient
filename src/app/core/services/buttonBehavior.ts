import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ButtonBehaviorService {

    private buttonAndLoaderIdSubject = new BehaviorSubject<{ buttonId: string, loaderId: string }>({ buttonId: '', loaderId: '' });
    private buttonTextSubject = new BehaviorSubject<{ buttonId: string, text: string }>({ buttonId: '', text: '' });

    buttonAndLoaderId$ = this.buttonAndLoaderIdSubject.asObservable();
    buttonText$ = this.buttonTextSubject.asObservable();

    constructor() { }

    setButtonAndLoaderIds(buttonId: string, loaderId: string) {
        this.buttonAndLoaderIdSubject.next({ buttonId, loaderId });
    }

    setButtonText(buttonId: string, text: string) {
        this.buttonTextSubject.next({ buttonId, text });
    }

    clearButtonAndLoaderIds() {
        this.buttonAndLoaderIdSubject.next({ buttonId: '', loaderId: '' });
    }

    clearButtonText() {
        this.buttonTextSubject.next({ buttonId: '', text: '' });
    }

    getButtonAndLoaderIds(): { buttonId: string, loaderId: string } {
        return this.buttonAndLoaderIdSubject.value;
    }

    getButtonText(): { buttonId: string, text: string } {
        return this.buttonTextSubject.value;
    }
}
