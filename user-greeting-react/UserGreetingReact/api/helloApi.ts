import { helloAPI } from '../config';
import { IPublicClientApplication } from '@azure/msal-browser';
import { getTokenPopup } from '../msal/authModule';

export interface GreetingResponse {
  greeting: string,
  identifiedUser: string,
  identifiedUserId: string
}

export const getGreeting = async (name: string, instance: IPublicClientApplication) => {
  const token = await getTokenPopup(helloAPI.silentHelloRequest, helloAPI.popupHelloRequest, instance);
  if (token)
    return greetingCall(name, token);
  else
    return null;
}

const greetingCall = async (name: string, accessToken: string): Promise<GreetingResponse | null> => {
  const headers = {
    'Authorization': 'Bearer ' + accessToken
  }
  const queryParams = {
    name,
    code: helloAPI.apikey
  }
  try {
    const response = await fetch(helloAPI.URL + '?' + new URLSearchParams(queryParams), {headers});
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('greetingCall error:')
    console.log(error)
  }
  return null
}
