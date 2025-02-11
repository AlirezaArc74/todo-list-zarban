import {StatusType} from "../enum";

export interface ITodo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}


export interface ITodoNormalized extends Omit<ITodo, 'completed' | 'userId'> {
  status: StatusType
}
