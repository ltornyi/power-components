import { AccountInfo, AuthenticationResult, EndSessionRequest, InteractionRequiredAuthError, PopupRequest, PublicClientApplication, RedirectRequest, SilentRequest } from "@azure/msal-browser";
import { MSAL_CONFIG } from "./msalConfig";

export class AuthModule {
  private myMSALObj: PublicClientApplication;
  private account: AccountInfo | null;
  private loginRedirectRequest: RedirectRequest;
  private loginRequest: PopupRequest;

  constructor() {
    this.myMSALObj = new PublicClientApplication(MSAL_CONFIG);
    this.account = null;

    this.loginRequest = {
      scopes: []
    };

    this.loginRedirectRequest = {
      ...this.loginRequest,
      redirectStartPage: window.location.href
    };

  }

  /**
   * Calls getAllAccounts and determines the correct account to sign into, currently defaults to first account found in cache.
   * TODO: Add account chooser code
   * 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  private getAccount(): AccountInfo | null {  
    const currentAccounts = this.myMSALObj.getAllAccounts();
    if (currentAccounts === null) {
      console.log("No accounts detected");
      return null;
    }

    if (currentAccounts.length > 1) {
      // Add choose account code here
      console.log("Multiple accounts detected, need to add choose account code.");
      return currentAccounts[0];
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }

    return null;
  }

  /**
   * Checks whether we are in the middle of a redirect and handles state accordingly. Only required for redirect flows.
   * 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md#redirect-apis
   */
  loadAuthModule(loginCallback: () => void): void {
    console.log("in loadAuthModule")
    this.myMSALObj.handleRedirectPromise().then((resp: AuthenticationResult | null) => {
      this.handleResponse(resp, loginCallback);
    }).catch(console.error);
  }

  /**
   * Calls loginPopup or loginRedirect based on given signInType.
   * @param signInType 
   */
  login(signInType: string, loginCallback: () => void): void {
    if (signInType === "loginPopup") {
      this.myMSALObj.loginPopup(this.loginRequest).then((resp: AuthenticationResult) => {
        this.handleResponse(resp, loginCallback);
      }).catch(console.error);
    } else if (signInType === "loginRedirect") {
        this.myMSALObj.loginRedirect(this.loginRedirectRequest);
    }
  }

  /**
   * Logs out of current account.
   */
  logout(): void {
    let account: AccountInfo | undefined;
    if (this.account) {
        account = this.account
    }
    const logOutRequest: EndSessionRequest = {
        account
    };
    
    this.myMSALObj.logoutRedirect(logOutRequest);
  }

  isLoggedIn() {
    return this.account ? true : false;
  }

  /**
   * Handles the response from a popup or redirect. If response is null, will check if we have any accounts and attempt to sign in.
   * @param response 
   */
  private handleResponse(response: AuthenticationResult | null, loginCallback: () => void) {
    console.log("in handleResponse")
    if (response !== null) {
      this.account = response.account;
    } else {
      this.account = this.getAccount();
    }

    if (this.account) {
      console.log("welcome", this.account);
      loginCallback();
    }
  }

  /**
   * Gets a token silently, or falls back to interactive redirect.
   */
  public async getTokenRedirect(silentRequest: SilentRequest, interactiveRequest: RedirectRequest): Promise<string|null> {
    if (this.account) {
      silentRequest.account = this.account;
    }
    try {
        const response = await this.myMSALObj.acquireTokenSilent(silentRequest);
        return response.accessToken;
    } catch (e) {
        console.log("silent token acquisition fails.");
        if (e instanceof InteractionRequiredAuthError) {
            console.log("acquiring token using redirect");
            this.myMSALObj.acquireTokenRedirect(interactiveRequest).catch(console.error);
        } else {
            console.error(e);
        }
    }

    return null;
  }

  /**
   * Gets a token silently, or falls back to interactive popup.
   */
  public async getTokenPopup(silentRequest: SilentRequest, interactiveRequest: PopupRequest): Promise<string|null> {
    if (this.account) {
      silentRequest.account = this.account;
    }
    try {
        const response: AuthenticationResult = await this.myMSALObj.acquireTokenSilent(silentRequest);
        return response.accessToken;
    } catch (e) {
        console.log("silent token acquisition fails.");
        if (e instanceof InteractionRequiredAuthError) {
            console.log("acquiring token using popup");
            return this.myMSALObj.acquireTokenPopup(interactiveRequest).then((resp) => {
                return resp.accessToken;
            }).catch((err) => {
                console.error(err);
                return null;
            });
        } else {
            console.error(e);
        }
    }

    return null;
  }
}
