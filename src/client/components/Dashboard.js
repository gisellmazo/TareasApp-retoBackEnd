import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Menu from "./Menu";
import '../styles/dashboard.css';


export default function Dashboard(props) {

    const [datos, setDatos] = useState({
        taskName: '',
        taskImge: '',
        taskPriority: '',
        limitDate: '',
        _id: ''
    });

    const [tasks, setTasks] = useState([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const addTask = (e) => {
        if (datos._id) {
            fetch(`/tasks/${datos._id}`, {
                method: 'PUT',
                body: JSON.stringifY(datos),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setDatos({
                        taskName: '',
                        taskImge: '',
                        taskPriority: '',
                        limitDate: '',
                        _id: ''
                    });
                    showTask();
                })
        } else {
            fetch('/tasks', {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setDatos({
                        taskName: '',
                        taskImge: '',
                        taskPriority: '',
                        limitDate: ''
                    });
                    showTask();
                })
                .catch(err => console.error(err))
        }
        e.preventDefault();

    }
    const showTask = () => {
        fetch('/tasks')
            .then(res => res.json())
            .then(data => setTasks(data),
                console.log(tasks))
    }
    useEffect(() => {
        showTask();
    }, [])

    const deleteTask = (id) => {
        fetch(`/tasks/${id}`, {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsModalDeleteOpen(false) 
                showTask();


            })
    }

   

    const editTask = (id) => {
        fetch(`/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDatos({
                    taskName: datos.taskName,
                    taskImge: datos.taskImge,
                    taskPriority: datos.taskPriority,
                    limitDate: datos.limitDate,
                    _id: datos._id
                })
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos({
            [name]: value
        })
    }

    return (
        <div>
            <div>
                <Menu />
            </div>
            <section className="dashboard">
                <h1 className="tasksTitle">Tareas Pendientes</h1>
                <div className="tasks">
                    <div className="taskGroup">
                        <form className="newTaskForm" onSubmit={addTask}>
                            <h2 className="newTaskTitle">Nueva Tarea</h2>
                            <label htmlFor="taskName" className="newTaskLabel">Nombre nueva tarea:</label>
                            <input className="form-control input" onChange={handleChange} name="taskName"  type="text" />
                            <label htmlFor="taskImge" className="newTaskLabel">Imagen de esta tarea:</label>
                            <input className="inputNewTask" onChange={handleChange} name="taskImge" type="file" />
                            <label htmlFor="taskPriority" className="newTaskLabel">Prioridad de la tarea:</label>
                            <select className="inputNewTask form-control input" onChange={handleChange} name="taskPriority"  className="typePriority">
                                <option value="low">Baja</option>
                                <option value="medium">Media</option>
                                <option value="high">Alta</option>
                            </select>
                            <label htmlFor="limitDate" className="newTaskLabel">Fecha limite para la tarea:</label>
                            <input className="inputNewTask form-control input" onChange={handleChange} name="limitDate"  type="date" />
                            <button type="submit" className="buttonNewTask">Añadir</button>
                        </form>

                        {tasks.map(task => {

                            return (
                                <div key={task._id} className="task">

                                    <h2 className="taskName">{task.taskName}</h2>
                                    <img src="https://thispersondoesnotexist.com/image" alt="Imagen de la tarea" className="taskImg" />
                                    <h3 className="taskPriority">{task.taskPriority}</h3>
                                    <h3 className="taskLimitDate">{task.limitDate}</h3>

                                    <div className="buttons">
                                        <div onClick={() => editTask(task._id)} className="buttonEditDelete"><FontAwesomeIcon icon={faEdit} /></div>
                                        <div onClick={() => setIsModalDeleteOpen(true)} className="buttonEditDelete"><FontAwesomeIcon icon={faTrashAlt} /></div>
                                    </div>

                                    {/*Modal Borrar*/}

                                    <Modal isOpen={isModalDeleteOpen}>
                                        <ModalHeader className="modalHeader">
                                            <div className="row">
                                                <h3 className="modalTitle col">Borrar Tarea</h3>
                                                <button
                                                    type="button"
                                                    className="btn-close col"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={() => setIsModalDeleteOpen(false)}><i className="fas fa-times">x</i></button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody>
                                            <p>¿Estas seguro de borrar esta tarea?</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <button type="button"
                                                className="btn-no"
                                                data-bs-dismiss="modal"
                                                onClick={() => setIsModalDeleteOpen(false)}>No</button>
                                            <button onClick={() => deleteTask(task._id)} type="button" className="btn-yes">Si</button>
                                        </ModalFooter>
                                    </Modal>

                                    {/*Modal Editar*/}

                                   {/*  <Modal isOpen={isModalEditOpen}>
                                        <ModalHeader className="modalHeader">
                                            <div className="row">
                                                <h2 className="modalTitle col">Editar Tarea</h2>
                                                <button
                                                    type="button"
                                                    className="btn-close col"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={() => setIsModalEditOpen(false)}><i className="fas fa-times">x</i></button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody>
                                            <p>Ingresa nuevo nombre de tarea:</p>
                                            <input onChange={handleChange} className="form-control input" type="text" value={datos && datos.taskName}/>

                                            <p>Ingresa nueva imagen de tarea:</p>
                                            <input className="inputNewTask" onChange={handleChange} name="taskImge" value={datos && datos.taskImge} type="file" />

                                            <p>Cambiar prioridad de la tarea:</p>
                                            <select className="inputNewTask form-control input" onChange={handleChange} name="taskPriority" value={datos && datos.taskPriority} className="typePriority">
                                                <option value="low">Baja</option>
                                                <option value="medium">Media</option>
                                                <option value="high">Alta</option>
                                            </select>

                                            <p>Cambiar fecha limite de la tarea:</p>
                                            <input className="inputNewTask form-control input" onChange={handleChange} name="limitDate" value={datos && datos.limitDate} type="date" />
                                        </ModalBody>
                                        <ModalFooter>
                                            <button
                                                type="button"
                                                className="btn-volver"
                                                data-bs-dismiss="modal"
                                                onClick={() => setIsModalEditOpen(false)}>Volver</button>
                                            <button
                                                type="button"
                                                className="btn-done" onClick={() => editTask(task._id)}>¡Hecho!</button>
                                        </ModalFooter>
                                    </Modal> */}
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section>



        </div>
    )
}