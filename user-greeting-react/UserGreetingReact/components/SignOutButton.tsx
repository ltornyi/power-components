import * as React from 'react';
import { EndSessionPopupRequest, InteractionStatus } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { PrimaryButton } from '@fluentui/react';

export const SignOutButton = () => {
  const { instance, inProgress } = useMsal();
  const logoutRequest: EndSessionPopupRequest = {
    account: instance.getActiveAccount(),
  }

  const handleLogoutPopup = () => {
    instance.logoutPopup(logoutRequest);
  };

  return (
    <PrimaryButton
      onClick={handleLogoutPopup}
      iconProps={{ iconName: "Signout" }}
      disabled={inProgress === InteractionStatus.Logout}
    >
      Sign out {instance.getActiveAccount() ? instance.getActiveAccount()?.name : ""}
    </PrimaryButton>
  )
}

