import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'

const Ingredients = ({ route }) => {
  return (
    <View style={styles.container}>
        <FlatList
              data={route.params.data?.extendedIngredients}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => { 
                    return (
                        <View style={{
                            width: widthScreen * 0.9,
                            height: heightScreen * 0.07,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: widthScreen * 0.05,
                            marginTop: heightScreen * 0.012,

                        }}>
                            <View style = {{width:widthScreen * 0.12, height:widthScreen * 0.12}}>
                                <Image
                                    source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item?.image}` }}
                                    resizeMode='stretch'
                                    style={{
                                        width: widthScreen * 0.12,
                                        height: widthScreen * 0.12,
                                        alignSelf: 'center',
                                        borderRadius: 12,
                                    }}
                                />                                
                            </View>
                            <Text numberOfLines={1} style={{ width: widthScreen * 0.4 ,color: colors.WHITE, fontSize: 16, fontFamily: "Poppins-Bold", fontWeight: "500", marginLeft:10}}>{item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}</Text>
                            <Text style={{ color: colors.WHITE, fontSize: 16, fontFamily: "Poppins-Bold", fontWeight: "500", marginLeft: "auto" }}>{item?.amount} { item?.unit}</Text>
                        </View>
                    )
              }}
          
    />
    </View>
  )
}

export default Ingredients

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    }
})