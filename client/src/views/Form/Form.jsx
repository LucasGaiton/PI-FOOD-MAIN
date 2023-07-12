import axios from "axios"
import Style from '../Form/Form.module.css'
import { useState, useEffect } from "react"
export default function Form() {


    return (
        <div className={Style.form}>
            <div className={Style.formConteiner}>
                <h1>NEW RECIPE</h1>
                <form action="">
                    <div>
                        <input
                            type="text"
                            placeholder="Agregar un nombre a la receta"
                        />
                    </div>
                    <div>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="1">

                        </textarea>
                    </div>
                    <div>
                        <span>Hola soy span</span>
                        <input
                            type="range"
                            name="healthScore"
                            min="1"
                            max="100"
                        />

                    </div>
                    <div>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10">

                        </textarea>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Agrega la direccion de la tu imagen"
                        />
                    </div>
                    <div></div>
                    <button>Submit</button>

                </form>

            </div>
        </div>
    )
}