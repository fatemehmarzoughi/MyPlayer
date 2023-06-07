import React, {ReactNode} from 'react';

import Context, {Theme} from './context';
import {getData, storeData} from 'src/LocalStorage';
import {User} from 'src/API';

export type IContextProviderProps = {
  children: ReactNode;
};
export type IContextProviderState = {
  isRotate: boolean;
  isLogin: boolean;
  isFirstInstallation: false | null;
  theme: Theme;
  userInfo: User | undefined;
};
export default class ContextProvider extends React.PureComponent<
  IContextProviderProps,
  IContextProviderState
> {
  constructor(props: IContextProviderProps) {
    super(props);

    this.state = {
      isLogin: false,
      theme: 'light',
      isRotate: false,
      isFirstInstallation: null,
      userInfo: undefined,
    };
  }

  override async componentDidMount() {
    try {
      const theme = await getData('theme');

      theme === 'light'
        ? this.setState({
            theme: 'light',
          })
        : this.setState({
            theme: 'dark',
          });
    } catch (err) {
      console.log(err);
    }
  }

  setTheme = async () => {
    await storeData('theme', this.state.theme);
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  override render() {
    return (
      <Context.Provider
        value={{
          /* -------------------------------- Rotation -------------------------------- */
          isRotate: this.state.isRotate,
          setIsRotate: value =>
            this.setState({
              isRotate: value,
            }),

          /* ---------------------------------- Auth ---------------------------------- */
          isLogin: this.state.isLogin,
          setIsLogin: value =>
            this.setState({
              isLogin: value,
            }),

          userInfo: this.state.userInfo,
          setUserInfo: value =>
            this.setState({
              userInfo: value,
            }),

          /* ------------------------------ Installation ------------------------------ */
          isFirstInstallation: this.state.isFirstInstallation,
          setIsFirstInstallation: value =>
            this.setState({
              isFirstInstallation: value,
            }),

          /* ---------------------------------- Theme --------------------------------- */
          theme: this.state.theme,
          setTheme: this.setTheme,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
