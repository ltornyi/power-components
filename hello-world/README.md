# HelloWorld component

This project was created by running

    pac pcf init --namespace LearnComponentFramework --name HelloWorld --template field --run-npm-install

## Develop

### Property

Replace the default generated property in `ControlManifest.input.xml` with a property named "labelValue". Run

    npm run refreshTypes

to re-generate the `ManifestTypes.d.ts` file.

### Styling

Add/uncomment the default generated `css` node under the `resources` node in `ControlManifest.input.xml`. Create the folder and the css file. Namespace your styles with `.LearnComponentFramework\.HelloWorld` otherwise the page can be polluted.

### Implement the component logic

This simple component creates a `<label>` element and displays the input value. There's no interaction or calculation, so `notifyOutputChanged` is never called.

## Test locally

    npm start watch

Use your browser's developer tools as usual. This command generates a development build for the test harness, even if `PcfBuildMode` is set to production in your pcfproj file.

## Deploy as an unmanaged solution to development environment

### Adjust the pcfproj file to produce a production build

Add `<PcfBuildMode>production</PcfBuildMode>` to the relevant `<PropertyGroup>` node, see `hello-world.pcfproj`.

### Quick and dirty deploy

    pac pcf push --publisher-prefix <your_publisher_prefix>

The above will do a build, package it into a temporary unmanaged solution called `PowerAppsTools_<your_publisher_prefix>` and upload to your default org.

### Detailed steps with more control

1. Create solution

    mkdir HelloWorldPCFSolution
    cd HelloWorldPCFSolution
    pac solution init --publisher-name <your name> --publisher-prefix <prefix>
    pac solution add-reference --path ..

The path above is where your pcfproj file can be found and it will be added to the cdsproj file.

2. First time build (in the above solution folder)

    dotnet msbuild /t:build /restore

3. When you make changes

    dotnet msbuild /t:rebuild

4. import the unmanaged solution into the environment

    pac solution import --path ./bin/Debug/HelloWorldPCFSolution.zip -pc

## Test deployed version

To test and debug after deploying to Dataverse, follow the instructions [here](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/debugging-custom-controls#debugging-after-deploying-into-microsoft-dataverse).

### Detailed instructions for requestly.io

1. Go into your component folder and create a local dev build, for example `npm start`. You can stop the test harness.
2. Go into the dev build folder and launch a static webserver, for example

    cd out/controls/HelloWorld

    python3 -m http.server

3. Go to https://app.requestly.io/rules/my-rules, install the Chrome plugin.
4. Visit the relevant form or page to be debugged
5. Look for your resource in the form of https://YOUR_ORG/(SOME_NUMBER)/webresources/cc_YourNamespace.YourComponent/bundle.js
6. Copy the URL and create a requestly rule to redirect to http://localhost:8000/bundle.js
7. While the dev console is open, press and hold the refresh icon, choose "Empty cache and hard reload"
8. Watch as bundle.js gets loaded from local
9. Find the locally loaded script in the dev console sources, something like pcf_tools_1291497914/YourComponent/index.ts
10. Set breakpoints, debug as usual, modify and create local dev builds as needed

## Deploy as a managed solution to test, pre-prod, prod environments

Follow the detailed steps above but create a managed solution by running

    dotnet msbuild /t:rebuild /p:configuration=Release

You will find the managed solution at `bin/Release/HelloWorldPCFSolution.zip`

## Further lifecycle

Bump the version in the component's manifest file when you make changes. It's also useful to bump the version number of the solution in Solution.xml whenever you deploy a new one.
