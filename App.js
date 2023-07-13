import {StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { AuthProvider } from './src/context/AuthContext'
import AppNavigation from './src/navigation/AppNavigation'
import { AxiosProvider } from './src/context/AxiosContext'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <AuthProvider>
            <AxiosProvider>
              <AppNavigation />
            </AxiosProvider>
          </AuthProvider>
        </View>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.BG
  }
})