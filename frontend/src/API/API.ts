import axios from 'axios';
import {getData} from 'src/LocalStorage';

import './config';

export const DELETE = async ({endpoint}: {endpoint: string}) => {
  try {
    const accessToken = await getData('accessToken');
    if(!accessToken) throw Error('no access token');

    const res = await axios({
      method: 'delete',
      url: endpoint,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    throw Error(String(err));
  }
};

export async function POST<T extends Object>({
  endpoint,
  reqBody,
}: {
  endpoint: string;
  reqBody: T;
}) {
  try {
    const accessToken = await getData('accessToken');
    if ( accessToken !== null) {
      const res = await axios({
        method: 'post',
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: reqBody,
      });

      return res;
    } else {
      const res = await axios({
        method: 'post',
        url: endpoint,
        data: reqBody,
      });

      return res;
    }
  } catch (error) {
    throw new Error(String(error));
  }
}

export const GET = async ({endpoint}: {endpoint: string}) => {
  try {
    const accessToken = await getData('accessToken');
    
    if ( accessToken !== null) {
      const res = await axios({
        method: 'get',
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res;
    } else {
      const res = await axios({
        method: 'get',
        url: endpoint,
      });
      return res;
    }
  } catch (err) {
    console.log('error in get func = ' + err);
    throw new Error(String(err));
  }
};

export async function PUT<T extends Object>({
  endpoint,
  reqBody,
}: {
  endpoint: string;
  reqBody: T;
}) {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken !== 'null' || accessToken !== null) {
      const res = await axios({
        method: 'put',
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: reqBody,
      });
      return res;
    } else {
      throw Error('no access token');
    }
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
}
