import "./todoItemLoading.scss";

const TodoItemLoading = () => {
  return (
    <div className="loaderContainer">
      <div className="loader"></div>
      <p>در حال دریافت اطلاعات</p>
    </div>
  );
};
export default TodoItemLoading;
