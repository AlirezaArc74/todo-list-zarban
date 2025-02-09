import React, {useEffect, useState} from 'react';
import './App.css';
import {TODO_API} from "./Module/Todo/Constant";
import axios from "axios";
import {IResponse} from "./Module/Core/Model/APIModel";
import {TodoItem} from "./Module/Todo/Component";
import {ITodo} from "./Module/Todo/Model/DataModel";
import {selectBoxFilter} from "./Module/Todo/Helper";


function App() {
  const [data, setData] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);
  const [selectBoxValue, setSelectBoxValue] = useState<string>('all');
  const [inputValue, setInputValue] = useState<string>('');

  const getData = (selectedValue: string = 'all', inputSearchValue: string = '' ) => {
    setLoading(true);
    axios.get(TODO_API.GET_TODO_LIST).then((response:IResponse<ITodo[]>) => {
      setLoading(false);
      setData(selectBoxFilter(selectedValue, inputSearchValue, response.data));
    }).catch(() => {
      setLoading(false);
      setError(true);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  function selectBoxHandler(value: string) {
    getData(value)
    setSelectBoxValue(value)
  }

  function inputSearchHandler(value: string) {
    setInputValue(value);

    let timeout: NodeJS.Timeout;
    const promise = new Promise<void>(resolve => {
      timeout = setTimeout(() => {
        resolve();
      }, 3000)
    })
    promise.then(() => {
      getData(selectBoxValue, value);
      clearTimeout(timeout);
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry there is an unexpected error please try again later</p>;
  return (
    <>
      <h1 className="header">Table of tasks</h1>
      <div className="searchSectionContainer">
        <div className="multiSelectContainer">

          <label>جستجو توسط انتخاب وضعیت</label>
          <select value={selectBoxValue} onChange={(e) => selectBoxHandler(e.target.value)} className="multiSelect">
            <option value="all">all</option>
            <option value="completed">complete</option>
            <option value="pending">pending</option>
          </select>
        </div>

        <input value={inputValue} onChange={(e) => inputSearchHandler(e.target.value)} dir="rtl" className="inputSearch" placeholder="بر اساس عنوان تسک جستجو کنید" />
      </div>
      <table>
        <thead>
        <tr>
          <th>task</th>
          <th>status</th>
          <th>id</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item) => {
          return (
            <tr>
              <TodoItem item={item} key={item.id} />
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  );
}

export default App;
