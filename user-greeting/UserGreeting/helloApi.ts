import axios from 'axios';
import { helloAPI } from './config';

export interface Greeting {
  greeting: string,
  identifiedUser: string,
  identifiedUserId: string
}

export const getGreeting = async (name: string, accessToken: string): Promise<Greeting | null> => {
  const headers = {
    'Authorization': 'Bearer ' + accessToken
  }
  const queryParams = {
    name,
    code: helloAPI.apikey
  }
  try {
    const response = await axios.get(helloAPI.URL, {params: queryParams, headers});
    return response.data;
  } catch(error) {
    console.log('getGreeting error:')
    console.log(error)
  }
  return null
}