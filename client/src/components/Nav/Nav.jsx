//importmas estilo
import Style from "./Nav.module.css"


//importamos componentes 
import SearchBar from "../SearchBar/SearchBar"
import logo from "../../images/Screenshot_1.jpg"

export default function Nav() {
    return (
        <nav className={Style.navConteiner}>
            <div className={Style.logoConteiner}>
                <img src={logo} alt="Logo" className={Style.logo} />
            </div>
            <div>
                <SearchBar />
            </div>
        </nav>
    )
}