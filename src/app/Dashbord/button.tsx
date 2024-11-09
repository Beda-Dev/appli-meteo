'use client'

interface props{
  v1: string,
  v2 : string,
  v3 : string | null
}

export default function Button({v1 , v2 , v3}:props){





    return(
      <div className="flex rounded-lg bg-white bg-opacity-30 ml-auto rounded-4xl">
        <div className="flex rounded-2xl px-0.25">
            <p className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-lg px-2"></p>
            <p className="mr-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-lg px-2" >{v1}  </p>
            <p className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-lg px-2"> {v2}</p>
            <p className="ml-auto hover:bg-blue-900 hover:bg-opacity-80 rounded-lg px-2"> {v3}</p>
        </div>
      
      </div>
    
    )
}