'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

interface VilleMeteo {
    nom: string;
    description: string;
    icone: string;
}

interface props{
    ville : string

}

export default function ListeVille({ville}:props) {
    const [meteoVilles, setMeteoVilles] = useState<VilleMeteo[]>([]);

    useEffect(() => {
        const recupererDonnees = () => {
            const donneesStockees = sessionStorage.getItem('villes');
            if (donneesStockees) {
                const Tableauville = JSON.parse(donneesStockees);
                setMeteoVilles(Tableauville);
            }
        };

        recupererDonnees();
    }, [ville]);

    return (
        <div className="bg-white bg-opacity-10 p-4 rounded-lg w-72 h-64">
            <h2 className="text-white text-xl mb-2 italique">villes populaires</h2>
            <ul className="space-y-2">
                    {meteoVilles.slice(-5).map((ville, index) => ( 
                        <li key={index} className="text-white">
                            <div className="flex items-center">
                                <Image src={`/${ville.icone}.png`} width={50} height={50} alt="météo" className="w-8 h-8 mr-2"/>
                                <span>{ville.nom} </span>
                                <span className="pl-3 ml-auto">{ville.description}</span>
                            </div>
                        </li>
                    ))}

            </ul>
        </div>
    );
}
