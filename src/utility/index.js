import { Dimensions } from "react-native";
import * as colors from "./colors";
export const heightScreen = Dimensions.get('window').height;
export const widthScreen = Dimensions.get('window').width;
export const baseURL = 'https://7lb3feyviqv7itc4v3qveses3m0alvvu.lambda-url.ap-east-1.on.aws'
export { colors };
export const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi;
export const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|{}[\]:";'<>?,./])(?!.*\s).{8,15}$/;