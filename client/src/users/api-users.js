export const create= async(user)=>{
    try{
        let response=fetch(`${process.env.REACT_APP_SERVER_URL}/users`,{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        });
        return await response.json();
    }catch(err){
        console.error(err)
    }
};

export const list= async(signal)=>{
    try{
        let response=fetch(`${process.env.REACT_APP_SERVER_URL}/users`,{
            method: 'GET',
            signal:signal
        });
        return await response.json();
    }catch(err){
        console.error(err);
    }
};

export const read= async (params,credentials,signal)=>{
    try{
        const  response=await fetch(`${process.env.REACT_APP_SERVER_URL}/users/`+params.userId,{
            method: 'GET',
            signal:signal,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer'+credentials.t
            }
        });
        console.log(response);
        return await response.json();
    }catch(err){
        console.error(err)
    }
}

export const update= async (params,credentials,user)=>{
    try{
        let response=fetch(`${process.env.REACT_APP_SERVER_URL}/users/`+params.userId,{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer'+credentials.t
            },
            body:JSON.stringify(user)
        });
        return await response.json()
    }catch(err){
        console.error(err)
    }
}

export const remove= async (params,credentials)=>{
    try{
        let response=fetch(`${process.env.REACT_APP_SERVER_URL}`+params.userId,{
            method: 'DELETE',
            heaers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+credentials.t
            }
        });
        return await response.json();
    }catch(err){
        console.error(err)
    }
}

