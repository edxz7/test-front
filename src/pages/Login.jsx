import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

const initLoginForm = {
    email: '',
    password: '',
    name: ''
}

const Login = (props) => {

    const [ loginForm, setLoginForm ] = useState(initLoginForm);

    const [ errorMessage, setErrorMessage ] = useState(undefined)


    const handleLoginForm = (nameField, value) => {
        setLoginForm(prevState => ({ ...prevState, [nameField]: value }))
    }

    const navigate = useNavigate()

    const { 
      storeToken, 
      authenticateUser } = useContext(AuthContext);   //  <== ADD


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          // const response = await axios.post(`${API_URL}/auth/login`, loginForm)
          // console.log('JWT token', response.data.authToken );
          const response = await authService.login(loginForm)
          storeToken(response.data.authToken); 


          // tratamos de autenticar al user
          authenticateUser();

          navigate('/');            
        } catch (error) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }

    }

    return (
      <div className="AddTask">
        <h3>Login</h3>
   
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={loginForm.email}
            onChange={(e) => handleLoginForm('email', e.target.value)}
          />
   

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={(e) => handleLoginForm('password', e.target.value)}
           />
   
          <button type="submit">Login</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

      </div>
    )
}

export default Login;