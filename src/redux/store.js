import {combineReducers, configureStore, applyMiddleware} from '@reduxjs/toolkit';
import stateReducer from './features/state/stateSlice'
import favReducer from './features/favorites/favSlice'
import foodReducer from './features/favorites/foodSlice'
import premiumReducer from './features/premium/premiumSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage:AsyncStorage,
}

const rootReducer = combineReducers({
  state: stateReducer,
  favorite: favReducer,
  food: foodReducer,
  premium: premiumReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
})

export let persistor = persistStore(store)