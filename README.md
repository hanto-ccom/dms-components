# DmsWorkspace

This project is an Angular workspace that includes the `dms` library—a design system component library for Angular—and the `demo` application for testing and showcasing the library components.

## Table of Contents

- [DmsWorkspace](#dmsworkspace)
  - [Table of Contents](#table-of-contents)
  - [Pre-requisites](#pre-requisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Building the library](#building-the-library)
  - [Available Scripts](#available-scripts)
    - [build:tailwind](#buildtailwind)
    - [copy:vendor](#copyvendor)
    - [create:bundle-entry](#createbundle-entry)
    - [build:bundle](#buildbundle)
    - [cleanup](#cleanup)
    - [build:all](#buildall)
    - [prepare:dev](#preparedev)
    - [watch:dms](#watchdms)
    - [test](#test)
    - [storybook](#storybook)
    - [build-storybook](#build-storybook)
    - [build:demo](#builddemo)
    - [publish:npm (todo)](#publishnpm-todo)

## Pre-requisites
* Nodejs >= 22.13.0
* Npm >= 10.9.2

## Installation

In the root of the repository run

```bash
npm install (--force) # --force due to outdated @common library in digi's library
```

## Development Server

To build and start Storybook for developing and testing components:

```bash
npm run storybook
```

## Building the library
In order to build the library for testing in demo application and/or publishing to npm you should run, in the root of repository:
```bash
npm run build:all
```
this creates a dist for dms in /dist


## Available Scripts

### build:tailwind
```bash
"build:tailwind": "npx tailwindcss -i ./projects/dms/src/styles/tailwind.css -o ./projects/dms/src/styles/tailwind.generated.css"
```
* Purpose: Compiles your Tailwind CSS source file into a generated CSS file.​
* Explanation: This command uses the Tailwind CLI to process tailwind.css, which contains Tailwind directives like @tailwind base;, @tailwind components;, and @tailwind utilities;. The output is written to tailwind.generated.css, which includes all the necessary CSS classes based on your configuration and usage in the project.​ This is a part of what is added to the bundle.css created in the build process


### copy:vendor

```bash
"copy:vendor": "node scripts/copy-vendor-css.js"
```
* Purpose: Copies vendor CSS files into your project.​
* Explanation: Executes the copy-vendor-css.js script, which handles copying third-party CSS files (such as fonts or library styles) into your project's directory structure, ensuring they're available for inclusion in the build.

### create:bundle-entry

```bash
"create:bundle-entry": "node scripts/create-bundle-entry.mjs"
```
* Purpose: Generates an entry point for your CSS bundle.​
* Explanation: Runs the create-bundle-entry.mjs script, which probably creates a consolidated CSS file that imports various style sheets or sets up the necessary structure for bundling your CSS assets.

### build:bundle
```bash
"build:bundle": "postcss ./projects/dms/src/styles/bundle.css -o ./projects/dms/bundle.css"
```
* Purpose: Processes your CSS bundle using PostCSS.​
* Explanation: This command takes bundle.css as input and processes it with PostCSS, applying any configured plugins (like autoprefixer or cssnano), and outputs the final CSS to bundle.css in the dms directory.

### cleanup
```bash
"cleanup": "node scripts/cleanup.mjs"
```
* Purpose: Cleans up build artifacts and temporary files.​
* Explanation: Executes the cleanup.mjs script, which removes generated files, temporary directories, or other artifacts from previous builds to ensure a clean state for new builds.

### build:all
```bash
"build:all": "node scripts/build-all.mjs"
```
* Purpose: Performs a comprehensive build of your project.​
* Explanation: Runs the build-all.mjs script, which orchestrates multiple build steps, such as compiling TypeScript, processing CSS, copying assets in order to create the final bundle for dist


### prepare:dev
```bash
"prepare:dev": "npm run copy:vendor"
```
* Purpose: Prepares the development environment.​
* Explanation: This script runs the copy:vendor script, ensuring that all necessary vendor files are in place before starting development tasks like running Storybook. It is also a step in the build:all process

### watch:dms
```bash
"watch:dms": "ng build dms --watch --configuration development"
```
* Purpose: Watches for changes in the dms library and rebuilds automatically.​
* Explanation: Uses Angular's CLI to build the dms library in development mode and watches for file changes, triggering rebuilds as necessary. This is useful during active development to see changes reflected in real-time.

### test
```bash
"test": "ng test"
```
* Purpose: Runs unit tests for your Angular project.​
* Explanation: Invokes Angular's testing framework (karma) to execute all unit tests defined in your project, providing feedback on test results and code coverage.

### storybook
```bash
"storybook": "npm run prepare:dev && ng run dms:storybook"
```
* Purpose: Starts the Storybook development server for the dms library.​
* Explanation: First runs prepare:dev to ensure vendor files are in place, then uses Angular's CLI to start the Storybook server, allowing you to develop and preview UI components in isolation.

### build-storybook
```bash
"build-storybook": "ng run dms:build-storybook"
```
* Purpose: Builds the static Storybook site for deployment.​
* Explanation: Uses Angular's CLI to generate a static version of your Storybook, which can be deployed to static hosting services for documentation or demonstration purposes.

### build:demo
```bash
"build:demo": "ng build demo"
```
* Purpose: Builds the demo application.​
* Explanation: Compiles the demo Angular application, which serves as a testing ground for the dms library components.

### publish:npm (todo)
```bash
"publish:npm": "node scripts/publish.mjs"
```
* Purpose: Publishes the dms library to the npm registry.​
* Explanation: Runs the publish.mjs script, which handles tasks like packaging the library, and publishing it to npm, making it available for installation via npm install.​



