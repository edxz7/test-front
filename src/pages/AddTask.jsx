import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/constants";

const initTaskForm = {
    title: '',
    description: ''
}

const AddTask = (props) => {

    const [ taskStateForm, setTaskStateForm ] = useState(initTaskForm);

    const updateProjectForm = (nameField, value) => {
        setTaskStateForm(prevState => ({ ...prevState, [nameField]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {          
            await axios.post(
              `${API_URL}/api/tasks`, 
              {...taskStateForm, projectId: props.projectId}
            )
            setTaskStateForm(initTaskForm)
            props.getOneProject()
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className="AddTask">
        <h3>Add Task</h3>
   
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={taskStateForm.title}
            onChange={(e) => updateProjectForm('title', e.target.value)}
          />
   
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={taskStateForm.description}
            onChange={(e) => updateProjectForm('description', e.target.value)}
           />
   
          <button type="submit">Add Taks</button>
        </form>
      </div>
    )
}

export default AddTask;