'use client'

interface User{
    username : string  ,
    password : string  ,
    profil : string
}






//fonction de mise a jour dans la le localstorage
export const update = (user : User) =>{
    localStorage.setItem( user.username, JSON.stringify(user)) //stockage
    localStorage.setItem('nombreUser' , JSON.stringify(localStorage.length))
    const test = JSON.parse(localStorage.getItem(user.username ) as string)
    
    console.log(`utilisateur ajouter=  Username :${test.username}  , password :${test.password} , photo de profile : ${test.profil} | nombre d'utilisateur :${localStorage.length}`)

    }
    




    


