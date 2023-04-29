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

export function Main(props: IMainProps) {

  return (
    <>
      <AuthenticatedTemplate>
        <Label>Authenticated</Label>
        <Greeting 
          name={props.context.parameters.name.raw}
        />
        <SignOutButton />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Label>Unauthenticated</Label>
        <SignInButton />
      </UnauthenticatedTemplate>
    </>
  )

}