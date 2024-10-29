import Image from "next/image";
import Link from "next/link";

export default function Inscription() {




  return (
    <div className="flex justify-center items-center h-screen font-sans">
      
        <div className="flex justify-center items-center gap-8 text-white px-10 py-8 w-50 rounded-lg bg-transparent-blur-sm shadow-lg">
          <div className="grid p-5 text-center gap-4">
            <p>Photo de profil</p>
            <Image src="/icon-img.png" alt="Logo" width={100} height={100} className="pb-8 mx-auto" />
            <input
                type="file" 
                name="photo" 
                id="photo" 
                className="mt-2 block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                
                />
          </div>

          <form action="" method="post" className=" text-center p-10 space-y-4 rounded-lg">

            <h1 className="text-2xl font-bold">Inscription</h1>

            <div className="username mb-4">
              <label htmlFor="username" className="block text-sm font-medium ">Nom d'utilisateur</label>
              <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" className="mt-1 block w-full p-2 border rounded-md text-black text-center" />
            </div>

            <div className="password mb-4">
              <label htmlFor="PAssword" className="block text-sm font-medium ">Mot de passe</label>
              <input type="password" name="PAssword" id="PAssword" className="mt-1 block w-full p-2 border text-black rounded-md text-center" />

              <p className="mt-2">Entrez à nouveau votre mot de passe</p>
              <input type="password" name="Password" id="Password" className="mt-1 block w-full p-2 border text-black rounded-md text-center" />
            </div>

            <div className="button">
              <button  className="border rounded-lg p-2 w-full bg-blue-500 text-white ">S'inscrire</button>
              <p className="mt-4">Vous êtes déjà inscrit ?</p>
              <Link href="/connexion" className="underline ">
                se connecter
              </Link>
            </div>

          </form>

        </div>
      
    </div>
  );
}
