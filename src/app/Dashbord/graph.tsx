import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, ReferenceLine, Tooltip, ResponsiveContainer, Text, Area,DotProps } from "recharts";



interface CustomDotPayload {
  icon: string;
}


interface CustomDotProps extends DotProps { value: CustomDotPayload }


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
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  dt_txt: string;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
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
  timezone: number;
  sunrise: number;
  sunset: number;
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

export default function Graph({ ville }: Props) {
  const [resultat, setResultat] = useState<ReponseApiOpenweather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [change , setChange] = useState<boolean >(false)
  const [couleur , setCouleur] = useState<string>('#FFFF')

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API.url}forecast?q=${ville}&units=metric&cnt=10&lang=fr&APPID=${API.clé}`);
        const result: ReponseApiOpenweather = await response.json();

        if (result.cod !== "200") {
          setError("Ville non trouvée.");
          setLoading(false);
          return;
        } else {
          setResultat(result);
        }
      } catch (error) {
        setError('Erreur lors de la récupération des données météo');
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [ville]);

  const ConversionHeureSeconde = (seconde: number): number => {
    return (seconde / 60) / 60; 
  };

  const changement = ()=>{
    setChange(!change)
    if(change===true){
      setCouleur("white")
    }else{setCouleur("transparent")}
   
    

  }

  const CustomDot: React.FC<CustomDotProps> = ({ cx, cy, value }) => {
    if (!value) return null;
     const imageUrl = `https://openweathermap.org/img/wn/${value.icon}.png`; 
     return ( 
     <image 
      x={cx! - 50 / 2} 
      y={cy! - 50 - 2} 
      width={50} 
      height={50} 
      href={imageUrl} /> ); };

  const transformWeatherData = (data: ReponseApiOpenweather) => {
    const labels: string[] = [];
    const rainData: number[] = [];
    const temperature: number[] = [];
    const icon: string[] = [];
    const decalageHoraire: number = ConversionHeureSeconde(data.city?.timezone as number);

    const tempsactuel = new Date(data.list?.[0].dt as number * 1000);  
    tempsactuel.setHours(tempsactuel.getHours() + decalageHoraire); 
    data.list?.forEach((forecast, index) => {
      const rain = forecast.rain ? forecast.rain['3h'] : 0; 
      const tableTemp = Math.round(forecast.main.temp); 
      const ico = forecast.weather[0].icon as string; 

      if (index !== 0) {
        tempsactuel.setHours(tempsactuel.getHours() + 3); 
      }

      const formattedTime = `${String(tempsactuel.getHours()).padStart(2, "0")}:${String(tempsactuel.getMinutes()).padStart(2, "0")}`;
      labels.push(formattedTime);

      rainData.push(rain);
      temperature.push(tableTemp);
      icon.push(ico);
    });

    return { labels, rainData, temperature, icon };
  };

  if (loading) {
    return <div className="rounded-3xl text-white p-2 max-w-[900px] max-h-[320px] text-center">Chargement des données...</div>;
  }

  if (error) {
    return <div className="rounded-3xl text-white text-center p-2 w-[800px] max-h-[325px] bg-white bg-opacity-20 mr-2">{error}</div>;
  }

  const weatherData = resultat ? transformWeatherData(resultat) : { labels: [], rainData: [], temperature: [], icon: [] };

  return (
    <div className="w-[820px] max-h-[324px] rounded-3xl p-8 bg-white bg-opacity-20 text-white">
      <div className="flex justify-between">
        <h2>Résumé</h2>
        <ul className="menu menu-horizontal bg-base-200 rounded-lg bg-white bg-opacity-30 ml-auto rounded-sm px-[1] py-[1] ">
          <li><button className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-sm px-2 py-[1]">Resumer</button> </li>
          <li><button className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-sm px-2 py-[1]" onClick={changement}>Horaire</button></li>
          <li><button className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-sm px-2 py-[1]">plus de details</button></li>
        </ul>
      </div>
      <div className=" w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData.temperature.map((temp, index) => ({
            temp,
            heure: weatherData.labels[index],
            rain: weatherData.rainData[index],
            icon: weatherData.icon[index]
          }))}>
            {/* Définition du dégradé sous la courbe de température */}
            <defs>
              <linearGradient id="temperatureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="yellow" stopOpacity={0.7} /> {/* Dégradé de jaune */}
                <stop offset="100%" stopColor="red" stopOpacity={0.9} /> {/* Vers rouge */}
              </linearGradient>
            </defs>

            <XAxis dataKey="heure" tickFormatter={(value) => value} tick={{ fill:`${couleur}`, fontSize: 12 }} />
            {weatherData.labels.map((___, index) => (
              <Text
                key={index}
                x={index * 70 + 25}
                y={240}
                textAnchor="middle"
                fill="white"
                fontSize={10}
                className="border"
              >
                {`${weatherData.rainData[index]} mm`}
              </Text>
            ))}

            <ReferenceLine x="0" y="0" stroke="white" strokeWidth={2} />
            <ReferenceLine
              x={Math.floor(weatherData.labels.length / 2.3)}
              stroke="white"
              strokeWidth={2}
              fill="white"
            />

            <Tooltip labelFormatter={(heure) => `Heure: ${heure}`} />

            {/* Ajout de l'aire sous la courbe de température */}
            <Area
              type="monotone"
              dataKey="temp"
              stroke="red"  // On n'affiche pas le bord de la courbe ici
              fill="url(#temperatureGradient)"  // Utilisation du dégradé sous la courbe
              fillOpacity={0.6}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="orange"  
              dot={false}
              name="Température (°C)"
            />
            <Line
              type="monotone"
              dataKey="rain"                                                  
              stroke="gray"
              name="Pluie (mm)"
              dot={({ cx, cy, index }) => (
                <CustomDot cx={cx} cy={cy} value={{ icon: weatherData.icon[index] }} key={index}/>
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
