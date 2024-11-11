'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

// Les interfaces de réponses (inchangées)
interface ReponseApiOpenweather {
    cod: string;
    message: number | string;
    cnt?: number;
    list?: WeatherForecast[];
    city?: CityInfo;
}

interface WeatherForecast {
    dt: number; // Timestamp en Unix
    main: {
        temp: number;          // Température actuelle
        feels_like: number;    // Température ressentie
        temp_min: number;      // Température minimale pour la période
        temp_max: number;      // Température maximale pour la période
        pressure: number;      // Pression atmosphérique
        humidity: number;      // Humidité en %
    };
    weather: WeatherDescription[]; // Liste des conditions météorologiques
    clouds: {
        all: number;           // Couverture nuageuse en %
    };
    wind: {
        speed: number;         // Vitesse du vent
        deg: number;           // Direction du vent en degrés
    };
    visibility: number;        // Visibilité en mètres
    pop: number;               // Probabilité de précipitation
    rain?: {
        "3h": number;          // Quantité de pluie sur les 3 heures
    };
    dt_txt: string;            // Date et heure de la prévision en format texte
}

interface WeatherDescription {
    id: number;                // ID de la condition météorologique
    main: string;              // Condition principale (e.g., Rain, Snow)
    description: string;       // Description (e.g., light rain)
    icon: string;              // Code de l'icône de l'API OpenWeather
}

interface CityInfo {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;          // Décalage du fuseau horaire en secondes
    sunrise: number;           // Heure du lever de soleil en timestamp Unix
    sunset: number;            // Heure du coucher de soleil en timestamp Unix
}

interface Props {
    ville: string;
}

interface Api {
    clé: string;
    url: string;
}

const API: Api = {
    clé: process.env.NEXT_PUBLIC_API_KEY_WEATHER as string,
    url: process.env.NEXT_PUBLIC_API_URL_WEATHER as string
};

export default function Prevision({ ville }: Props) {
    const [resultat, setResultat] = useState<ReponseApiOpenweather | null>(null);
    const [previsionsParJour, setPrevisionsParJour] = useState<WeatherForecast[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [jourSelectionne, setJourSelectionne] = useState<number>(3)

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${API.url}forecast?q=${ville}&units=metric&lang=fr&APPID=${API.clé}`
                );
                const result: ReponseApiOpenweather = await response.json();

                if (result.cod !== "200") {
                    setError("Ville non trouvée.");
                    setLoading(false);
                    return;
                }

                setResultat(result);

                
                const previsionsGroupedByDay: { [key: string]: WeatherForecast } = {};

                result.list?.forEach((prevision) => {
                    const date = new Date(prevision.dt_txt);
                    const dateKey = date.toLocaleDateString("fr-FR"); 

                    
                    if (!previsionsGroupedByDay[dateKey]) {
                        previsionsGroupedByDay[dateKey] = prevision;
                    }
                });

                
                setPrevisionsParJour(Object.values(previsionsGroupedByDay));
            } catch (error) {
                setError('Erreur lors de la récupération des données météo');
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [ville]);

    const filteredPrevisions = previsionsParJour.slice(0, jourSelectionne)

    if (loading) {
        return <div className="rounded-3xl text-white p-2 max-h-[275px] min-h-[324px] max-w-72 h-90 bg-white bg-opacity-20">
            <span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (error) {
        return <div className="rounded-3xl text-white p-2 max-h-[275px] min-h-[324px] max-w-72 h-90 bg-white bg-opacity-20">{error}</div>;
    }

    return (
        <div className="rounded-3xl text-white p-2 max-h-[275px] min-h-[324px] max-w-72 h-90 bg-white bg-opacity-20">
            {resultat ? (
                <div className="">
                    <div className="flex my-1">
                        <h2 className="ml-3">Prévisions </h2>
                        <ul className="menu menu-horizontal bg-blue-900 rounded-lg bg-white bg-opacity-30 ml-auto rounded-sm " style={{padding:'1px'}}>
                            <li><button
                                 onClick={() => setJourSelectionne(3)}
                                className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-sm px-2" style={{paddingTop:"1px",paddingBottom:"1px"}}>3 jours</button> </li>
                            <li><button 
                                 onClick={() => setJourSelectionne(previsionsParJour.length)}
                                className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-sm px-2 " style={{paddingTop:"1px",paddingBottom:"1px"}}>6 jours</button></li>
                            
                        </ul>
                        
                    </div>
                   
                    <ul className="">
                        {filteredPrevisions.length > 0 ? (
                            filteredPrevisions.map((prevision, index) => (
                                <div key={index} className="flex flex-col  justify-center">
                                    <li title={`date : ${new Date(prevision.dt * 1000).toLocaleDateString("fr-FR") } , Meteo :${prevision.weather[0].description}`} className="rounded-lg flex items-center justify-center text-sm  hover:bg-blue-900 hover:bg-opacity-50">
                                        <Image
                                            src={`/${prevision.weather[0].icon}.png`}
                                            alt={prevision.weather[0].description}
                                            width={47}
                                            height={47}
                                        />
                                        <p>
                                            {Math.round(prevision.main.temp_min)}/{Math.round(prevision.main.temp_max)}°C
                                        </p>
                                        <p className="ml-auto">
                                            {new Date(prevision.dt * 1000).toLocaleDateString("fr-FR")}
                                        </p>
                                    </li>
                                </div>
                            ))
                        ) : (
                            <p >Aucune prévision disponible.</p>
                        )}
                    </ul>
                </div>
            ) : (
                <div className="h-80">Ville inconnue</div>
            )}
        </div>
    );
}
