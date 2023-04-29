import * as React from 'react';
import { InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { PrimaryButton } from '@fluentui/react';

export const SignInButton = () => {
  const { instance, inProgress } = useMsal();
  const loginRequest: PopupRequest = {
    scopes: []
  };

  const handleLoginPopup = () => {
    instance.loginPopup(loginRequest)
      .catch((error) => console.log(error));
  }

  return (
    <PrimaryButton
      onClick={handleLoginPopup}
      iconProps={{ iconName: "Signin" }}
      disabled={inProgress === InteractionStatus.Login}
    >
      Sign in
    </PrimaryButton>
  )
}