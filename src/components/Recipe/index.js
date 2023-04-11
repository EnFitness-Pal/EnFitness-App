import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'

const Recipe = ({ route }) => {
  return (
    <View style = {styles.container}>
      <FlatList
        data={route.params.data?.analyzedInstructions[0]?.steps}
        keyExtractor={item => item.number}
        renderItem={({ item }) => { 
          return (
            <View style={{
              width: widthScreen * 0.9,
              height: heightScreen * 0.07,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: widthScreen * 0.05,
              marginTop: heightScreen * 0.05,
              marginVertical: heightScreen * 0.03,
            }}>
              <View style = {{ width: widthScreen * 0.1, height: heightScreen * 0.08}}>
                <Text style={{alignSelf:'center', color: colors.MAIN, fontSize: 12, fontFamily: "Poppins-Bold", fontWeight: "500"}}>Step</Text>
                <Text numberOfLines={1} style={{color: colors.MAIN, fontSize: 30, fontFamily: "Poppins-Bold", fontWeight: "bold", alignSelf:'center'}}>{item?.number}</Text>
              </View>
              <View style ={{justifyContent:'center', marginLeft:10,width:widthScreen * 0.75, height: heightScreen * 0.2}}>
                <Text style={{lineHeight: 18 ,color: colors.WHITE, fontSize: 14, fontFamily: "Poppins-Bold", fontWeight: "400"}}>{item?.step}</Text>
              </View>
            </View>
          )
        }}
      
      />
    </View>
  )
}

export default Recipe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  }
})