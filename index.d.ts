declare module "~*" ;
declare module "*.html" ;
declare module "*.css" ;
declare module "*.json" ;

interface Window {
  web3: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

//declare var Promise: any;
// Truffle injects the following into the global scope
declare var Web3: any; // TODO: figure out how to use Web3 definition from within global.d.ts instead of `any`
declare var artifacts: any;
declare var contract: any;
declare var before: any;
//declare var beforeEach: any;
//declare var describe: any;
//declare var it: any;
