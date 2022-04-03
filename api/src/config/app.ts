const APP_SERVER: string = process.env.APP_SERVER || 'localhost';
const APP_PORT: string = process.env.PORT || process.env.APP_PORT || '8081';
const APP_VERSION: string = process.env.APP_VERSION || 'v1';

const SERVER_PATH: string = `http://${APP_SERVER}:${APP_PORT}`;
const RELATIVE_API_PATH: string = `/api/${APP_VERSION}`;
const SERVER_API_PATH: string = `${SERVER_PATH}${RELATIVE_API_PATH}`;

export { APP_VERSION, APP_SERVER, APP_PORT, SERVER_PATH, RELATIVE_API_PATH, SERVER_API_PATH };
