//importamos el estilo 
import Style from "./SearchBar.module.css"
export default function SearchBar() {
    return (
        <div className={Style.searchBar}> 
            <input type='text' placeholder="Busca una receta" />
            <button >Buscar</button>
        </div>
    )

}