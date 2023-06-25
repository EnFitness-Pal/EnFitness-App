import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, heightScreen, widthScreen } from '../../utility';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Video from 'react-native-video';
import Highlighter from 'react-native-highlight-words';
import ImageZoom from 'react-native-image-pan-zoom';
import { AuthContext } from '../../context/AuthContext';
import { getDetailsNewsFeed, reactionNewsFeed } from '../../api/NewsFeed';

const FeedCard = ({onPressDot, item}) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const authContext = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    const [type, setType] = useState(item?.StatusVotes);
    const [isCheck, setIsCheck] = useState(item?.StatusVotes);
    const handleUpVote = async() =>{
      setLoading(true);
      if(type === 'UpVote'){
        await reactionNewsFeed(item?.Id, authContext.userID, 'UpVote')
        .then((response) =>{
          getDetailLoading()
          console.log(response.data)
          setIsCheck('None')
          setLoading(false);
        })
        .catch((error)=>{
          console.log('errorUp', error.response)
          Alert.alert('Something went wrong','Reaction failed, please try again.')
          setLoading(false);
        })        
      } else{
        await reactionNewsFeed(item?.Id, authContext.userID, 'UpVote')
        .then((response) =>{
          getDetailLoading()
          console.log(response.data)
          setIsCheck('UpVote')
          setLoading(false);
        })
        .catch((error)=>{
          console.log('errorUp', error)
          Alert.alert('Something went wrong','Reaction failed, please try again.')
          setLoading(false);
        })        
      }

    }
    const handleDownVote =  async() =>{
      setLoading(true);
      if(type === 'DownVote'){
        await reactionNewsFeed(item?.Id, authContext.userID, 'DownVote')
        .then((response) =>{
          getDetailLoading()
          console.log(response.data)
          setIsCheck('None')
          setLoading(false);
        })
        .catch((error)=>{
          console.log('errorDown', error)
          Alert.alert('Something went wrong','Reaction failed, please try again.')
          setLoading(false);
        })        
      } else{
        await reactionNewsFeed(item?.Id, authContext.userID, 'DownVote')
        .then((response) =>{
          getDetailLoading()
          console.log(response.data)
          setIsCheck('DownVote')
          setLoading(false);
        })
        .catch((error)=>{
          console.log('errorDown', error)
          Alert.alert('Something went wrong','Reaction failed, please try again.')
          setLoading(false);
        })
      }
    }
    const getDetailLoading = async () => {
      setLoading(true);
      await getDetailsNewsFeed(item?.Id, authContext.userID)
      .then((response)=>{
        setData(response.data);
        setIsCheck(response.data.StatusVotes)
      })
      .catch((error) => {
        console.log('error', error);
      })
    }

    useMemo(() => {
      getDetailLoading();
    },[])

    const carouselData = [];
    if (item?.Image) {
        carouselData.push({ type: 'image', source: item?.Image });
      }
    if (item?.Video) {
        carouselData.push({ type: 'video', source: item?.Video });
      }

      const CarouselItem = ({ item }) => {
        return (
          <View>
            {item.source !== null && item.type === 'image' && 
            // <ImageZoom cropWidth={widthScreen}
            // cropHeight={styles.carouselImage.height}
            // imageWidth={widthScreen}
            // imageHeight={styles.carouselImage.height}>
            <FastImage  resizeMode={FastImage.resizeMode.cover} source={{ uri: item.source }} style={styles.carouselImage} />
            // </ImageZoom>
            }
            {item.source !== null && item.type === 'video' && <Video
                source={{uri: item.source}} style={styles.carouselVideo}
                resizeMode="contain"
                autoplay={true}
                controls={true}
                playInBackground={true}
                pictureInPicture={true}
                />}
          </View>
        );
      };

      const renderCarouselItem = ({ item }) => {
        return <CarouselItem item={item} />;
      };
  return (
    <View style= {styles.container}>
      <View style ={styles.header}>
        <View style = {{flexDirection:'row'}}>
        <FastImage
            source={{uri: item?.PersonAvatar}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.avt}
        />
        <Text numberOfLines={1} style={styles.name}>{item?.PersonName}</Text>
        <FastImage
            source = {item?.TierName === 'Master' ? require('../../assets/rank/master.png'):
            item?.TierName === 'Bronze' ? require('../../assets/rank/brozone.png'):
            item?.TierName === 'Silver' ? require('../../assets/rank/silver.png') :
            item?.TierName === 'Gold' ? require('../../assets/rank/gold.png') :
            item?.TierName === 'Platinum' ? require('../../assets/rank/platinum.png'):
            item?.TierName === 'Diamond' ? require('../../assets/rank/diamond.png'):
            require('../../assets/rank/unranked.png')
            }
            resizeMode={FastImage.resizeMode.contain}
            style={styles.rank}
        />
        </View>
        {item?.IsSetting?<TouchableOpacity 
        onPress={onPressDot}
        style={{justifyContent:'center', marginRight: widthScreen * 0.03}}>
            <Entypo
                name = 'dots-three-vertical'
                size={20}
                color={colors.WHITE}
                style={{alignSelf:'center'}}
            />
        </TouchableOpacity>:null}
      </View>
      <View style={styles.containerSlider}>
        <Carousel
            data={carouselData}
            renderItem={renderCarouselItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={widthScreen}
            itemWidth={widthScreen}
        />
        <View style ={styles.containerBody}>
            <TouchableOpacity onPress={handleUpVote} style ={{flexDirection:'row', marginLeft: heightScreen * 0.015}}>
                <Text style={styles.numofvote}>{data?.UpVotes}</Text>
                <MaterialCommunityIcons 
                    name = 'arrow-up-bold'
                    color={isCheck === 'UpVote' ?  colors.MAIN: colors.WHITE}
                    size={25}
                    style={{ marginLeft: widthScreen * 0.01}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownVote} style ={{flexDirection:'row', marginLeft: heightScreen * 0.01}}>
                <Text style={styles.numofvote}>{data?.DownVotes}</Text>
                <MaterialCommunityIcons 
                    name = 'arrow-down-bold'
                    color={isCheck === 'DownVote' ?  colors.MAIN: colors.WHITE}
                    size={25}
                    style={{ marginLeft: widthScreen * 0.01}}
                />
            </TouchableOpacity>
        <Pagination
            dotsLength={carouselData.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
        </View>
            <Highlighter
                highlightStyle={styles.namestatus}
                searchWords={[item?.PersonName]}
                textToHighlight={`${item?.PersonName}  ${item?.Status}`}
                style={styles.status}  
            />
        <View style={{flexDirection:'row',marginLeft: widthScreen * 0.05}}>
        <Text style={styles.dated}>{(item?.DateTime).slice(0,5)}</Text>
        <Text style={styles.dotdated}>{'\u2B24'}</Text>
        <Text style={styles.dated}>{(item?.DateTime).slice(5)}</Text>
        </View>
    </View>
    </View>
  )
}

export default FeedCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:heightScreen * 0.03
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:widthScreen * 0.03,
        paddingBottom: 10,
    },
    avt:{
        width: widthScreen * 0.08,
        height: widthScreen * 0.08,
        borderRadius: widthScreen * 0.1
    },
    name:{
        color: colors.WHITE,
        fontFamily:'Poppins',
        fontSize:16,
        alignSelf:'center',
        marginLeft: widthScreen * 0.02,
        fontWeight: '600'
    },
    rank:{
        width: widthScreen * 0.05,
        height: widthScreen * 0.05,
        borderRadius: widthScreen * 0.1,
        alignSelf:'center',
        marginLeft: widthScreen * 0.02,
    },
      containerSlider: {
        flex: 1,
      },
      carouselImage: {
        height: heightScreen * 0.4,
      },
      carouselVideo: {
        height: heightScreen * 0.4,
      },
      paginationContainer: {
        marginLeft:widthScreen * 0.13,
        paddingBottom:heightScreen * 0.01,
        paddingTop:heightScreen * 0.01
      },
      dotStyle: {
        width: heightScreen * 0.012,
        height: heightScreen * 0.012,
        borderRadius: heightScreen * 0.012,
        backgroundColor: colors.MAIN,
      },
      inactiveDotStyle: {
        backgroundColor: colors.WHITE,
      },
      containerBody:{
        flexDirection:'row',
        marginTop: heightScreen * 0.02,
        paddingHorizontal: heightScreen * 0.01
      },
      numofvote:{
        fontSize: 17,
        color: colors.WHITE,
        alignSelf:'center',
        fontFamily:'Poppins',
        fontWeight:'600'
      },
      readmore: {
        alignSelf:'center',
        marginHorizontal: widthScreen * 0.05,
        textAlign: 'right',
        fontFamily: "Poppins-Regular",
        color: colors.MAIN,
        fontSize: 13,
    },
    namestatus:{
        color: colors.WHITE,
        fontFamily:'Poppins',
        fontSize:16,
        alignSelf:'center',
        marginLeft: widthScreen * 0.02,
        fontWeight: '600',
    },
    status:{
        color: colors.WHITE,
        fontFamily:'Poppins',
        fontSize:15,
        paddingHorizontal: heightScreen * 0.025,
        marginTop: heightScreen * 0.01
    },
    dated:{
        marginTop: heightScreen * 0.01,
        color:colors.GRAYLIGHT,
    },
    dotdated:{
        fontSize:3,
        marginTop: heightScreen * 0.01,
        color:colors.GRAYLIGHT,
        alignSelf:'center',
        paddingLeft:widthScreen * 0.015,
        paddingHorizontal: widthScreen * 0.01
    }
})