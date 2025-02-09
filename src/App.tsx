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
  const [value, setValue] = useState<string>('all');

  const getData = (value: string = 'all') => {
    setLoading(true);
    axios.get(TODO_API.GET_TODO_LIST).then((response:IResponse<ITodo[]>) => {
      setLoading(false);
      setData(selectBoxFilter(value, response.data));
    }).catch(() => {
      setLoading(false);
      setError(true);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  function selectValue(value: string) {
    getData(value)
    setValue(value)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry there is an unexpected error please try again later</p>;
  return (
    <>
      <h1 className="header">Table of tasks</h1>
      <div className="searchSectionContainer">
        <label>جستجو توسط انتخاب وضعیت</label>
        <select value={value} onChange={(e) => selectValue(e.target.value)} className="multiSelect">
          <option value="all">all</option>
          <option value="completed">complete</option>
          <option value="pending">pending</option>
        </select>

        <input placeholder="بر اساس عنوان تسک جستجو کنید" />
      </div>
      <table>
        <tr>
          <th>task</th>
          <th>status</th>
          <th>id</th>
        </tr>
        {data.map((item) => {
          return (
            <tr>
              <TodoItem item={item} key={item.id} />
            </tr>
          )
        })}
      </table>
    </>
  );
}

export default App;
