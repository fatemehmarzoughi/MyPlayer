import axios from 'axios';
import {getData} from 'src/LocalStorage';

import './config';

export async function DELETE(endpoint: string) {
  const accessToken = await getData('accessToken');

  try {
    const res = await axios({
      method: 'delete',
      url: endpoint,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(String(err));
  }
}

export async function POST<T extends Object>({
  endpoint,
  reqBody,
}: {
  endpoint: string;
  reqBody: T;
}) {
  const accessToken = await getData('accessToken');

  try {
    if (accessToken) {
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
  const accessToken = await getData('accessToken');

  try {
    console.log('accessToken = ' + accessToken);
    if (accessToken) {
      const res = await axios({
        method: 'get',
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res;
    } else {
      const res = await axios.get(endpoint);
      return res;
    }
  } catch (err) {
    console.log('error in get func = ' + err);
    throw new Error(String(err));
  }
};
