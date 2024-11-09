'use client';
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Props {
    Ville: string;
    MessageUpdate: (VilleMaps: string) => void; 
  }

export default function Maps({ Ville , MessageUpdate }: Props ) {

    const [coordonnéMAPS, setCoordonnéMAPS] = useState<{ lat: number; lng: number } | null>(null);
    const [newcoordinates, setNewCoordinates] = useState<{ lat: number; lng: number }>();
    const [erreur, setError] = useState<string | null>(null);
    const [address , setAddress] = useState<string |null>()
    const API={
        key : process.env.NEXT_PUBLIC_API_KEY_MAPS as string,
        url : process.env.NEXT_PUBLIC_API_URL_MAPS as string
    }

    interface cood{
        lat : number,
        lng : number
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        if (latLng) {
          const lat = latLng.lat();
          const lng = latLng.lng();
          setNewCoordinates({ lat, lng });
          console.log(`Coordonnées du clic: Lat: ${lat}, Lng: ${lng}`);



        }}

        useEffect(()=>{
            const recherche= async (newcoordinates : cood)=>{

                try {
                    const reponse = await fetch(`${API.url}=${newcoordinates?.lat},${newcoordinates?.lng}&key=${API.key}`)
                    const donnee = await reponse.json();
                    if (donnee.status === 'OK') {
                        const formattedAddress:string = donnee.results[0]?.formatted_address || 'Adresse non trouvée';
                        const Villerecherché = formattedAddress.split(",")
                        setAddress(Villerecherché[1]);
                        MessageUpdate(address as string)
                        console.table(Villerecherché[1].trim())
                      } else {
                        setError('Erreur de géocodage : ' + donnee.status);}
    
    
                } catch (error) {
    
                    setError(`Erreur lors de la requête API , description =${error}`)
                    console.log(erreur)
                    
                }

            }

            recherche(newcoordinates as cood)


            



          },[newcoordinates])

          

    useEffect(() => {
        
        
        setTimeout(()=>{

            const recuperation=()=>{
                const stockageCoordonné = sessionStorage.getItem("coordonné");
                if (stockageCoordonné) {
                    const parsedCoordonné = JSON.parse(stockageCoordonné);
                    setCoordonnéMAPS({ lat: parsedCoordonné.lat, lng: parsedCoordonné.lon });
                }
                
    
            }
            recuperation()

            const intervalId = setInterval(() => {
                recuperation();
            }, 500);
    
            return () => setTimeout( ()=> {clearInterval(intervalId);},1000)
            
          },100)

          

        
       
    }, [Ville]);

    const dimension = {
        width: '540px',
        height: '250px'
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={API.key}>
                <GoogleMap
                    mapContainerStyle={dimension}
                    center={coordonnéMAPS || { lat: 5.3094, lng: -4.0197 }} 
                    zoom={10}
                    mapContainerClassName="rounded-3xl"
                    onClick={handleMapClick}
                    

                >
                    {coordonnéMAPS && <Marker position={coordonnéMAPS} draggable/>}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
