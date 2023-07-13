import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { colors, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import { getAllRank } from '../../api/Ranking'
import RankCard from '../../components/RankCard'
import { useSelector } from 'react-redux'

const Settings = ({navigation}) => {
  const [data, setData] = useState([]);
  const theme = useSelector(state => state.state.theme);
  const handleGetAllRank = async ()  =>{
    await getAllRank()
    .then((response) =>{
      setData(response.data)
    })
    .catch((error) =>{
      console.log("Error getting all ranks", error);
    })
  }

  useMemo(()=>{
    handleGetAllRank()
  },[])

  const renderItem = ({item, index}) => {
    return (
      <RankCard
        item={item}
      />
    )
  }

  return (
    <SafeAreaView style={theme == 'dark' ? styles.container: styles.containerlight}>
      <View style = {styles.containerHeader}>
        <ButtonBack
            name='chevron-back'
            size={28}
            onPress={() => navigation.goBack()}
        />
        <Text style = {{fontSize: 20, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.23}}>Ranking</Text>
      </View>
      <FlatList
        data = {data}
        numColumns={2}
        renderItem = {renderItem}
        style={{alignSelf:'center'}}
        scrollEnabled={false}
      />
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.BG
  },
  containerlight: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  containerHeader: {
    flexDirection: 'row',
    marginHorizontal: widthScreen * 0.05,
    alignItems: 'center',
  },
})