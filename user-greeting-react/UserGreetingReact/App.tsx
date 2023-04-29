import * as React from 'react';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from '@azure/msal-browser';
import { Main } from './components/Main';

export interface IAppProps {
  pca: PublicClientApplication
}

export function App(props: IAppProps) {
  return (
    <MsalProvider instance={props.pca}>
      <Main />
    </MsalProvider>
);
}
