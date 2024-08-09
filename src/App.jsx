import { useState } from 'react';
import Todo from './components/Todo';
import './App.css';

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [data, setData] = useState({ name: '', description: '', status: false });
  const [filterStats, setFilterStats] = useState('All');

  return (
    <>
      <Todo
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        data={data}
        setData={setData}
        filterStats={filterStats}
        setFilterStats={setFilterStats}
      />
    </>
  );
}

export default App;
