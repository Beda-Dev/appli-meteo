'use client'

import { useEffect,useState } from "react"
import PropsTypes from 'prop-types'



interface api{

    clé :string,
    url : string

}

interface ReponseApiOpenweather {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface props{
    ville: string
}


const API:api = {
clé : "9e3c46f5b40930a425ae54e3e5955572",
url : "https://api.openweathermap.org/data/2.5/" 
}



export default function Weather({ville} : props){

    const [resultat, setResultat] = useState<ReponseApiOpenweather>()

    useEffect(()=>{
        try {
            fetch( `${API.url}weather?q=${ville}&units=metric&lang=fr&APPID=${API.clé}`)
                .then((res)=>res.json())
                .then((result) => {
                    setResultat(result)
                    console.log(result)


                    } )
                }catch (error) {
                    console.error(error)
            
        }



    } , [ville])


return(

<div className=" border rounded-2xl bg-transparent backdrop-blur-lg w-96 h-64">
    <h1>Météo actuelle</h1>
    <h3>Heure</h3>

    <div>
        {resultat ? (
         
            <div>
                
                <p>ville : {resultat.name}</p>
                <p>meteo : {resultat.weather[0].description} </p>
                <p>coordonné : logitude {resultat.coord.lon}  , lattitude : {resultat.coord.lat}</p>
                

            </div>
        ) : (
            <div>
                <p>Chargement...</p>
            </div>
        )}
    </div>
</div>

        )


}

Weather.propsTypes ={
 ville : PropsTypes.string
}
