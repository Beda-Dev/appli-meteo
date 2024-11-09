'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Connexion() {

  const [login, setLogin] = useState<{ username: string; password: string , profil : string}>({ username: '', password: '',profil:'' });
  const [erreur , seterreur] = useState<string | null> (null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLogin(prevState => ({ ...prevState, [name]: value }));
  };

  const router = useRouter()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void =>{
    e.preventDefault();
    if(login.username.trim() && login.password.trim()){
      for(let i=0 ; i <= localStorage.length ; i++){
        const key = localStorage.key(i)as string
        const value = JSON.parse(localStorage.getItem(key) as string)
        if((login.username === key ) && login.username === value.username && login.password === value.password){
          console.log(`utilisateur trouvé ${key} password= ${value.password}`)
          sessionStorage.setItem('utilisateur connecter' , JSON.stringify(value))
          router.push('/Dashbord');
          break
        }
        else {
          console.log("nom d'utilisateur ou mot de passe incorrecte")
          seterreur("nom d'utilisateur ou mot de passe incorrect")
          setTimeout(() => {
            seterreur(null);
          }, 1000);
          
        }
        
      }
      
    }
  
  }

    



  return (
    <div className=" flex justify-center items-center h-screen font-sans bg-gradient-to-r from-blue-500 to-indigo-600">
      
        <div className="flex justify-center items-center gap-8 text-white px-10 py-8 w-50 rounded-lg bg-transparent-blur-sm shadow-lg">
          
          <form onSubmit={handleSubmit} className=" text-center p-10 space-y-4 rounded-lg">

            <h1 className="text-2xl font-bold">connection</h1>
            {erreur && (<p className="text-red-500">{erreur}</p>)}

            <div className="username mb-4">
              <label htmlFor="username" className="block text-sm font-medium ">Nom utilisateur</label>
              <input type="text"
                      name="username" 
                      id="username" 
                      onChange={handleChange}
                      value={login.username}
                      placeholder="Nom d'utilisateur" 
                      className="mt-1 block w-full p-2 border rounded-md text-black text-center"
                      required
                      />
            </div>

            <div className="password mb-4">
              <label htmlFor="password" className="b2lock text-sm font-medium ">Mot de passe</label>
              <input 
                type="password" 
                name="password"
                id="password" 
                onChange={handleChange}
                value={login.password}
                className="mt-1 block w-full p-2 border text-black rounded-md text-center" />

            </div>

            <div className="button">
              <button

                type="submit"  
                className="rounded-lg p-2 w-full bg-blue-500 text-white hover:bg-white hover:text-black">Se connecter</button>
              <p className="mt-4">Vous navez pas de compte ?</p>
              <Link href="/Inscription" className="underline">
                inscrire
              </Link>
            </div>

          </form>

        </div>
      
    </div>
  );
}
