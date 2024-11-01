'use client';
import Image from "next/image";
import Weather from "./weather";
import { useState } from "react";


export default function Dashbord() {


    const [nomville, setNomVille] = useState("");
    const [ville , setVille] = useState("paris")

    const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setVille(nomville)
            console.log("Recherche pour la ville :", ville);
            

        }
    };


    return (<div className="bg-transparent rounded-lg grid grid-cols-[64px_1fr_150px] grid-row-3">
  
            
                <div className=" border text-center bg-transparent backdrop-blur-lg text-white w-16 h-screen rounded-lg p-1 row-span-3 mr-0">
                    <ul className=" space-y-2">
                        <li className="flex "> <Image src="/logo.png" alt="Logo" width={25} height={25} className="pb-10 pt-4 mx-auto" /> </li>
                        <li className="flex p-4 justify-center items-center rounded-lg hover:bg-blue-900"><Image src="/menu.png" alt="Logo" width={25} height={25} className=" rounded-mg hover:bg-blue-900 mx-auto  duration-200 transform  hover:scale-y-150" /></li>
                        <li className=" flex  p-4 justify-center items-center rounded-lg hover:bg-blue-900"><Image src="/carte.png" alt="Logo" width={25} height={25} className="rounded-mg hover:bg-blue-900 mx-auto  duration-200 transform  hover:scale-y-150"  /></li>
                        <li className=" flex  p-4 justify-center items-center rounded-lg hover:bg-blue-900"><Image src="/tools.png" alt="Logo" width={25} height={25} className="rounded-mg hover:bg-blue-900 mx-auto  duration-200 transform  hover:scale-y-150" /></li>
                    </ul>
                    
                
                </div>
                <div className="bg-transparent backdrop-blur-md h-20 w-full py-4 px-1 col-span-2 flex">
                    
                    
                    <div className="relative flex">
                    <input
                        type="text" 
                        name="ville" 
                        value={nomville}
                        id="ville"
                        onChange={(e) => setNomVille(e.target.value)} 
                        onKeyDown={handleKeyDown} 
                        placeholder="Search for location"
                        className="w-100 h-10 bg-blue-900 backdrop-blur-lg rounded-lg text-center text-white ml-0"
                        />
                        <Image src="/loupe.png" alt="Logo" width={20} height={20} className="absolute top-3 left-1" />
                    

                        
                    </div>
                    <div className="relative">
                        <div className=" bg-red-500 w-52">
                            <Image src="/icon-img.png" alt="Logo" width={20} height={20} className="" />

                        </div>

                    </div>


                </div>
                <div>
                    <Weather ville = {ville}/>
                </div>
            </div>
    );
}

