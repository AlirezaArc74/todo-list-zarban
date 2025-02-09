import {FC} from "react";
import {ITodo} from "../../Model/DataModel";

const TodoItem: FC<todoProps> = ({item} ) => {
  const {title , id , completed} = item;
  return (
      <>
        <td>{title}</td>
        <td>{completed ? 'Completed' : 'Pending'}</td>
        <td>{id}</td>
      </>
);
}

interface todoProps {
  item: ITodo
}
export default TodoItem;