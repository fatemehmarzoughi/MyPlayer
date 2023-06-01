import * as Colors from "src/assets";

export const changeColor = (theme: boolean) => {
  return (theme) ? { color: Colors.dark } : { color: Colors.white };
}
export const changeBackgroundColor = (theme: boolean) => {
  return (theme) ? { backgroundColor: Colors.white } : { backgroundColor: Colors.black };
}
export const changeBackgroundColor2 = (theme: boolean) => {
  return (theme) ? { backgroundColor: Colors.lightGray } : { backgroundColor: Colors.dark };
}
