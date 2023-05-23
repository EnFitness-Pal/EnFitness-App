import { Dimensions } from "react-native";
import * as colors from "./colors";
export const heightScreen = Dimensions.get('window').height;
export const widthScreen = Dimensions.get('window').width;
export const baseURL = 'https://7lb3feyviqv7itc4v3qveses3m0alvvu.lambda-url.ap-east-1.on.aws'
export const RecipeURL = 'https://api.spoonacular.com';
// export const APIKeyRecipe = '1ad0139b54ab412fbb9e7604a4b29def'
export const APIKeyRecipe = '1ad0139b54ab412fbb9e7604a4b29def'
//470685e625d942a6a5c4f214478c4976
// 99596199e568485a983c09710a84343b
//53d93e6acb7a4956a721dc0cc37769c8
export { colors };
export const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
export const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|{}[\]:";'<>?,./])(?!.*\s).{8,15}$/;
export const regexMin = /^(?:[1-9]\d{0,2}|1[0-3]\d{2}|14[0-3]\d|1440)$/;