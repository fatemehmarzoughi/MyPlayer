import { SITE_URL } from "assets/constants/General";
import { getData, storeData } from "LocalStorage/AsyncStorageData";

async function DELETE (endpoint) {
  // if(accessToken != 'GoogleToken' && accessToken != null)
  const accessToken = await getData("accessToken");
  console.log(`accessToken in delete method = ${accessToken}`);
  try {
    const url = SITE_URL + endpoint;
    const res = await fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        authtoken: accessToken
      })
    });
    return res;
  } catch (err) {
    return err;
  }
}

async function POST (endpoint, reqBody) {
  const url = SITE_URL + endpoint;
  const accessToken = await getData("accessToken");
  console.log("accessToken on post = " + accessToken);
  if (accessToken !== "GoogleToken" && accessToken != null) {
    try {
      const res = await fetch(url, {
        // mode: "cors",
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          authtoken: accessToken
        }),
        body: JSON.stringify(reqBody)
      });
      console.log("res in api func = " + JSON.stringify(res));
      return res;
    } catch
    (err) { return err.text(); };
  } else {
    try {
      const res = await fetch(url, {
        // mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      });
      console.log("res in api func = " + JSON.stringify(res));
      return res;
    } catch
    (err) { return err; };
  }
}

async function GETNoToken (endpoint) {
  const url = SITE_URL + endpoint;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return res;
  } catch
  (err) { return err; };
}

async function GET (endpoint, accessToken) {
  const url = SITE_URL + endpoint;
  try {
    console.log("accessToken = " + accessToken);
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authToken: accessToken
      })
    });
    return res;
  } catch
  (err) {
    console.log("error in get func = " + err);
    return err;
  };
}

module.exports.POST = POST;
module.exports.GET = GET;
module.exports.GETNoToken = GETNoToken;
module.exports.DELETE = DELETE;
