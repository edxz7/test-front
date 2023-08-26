import { createContext,  useState } from "react"
import { useEffect } from "react";
import authService from "../services/auth.service";

// 1. usar createContext para crear el contexto y asignarlo
//    a una variable
// 2. Utilizar el provider del contexto que creamos en el paso 1.
//    y usarlo para envolver a los compoentes a los que les queremos
//    dar acceso a los datos que definamos en el el context
const AuthContext = createContext();


/**
 * A)
 * Para el backen mientras devolvamos el token que nos entrego
 * cuando hicimos login, y el token no este expirado, entonces estamso
 * autenticados
 * 
 * desde el front lo unico que tenemos que hacer para indicarle al back que estamos
 * autenticados son 2 cosas:
 * 1. sacar el token del localStorage
 * 2. Enviar el token en todos los request
 * 
 * B)
 * Ahora para indicarle al front que estoy en session haremos 3 cosas
 * 1. Cuando me loggueo guardo el token en el local storage
 * 2. Cuando me logueo llamo al metodo authenticateUser, para setear las variables
 *    isLoggedIn y user en las variables de estado del auth provider
 * 3. Los componentes que requieran saber si hay un usuario en sesion deben preguntarle 
 *    al AuthProvider
 */
const AuthProvider = (props) => {

    const  [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);


    const storeToken = (token) => {    
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = async () => {
                // 1. ver si hay un token en el local storage
        // 2. si hay token, significa que hau un usuario logueado
        //    y vamos a hacer una peticion al backend para que verifique
        //    que el token no este expirado y que nos de la info del
        //    usuario que esta logueado
        // 3. checkar que si no hay token, o si el token ya fue, o si hubo
        //  un error en el proceso de verificacion, entonces nos aseguremos que
        // el usuaro este deslogueado desntro de nuestra app  (isLoggedIn === false)
        const storedToken = localStorage.getItem('authToken');
        if(storedToken) {
            try {
                // si hay token en el local storage
                // const response = await axios.get(
                //     `${API_URL}/auth/verify`, 
                //     { headers: { Authorization: `Bearer ${storedToken}`} }
                // )
                const response = await authService.verify();
                const user = response.data;
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user); 
                } catch (error) {
                    // si hubo dejamos al user deslogueado
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);  
                }

        } else {
            // si no hay token almacenado
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);  
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider 
            value={{ 
                isLoggedIn, 
                user, 
                isLoading, 
                storeToken,
                authenticateUser,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider }