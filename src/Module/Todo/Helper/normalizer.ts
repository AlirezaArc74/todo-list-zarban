import {ITodo, ITodoNormalized} from "../Model/DataModel";
import {StatusType} from "../Model/enum";

export const normalizer = ({ completed, userId, ...item }: ITodo): ITodoNormalized => {
  return {
    ...item,
    status: completed ? StatusType.COMPLETED : StatusType.PENDING
  }
}
