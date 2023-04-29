# UserGreetingReact component

This component is the React version of the UserGreeting component, uses FluentUI and MSAL.

## Scaffolding
This project was created by running

    pac pcf init --namespace LearnComponentFramework --name UserGreetingReact --template field --framework react --run-npm-install
    npm install @azure/msal-react @azure/msal-browser

## Component configuration
Added `<PcfBuildMode>production</PcfBuildMode>` into .pcfproj file. Also added the following to tsconfig.json to enable tree-shaking:

    "module": "es2015",
    "moduleResolution": "node"

Property definition and external domain usage added to manifest. `npm run refreshTypes` was used to update the type definition.

## Useful links

[MSAL for React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
