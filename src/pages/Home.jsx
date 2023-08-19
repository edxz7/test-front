import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

const Home = () => {
    const { theme } = useContext(ThemeContext)
    return (
    <div className={"HomePage " + theme} >
        <h1>Project Management App</h1>
        <img 
            width={800}
            src="https://plus.unsplash.com/premium_photo-1661573322713-0935eae5f6a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
            alt="hero" 
        />
    </div>
)}

export default Home;