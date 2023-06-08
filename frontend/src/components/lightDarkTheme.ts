import * as Colors from "src/assets";
import { Theme } from "src/context";

export const contentColor = (theme: Theme) => {
  return (theme === 'light') ? { color: Colors.dark } : { color: Colors.white };
}
export const backgroundColor = (theme: Theme) => {
  return (theme === 'light') ? { backgroundColor: Colors.white } : { backgroundColor: Colors.black };
}
export const surfaceColor = (theme: Theme) => {
  return (theme === 'light') ? { backgroundColor: Colors.lightGray } : { backgroundColor: Colors.dark };
}
