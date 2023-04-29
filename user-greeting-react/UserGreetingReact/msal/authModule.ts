import { AuthenticationResult, IPublicClientApplication, InteractionRequiredAuthError, PopupRequest, SilentRequest } from "@azure/msal-browser";

export const getTokenPopup = async (silentRequest: SilentRequest, interactiveRequest: PopupRequest, msalInstance: IPublicClientApplication) => {
  try {
    const response: AuthenticationResult = await msalInstance.acquireTokenSilent(silentRequest);
    return response.accessToken;
  } catch (e) {
    console.log("silent token acquisition fails.");
    if (e instanceof InteractionRequiredAuthError) {
      console.log("acquiring token using popup");
      try {
        const response: AuthenticationResult = await msalInstance.acquireTokenPopup(interactiveRequest);
        return response.accessToken;
      } catch (e) {
        console.error(e);
        return null;
      }
    } else {
      console.error(e);
    }
  }
  return null;
}
