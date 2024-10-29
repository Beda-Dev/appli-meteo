'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, ChangeEvent, FormEvent } from "react";

export default function Inscription(): JSX.Element {
  // Définitions des états et références
  const inputHidden = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState<string>('');
  const [verifiedPassword, setVerifiedPassword] = useState<string>('');

  // Gestion du clic pour ouvrir l'input de fichier
  const handleClick = (): void => {
    inputHidden.current?.click();
  };

  // Gestion du changement de mot de passe
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // Gestion du changement de vérification de mot de passe
  const handleVerifiedPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setVerifiedPassword(e.target.value);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== verifiedPassword) {
      console.log("Les mots de passe ne correspondent pas");
    } else {
      console.log("Inscription réussie");
      // Ajouter ici le code pour gérer l'inscription
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-sans">
      <div className="flex justify-center items-center gap-8 text-white px-10 py-8 w-50 rounded-lg bg-transparent-blur-sm shadow-2xl">
        <div className="grid p-5 text-center gap-4">
          <p>Photo de profil</p>
          <Image src="/icon-img.png" alt="Logo" width={100} height={100} className="pb-8 mx-auto" />
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            ref={inputHidden}
            onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.files?.[0]?.name)}
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
            <label htmlFor="username" className="block text-sm font-medium">Nom d'utilisateur</label>
            <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" className="mt-1 block w-full p-2 border rounded-md text-black text-center" />
          </div>
          <div className="password mb-4">
            <label htmlFor="PAssword" className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              name="PAssword"
              value={password}
              onChange={handlePasswordChange}
              id="PAssword"
              className="mt-1 block w-full p-2 border text-black rounded-md text-center"
            />
            <p className="mt-2">Entrez à nouveau votre mot de passe</p>
            <input
              type="password"
              name="Password"
              value={verifiedPassword}
              onChange={handleVerifiedPasswordChange}
              id="Password"
              className="mt-1 block w-full p-2 border text-black rounded-md text-center"
            />
          </div>
          <div className="button">
            <button type="submit" className="rounded-lg p-2 w-full bg-blue-500 text-white">
              inscrire
            </button>
            <p className="mt-4">Vous êtes déjà inscrit ?</p>
            <Link href="/connexion" className="underline">se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
