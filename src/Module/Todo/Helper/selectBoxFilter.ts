import {ITodo} from "../Model/DataModel";

const helper = (status: boolean): string => {
  if (status) return 'completed';
  return 'pending';

}

export const selectBoxFilter = (selected: string, data: ITodo[]): ITodo[] => {
  if (!selected.length || !Array.isArray(data) ) return [];
  if (selected === 'all') return data;

  return data.filter((item) => helper(item.completed) === selected);
}