import * as React from 'react';
import { Label } from '@fluentui/react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { Greeting } from './Greeting';
import { IInputs } from '../generated/ManifestTypes';

export type IMainProps = {
  context: ComponentFramework.Context<IInputs>
}

export const Main = (props: IMainProps) => {

  return (
    <>
      <AuthenticatedTemplate>
        <Label>Authenticated</Label>
        <SignOutButton />
        <Greeting 
          name={props.context.parameters.name.raw}
        />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Label>Unauthenticated</Label>
        <SignInButton />
      </UnauthenticatedTemplate>
    </>
  )

}