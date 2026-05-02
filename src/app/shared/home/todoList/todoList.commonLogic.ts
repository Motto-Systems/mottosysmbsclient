import { computed, Directive, signal } from "@angular/core";
import { IToDoCountBOList, TodoItems } from "./todoListModel";
import { CommonMethods } from "../../utility/commonMethods";

@Directive({
    selector: '[todo-list-logic]',
    standalone: true
})
export class TodoListLogic {

    searchModule = signal<string>('');
    searchText = signal<string>('');
    searchTitle = signal<string>('');
    formID = signal<number>(0);
    displayCount = signal<string>('');
    totalToDoList = signal<IToDoCountBOList>(new IToDoCountBOList());
    totalList = signal<TodoItems[]>([]);

    totalPendingActivities = computed(() => this.totalToDoList().reduce((total, activity) => total + activity.formCount, 0));

    getFilterMdoules = computed(() => {
        const search = this.searchModule().toLowerCase();
        if (!search)
            return this.totalToDoList();
        return this.totalToDoList().filter((data) => data.formTitle.toLowerCase().includes(search));
    });

    getFilterTodoItems = computed(() => {
        if (this.formID() <= 0)
            return [];

        const searchText = this.searchText().trim().toLowerCase();
        const list = this.totalList().find(objData => objData.formID == this.formID())?.conditionalData ?? [];

        if (!CommonMethods.hasValue(searchText)) {
            return list;
        }

        return list.filter((x: any) => (x.status.toLowerCase().includes(searchText)
            || x.requestCode?.toLowerCase().includes(searchText)
            || x.referenceNumber?.toLowerCase().includes(searchText)));
    })

}