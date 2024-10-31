'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { update } from "./saveUser";
import { useRouter } from "next/navigation";






export default function Inscription() {
  //clic pour ouvrir l'input de fichier
  const inputcacher = useRef<HTMLInputElement>(null);

  //fonction qui permet d'ouvrir l'explorateur de fichier ou click du bouton
  const handleClick = (): void => {
    inputcacher.current?.click();

  };

  //useState pour la photo de profil
  const [visualisation , SetVisualisation] = useState <string | null>(null)
  




 //  fonction pour afficher l'image selectionner par l'utilisateur
  let url
  const affichage_Image = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const fichierChoisi = e.target.files?.[0]
    if (fichierChoisi) {
       url = URL.createObjectURL(fichierChoisi);
      SetVisualisation(url);
      console.log(url)
    }
  };
  



  const [valeurUtilisateur, setValeurUtilisateur] = useState<{ username: string; password: string ; profil : string}>({ username: '', password: '', profil : '' });
  const [verificationPassword, setVerificationPassword] = useState<string>('');

  const router = useRouter()

  // Ajout de l'utilisateur 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (valeurUtilisateur.username.trim() && valeurUtilisateur.password.trim() && (valeurUtilisateur.password === verificationPassword)) {
      valeurUtilisateur.profil = visualisation as string //url vers l'image selectionner
      update(valeurUtilisateur);
      setValeurUtilisateur({username : '' , password : '' , profil :''})
      setVerificationPassword('')
      SetVisualisation(null)
      router.push('/Dashbord')
      
    } else {
      window.alert("Mot de passe incohérent");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValeurUtilisateur(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center h-screen font-sans">
      <div className="flex justify-center items-center gap-8 text-white px-10 py-8 w-50 rounded-lg bg-transparent-blur-sm shadow-2xl">
        <div className="grid p-5 text-center gap-4">
          <p>Photo de profil</p>
          {visualisation &&(
            <div >
              <Image src={visualisation} alt="Logo" width={100} height={100} className="center mx-auto rounded-full" />
            </div>
            )
          
          }
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            ref={inputcacher}
            accept="image/*"
            onChange={affichage_Image}
          />
          <button
            className="border rounded-lg p-2 text-white hover:bg-white hover:text-black"
            onClick={handleClick}
          >
            Sélectionner une image
          </button>
        </div>
        <form onSubmit={handleSubmit} className="text-center p-10 space-y-4 rounded-lg">
          <h1 className="text-2xl font-bold">Inscription</h1>
          <div className="username mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Nom utilisateur</label>
            <input
              required 
              type="text" 
              name="username"
              value={valeurUtilisateur.username}
              onChange={handleChange} 
              id="username" 
              placeholder="Nom d'utilisateur" 
              className="mt-1 block w-full p-2 border rounded-md text-black text-center" />
          </div>
          <div className="password mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              required
              name="password"
              value={valeurUtilisateur.password}
              onChange={handleChange}
              id="password"
              className="mt-1 block w-full p-2 border text-black rounded-md text-center"
            />
            <p className="mt-2">Entrez à nouveau votre mot de passe</p>
            <input
              type="password"
              required
              name="verificationPassword"
              value={verificationPassword}
              onChange={(e) => setVerificationPassword(e.target.value)}
              id="verificationPassword"
              className="mt-1 block w-full p-2 border text-black rounded-md text-center"
            />
          </div>
          <div className="button">
            <button type="submit" className="rounded-lg p-2 w-full bg-blue-500 text-white">
              Inscrire
            </button>
            <p className="mt-4">Vous êtes déjà inscrit ?</p>
            <Link href="/Connexion" className="underline">Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

