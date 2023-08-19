import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../utils/constants";
import AddProject from "./AddProject";
import { ThemeContext } from "../context/theme.context";

const ProjectList = () => {
    const { theme } = useContext(ThemeContext)

    const [ projects, setProjects ] = useState([]);

    const getAllProject = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')
            const response = await axios.get(`${API_URL}/api/projects`, {
                headers: { Authorization: `Bearer ${storedToken}`}
            });
            setProjects(response.data);
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        getAllProject()
    },[])

    const deleteProject = async (projectId) => {
        await axios.delete(`${API_URL}/api/projects/${projectId}`)
        getAllProject()
    } 

    return (
        <div className={"ProjectsPage "+theme}>
            <div className="projects-row">
                <div className="projects-col">
                    <AddProject getAllProject={getAllProject}/>
                </div>
                <div className="projects-col">
                    {
                        projects.map(project => (
                            <div className="ProjectCard card" key={project._id}>
                                <Link to={`/projects/${project._id}`} >
                                    <h3>{project.title}</h3>
                                </Link>

                                <input 
                                    type="submit" 
                                    value="Delete Project"
                                    onClick={() => deleteProject(project._id)} 
                                />

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectList;