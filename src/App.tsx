import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import { TODO_API } from "./Module/Todo/Constant";
import axios from "axios";
import { TodoItem, TodoItemLoading } from "./Module/Todo/Component";
import { ITodo, ITodoNormalized } from "./Module/Todo/Model/DataModel";
import { SortType, StatusType } from "./Module/Todo/Model/enum";
import {
  normalizer,
  searchFilterer,
  sorter,
  statusFilterer,
} from "./Module/Todo/Helper";

function App() {
  const [data, setData] = useState<ITodoNormalized[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusType>(StatusType.ALL);
  const [sort, setSort] = useState<SortType>(SortType.UNSORTED);

  const changeStatusTodoToggle = useCallback((id: ITodo["id"]) => {
    setData((prevState) =>
      prevState.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          status:
            item.status === StatusType.PENDING
              ? StatusType.COMPLETED
              : StatusType.PENDING,
        };
      }),
    );
  }, []);

  const getData = (signal: AbortSignal) => {
    setLoading(true);
    axios
      .get<ITodo[]>(TODO_API.GET_TODO_LIST, {
        signal,
      })
      .then(({ data }) => {
        setLoading(false);
        setError(false);
        setData(data.map(normalizer));
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setData([]);
      });
  };

  const filteredData = useMemo(() => {
    return [
      searchFilterer(search),
      statusFilterer(status),
      sorter(sort),
    ].reduce((preparedData, fn) => fn(preparedData), data);
  }, [data, status, search, sort]);

  const toggleSort = () => {
    setSort((prevState) => {
      switch (prevState) {
        case SortType.ASC:
          return SortType.DESC;
        case SortType.DESC:
          return SortType.UNSORTED;
        default:
          return SortType.ASC;
      }
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    getData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) return <TodoItemLoading />;

  if (error) {
    return <p>Sorry there is an unexpected error please try again later</p>;
  }

  return (
    <>
      <h1 className="header">Table of tasks</h1>
      <div className="searchSectionContainer">
        <div className="multiSelectContainer">
          <label>جستجو براساس انتخاب وضعیت</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusType)}
            className="multiSelect"
          >
            <option value={StatusType.ALL}>all</option>
            <option value={StatusType.COMPLETED}>complete</option>
            <option value={StatusType.PENDING}>pending</option>
          </select>
        </div>

        <div className="inputSearchContainer">
          <label>جستجو براساس عنوان تسک</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            dir="rtl"
            className="inputSearch"
            placeholder="عنوان تسک "
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="headerTask" onClick={toggleSort}>
              <p>Task</p>
              <span className="tooltipText">مرتب کردن بر اساس حروف الفبا</span>
              {sort === SortType.DESC ? (
                <img
                  src="/arrow-up.png"
                  alt={"arrow-up"}
                  width={20}
                  height={20}
                />
              ) : sort === SortType.ASC ? (
                <img
                  src="/arrow-down.png"
                  alt={"arrow-down"}
                  width={20}
                  height={20}
                />
              ) : null}
            </th>
            <th>Status</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
            return (
              <TodoItem
                key={item.id}
                {...item}
                changeStatusTodoToggle={changeStatusTodoToggle}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
