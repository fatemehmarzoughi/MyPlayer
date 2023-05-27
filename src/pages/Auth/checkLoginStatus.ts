
import { getData } from "@/LocalStorage/AsyncStorageData";

export const checkLoginStatus = async (setIsLogin: (value: boolean) => void) => {
  try {
    const accessToken = await getData("accessToken");
    if (accessToken !== null && accessToken !== "") {
      setIsLogin(true);
      return true;
    } else {
      setIsLogin(false);
      return false;
    }
  } catch (err) { console.log(err); };
};
