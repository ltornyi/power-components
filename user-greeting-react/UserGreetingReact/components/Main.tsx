import * as React from 'react';
import { Label } from '@fluentui/react';
import { useIsAuthenticated } from '@azure/msal-react';

export function Main() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
      return <Label>Authenticated</Label>
  } else {
      return <Label>Only unauthenticated users can see me.</Label>
  }
}