import Link from "next/link";

export default function Inscription() {

    



  return (
    <div className="flex justify-center items-center h-screen font-sans">
      
        <div className="flex justify-center items-center gap-8 text-white px-10 py-8 w-50 rounded-lg bg-transparent-blur-sm shadow-lg">
          
          <form action="" method="post" className=" text-center p-10 space-y-4 rounded-lg">

            <h1 className="text-2xl font-bold">connection</h1>

            <div className="username mb-4">
              <label htmlFor="username" className="block text-sm font-medium ">Nom utilisateur</label>
              <input type="text"
                      name="username" 
                      id="username" 
                      placeholder="Nom d'utilisateur" 
                      className="mt-1 block w-full p-2 border rounded-md text-black text-center"
                      required
                      />
            </div>

            <div className="password mb-4">
              <label htmlFor="PAssword" className="block text-sm font-medium ">Mot de passe</label>
              <input 
                type="password" 
                name="PAssword"
                id="PAssword" 
                className="mt-1 block w-full p-2 border text-black rounded-md" />

            </div>

            <div className="button">
              <button  className="rounded-lg p-2 w-full bg-blue-500 text-white hover:bg-white hover:text-black">Se connecter</button>
              <p className="mt-4">Vous n avez pas de compte ?</p>
              <Link href="/Inscription" className="underline">
                inscrire
              </Link>
            </div>

          </form>

        </div>
      
    </div>
  );
}
