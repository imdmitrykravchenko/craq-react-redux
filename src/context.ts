import { createContext, createElement, PropsWithChildren } from 'react';
import { Provider, ReactReduxContextValue } from 'react-redux';
import { Store } from 'craq';

const context = createContext<ReactReduxContextValue<any, any>>(null);

export const CraqReactReduxProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: Store<any, any> }>) =>
  // @ts-ignore
  createElement(Provider, { context, store, children });

export default context;
