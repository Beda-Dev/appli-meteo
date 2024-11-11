'use client';
import Image from "next/image";
import Weather from "./weather";
import { useState , useEffect} from "react";
import Maps from "./map";
import ListeVille from "./villePopulaire";
import Prevision from "./prevision";
import Graph from "./graph";



interface utilisateur{
    username : string,
    password : string,
    profil : string
}


export default function Dashbord() {
    

    const [nomville, setNomVille ] = useState<string>("");
    const [photo , setPhoto] = useState<string>()
    const [ville , setVille] = useState<string>("abidjan")
    const [utilisateurconnecter , setUtilisateurconnecter] = useState<utilisateur>({username : '',password : '' , profil : ''})

    const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setVille(nomville)
            console.log("Recherche pour la ville :", ville);
            
        }
    };

    const VilleReçu = (VilleMaps: string) => {
        setVille(VilleMaps);
    };


    useEffect(() => {
        const utilisateurConnecte = JSON.parse(sessionStorage.getItem("utilisateur connecter") as string);
        setUtilisateurconnecter(utilisateurConnecte)
        if (utilisateurconnecter?.profil) {
            setPhoto(utilisateurconnecter.profil);
        }else{setPhoto("/icon-img.png")}
    }, [utilisateurconnecter.profil]);

    return ( 
    <div className="max-h-full bg-gradient-to-b bg-[#205bab] p-20 relative  ">
        <Image src="/cloud.png" alt="Logo" width={150} height={150} className="absolute mx-auto rotate-[25deg] top-[-1px] left-[30%] z-5" />
        <Image src="/cloud.png" alt="Logo" width={300} height={300} className="absolute mx-auto  top-[-180px] left-[-130px] z-5" />
        <Image src="/cloud.png" alt="Logo" width={200} height={200} className="absolute mx-auto rotate-[-25deg] top-[-50px] right-[10%] z-5" />

                <div className=" bg-black bg-opacity-20 backdrop-blur-md rounded-3xl grid grid-max-cols-[64px_300px_630px_300px] grid-max-row-[256px_256px_256px] gap-2 overflow-hidden z-10">
                
                            
                <div className="text-center bg-black bg-opacity-5  text-white w-16 h-full rounded-lg p-1 row-start-1 col-start-1 row-span-3 mb-4  border-none text-white first-glass relative">
                    <ul className=" space-y-2">
                        <li className="flex "> <Image src="/logo.png" alt="Logo" width={35} height={35} className="pb-7 pt-4 mx-auto opacity-50" priority /> </li>
                        <li className="flex p-4 mt-4 justify-center items-center rounded-lg hover:bg-black hover:bg-opacity-20"><Image src="/menu.png" alt="Logo" width={70} height={70} className="pb-2 rounded-mg  mx-auto  duration-200 transform  hover:scale-y-150" /></li>
                        <li className=" flex  p-4 mt-4 justify-center items-center rounded-lg hover:bg-black hover:bg-opacity-20"><Image src="/carte.png" alt="Logo" width={70} height={70} className="pb-2 rounded-mg mx-auto  duration-200 transform  hover:scale-y-150"  /></li>
                        <li className=" flex  p-4 mt-4 justify-center items-center rounded-lg hover:bg-black hover:bg-opacity-20"><Image src="/tools.png" alt="Logo" width={70} height={70} className="pb-2 rounded-mg mx-auto  duration-200 transform  hover:scale-y-150" /></li>
                    </ul>
                    
                
                </div>
                <div className="bg-transparent max-h-20 max-w-full py-4 px-0 row-start-1 col-start-2 col-span-3 flex relative ml-2 ">
                        <div className="relative flex">
                            <input
                                type="text"
                                name="ville"
                                value={nomville}
                                id="ville"
                                onChange={(e) => setNomVille(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search for location"
                                className="w-full h-12 bg-black rounded-lg text-center text-white pr-12 pl-11 bg-opacity-20 shadow-sm"
                            />
                            <Image src="/loupe.png" alt="Logo" width={22} height={22} className="absolute top-3 left-1 opacity-50" />
                        </div>
                        <div className="absolute bottom-6 right-5 bg-transparent flex mr-5">
                        <Image src="/alarm.png" alt="Logo" width={35} height={35}  className="mr-4 rounded-full hover:bg-blue-900"/>
                            <div className="avatar online">
                                <div className="w-[35px] h-[35px] rounded-full">
                                <Image 
                                src={photo as string || "/icon-img.png"}
                                alt="user" 
                                width={35} 
                                height={35} 
                                className="rounded-full shadow-3xl ml-auto shadow-lg"
                                title={utilisateurconnecter?.username}/>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>

                <div className="col-start-2 row-start-2 ">
                    <Weather ville = {ville}/>
                </div>
                <div className="col-start-3  row-start-2 flex items-top justify-center ">
                    <Maps Ville={ville}  MessageUpdate={VilleReçu}/>

                </div>
                <div className="col-start-4 row-start-2 mr-2">
                <ListeVille ville={ville} />
                    
                </div>
                <div className="col-start-2 row-start-3 mb-3">
                    <Prevision ville={ville}/>
                    
                </div>
                <div className="col-start-3 row-start-3 col-span-2 flex items-top justify-center mr-2 mb-3">
                    <Graph ville={ville}/>
                </div>
                
                </div>
    </div>
    
    

    );
}

