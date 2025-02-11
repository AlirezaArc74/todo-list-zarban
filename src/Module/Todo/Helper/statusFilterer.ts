import {StatusType} from "../Model/enum";
import {ITodoNormalized} from "../Model/DataModel";

export const statusFilterer = (status: StatusType) => {
  return (data: ITodoNormalized[]) => {
    if (status === StatusType.ALL) return data;
    return data.filter(item => item.status === status)
  }
}