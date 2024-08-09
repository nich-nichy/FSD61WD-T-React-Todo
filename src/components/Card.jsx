import { useState } from 'react';

const Card = ({ id, name, description, status, editTodo, deleteTodo, filterStats }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleEditTodo = () => {
        if (isEditing) {
            editTodo(id, currentStatus);
        }
        setIsEditing(!isEditing);
    };

    const isAllFilter = filterStats?.toLowerCase() === "all";
    const isCompleted = (isAllFilter && (currentStatus || status)) || (!isAllFilter && status);

    return (
        <div className="col">
            <div className={`card card-theme m-1 ${isCompleted ? "dropdown-theme-green" : "dropdown-theme-red"}`} style={{ width: "18rem" }}>
                <div className="card-body text-start">
                    <p className="card-text">Name: {name}</p>
                    <p className="card-text">Description: {description}</p>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 me-2">Status:</p>
                        <div className="dropdown">
                            <a
                                className={`btn btn-secondary dropdown-toggle ${!isEditing ? "disabled" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {isCompleted ? "Completed" : "Not Completed"}
                            </a>
                            {isEditing && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => setCurrentStatus(true)}
                                        >
                                            Completed
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => setCurrentStatus(false)}
                                        >
                                            Not Completed
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-5 pt-2">
                        <button className="m-1 green-btn" onClick={handleEditTodo}>
                            {isEditing ? "Save" : "Edit"}
                        </button>
                        <button className="m-1 red-btn" onClick={() => deleteTodo(id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
