import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterData(data: any[], searchText: string, keys: string[]): any[] {
    if (!searchText.trim()) return data;

    searchText = searchText.toLowerCase();
    return data.filter((item) =>
      keys.some((key) =>
        String(item[key]).toLowerCase().includes(searchText)
      )
    );
  }
}
