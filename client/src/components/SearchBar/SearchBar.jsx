//importamos el estilo 
import Style from "./SearchBar.module.css"

//importamos las actions
import { loadSearch } from "../../Redux/actions"

//importamos las fuunciones del estado global
import {useDispatch, useSelector} from 'react-redux'
import { useState } from "react"
export default function SearchBar() {
    //estado local
    const [searchString, setSearchString] = useState("")

    //Estado global 
    const dispatch = useDispatch()
    const filterRecipes = useSelector((store)=> store.filterRecipes)

    const handleChange = (event)=>{
        event.preventDefault()
        setSearchString(event.target.value)

    }
    const handleFilter = ()=>{
        dispatch(loadSearch(searchString))

    }

    return (
        <div className={Style.searchBar}> 
            <input onChange={(e)=> handleChange(e)} type='text' placeholder="Busca una receta" />
            <button onClick={handleFilter} >Buscar</button>
        </div>
    )

}