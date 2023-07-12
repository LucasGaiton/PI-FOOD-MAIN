//importmas estilo
import Style from "./Nav.module.css"
//importamos link
import { Link } from "react-router-dom"


//importamos componentes 
import SearchBar from "../SearchBar/SearchBar"
import logo from "../../images/Screenshot_1.jpg"

export default function Nav() {
    return (
        <nav className={Style.navConteiner}>
            <div className={Style.logoConteiner}>
                <Link to={`/home`}>
                    <img src={logo} alt="Logo" className={Style.logo} />
                </Link>
            </div>
            <div>
                <SearchBar />
            </div>
            <div className={Style.addRecipe}>
                <Link to ={'/form'}>
                    <button className={Style.addRecipeButton}>Añade tu receta</button>
                </Link>

            </div>
        </nav>
    )
}