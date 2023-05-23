import { getPremiumAPI, restorePremiumAPI, updatePremiumAPI } from "../../../api/Premium";
import { getPremiumFailure, getPremiumStart, getPremiumSuccess, restorePremiumFailure, restorePremiumStart, restorePremiumSuccess, updatePremiumFailure, updatePremiumStart, updatePremiumSuccess } from "../../features/premium/premiumSlice";


export const getPremium = async (dispatch, id) => { 
    dispatch(getPremiumStart());
    await getPremiumAPI(id)
        .then((res) => {
            console.log('res:', res.data)
            dispatch(getPremiumSuccess(res.data));
        })
        .catch((err) => { 
            dispatch(getPremiumFailure());
        });
}

export const updatePremium = async (dispatch, id, PaypalToken, ExpirationDate, Money) => { 
    dispatch(updatePremiumStart());
    await updatePremiumAPI(id, PaypalToken, ExpirationDate, Money)
        .then((res) => {
            console.log('res1:', res.data)
            dispatch(updatePremiumSuccess(res.data));
        })
        .catch((err) => { 
            console.log('err:', err.response)
            dispatch(updatePremiumFailure());
        });
}

export const restorePremium = async (dispatch, id) => { 
    dispatch(restorePremiumStart());
    await restorePremiumAPI(id)
        .then((res) => {
            console.log('res1:', res.data)
            dispatch(restorePremiumSuccess(res.data));
        })
        .catch((err) => { 
            dispatch(restorePremiumFailure());
            console.log('err:', err.response)
        });
}

export const restoreTest = async (dispatch) => { 
    dispatch(restorePremiumSuccess());
}