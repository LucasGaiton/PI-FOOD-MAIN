//importamos use history
import { Link, useNavigate } from 'react-router-dom';

//importamos estilos 
import Style from "../Landing/landing.module.css"
export default function Landing() {
    //instanciamos Navigate  
    const navigate = useNavigate()

    //Handlers 
    const handlerButtonClick = ()=>{
        navigate("/home")
    }



    return (
        <div className={Style.contenedor}>
            
            <h1 className={Style.title}>Marolito</h1>
            <div className={Style.divButton}>
                <button  onClick = {handlerButtonClick}className={Style.buttonHome}>Home</button>
            </div>
            <p className={Style.firm}>By LucasGaiton</p>
        </div>
    )
}