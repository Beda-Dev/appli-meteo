import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, ReferenceLine, Tooltip, ResponsiveContainer, Text, Area,DotProps, YAxis } from "recharts";



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
  const [change1 , setChange1]= useState<boolean>(false)
  const [change2 , setChange2] = useState<boolean>(false)
  const [couleur , setCouleur] = useState<string>('#FFFF')
  const [couleur1 , setCouleur1] = useState<string>('#FFFF')
  const [couleur2 , setCouleur2] = useState<string>('#FFFF')
  const [activeIndex, setActiveIndex] = useState<number>()

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

  const handleClick = (index : number) => {
    setActiveIndex(index); 
  };

  const changement = (index : number)=>{

    if(index === 1 ){
    setChange(!change)
    if(change===true){
      setCouleur("black")
      setCouleur2("transparent")
    }else{setCouleur("transparent")}
  }
  
  if(index === 2 ){
    setChange1(!change1)
    if(change1===true){
      setCouleur1("white")
    }else{setCouleur1("transparent")}
  }

   
  if(index === 3 ){
    setChange2(!change2)
    if(change2===true){
      setCouleur2("white")
    }else{setCouleur2("transparent")}
  }


  

   
    

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
    const description : string[] = [];
    const decalageHoraire: number = ConversionHeureSeconde(data.city?.timezone as number);

    const tempsactuel = new Date(data.list?.[0].dt as number * 1000);  
    tempsactuel.setHours(tempsactuel.getHours() + decalageHoraire); 
    data.list?.forEach((forecast, index) => {
      const rain = forecast.rain ? forecast.rain['3h'] : 0; 
      const tableTemp = Math.round(forecast.main.temp); 
      const ico = forecast.weather[0].icon as string; 
      const desc = forecast.weather[0].description as string

      if (index !== 0) {
        tempsactuel.setHours(tempsactuel.getHours() + 3); 
      }

      const formattedTime = `${String(tempsactuel.getHours()).padStart(2, "0")}:${String(tempsactuel.getMinutes()).padStart(2, "0")}`;
      labels.push(formattedTime);

      rainData.push(rain);
      temperature.push(tableTemp);
      icon.push(ico);
      description.push(desc)
    });

    return { labels, rainData, temperature, icon , description};
  };

  if (loading) {
    return <div className="rounded-3xl text-white p-2 max-w-[900px] max-h-[320px] text-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (error) {
    return <div className="rounded-3xl text-white text-center p-2 w-[800px] max-h-[325px] bg-white bg-opacity-20 mr-2">{error}</div>;
  }

  const weatherData = resultat ? transformWeatherData(resultat) : { labels: [], rainData: [], temperature: [], icon: [] , description : []};

  return (
    <div className="w-[820px] max-h-[324px] rounded-3xl p-8 bg-white bg-opacity-20 text-white">
      <div className="flex justify-between">
        <h2>Résumé</h2>
        <ul className="menu menu-horizontal bg-base-200 rounded-lg bg-white bg-opacity-30 ml-auto rounded-sm  text-white " style={{padding:'1px'}}>
          <li><button 
            style={{paddingTop:"1px",paddingBottom:"1px"}}
            className={`ml-auto rounded-sm px-2  ${activeIndex === 0 ? 'bg-blue-900 bg-opacity-80' : 'hover:bg-blue-900 hover:bg-opacity-80'}`}
            onClick={() => {handleClick(0) ; changement(1)}}
            >Resumer</button> </li>
          <li><button 
                className={`ml-auto rounded-sm px-2  ${activeIndex === 1 ? 'bg-blue-900 bg-opacity-80' : 'hover:bg-blue-900 hover:bg-opacity-80'}`}
                style={{paddingTop:"1px",paddingBottom:"1px"}} 
                onClick={() => {
                  changement(2) 
                  handleClick(1)}}>Horaire</button></li>
          <li><button 
              className={`ml-auto rounded-sm px-2  ${activeIndex === 2 ? 'bg-blue-900 bg-opacity-80' : 'hover:bg-blue-900 hover:bg-opacity-80'}`}
              onClick={() =>{ changement(3) ; handleClick(2)}}
              

              style={{paddingTop:"1px",paddingBottom:"1px"}} >plus de details</button></li>
        </ul>
      </div>
      <div className=" w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData.temperature.map((temp, index) => ({
            temp,
            heure: weatherData.labels[index],
            rain: weatherData.rainData[index],
            icon: weatherData.icon[index],
            description : weatherData.description[index]
          }))}>

            <defs>
              <linearGradient id="temperatureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="ywhite" stopOpacity={1} />
                <stop offset="100%" stopColor="red" stopOpacity={0.9} /> 
              </linearGradient>
            </defs>
            <YAxis
                tick={{ fill: `${couleur2}`, fontSize: 12 }}  
                stroke={couleur2} 
                tickLine={false} 
                axisLine={{ stroke: `${couleur2}`, strokeWidth: 2 }}  
                label={{
                  value: 'Température (°C)',  
                  position: 'outsideDown',    
                  fill: `${couleur2}`,
                  fontSize: 9
                }}
              />

            <XAxis 
              dataKey="heure" 
              tickFormatter={(value) => value} 
              tick={{ fill:`${couleur1}`, fontSize: 12 }} 
              label={{
                value: 'Heures',  
                position: 'outsidebottom',   
                fill: `${couleur1}`,
                fontSize: 12,
              }}
              />
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

            <Area
              type="monotone"
              dataKey="temp"
              stroke="red"  
              fill="url(#temperatureGradient)"  
              fillOpacity={0.6}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="orange"  
              dot={false}
              name="Température (°C)"
              label={{
                value: 'Heures', 
                fill: `white`,
                fontSize: 12,}}
            
            />
            <Line
              type="monotone"
              dataKey="description"
              stroke={couleur}  
              dot={false}
              name="Meteo"
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
