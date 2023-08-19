import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const initUpdateForm = {
    title: '',
    description: ''
}
const EditProjectPage = () => {
    const [updateForm, setUpdateForm]  = useState(initUpdateForm)

    const handleUpdateForm = (fieldTitle, value) => {
        setUpdateForm(prevState => ({ ...prevState, [fieldTitle]: value }))
    }

    const { projectId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${API_URL}/api/projects/${projectId}`)
        .then(response => {
            const oneProject = response.data;
            handleUpdateForm('title', oneProject.title);
            handleUpdateForm('description', oneProject.description);
        })
        .catch(error => console.log(error))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`${API_URL}/api/projects/${projectId}`, updateForm) 
        // hacemos un redirect de nuestro user a la pagina de la lisat de projectos
        navigate(`/projects/${projectId}`)
    }

    return (
        <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input
                  type="text"
                  name="title"
                  value={updateForm.title}
                  onChange={(e) => handleUpdateForm('title', e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={updateForm.description}
                    onChange={(e) => handleUpdateForm('description', e.target.value)}
                    />
                 <input type="submit" value={"Edit Project"}/>   
            </form>
        </div>
    )
}

export default EditProjectPage;