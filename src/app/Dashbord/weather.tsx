'use client'

import { useEffect,useState } from "react"
import Image from "next/image"







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
    cod: number | string;
    message?:string
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
    const [tempsactuel, setTempsActuel] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
    const [synchro , setSynchro] = useState<string>('')

    useEffect(()=>{
        try {
            fetch( `${API.url}weather?q=${ville}&units=metric&lang=fr&APPID=${API.clé}`)
                .then((res)=>res.json())
                .then((result) => {
                    setResultat(result)
                    console.log(result)
                    setSynchro(result.weather[0].description)
                  


                    } )
                }catch (error) {
                    console.error(error)
            
        }



    } , [ville ,synchro])

    // Hook pour obtenir l'heure actuelle
    useEffect(() => {
        const MiseAjourTemps = () => {
            const now = new Date();
            setTempsActuel({ hours: now.getHours(), minutes: now.getMinutes() });
        };

        MiseAjourTemps();
        const intervalId = setInterval(MiseAjourTemps, 1000);

        return () => clearInterval(intervalId); 
    }, []);

    const ConversionHeureSeconde = (seconde: number): number => {
        return (seconde / 60) / 60; 
    };
    


 

return(

<div className=" border text-white rounded-3xl bg-white bg-opacity-10 backdrop-blur-2xl w-96 h-64 ">
    <h1 className="pl-3 mb-1 font-bold text-2xl italic">Météo actuelle </h1>

    <div >
    <h3 className="pl-2">
        {resultat?.cod == 200 && tempsactuel ?(<p>{(tempsactuel.hours)+ConversionHeureSeconde(resultat.timezone)}h {tempsactuel.minutes}min</p>):
        resultat?.cod === "404"? (<p>Aucun resultat</p>):(<p>Heure incorrect</p>)
        }
    </h3>
        {resultat && resultat.cod === 200 ?(

            <div className="rounded-md w-full h-48 grid grid-row-2 overflow">
                <div className="flex">
                    <Image 
                        src={`/${resultat?.weather[0].icon}.png`} 
                        alt= "meteo"
                        width={50} 
                        height={50} 
                        className="w-36 h-36" 
                    />
                    <div className="w-full h-full text-right pr-5">
                        <h4>{resultat?.name} , {resultat?.sys.country}</h4>
                        <h1 className="font-bold text-4xl">{(resultat?.main.temp)}°C</h1> 
                        <h2>{resultat?.weather[0].description}</h2>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 text-center flex flex-col items-center ">
                    <Image 
                            src="/pressure.png" 
                            alt="pression" 
                            title="Pression Athmospherique"
                            width={20} 
                            height={20} 
                            className="mb-1" 
                        />

                    <p>{resultat?.main.pressure} hPa</p></div>
                    <div className="w-1/4 text-center flex flex-col items-center">
                        <Image 
                            src="/humidity.png" 
                            alt="Humidité" 
                            title="Humidité en pourcentage"
                            width={20} 
                            height={20} 
                            className="mb-1" 
                        />
                        <p>{resultat?.main.humidity}%</p>
                    </div>
                    <div className="w-1/4 text-center flex flex-col items-center">
                    <Image 
                            src="/vent.png" 
                            alt="vitesseVent" 
                            width={20} 
                            height={20} 
                            title="Vitesse du vent"
                            className="" 
                        />
                    <p>{resultat?.wind.speed} km/h</p></div>
                    <div className="w-1/4 text-center flex flex-col items-center">
                    <Image 
                            src="/visibility.png" 
                            alt="visibilité en mettre" 
                            width={20} 
                            height={20} 
                            title="Visibilité en mettre"
                            className="" 
                        />
                    <p>{resultat?.visibility} m</p></div> 
                </div>
            </div>

        ) :
        resultat && resultat.cod === "404" ? (
            <div className="text-center">
                <p>Opps !! ville non trouver , essayer avec une autre orthographe</p>
            </div>
        ):
        (
            <div className="text-center">
                <p> Chargement...</p>
            </div>
        )}
    </div>
</div>

        )


}