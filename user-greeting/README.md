# UserGreeting component

This component receives one input string and displays a customized greeting message and some information about the current user.
The component uses OAuth2 authorization code grant flow to acquire an access token and uses that to call a protected endpoint.

This project was created by running

    pac pcf init --namespace LearnComponentFramework --name UserGreeting --template field --run-npm-install

Added `<PcfBuildMode>production</PcfBuildMode>` into .pcfproj file. Also added the following to tsconfig.json to enable tree-shaking:

    "module": "es2015",
    "moduleResolution": "node"

## Component configuration

Property definition, external domain usage and css resource added to manifest. `npm run refreshTypes` was used to update the type definition.

## Component logic

    npm install axios @azure/msal-browser

`config.ts` has all the constants that need adjustments, depending on the environment.

## Test locally

Redirect uri should be http://localhost:8181 in `config.ts`. `npm run start` should be fine.

## Deploy to Dataverse

Change the redirect uri in `config.ts` to the environment's URL i.e. `https://YOUR_ORG.crm.dynamics.com`.

### Create solution and first build

    mkdir UserGreetingPCFSolution
    cd UserGreetingPCFSolution
    pac solution init --publisher-name <your name> --publisher-prefix <prefix>
    pac solution add-reference --path ..
    dotnet msbuild /t:build /restore
    pac solution import --path ./bin/Debug/UserGreetingPCFSolution.zip -pc

### When you have a new version, you should

* bump the version of the component in the ControlManifest.input.xml
* bump the version of the solution in the Solution.xml
* run `dotnet msbuild /t:rebuild` in the UserGreetingPCFSolution folder
* re-import the solution file as above