import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'

const Bookmarks = ({navigation}) => {
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.containerHeader}>
          <ButtonBack
              name='chevron-back'
              size={28}
              onPress={() => navigation.goBack()}
          />
          <Text style = {{fontSize: 18, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.18}}>My Bookmarks</Text>
      </View>
    </SafeAreaView>
  )
}

export default Bookmarks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  containerHeader: {
    flexDirection: 'row',
    marginHorizontal: widthScreen * 0.05,
    alignItems: 'center',
  },
})