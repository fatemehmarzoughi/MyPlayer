import { getData } from "src/LocalStorage";
import { SITE_URL } from "src/assets";

export async function DELETE (endpoint: string) {
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
      } as HeadersInit_)
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function POST (endpoint: string, reqBody: any) {
  const url = SITE_URL + endpoint;
  const accessToken = await getData("accessToken");

  if (accessToken !== "GoogleToken" && accessToken != null) {
    try {
      const res = await fetch(url, {
        // mode: "cors",
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          authtoken: accessToken
        } as HeadersInit_),
        body: JSON.stringify(reqBody)
      });
      console.log("res in api func = " + JSON.stringify(res));
      return res;
    } catch
    (err: any) { return err.text(); }
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
    (err) { return err; }
  }
}
export const GetNoToken = async (endpoint: string) => {
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

export async function GET (endpoint: string, accessToken: string) {
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