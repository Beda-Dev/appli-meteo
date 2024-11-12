'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface reponseUtile{
    name : string,
    description : string,
    icon : string
}

interface props{

  ville : string
}

const grandesVilles = [
    "Le Caire", "Lagos", "Nairobi", "Abidjan", "Addis-Abeba", "Alger", "Casablanca", "Johannesburg", "Lusaka",
    "Shanghai", "Beijing", "Tokyo", "Delhi", "Mumbai", "Karachi", "Istanbul", "Manille", "Seoul", "Bangkok",
    "Moscou", "Londres", "Berlin", "Paris", "Madrid", "Rome", "Amsterdam", "Athènes", "Warsaw", "Lisbonne",
    "New York", "Los Angeles", "Chicago", "Mexico City", "Toronto", "Vancouver", "Montreal", "Houston", "Miami", "San Francisco",
    "São Paulo", "Buenos Aires", "Rio de Janeiro", "Lima", "Bogotá", "Santiago", "Caracas", "Quito", "Montevideo", "Brasilia",
    "Sydney", "Melbourne", "Brisbane", "Auckland", "Perth", "Wellington", "Adélaïde", "Canberra", "Hobart", "Christchurch",
    "Riyad", "Dubaï", "Istanbul", "Téhéran", "Bagdad", "Le Caire","Lagos","Le Caire","Kinshasa","Nairobi","Addis-Abeba",
    "Dakar","Dar es Salaam","Khartoum","Accra","Abuja","Tunis","Luanda","Antananarivo","Maputo"
  ];
  

const getRandomValues = (array: string[], num: number): string[] => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, num);
  };
  

let CinqVillePopulaire:string[]= [];

const fetchWeatherData = async (ville: string) => {
  const Key = process.env.NEXT_PUBLIC_API_KEY_WEATHER as string
  const url = process.env.NEXT_PUBLIC_API_URL_WEATHER as string

  const response = await fetch(`${url}weather?q=${ville}&units=metric&lang=fr&APPID=${Key}`);
  const data = await response.json();

  return {
    name: data.name,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};

export default function Villepopulaire({ville}:props) {
  const [weatherData, setWeatherData] = useState<reponseUtile[]>([]);

  useEffect(() => {
    const fetchWeatherPourLesVilles = async () => {
        CinqVillePopulaire = getRandomValues(grandesVilles, 5)
      const data = await Promise.all(CinqVillePopulaire.map((city) => fetchWeatherData(city)));
      setWeatherData(data);
    };

    fetchWeatherPourLesVilles();
  }, [ville]);

  return (
    <div className="py-2 pt-2 pr-5 mr-1 mt-0 text-white min-w-full  h-[250px] rounded-xl bg-white bg-opacity-10">
        <div className='flex items-center justify-center'>
            <h2 className="text-xl mr-auto p-2">Villes Populaires</h2>
            <h3 className='pl-5 text-sm opacity-50 ml-auto hover:opacity-100'><button>voir plus</button></h3>
        </div>
     
      <ul className='text-sm'>
        {weatherData.map((cityData) => (
          <li key={cityData.name} className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src={`https://openweathermap.org/img/wn/${cityData.icon}.png`}
                alt={cityData.description}
                width={40}
                height={40}
              />
              <p>{cityData.name}</p>
              
            </div>
            <p className='ml-auto'>{cityData.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
