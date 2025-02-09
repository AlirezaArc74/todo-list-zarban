import {ITodo} from "../Model/DataModel";

const helper = (status: boolean): string => {
  if (status) return 'completed';
  return 'pending';

}

export const selectBoxFilter = (selectBoxValue: string, inputSearchValue: string, data: ITodo[]): ITodo[] => {
  if (!selectBoxValue.length || !Array.isArray(data) ) return [];
  if (selectBoxValue === 'all') return data;

  return data.filter((item) => item.title.toLowerCase().includes(inputSearchValue.toLowerCase()) && helper(item.completed) === selectBoxValue);
}