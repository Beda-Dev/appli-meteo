'use client';
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const API = {
    key: 'AIzaSyA-gAfUSYia0I5lJ8Cpwsbx4qJfwXbGLd4',
};

interface Props {
    Ville: string;
}

export default function Maps({ Ville }: Props) {

    const [coordonnéMAPS, setCoordonnéMAPS] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const stockageCoordonné = sessionStorage.getItem("coordonné");
        if (stockageCoordonné) {
            const parsedCoordonné = JSON.parse(stockageCoordonné);
            setCoordonnéMAPS({ lat: parsedCoordonné.lat, lng: parsedCoordonné.lon });
        }
    }, [Ville]);

    const dimension = {
        width: '550px',
        height: '250px'
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={API.key}>
                <GoogleMap
                    mapContainerStyle={dimension}
                    center={coordonnéMAPS || { lat: 5.3094, lng: -4.0197 }} 
                    zoom={10}
                    mapContainerClassName="rounded-2xl "
                >
                    {coordonnéMAPS && <Marker position={coordonnéMAPS} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
