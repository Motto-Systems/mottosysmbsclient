import { Injectable, Signal, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SkeletonLoaderService {
    skeletonLoader = signal<boolean>(false);
    skeletonLoader$ = new Subject<boolean>();

    constructor() { }


    updateSkeletonLoader(value: boolean) {
        this.skeletonLoader.set(value);
    }

    getSkeletonLoader(): Signal<boolean> {
        return this.skeletonLoader.asReadonly();
    }
}