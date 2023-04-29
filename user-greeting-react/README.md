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

## Component logic

`config.ts` has all the constants that need adjustments, depending on the environment. The App component receives the MSAL instance and the component framework context as props. The MSAL instance can be used by any component with the useMsal() hook. The component framework context is passed to the Main component where the only input (name) is extracted and passed to the Greeting component.

## Test locally

Redirect uri should be http://localhost:8181 in `config.ts`. `npm run start` should be fine.

## Deploy to Dataverse

Change the redirect uri in `config.ts` to the environment's URL i.e. `https://YOUR_ORG.crm.dynamics.com`.

### Create solution and first build

    mkdir UserGreetingReactPCFSolution
    cd UserGreetingReactPCFSolution
    pac solution init --publisher-name <your name> --publisher-prefix <prefix>
    pac solution add-reference --path ..
    dotnet msbuild /t:build /restore
    pac solution import --path ./bin/Debug/UserGreetingReactPCFSolution.zip -pc

### When you have a new version, you should

* bump the version of the component in the ControlManifest.input.xml
* bump the version of the solution in the Solution.xml
* run `dotnet msbuild /t:rebuild` in the UserGreetingReactPCFSolution folder
* re-import the solution file as above

## Useful links

* [MSAL for React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
* [Tutorial: React and MSAL](https://github.com/Azure-Samples/ms-identity-javascript-react-tutorial)