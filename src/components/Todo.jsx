import { useState, useEffect } from 'react';
import Card from './Card';

function Todo({ allTodos, setAllTodos, data, setData, filterStats, setFilterStats }) {
    const [filterTodo, setFilterTodo] = useState([]);

    const addTodo = () => {
        if (data?.name.length > 0 && data?.description.length > 0) {
            setAllTodos([...allTodos, { ...data, id: Date.now() }]);
        }
        setData({ ...data, name: "", description: "" });
    };
    const editTodo = (id, newStatus) => {
        setAllTodos(
            allTodos.map((todo) =>
                todo.id === id ? { ...todo, status: newStatus } : todo
            )
        );
    };
    const deleteTodo = (id) => {
        setAllTodos(allTodos.filter((todo) => todo.id !== id));
    };
    const handleSelect = (value) => {
        setFilterStats(value);
    };

    useEffect(() => {
        if (filterStats.toLowerCase() === "all") {
            setFilterStats("All")
            setFilterTodo(allTodos);
        } else if (filterStats.toLowerCase() === "not completed") {
            setFilterStats("Not Completed")
            setFilterTodo(allTodos.filter((todo) => !todo.status));
        } else {
            setFilterStats("Completed")
            setFilterTodo(allTodos.filter((todo) => todo.status));
        }
    }, [filterStats, allTodos]);

    return (
        <>
            <div className="mt-5 mb-5">
                <p className='text-center bg-theme fs-4 fw-bold'>My todo</p>
                <div className="search-wrap d-flex justify-content-around">
                    <input
                        type="text"
                        placeholder='Todo Name'
                        className='p-2'
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder='Todo Description'
                        className='p-2'
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                    <button className='text-white border add-btn' onClick={addTodo}>Add Todo</button>
                </div>
            </div>
            <div className="container-fluid d-flex justify-content-between align-items-center p-5">
                <div>
                    <p className="fs-4 fw-bold mb-0">My Todos</p>
                </div>
                <div className="d-flex align-items-center">
                    <p className="mb-0 me-2 fs-4 fw-bold">Status Filter:</p>
                    <div className="dropdown dropdown-theme-red">
                        <a
                            className="btn btn-secondary dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {filterStats}
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => handleSelect('All')}>All</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleSelect('Completed')}>Completed</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleSelect('Not Completed')}>Not Completed</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container px-4 text-center">
                <div className="row gx-5">
                    {(filterTodo?.length > 0 ? filterTodo : allTodos).map((todo, index) => (
                        <Card
                            key={index}
                            id={todo.id}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                            name={todo.name}
                            description={todo.description}
                            status={todo.status}
                            filterStats={filterStats}
                        />
                    ))}
                </div>
            </div>

        </>
    );
}

export default Todo;
