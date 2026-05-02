import { Injectable, Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Injectable()

@Pipe({
    name: 'sort',
    standalone: false
})

export class SortPipe implements PipeTransform {
  transform(value: any[], sortKey: string, sortOrder: SortOrder | string = 'asc', isCustomLogic: string = "No"): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);
    if (!value || value.length === 0 || (sortOrder !== 'asc' && sortOrder !== 'desc') || Object.keys(value[0]).indexOf(sortKey) < 0) return value;

    let numberArray = [];
    let stringArray = [];


    numberArray = value.filter(item => typeof item[sortKey] === 'number' || !Number.isNaN(item[sortKey])).sort((a, b) => a[sortKey] - b[sortKey]);
    stringArray = value
      .filter(item => typeof item[sortKey] === 'string' && Number.isNaN(item[sortKey]))
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1;
        else if (a[sortKey] > b[sortKey]) return 1;
        else return 0;
      });
    //stringArray = value.filter(item => typeof item === 'string').sort();

    const sorted = numberArray.concat(stringArray);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }
}
