import img from './error.png';

const ErrorMassage = () => {
    return (
        <img style={{display: 'block', width: "380px", height: "100%", objectFit: "cover", margin: "0px auto"}} src={img} alt="Error"/>
    )
}

export default ErrorMassage;