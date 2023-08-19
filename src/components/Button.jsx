const Button = (props) => {
    console.log('props: ', props);
    return (
        <button> 
            { props.children } 
        </button>
    )
}


export default Button;