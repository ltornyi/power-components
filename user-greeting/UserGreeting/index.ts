import { RedirectRequest, SilentRequest } from "@azure/msal-browser";
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { getGreeting } from "./helloApi";
import { AuthModule } from "./msal/authModule";
import { helloAPI } from "./config";

export class UserGreeting implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _value: string | null;
    private _context: ComponentFramework.Context<IInputs>;
    private _container: HTMLDivElement;
    private paragraphGreetingElement: HTMLParagraphElement;
    private paragraphUserElement: HTMLParagraphElement;
    private paragraphUserIdElement: HTMLParagraphElement;
    private buttonLoginElement: HTMLButtonElement;
    private buttonLogoutElement: HTMLButtonElement;

    private authModule: AuthModule;

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
      context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void,
      state: ComponentFramework.Dictionary,
      container:HTMLDivElement): void{
      
      console.log("component init")
      
      this.storeContextAndValue(context);

      this.authModule = new AuthModule();
      this.authModule.loadAuthModule(() => this.loginCallback());

      this.buildComponentDOM(container);

      console.log("component init ends")
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
      console.log("component updateView");

      const inputsChanged = this.storeContextAndValue(context);
      if (inputsChanged) {
        this.loginCallback(); //async
      }

      console.log("component updateView ends");
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
      return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void{
      this.buttonLoginElement.removeEventListener("click", () => this.handleLogin())
      this.buttonLogoutElement.removeEventListener("click", () => this.handleLogout())
    }

    public async loginCallback(): Promise<void> {
      if (this.authModule.isLoggedIn()) {
        console.log("loginCallback: logged in");

        const token = await this.getHelloTokenPopup();
        if (token) {
          const response = await getGreeting(this._value || "", token);
          if (response) {
            this.renderComponent(response.greeting, response.identifiedUser, response.identifiedUserId);
          }
        }
      } else {
        console.log("loginCallback: NOT logged in")
        this.renderComponent("","","");
      }
    }

    private async getHelloTokenPopup(): Promise<string|null> {
      const token = await this.authModule.getTokenPopup(helloAPI.silentHelloRequest, helloAPI.popupHelloRequest);
      return token;
    }

    public handleLogin(): void {
      this.authModule.login("loginPopup", () => this.loginCallback());
    }

    public handleLogout(): void {
      this.authModule.logout();
    }

    private storeContextAndValue(context: ComponentFramework.Context<IInputs>) {
      this._context = context;
      const changed = this._value !== context.parameters.name.raw;
      this._value = context.parameters.name.raw;
      return changed;
    }

    private buildComponentDOM(container:HTMLDivElement) {
      this._container = document.createElement("div");
      this.paragraphGreetingElement = document.createElement("p");
      this.paragraphUserElement = document.createElement("p");
      this.paragraphUserIdElement = document.createElement("p");
      this._container.appendChild(this.paragraphGreetingElement);
      this._container.appendChild(this.paragraphUserElement);
      this._container.appendChild(this.paragraphUserIdElement);

      this.buttonLoginElement = document.createElement("button");
      this.buttonLoginElement.innerText = "Sign in";
      this.buttonLoginElement.addEventListener("click", () => this.handleLogin())
      this._container.appendChild(this.buttonLoginElement);

      this.buttonLogoutElement = document.createElement("button");
      this.buttonLogoutElement.innerText = "Sign out";
      this.buttonLogoutElement.addEventListener("click", () => this.handleLogout())
      this._container.appendChild(this.buttonLogoutElement);
      container.appendChild(this._container);
      this.setButtonVisibility();
    }

    private renderComponent(greeting: string, user: string, userId: string) {
      this.paragraphGreetingElement.innerText = greeting;
      this.paragraphUserElement.innerText = user;
      this.paragraphUserIdElement.innerText = userId;
      this.setButtonVisibility();
    }

    private setButtonVisibility() {
      this.buttonLoginElement.style.display = this.authModule.isLoggedIn() ? 'none' : 'inline-block';
      this.buttonLogoutElement.style.display = this.authModule.isLoggedIn() ? 'inline-block' : 'none';
    }

}
