import { createContext, useState } from 'react';


// la linea de abajo define el nombre de la
// variable que usaremos para proveer el contexto
// que definamos en este archivo
const ThemeContext = createContext()


const ThemeProvider = (props) => {

    const [ theme, setTheme ] = useState('light')

    const toggleTheme = () => {
        setTheme( prevValue => prevValue === 'light' ? 'dark' : 'light' )
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}



export { ThemeContext, ThemeProvider }