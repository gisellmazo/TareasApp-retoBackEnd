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
        _id:''
    });

    const [tasks, setTasks] = useState([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const addTask = (e) => {
        if(datos._id){
            fetch(`/tasks/${datos._id}`, {
                method: 'PUT',
                body:JSON.stringify(datos),
                headers:{
                    'Accept':'application/json',
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
        }else{
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
                showTask();
            
            })
    }

    const editTask = (id) =>{
        fetch(`/tasks/${id}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setDatos({
                taskName: data.taskName,
                taskImge: data.taskImge,
                taskPriority: data.taskPriority,
                limitDate: data.limitDate,
                _id: data._id
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
                            <input className="inputNewTask" onChange={handleChange} name="taskName" value={datos.taskName} type="text" />
                            <label htmlFor="taskImge" className="newTaskLabel">Imagen de esta tarea:</label>
                            <input className="inputNewTask" onChange={handleChange} name="taskImge" value={datos.taskImge} type="file" />
                            <label htmlFor="taskPriority" className="newTaskLabel">Prioridad de la tarea:</label>
                            <select className="inputNewTask" onChange={handleChange} name="taskPriority" value={datos.taskPriority} className="typePriority">
                                <option value="low">Baja</option>
                                <option value="medium">Media</option>
                                <option value="high">Alta</option>
                            </select>
                            <label htmlFor="limitDate" className="newTaskLabel">Fecha limite para la tarea:</label>
                            <input className="inputNewTask" onChange={handleChange} name="limitDate" value={datos.limitDate} type="date" />
                            <button type="submit" className="buttonNewTask">Añadir</button>
                        </form>

                        {tasks.map(task => {

                            return (
                                <div key={task._id} className="task">

                                    <h2 className="taskName">{task.taskName}</h2>
                                    <img src="https://thispersondoesnotexist.com/image" alt="Imagen de la tarea" className="taskImg" />
                                    <h3 className="taskPriority">{task.taskPriority}</h3>

                                    <div className="buttons">
                                        <div onClick={() => editTask(task._id)} className="buttonEditDelete"><FontAwesomeIcon icon={faEdit} /></div>
                                        <div onClick={() => setIsModalDeleteOpen(true)} className="buttonEditDelete"><FontAwesomeIcon icon={faTrashAlt} /></div>
                                    </div>
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
                                            <button onClick={() => {deleteTask(task._id) && setIsModalDeleteOpen(false)}} type="button" className="btn-yes">Si</button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section>



        </div>
    )
}