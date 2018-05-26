import nconf from 'nconf';
import path from 'path';
// Load the correct configuration file according to the 'NODE_ENV' variable
// nconf configuration.
nconf
  .argv()
  .env("__")
  .defaults({
    NODE_ENV: "development"
  });

const NODE_ENV = nconf.get("NODE_ENV");
nconf
  .defaults({
    conf: path.join(__dirname, `/env/${NODE_ENV}.config.json`)
  })
  .file(nconf.get("conf"));

export default nconf;
