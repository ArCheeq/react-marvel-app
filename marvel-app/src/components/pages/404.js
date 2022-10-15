import { Link } from "react-router-dom";
import img404 from "../../resources/img/404.gif";

const Page404 = () => {
    return (
        <div className="page404">
            <div className="errorMеssage">
                <h1><span>404</span> PAGE NOT FOUND</h1>
                <h2>$#&%, you broke something! Just kidding...</h2>
                <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                <Link to="/" className="backToMainPage">Back to main page</Link>
            </div>
            <div className="errorImage">
                <img src={img404} alt="deadpool" />
            </div>
            {/* <ErrorMassage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '20px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': '#9F0013'}} to="/">Back to main page</Link> */}
        </div>
    )
}

export default Page404;