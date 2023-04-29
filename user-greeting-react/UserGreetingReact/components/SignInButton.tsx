import * as React from 'react';
import { PopupRequest } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { PrimaryButton } from '@fluentui/react';

export const SignInButton = () => {
  const { instance } = useMsal();
  const loginRequest: PopupRequest = {
    scopes: []
  };

  const handleLoginPopup = () => {
    instance.loginPopup(loginRequest)
      .catch((error) => console.log(error));
  }

  return (
    <PrimaryButton
      text="Sign in"
      onClick={handleLoginPopup}
    />
  )
}