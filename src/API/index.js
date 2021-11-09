import { SITE_URL } from '../assets/constants/General';
import { getData } from '../LocalStorage/AsyncStorageData';


async function DELETE(endpoint){
    
    try{
        const url = SITE_URL + endpoint;
        const res = await fetch(url , {
            method : 'DELETE',
            headers : {"Content-Type" : "application/json"},
        })
        return res;
    }
    catch(err){
        return err;
    }
    
}

async function POST(endpoint , reqBody){
    const url = SITE_URL + endpoint;
    try
    {
        const res = await fetch(url , {
            // mode: "cors",
            method : 'POST',
            headers : {'Content-Type' : "application/json"},
            body : JSON.stringify(reqBody)
        })
        console.log('res in api func = ' + JSON.stringify(res));
        return res;
    }
    catch{
        (err) => {return err}
    }
}

async function GET_noToken(endpoint){

    const url = SITE_URL + endpoint;
    try
    {
        const res = await fetch(url , {
            method : 'GET',
            headers : {'Content-Type' : 'application/json'}
        })
        return res
    }
    catch
    {
        (err) => {return err}
    }
}

async function GET(endpoint , accessToken){
    const url = SITE_URL + endpoint;
    try
    {
        console.log('accessToken = ' + accessToken)
        const res = await fetch(url , {
            method : 'GET',
            headers : new Headers({
                'Content-Type' : 'application/json',
                'authToken' : accessToken
            }),
        })
        return res
    }
    catch
    {
        (err) => {return err}
    }
}

module.exports.POST = POST;
module.exports.GET = GET;
module.exports.GET_noToken = GET_noToken;
module.exports.DELETE = DELETE;