import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="p-10 grid content-center bg-white/10 rounded-xl backdrop-blur-lg shadow-md border border-gray-300">
        <Image src="/logo.png" alt="Logo" width={150} height={150} className="pb-8 mx-auto" />
        <div className="flex gap-6 justify-center">
          <Link href={"/Inscription"}  className="px-6 py-2 rounded-lg bg-white/20 text-white border border-white/30 hover:bg-white/30 transition duration-300">
            
          Inscription</Link>
          <Link href={"/connexion"}  className="px-6 py-2 rounded-lg bg-white/20 text-white border border-white/30 hover:bg-white/30 transition duration-300">
            
          connexion</Link>
        </div>
      </div>
    </div>
  );
}
