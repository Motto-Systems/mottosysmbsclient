import { Component, inject, Input } from "@angular/core";
import { FieldSkeletonBO, SkeletonBO } from "./appFieldSkeletonLoaderModel";
import { SkeletonLoaderService } from "../../../core/services/skeletonLoader.service";

@Component({
    selector: 'app-field-skeleton-loader',
    templateUrl: './appFieldSkeletonLoader.html',
    standalone: false
})
export class AppFieldSkeletonLoaderComponent {
    @Input() fieldSkeletonBO: FieldSkeletonBO = new FieldSkeletonBO();
    handleSkeleton: boolean = false;

    skeletonList: SkeletonBO[] = [];
    _skeletonLoader = inject(SkeletonLoaderService);

    constructor() { }

    ngOnInit() {
        this._skeletonLoader.skeletonLoader$.subscribe((val) => {
            this.handleSkeleton = val;
        });

        this.skeletonList = Array.from({ length: this.fieldSkeletonBO.count }, (_, i) => {
            const skeletonBO = new SkeletonBO();
            skeletonBO.widthClass = this.fieldSkeletonBO.options[i].class;
            skeletonBO.theme = this.fieldSkeletonBO.options[i].theme;
            return skeletonBO;
        });
    }
}