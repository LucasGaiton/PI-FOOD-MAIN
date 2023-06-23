//importamos Estilo 
import Style from "../Card/Card.module.css"


//importamos link
import { Link } from 'react-router-dom';


export default function Card({ image, name, diets, id }) {
    let vegan = false
    let vegetarian = false
    let glutenFree = false


    if (diets !== undefined) {

        if (diets.includes("vegan")) vegan = true
        if (diets.includes("vegetarian")) vegetarian = true
        if (diets.includes("gluten free")) glutenFree = true
    }



    //creamos auxiliar para no mostrar algunas dietas 
    let newDiets = []
    for (const key in diets) {
        if (diets[key] !== "vegan" && diets[key] !== "vegetarian" && diets[key] !== "gluten free") newDiets.push(diets[key])
    }


    return (
        <div className={Style.carConteiner}>
            <div className={Style.imageConteiner}>
                <Link to={`/detail/${id}`}>
                    <img className={Style.image} src={image} alt={"imagen de la receta"} />
                </Link>

                <div className={Style.dietsConteiner}>
                    {vegetarian && <p className={Style.vegetarian}>{"vegetarian"}</p>}
                    {vegan && <p className={Style.vegan}>{"vegan"}</p>}
                    {glutenFree && <p className={Style.glutenFree}>{"glutenFree"}</p>}
                </div>
            </div>
            <div>
                <h1>{name}</h1>

                <div>
                    {
                        newDiets.length !== 0 && <h1>Extra diets:</h1>
                    }
                    {
                        newDiets.map((diet) => {
                            return <li>{diet}</li>
                        })
                    }
                </div>

            </div>
        </div>
    )
}

