//importamos componentes 
import Card from "../../components/Card/Card"
import Pagination from "./Pagination"

//importamos hooks
import { useState, useEffect, } from "react"
import axios from "axios"

//importamos estilo 
import Style from "../Home/Home.module.css"

//importamos las actions 
import { showHome } from "../../Redux/actions"

//importamos lo que se necesita usar para el redux 
import { useSelector, useDispatch } from 'react-redux'
import FilterBar from "../../components/FilterBar/FilterBar"


export default function Home() {
    //Ejecutamos el selector y el dispatch 
    const showHomeR = useSelector((store) => store.recipesHome)
    const dispatch = useDispatch()

    //estados locales 
    const [paginaActual, setPaginaActual] = useState(1)

    //Paginado
    const indexOfLastPost = paginaActual * 9
    const indexOfFirstPost = indexOfLastPost - 9


    //aCa hiria una condicion para cambiar el current post 
    const currentPosts = showHomeR.slice(indexOfFirstPost, indexOfLastPost)

    //Funciones
    const changePage = (num) => {
        setPaginaActual(num)
    }



    //Use Effect
    useEffect(() => {
        if (showHomeR.length < 1) {
            dispatch(showHome())
        }
        console.log(showHomeR);
    }
        , [])



    return (
        <div className={Style.home}>
            <FilterBar></FilterBar>
            <div className={Style.pagination}>
                <Pagination changePage={changePage} totalPosts={showHomeR.length} />
            </div>
            <div className={Style.cards}>
                {currentPosts.map((recipe) => {
                    if (recipe.dataBase) {
                        return <Card id={recipe.id} diets={recipe.diets[0].name} image={recipe.image} name={recipe.name} />
                    }
                    return <Card id={recipe.id} diets={recipe.diets} image={recipe.image} name={recipe.name} />
                })}
            </div>

            <div className={Style.paginationFutter}>
                <Pagination changePage={changePage} totalPosts={showHomeR.length} />
            </div>

        </div>
    )
}