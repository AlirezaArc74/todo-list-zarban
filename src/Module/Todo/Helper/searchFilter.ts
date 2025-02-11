import {ITodoNormalized} from "../Model/DataModel";

export const searchFilterer = (search: string) => {
  return (data: ITodoNormalized[]) => {
    if (!search.length) return data;
    return data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
  }
}