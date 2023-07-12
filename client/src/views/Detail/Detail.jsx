import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//importamos action 
import { loadingDetail, deleteDetail } from "../../Redux/actions";

const Detail = () => {
    //Instanciamos las cosas de el estado global 
    const dispatch = useDispatch()
    const data = useSelector((store) => store.detail)
    const { id } = useParams();
    
    // console.log(data);
    let vegan = false
    let vegetarian = false
    let glutenFree = false
    let dairyFree = false
    let lactoOvo = false
    let paleolithic = false
    let primal = false
    console.log(data.diets);

    if (data.diets?.includes("vegan")) vegan = true
    if (data.diets?.includes("gluten free")) glutenFree = true
    if (data.diets?.includes("vegetarian")) vegetarian = true
    if (data.diets?.includes("lacto ovo vegetarian")) lactoOvo = true
    if (data.diets?.includes("primal")) primal = true
    if (data.diets?.includes("paleolithic")) paleolithic = true
    if (data.diets?.includes("dairy free")) dairyFree = true

    useEffect(() => {
        const aux = async () => {await dispatch(loadingDetail(id))}
        aux()
        return ()=>{dispatch(deleteDetail())}
    }, []);

    return (
        <div className={Style.detail}>
            <div className={Style.info}>
                <div className={Style.presentacion}>
                    <h1 className={Style.title}>{data.name}</h1>
                    <img className={Style.imagen} src={data.image} />
                    <p className={Style.resume}>{data.resume}</p>
                    <div className={Style.dietsConteiner}>
                        {vegan && <div className={Style.cajaVegan}>Vegan</div>}
                        {vegetarian && <div className={Style.cajaVegetarian}>Vegetarian</div>}
                        {glutenFree && <div className={Style.cajaGlutenFree}>Gluten free</div>}
                        {dairyFree && <div className={Style.cajaDairyFree}>Dairy free</div>}
                        {lactoOvo && <div className={Style.cajaLactoOvo}>Lacto ovo vegetarian</div>}
                        {paleolithic && <div className={Style.cajaPaleolithic}>Paleolithic</div>}
                        {primal && <div className={Style.cajaPrimal}>Primal</div>}

                    </div>
                </div>
                <div className={Style.stepsConteiner}>
                    <h1>Como hacer {data.name}:</h1>
                    {data.steps?.map((step, index) => {
                        return (
                            <div key={index}>
                                <p>{step.number}){step.step}</p>
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    );



};

export default Detail;