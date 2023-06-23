//importamos el estilo 
import Style from "../Detail/Detail.module.css"
//importamos useParmas
import { useParams } from "react-router-dom"
export default function Detail(){
    const {id} = useParams()
    console.log(id);
    return(
        <div className={Style.detail}>
            

        </div>
    )
}