
export const register= async (user)=>{
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        return await response.json()
    }catch(err){
        console.error(err)
    }
};

export const activateAccount= async (token)=>{
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/activateaccount`,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(token)
        });
        return await response.json();
    }catch(err){
        console.error(err)
    }
}

export const signin= async (user)=>{
    try{
        const response= await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signin`,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(user)
        });
        return await response.json();
    }catch(err){
        console.error(err)
    }
};

export const signout= async ()=>{
    try{
        let response= fetch(`${process.env.REACT_APP_SERVER_URL}/signout`,{
            method: 'GET'
        });
        return await response.json();
    }catch(err){
        console.error(err);
    }
}

export const forgetPassword=async (token)=>{
    try{
        let response= fetch(`${process.env.REACT_APP_SERVER_URL}/auth/forget/password`,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(token)
        });

        return await response.json()
    }catch(err){
        console.error(err)
    }
}

export const resetPassword=async(token)=>{
    try{
        const response=fetch(`${process.env.REACT_APP_SERVER_URL}/auth/reset/password`,{
            method: 'PUT',
            headers:{
                'Accept':'apppication/json',
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(token)
        });
        return await response.json()
    }catch(err){
        console.error(err);
    }
}

export const googleLogin= async(token)=>{
    try{
        const response=fetch(`${process.env.REACT_APP_SERVER_URL}/auth/googleLogin`,{
            method: 'POST',
            headers:{
                'Accept':'apppication/json',
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(token)
        });
        return await response.json()
    }catch(err){
        console.error(err);
    }
};

export const facebookLogin= async (token) => {
    try{
        const response=fetch(`${process.env.REACT_APP_SERVER_URL}/auth/facebookLogin`,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(token)
        });
        return await response.json();
    }catch(err){
        console.error(err);
    }
}

export const TwitterLogin= async () => {
    try{
        const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/twitter`,{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials':true
            }
        });
        return response.json()
    }catch(err){
        console.error(err)
    }
}