import * as React from 'react';
import { EndSessionPopupRequest } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { PrimaryButton } from '@fluentui/react';

export const SignOutButton = () => {
  const { instance } = useMsal();
  const logoutRequest: EndSessionPopupRequest = {
    account: instance.getActiveAccount(),
  }

  const handleLogoutPopup = () => {
    instance.logoutPopup(logoutRequest);
  };

  return (
    <PrimaryButton
      text="Sign out"
      onClick={handleLogoutPopup}
    />
  )
}

