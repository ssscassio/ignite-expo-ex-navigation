// Ignite CLI plugin for ExpoExNavigation
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = '@expo/ex-navigation'
const NPM_MODULE_VERSION = '^3.1.0'
const BABEL_MODULE_NAME = 'babel-preset-react-native-stage-0'
const BABEL_MODULE_VERSION = '^1.0.1'
const APP_PATH = process.cwd()


const add = async function (context) {
  const { ignite, filesystem } = context

  // install an NPM module
  await ignite.addModule(NPM_MODULE_NAME, { link: false, version: NPM_MODULE_VERSION })
  await ignite.addModule(BABEL_MODULE_NAME, { link: false, version: BABEL_MODULE_VERSION })
  
  const babelrcString = 
  `{
      "presets": ["react-native-stage-0/decorator-support"]
   }`;
  if(!filesystem.exists(`${APP_PATH}/.babelrc`)){
    filesystem.write(`${APP_PATH}/.babelrc`, babelrcString);
  } else {
    filesystem.remove(`${APP_PATH}/.babelrc`)
    filesystem.write(`${APP_PATH}/.babelrc`, babelrcString);    
  }

}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  const { ignite, filesystem } = context

  // remove the npm module
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: false })
  await ignite.removeModule(BABEL_MODULE_NAME, { unlink: false })
  
  const babelrcString = 
    `{
        "presets": ["react-native"]
     }`;
  if(!filesystem.exists(`${APP_PATH}/.babelrc`)){
    filesystem.write(`${APP_PATH}/.babelrc`, babelrcString);
  } else {
    filesystem.remove(`${APP_PATH}/.babelrc`)
    filesystem.write(`${APP_PATH}/.babelrc`, babelrcString);    
  }

}

// Required in all Ignite CLI plugins
module.exports = { add, remove }

