import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Menu from "./Menu";
import '../styles/dashboard.css';


export default function Dashboard(props) {

    const [datos, setDatos] = useState({
        taskName: '', 
        taskImge: '', 
        taskPriority: '', 
        limitDate: ''
    });

    const [tasks, setTasks] = useState([]);

    const addTask = (e)=> {
        fetch('/tasks',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            setDatos({taskName: '', 
            taskImge: '', 
            taskPriority: '', 
            limitDate: ''})
        })
        .catch(err => console.error(err))
        e.preventDefault();

    }
    const showTask = ()=>{
        fetch('/tasks')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTasks([{
                tasks:data
            }])
        }
        )
    }
    useEffect(() => {
        showTask();
    }, [])
    

    const handleChange = (e) =>{
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
                            <input className="inputNewTask" onChange={handleChange} name="taskName" value={datos.taskName} type="text"/>
                            <label htmlFor="taskImge" className="newTaskLabel">Imagen de esta tarea:</label>
                            <input className="inputNewTask" onChange={handleChange} name="taskImge" value={datos.taskImge} type="file"/>
                            <label htmlFor="taskPriority" className="newTaskLabel">Prioridad de la tarea:</label>
                            <select className="inputNewTask" onChange={handleChange} name="taskPriority" value={datos.taskPriority} className="typePriority">
                                <option  value="low">Baja</option>
                                <option value="medium">Media</option>
                                <option value="high">Alta</option>
                            </select>
                            <label htmlFor="limitDate" className="newTaskLabel">Fecha limite para la tarea:</label>
                            <input className="inputNewTask" onChange={handleChange} name="limitDate" value={datos.limitDate} type="date"/>
                            <button type="submit" className="buttonNewTask">Añadir</button>
                        </form>

                        {tasks.map(task =>{

                        return(
                        <div className="task">
                            
                            <h2 className="taskName">{task.taskName}</h2>
                            <img src="https://thispersondoesnotexist.com/image" alt="Imagen de la tarea" className="taskImg" />
                            <h3 className="taskPriority">{task.taskPriority}</h3>
                            <h3 className="taskDate">{task.limitDate}</h3>
                            <div className="buttons">
                                <div className="buttonEditDelete"><FontAwesomeIcon icon={faEdit} /></div>
                                <div className="buttonEditDelete"><FontAwesomeIcon icon={faTrashAlt} /></div>
                            </div>
                        </div>
                    ) })}
                    </div>
                       
                </div>
            </section>
        </div>
    )
}