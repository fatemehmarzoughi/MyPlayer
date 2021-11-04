import { SITE_URL } from '../assets/constants/General';

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

async function GET(endpoint , reqbody){
    // const vars = useContext(Context);
    const url = SITE_URL + endpoint;
    const Headers = {'Content-Type' : 'application/json'};
    try
    {
        const accessToken = '';
        console.log('accessToken = ' + accessToken)
        const res = await fetch(url , {
            method : 'GET',
            headers : Headers['authToken'] = `Bearer ${accessToken}`,
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