import {FC, memo} from "react";
import { ITodo, ITodoNormalized } from "../../Model/DataModel";
import "./todoItem.scss";
import { StatusType } from "../../Model/enum";

interface ITodoItemProps extends ITodoNormalized {
  changeStatusTodoToggle: (id: ITodo["id"]) => void;
}

const TodoItem: FC<ITodoItemProps> = ({
  title,
  id,
  status,
  changeStatusTodoToggle,
}) => {
  const isCompleted = status === StatusType.COMPLETED;

  return (
    <tr>
      <td>{title}</td>
      <td
        onClick={() => changeStatusTodoToggle(id)}
        className={`${isCompleted ? "complete" : "pending"}`}
      >
        {isCompleted ? "Completed" : "Pending"}
      </td>

      <td>{id}</td>
    </tr>
  );
};

export default memo(TodoItem);
