//importamos el estilo 
import Style from "../FilterBar/FilterBar.module.css"
//importmas useState
import { useState, useEffect } from "react"

//Importamos las cosas del estado global
import { useSelector, useDispatch } from 'react-redux'

//Importamos la action
import { allRecipes, filterRecipes } from "../../Redux/actions"


export default function FilterBar() {
    //estado global 
    const allRecipesR = useSelector((store) => store.AllRecipes)
    const filterRecipesR = useSelector((store) => store.filterRecipes)

    //Dispatch
    const dispatch = useDispatch()

    //Estados locales 
    const [filter, setFilter] = useState({
        diets: [],
        origins: [],
        healthScore: [],
        orden: []
    })
    const [selector, setSelector] = useState(false)

    //UseEffect
    useEffect(() => {
        if (allRecipesR.length < 1) {
            dispatch(allRecipes())
        }
        console.log(filterRecipesR);
    }, [filterRecipesR])

    //Hnadlers
    const handleDiets = (diet) => {
        if (!filter.diets.includes(diet))
            setFilter({ ...filter, diets: [...filter.diets, diet] })
        else
            setFilter({ ...filter, diets: filter.diets.filter((diet2) => diet2 !== diet) })

    }
    const handleScore = (array) => {
        if (!filter.healthScore.includes(array[0]))
            setFilter({ ...filter, healthScore: array })
        else
            setFilter({ ...filter, healthScore: [] })

    }
    const handleOrigin = (origin) => {
        if (!filter.origins.includes(origin))
            setFilter({ ...filter, origins: [...filter.origins, origin] })
        else
            setFilter({ ...filter, origins: filter.origins.filter((origin2) => origin2 !== origin) })
    }
    const handleSendFilter = async () => {
        let recipesFiltradas = allRecipesR.filter((recipe) => {
            //Flags
            let diet = filter.diets.length > 0 ? false : true
            let score = filter.healthScore.length > 0 ? false : true
            let origin = filter.origins.length > 0 ? false : true
            console.log("origin:" + origin);
            //Filtramos por dieta
            if (filter.diets.length > 0) {
                for (let i = 0; i < recipe.diets.length; i++) {
                    console.log("Entra al for");
                    if (filter.diets.includes(recipe.diets[i])) diet = true
                }
            }
            //filtramos por score
            if (filter.healthScore.length > 0) {
                console.log("Entra al if de heathScore");
                if (recipe.healthScore >= filter.healthScore[0] && recipe.healthScore <= filter.healthScore[1]) {
                    console.log("netra a este if");
                    score = true
                }
            }
            //Filtramos por origin
            if (filter.origins.length > 0) {
                console.log(filter.origins.length);
                if (filter.origins.length == 1) {
                    if (filter.origins[0] == "Bd") {
                        console.log(recipe.dataBase);
                        if (recipe.dataBase) origin = true
                    }
                    else {
                        console.log("Esto tambien se cumple");
                        if (recipe.dataBase === undefined) origin = true
                    }
                } else origin = true

            }
            return diet && score && origin
        })
        //despachamos las recetas filtradas 
        dispatch(filterRecipes(recipesFiltradas))
    }
    const handleSelector = () => {

    }

    console.log(filter);
    return (
        <div className={Style.filterBar}>
            <div className={Style.columna1}>
                {filter.diets.map((diet) => <div className={Style.showFilter}>{diet}</div>)}
                {filter.origins.map((origin) => <div className={Style.showFilter}>{origin}</div>)}
            </div>
            <div className={Style.columna2}>
                <div className={Style.desplegable}>
                    <button className={Style.button}>Selecione una dieta</button>
                    <div className={Style.conteinerOptions}>
                        <a onClick={() => handleDiets("vegetarian")} href="#">vegetarian</a>
                        <a onClick={() => handleDiets("vegan")} href="#">vegan</a>
                        <a onClick={() => handleDiets("gluten free")} href="#">gluten free 3</a>
                        <a onClick={() => handleDiets("dairy free")} href="#">dairy free</a>
                        <a onClick={() => handleDiets("lacto ovo vegetarian")} href="#">lacto ovo vegetarian</a>
                        <a onClick={() => handleDiets("paleolithic")} href="#">paleolithic</a>
                        <a onClick={() => handleDiets("primal")} href="#">primal</a>
                    </div>
                </div>
                <div className={Style.desplegable}>
                    <button className={Style.button}>Origin</button>
                    <div className={Style.conteinerOptions}>
                        <a onClick={() => handleOrigin("Api")} href="#">Recetas API</a>
                        <a onClick={() => handleOrigin("Bd")} href="#">Recetas BD</a>
                    </div>
                </div>
                <div className={Style.desplegable}>
                    <button className={Style.button}>Health Score</button>
                    <div className={Style.conteinerOptions}>
                        <a onClick={() => handleScore([0, 50])} href="#">Low 0-50</a>
                        <a onClick={() => handleScore([51, 70])} href="#">Middle 50-70</a>
                        <a onClick={() => handleScore([71, 100])} href="#">Hight 70-100</a>
                    </div>
                </div>
            </div>

            <div className={Style.columna4}>
                <button onClick={() => handleSendFilter()} className={Style.button}>Filtrar</button>
            </div>

        </div>
    )
}