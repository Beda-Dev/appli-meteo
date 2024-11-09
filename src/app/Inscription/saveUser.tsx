'use client';

interface User{
    username : string  ,
    password : string  ,
    profil : string | File
}


const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};







export const update = async (user: User) => {
    // Convertir le fichier en base64
    const base64Profile = await fileToBase64(user.profil as File);

    user.profil = base64Profile
    

    localStorage.setItem(user.username, JSON.stringify(user)); // stockage
    localStorage.setItem('nombreUser', JSON.stringify(localStorage.length));
    const test = JSON.parse(localStorage.getItem(user.username)!);

    console.log(`utilisateur ajouté= Username: ${test.username}, password: ${test.password}, photo de profil: ${test.profile}, nombre d'utilisateurs: ${localStorage.length}`);
};

export const Login = async (userconnected: User) => {
    const base64Profile = await fileToBase64(userconnected.profil as File);

    userconnected.profil = base64Profile
    

    sessionStorage.setItem('utilisateur connecter', JSON.stringify(userconnected));
    const test = JSON.parse(sessionStorage.getItem(userconnected.username)!);

    console.log(`utilisateur connecter= Username: ${test.username}, password: ${test.password}, photo de profil: ${test.profile}`);


}

    


