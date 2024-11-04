'use client';
import Image from "next/image";
import Weather from "./weather";
import { useState , useEffect} from "react";
import Link from "next/link";
import Maps from "./map";

interface utilisateur{
    username : string,
    password : string,
    profil : string
}


export default function Dashbord() {
    

    const [nomville, setNomVille] = useState("");
    const [ville , setVille] = useState("abidjan")
    const [utilisateurconnecter , setUtilisateurconnecter] = useState<utilisateur>({username : '',password : '' , profil : '/icon-img.png'})

    const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setVille(nomville)
            console.log("Recherche pour la ville :", ville);
            

        }
    };

    useEffect(()=>{
        setUtilisateurconnecter (JSON.parse(sessionStorage.getItem("utilisateur connecter") as string))

    } , [])


    return (<div className="bg-transparent rounded-lg grid grid-cols-[64px_390px_1fr_390px] grid-row-[256px_256px_256px]">
  
            
                <div className="border text-center bg-transparent backdrop-blur-lg text-white w-16 h-screen rounded-lg p-1 row-start-1 col-start-1 row-span-3 mr-0">
                    <ul className=" space-y-2">
                        <li className="flex "> <Image src="/logo.png" alt="Logo" width={25} height={25} className="pb-10 pt-4 mx-auto" /> </li>
                        <li className="flex p-4 justify-center items-center rounded-lg hover:bg-blue-900"><Image src="/menu.png" alt="Logo" width={25} height={25} className=" rounded-mg hover:bg-blue-900 mx-auto  duration-200 transform  hover:scale-y-150" /></li>
                        <li className=" flex  p-4 justify-center items-center rounded-lg hover:bg-blue-900"><Image src="/carte.png" alt="Logo" width={25} height={25} className="rounded-mg hover:bg-blue-900 mx-auto  duration-200 transform  hover:scale-y-150"  /></li>
                        <li className=" flex  p-4 justify-center items-center rounded-lg hover:bg-blue-900"><Image src="/tools.png" alt="Logo" width={25} height={25} className="rounded-mg hover:bg-blue-900 mx-auto  duration-200 transform  hover:scale-y-150" /></li>
                    </ul>
                    
                
                </div>
                <div className="bg-transparent backdrop-blur-md h-20 w-full py-4 px-1 row-start-1 col-start-2 col-span-3 flex relative">
                        <div className="relative flex ">
                            <input
                                type="text"
                                name="ville"
                                value={nomville}
                                id="ville"
                                onChange={(e) => setNomVille(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search for location"
                                className="w-full h-10 bg-blue-900 backdrop-blur-lg rounded-lg text-center text-white"
                            />
                            <Image src="/loupe.png" alt="Logo" width={20} height={20} className="absolute top-3 left-1" />
                        </div>
                        <div className="absolute bottom-6 right-0 bg-transparent flex">
                            <Image src="/alarm.png" alt="Logo" width={25} height={25}  className="rounded-full"/>
                            <Link href="/profile"><Image 
                                src={utilisateurconnecter?.profil}
                                alt="user" 
                                width={30} 
                                height={30} 
                                className="mr-7 ml-3 rounded-full shadow-sm"
                                title={utilisateurconnecter?.username}
                                
                                /></Link>
                            
                        </div>
                    </div>

                <div className="col-start-2 row-start-2">
                    <Weather ville = {ville}/>
                </div>
                <div className="col-start-3  row-start-2">
                    <Maps Ville={ville}/>

                </div>
                {/*<div className="col-start-4 row-start-2">
                    
                </div>
                <div className="col-start-2 row-start-3">
                    
                </div>
                <div className="col-start-3 row-start-3">
                    
                </div>
                <div className="col-start-4 row-start-3">
                    
                </div>*/}
                
            </div>
    );
}

