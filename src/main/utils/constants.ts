const chalkPipe = require('chalk-pipe')
import { stringToPackageNameFormat } from './string-utils'

// DEFAULT VALUES //
const DEFAULT_APP_NAME = 'my-App'
const DEFAULT_PACKAGE_NAME = stringToPackageNameFormat(DEFAULT_APP_NAME)
const DEFAULT_GROUP_NAME = 'com.mycompany'
const DEFAULT_APP_ID = DEFAULT_GROUP_NAME + '.' +  DEFAULT_PACKAGE_NAME
export { DEFAULT_APP_ID, DEFAULT_APP_NAME, DEFAULT_GROUP_NAME, DEFAULT_PACKAGE_NAME}

// RETURN VALUES //
const NO_ERROR = 0
const ERROR_ALREADY_EXIST = 1
const ERROR_PARSING_TEMPLATE = 2
const ERROR_RETRIEVING_INFO = 3
export { NO_ERROR, ERROR_ALREADY_EXIST, ERROR_PARSING_TEMPLATE, ERROR_RETRIEVING_INFO }

// FILE VALUES //
const BLACKLIST_EXTENSION = ['png', 'jpg', 'jpeg']
const NPM_IGNORE = '.npmignore'
const GIT_IGNORE = '.gitignore'
export { BLACKLIST_EXTENSION, GIT_IGNORE, NPM_IGNORE }

// FLUTTER VALUES //
const FLUTTER_CREATE_ERROR = 'Error when running following command: '
const FLUTTER_CREATE_SUCCESS = chalkPipe('green.bold')('✓ Installation done!\n')
const FLUTTER_ERROR = 'Current error: '
const FLUTTER_INSTALL_ADVICE = 'Otherwise, follow the installation guide at '
const FLUTTER_INSTAL_PAGE = 'https://flutter.dev/docs/get-started/install'
const FLUTTER_NOT_IN_PATH = 'Mobile Generator didn\'t found flutter executable. Perhaps it isn\'t in your PATH?'
const WARNING_FLUTTER_NOT_IN_PATH_MSG_1 = chalkPipe('orange.bold')(FLUTTER_NOT_IN_PATH)
const WARNING_FLUTTER_NOT_IN_PATH_MSG_2 = chalkPipe('orange.bold')(FLUTTER_INSTALL_ADVICE) + chalkPipe('green')(FLUTTER_INSTAL_PAGE)
export { FLUTTER_CREATE_ERROR, FLUTTER_CREATE_SUCCESS, FLUTTER_ERROR, WARNING_FLUTTER_NOT_IN_PATH_MSG_1, WARNING_FLUTTER_NOT_IN_PATH_MSG_2 }

// INPUT VALUES //
const INVALID_INPUT = 'Invalid input'
export {INVALID_INPUT}
