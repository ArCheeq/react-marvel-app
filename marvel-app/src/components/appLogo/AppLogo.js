import { Link } from "react-router-dom"
import marvelLogo from "../../resources/img/marvel.svg";

import './logo.scss';

const AppLogo = () => {
    return (
        <div className="appLogo">
            <Link to="/">
                <img width={128} height={50} src={marvelLogo} alt="Marvel" />
            </Link>
        </div>
    )
}

export default AppLogo;