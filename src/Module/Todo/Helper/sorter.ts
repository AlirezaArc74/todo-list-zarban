import {ITodoNormalized} from "../Model/DataModel";
import {SortType} from "../Model/enum";

export const sorter = (sort: SortType) => {
  return (data: ITodoNormalized[]) => {
    if (sort === SortType.UNSORTED) return data;

    return [...data].sort((a, b) => sort === SortType.DESC ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
  }
}