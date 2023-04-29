import * as React from 'react';
import { Label, Stack } from '@fluentui/react';
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
        <Stack tokens={{padding:10, childrenGap: 5}}>
          <Stack.Item align="center">
            <Label>Authenticated</Label>
          </Stack.Item>
          <Stack.Item align="center">
            <SignOutButton />
          </Stack.Item>
          <Stack.Item align="auto">
            <Greeting 
              name={props.context.parameters.name.raw}
            />
          </Stack.Item>
        </Stack>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Stack tokens={{padding:10, childrenGap: 5}}>
          <Stack.Item align="center">
            <Label>Unauthenticated</Label>
          </Stack.Item>
          <Stack.Item align="center">
            <SignInButton />
          </Stack.Item>
        </Stack>
      </UnauthenticatedTemplate>
    </>
  )

}