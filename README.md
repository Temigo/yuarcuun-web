# Yuarcuun Web interface

Using React.js, Express.js and others

## Usage
Install dependencies:
```
npm install
```

Run the server for development:
```
npm run devstart
```

Build the project in `dist/` folder:
```
npm run build
```
Run the project in production mode (after building, using `dist/` folder content):
```
NODE_ENV="production" npm run start
```

## Rebuild Semantic UI components
In the `src/semantic` folder:
```
gulp clean
gulp build
```
Configuration (e.g. list of components to load) is in `semantic.json`.

## Deployment
* Check the API URL in `App.js`
* Uncomment React GA in `index.js`
