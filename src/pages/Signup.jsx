import { useState } from "react";
import { API_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const initSignupForm = {
    email: '',
    password: '',
    name: ''
}

const Signup = (props) => {

    const [ signupForm, setSignupForm ] = useState(initSignupForm);
    const [ errorMessage, setErrorMessage ] = useState(undefined)

    const handleSignupForm = (nameField, value) => {
        setSignupForm(prevState => ({ ...prevState, [nameField]: value }))
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // const response = await axios.post(`${API_URL}/auth/signup`, signupForm)
            const response = await authService.signup(signupForm)
            console.log('response: ', response.data)
            navigate('/login')
        } catch (error) {
            console.log('error: ', error);
            error.response && setErrorMessage(error.response.data.message)
        }
    }

    return (
    <div className="AddTask">
        <h3>Sign Up</h3>
   
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={signupForm.email}
            onChange={(e) => handleSignupForm('email', e.target.value)}
          />
   

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={(e) => handleSignupForm('password', e.target.value)}
           />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={signupForm.name}
            onChange={(e) => handleSignupForm('name', e.target.value)}
           />
   
          <button type="submit">Sign up</button>
        </form>
        
        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p>Si ya tienes una cuenta</p>

        <Link to={"/login"}> Login </Link>
      </div>
    )
}

export default Signup;