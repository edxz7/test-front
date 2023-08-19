import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {

    const { theme, toggleTheme } = useContext(ThemeContext)

    const { isLoggedIn, user } = useContext(AuthContext)

    console.log('isLoggedIn from Navbar ', isLoggedIn);

    console.log('el context consumido del Navbar: ', theme)
    return (
    <nav className={'Navbar ' + theme}>
        <Link to="/">
           <Button>
            <ul>
                <li>home</li>
            </ul>
           </Button>
        </Link>

        {
            isLoggedIn && (
                <>
                    <Link to="/projects">
                        <Button>Projects</Button>
                    </Link>
                    <Button>Logout</Button>
                    <span style={{color: 'orange'}}>{ user && user.name}</span>
                </>
            )
        }


        {
            !isLoggedIn && (
                <>
                    <Link to="/signup"> <button>Sign up</button> </Link>
                    <Link to="/login"> <button>Login</button> </Link>
                </>
            )
        }


        <button onClick={toggleTheme}>
            { theme === 'light' ? '🌙 dark' : '☀️ light' }
        </button>

    </nav>
 )
}
export default Navbar;