import * as React from 'react';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from '@azure/msal-browser';
import { Main } from './components/Main';
import { IInputs } from './generated/ManifestTypes';

export interface IAppProps {
  pca: PublicClientApplication,
  context: ComponentFramework.Context<IInputs>
}

export function App(props: IAppProps) {
  return (
    <MsalProvider instance={props.pca}>
      <Main context={props.context}/>
    </MsalProvider>
);
}
