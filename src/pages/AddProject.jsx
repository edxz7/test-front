import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/constants";

const initProjectForm = {
    title: '',
    description: ''
}

const AddProject = (props) => {

    const [ projectStateForm, setProjectStateForm ] = useState(initProjectForm);

    const updateProjectForm = (nameField, value) => {
        // // paso 1, hacer una copia de la variable de estado setProjectStateForm
        // const setProjectStateFormCopy = { ... setProjectStateForm }
        // // paso 2, actualizar el valor de la copia
        // setProjectStateFormCopy[nameField] = value;
        // // paso 3, actualizo el valor de la variable que controla al formulario con el valor de la copia
        // setProjectStateForm(setProjectStateFormCopy)
        setProjectStateForm(prevState => ({ ...prevState, [nameField]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Se esta llamando?')
        try {
            await axios.post(`${API_URL}/api/projects`, projectStateForm)
            setProjectStateForm(initProjectForm)
            props.getAllProject()

        } catch (error) {
            console.log(error);
        }
    }

    console.log('projectStateForm: ', projectStateForm);

    return (
    <div className="AddProject">
        <h3>Add Project</h3>
   
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={projectStateForm.title}
            onChange={(e) => updateProjectForm('title', e.target.value)}
          />
   
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={projectStateForm.description}
            onChange={(e) => updateProjectForm('description', e.target.value)}
           />
   
          <button type="submit">Add Project</button>
        </form>
      </div>
    )
}

export default AddProject;