import { PopupRequest, SilentRequest } from "@azure/msal-browser"

export const AzureAD = {
  // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
  appRegClientId: 'YOUR_CLIENT_ID_HERE',
  // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
  authority: 'https://login.microsoftonline.com/YOUR_TENANT_HERE',
  // Full redirect URL, in form of http://localhost:3000
  redirectURI: 'http://localhost:8181'
}

export const helloAPI = {
  URL: 'https://YOUR_FUNCAPP_API.azurewebsites.net/api/YOUR_ENDPOINT',
  apikey: 'YOUR_FUNCAPP_API_KEY',
  silentHelloRequest: {
    scopes: ['YOUR_SCOPE_REGISTERED'],
    forceRefresh: false
  } as SilentRequest,
  popupHelloRequest: {
    scopes: ['YOUR_SCOPE_REGISTERED']
  } as PopupRequest
}
