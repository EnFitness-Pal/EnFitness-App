import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'

const RankCard = ({item}) => {
  return (
    <View style = {styles.container}>
      <FastImage
        source = {item?.TierName === 'Master' ? require('../../assets/rank/master.png'):
        item?.TierName === 'Bronze' ? require('../../assets/rank/brozone.png'):
        item?.TierName === 'Silver' ? require('../../assets/rank/silver.png') :
        item?.TierName === 'Gold' ? require('../../assets/rank/gold.png') :
        item?.TierName === 'Platinum' ? require('../../assets/rank/platinum.png'):
        item?.TierName === 'Diamond' ? require('../../assets/rank/diamond.png'):
        require('../../assets/rank/unranked.png')
        }
        style={{ height: widthScreen * 0.35, width: widthScreen * 0.35}}
      />
      <Text style ={[styles.title, {
        color: item?.TierName === 'Master' ? "#E696F4":
        item?.TierName === 'Bronze' ? "#DE947E":
        item?.TierName === 'Silver' ? "#A0B9E6":
        item?.TierName === 'Gold' ? "#E7D58D" :
        item?.TierName === 'Platinum' ? "#47B29C":
        item?.TierName === 'Diamond' ? "#5EB3D4":
        require('../../assets/rank/unranked.png')
      }]}>{item?.TierName}</Text>
      <Text style ={styles.point}>{item?.MinPoints} - {item?.MaxPoints}</Text>
    </View>
  )
}

export default RankCard

const styles = StyleSheet.create({
    container:{
        width: widthScreen * 0.4,
        height: heightScreen * 0.25,
        alignItems:'center',
        marginTop:10
    },
    title:{
      fontFamily:'Poppins',
      fontWeight:'700',
      fontSize:20,
      color: colors.GRAYLIGHT
    },
    point:{
      fontFamily:'Poppins',
      fontWeight:'700',
      fontSize:15,
      color: colors.GRAYLIGHT
    }
})