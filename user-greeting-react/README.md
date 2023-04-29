# UserGreetingReact component

This component is the React version of the UserGreeting component, uses FluentUI and MSAL.

## Scaffolding
This project was created by running

    pac pcf init --namespace LearnComponentFramework --name UserGreetingReact --template field --framework react --run-npm-install
    npm install @azure/msal-react @azure/msal-browser axios

## Component configuration
Added `<PcfBuildMode>production</PcfBuildMode>` into .pcfproj file. Also added the following to tsconfig.json to enable tree-shaking:

    "module": "es2015",
    "moduleResolution": "node"

Property definition and external domain usage added to manifest. `npm run refreshTypes` was used to update the type definition.

## Component logic

`config.ts` has all the constants that need adjustments, depending on the environment. The App component receives the MSAL instance and the component framework context as props. The MSAL instance can be used by any component with the useMsal() hook. The component framework context is passed to the Main component where the only input (name) is extracted and passed to the Greeting component.

## Useful links

[MSAL for React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
