import { Directive, signal, linkedSignal, computed, model } from "@angular/core";
import { MenuGroupCode, ModuleSubModule, SectionBO } from "./environment.model";

@Directive({
    selector: '[environment-common-logic]',
    standalone: true
})
export class EnvironmentCommonLogic {
    searchText = model('');
    moduleSubModuleList = signal<ModuleSubModule[]>([]);
    loading = signal(false);
    activeGroup = signal<string | null>(null);

    sidenavSections = computed(() => {
        const list = this.moduleSubModuleList();
        const groups = this.extractUniqueGroups(list);
        const sections: SectionBO[] = [this.createSectionForGroup('ToDo')];

        groups.forEach(group => {
            sections.push(this.createSectionForGroup(group));
        });

        return sections;
    });

    filteredData = linkedSignal({
        source: this.moduleSubModuleList,
        computation: (list) => {
            const search = this.searchText().toLowerCase();
            const group = this.activeGroup();
            const groupItems = list.filter(x => x.moduleGroup === group);

            if (!search)
                return groupItems;

            return groupItems.filter(item => {
                const titleMatches = item.moduleTitle.toLowerCase().includes(search);
                const detailsMatch = item.formsInfo.some((d: any) => d.formsTitle.toLowerCase().includes(search));
                return (titleMatches || detailsMatch);
            });
        }
    });

    private extractUniqueGroups(list: ModuleSubModule[]): string[] {
        return [...new Set(list.map(x => x.moduleGroup))];
    }

    private createSectionForGroup(group: string): SectionBO {
        return new SectionBO(group, group, this.getIconForGroup(group));
    }

    private getIconForGroup(group: string): string {
        switch (group.toLowerCase()) {
            case MenuGroupCode.ToDo:
                return 'fa-icon-house-solid';
            case MenuGroupCode.Masters:
                return 'fa-icon-crown-solid';
            case MenuGroupCode.Transactions:
                return 'fa-icon-star-solid';
            case MenuGroupCode.Logs:
                return 'fa-icon-clock-solid';
            default:
                return 'fa-icon-check-to-slot-solid';
        }
    }

}