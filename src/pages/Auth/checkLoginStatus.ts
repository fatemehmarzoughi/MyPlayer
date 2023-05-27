import {getData} from 'src/LocalStorage';

export const checkLoginStatus = async (
  setIsLogin: (value: boolean) => void,
): Promise<boolean> => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken !== null && accessToken !== '') {
      setIsLogin(true);
      return true;
    } else {
      setIsLogin(false);
      return false;
    }
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};
