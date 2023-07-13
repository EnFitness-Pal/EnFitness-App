import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonBack from '../../components/ButtonBack';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import storage from '@react-native-firebase/storage';
import { createNewsFeed } from '../../api/NewsFeed';
import ReactNativeModal from 'react-native-modal';
import * as Progress from 'react-native-progress';

const CreatePost = ({navigation, route}) => {
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);
    const [status, setStatus] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [transferredImage, setTransferredImage] = useState(0);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [transferredVideo, setTransferredVideo] = useState(0);
    const [loading, setLoading] = useState(false);
    let uri = {
      "Image":null,
      "Video":null,
    }

    const uploadLibrary = async () => {

      if(route.params?.data?.length === 1){

        if((route.params.data[0]?.type).split('/')[0] === 'image'){
          const uploadImageUri = route.params?.data.find((item) => item.type.startsWith('image'))?.uri;
          let fileImagename = uploadImageUri.substring(uploadImageUri.lastIndexOf('/') + 1);
          const extensionImage = fileImagename.split('.').pop(); 
          const nameImage = fileImagename.split('.').slice(0, -1).join('.');
          fileImagename = nameImage + Date.now() + '.' + extensionImage;
          setUploadingImage(true);
          setTransferredImage(0);
          const storageImageRef = storage().ref(`news-feed/image/${fileImagename}`);
          const taskImage = storageImageRef.putFile(uploadImageUri);
      
          taskImage.on('state_changed', (taskSnapshotImage) => {
            console.log(
              `${taskSnapshotImage.bytesTransferred} transferred out of ${taskSnapshotImage.totalBytes}`,
            );
      
            setTransferredImage(
              Math.round(taskSnapshotImage.bytesTransferred / taskSnapshotImage.totalBytes) *
                100,
            );
          });
      
          try {
            await taskImage;
      
            const urlImage = await storageImageRef.getDownloadURL();
            setUploadingImage(false);
            uri.Image = urlImage;
            return {
              "urlImage": urlImage,
            };
      
          } catch (e) {
            console.log(e);
            return null;
          }
        } else {
            const uploadVideoUri = route.params?.data.find((item) => item.type.startsWith('video'))?.uri
            let fileVideoname = uploadVideoUri.substring(uploadVideoUri.lastIndexOf('/') + 1);
            const extensionVideo = fileVideoname.split('.').pop(); 
            const nameVideo = fileVideoname.split('.').slice(0, -1).join('.');
            fileVideoname = nameVideo + Date.now() + '.' + extensionVideo;
            setUploadingVideo(true);
            setTransferredVideo(0);
            const storageVideoRef = storage().ref(`news-feed/video/${fileVideoname}`);
            const taskVideo = storageVideoRef.putFile(uploadVideoUri);
            taskVideo.on('state_changed', (taskSnapshotVideo) => {
              console.log(
                `${taskSnapshotVideo.bytesTransferred} transferred out of ${taskSnapshotVideo.totalBytes}`,
              );
        
              setTransferredVideo(
                Math.round(taskSnapshotVideo.bytesTransferred / taskSnapshotVideo.totalBytes) *
                  100,
              );
            });
        
            try {
              await taskVideo
              const urlVideo = await storageVideoRef.getDownloadURL();
              setUploadingVideo(false);
              uri.Video = urlVideo;
              return {
                "urlVideo": urlVideo
              };
        
            } catch (e) {
              console.log(e);
              return null;
            }
        }


      } else {
          const uploadImageUri = route.params?.data.find((item) => item.type.startsWith('image'))?.uri;
          const uploadVideoUri = route.params?.data.find((item) => item.type.startsWith('video'))?.uri
          let fileImagename = uploadImageUri.substring(uploadImageUri.lastIndexOf('/') + 1);
          let fileVideoname = uploadVideoUri.substring(uploadVideoUri.lastIndexOf('/') + 1);
          const extensionImage = fileImagename.split('.').pop(); 
          const extensionVideo = fileVideoname.split('.').pop(); 
          const nameImage = fileImagename.split('.').slice(0, -1).join('.');
          const nameVideo = fileVideoname.split('.').slice(0, -1).join('.');
          fileImagename = nameImage + Date.now() + '.' + extensionImage;
          fileVideoname = nameVideo + Date.now() + '.' + extensionVideo;
          setUploadingImage(true);
          setUploadingVideo(true);
          setTransferredImage(0);
          setTransferredVideo(0);
          const storageImageRef = storage().ref(`news-feed/image/${fileImagename}`);
          const storageVideoRef = storage().ref(`news-feed/video/${fileVideoname}`);
          const taskImage = storageImageRef.putFile(uploadImageUri);
          const taskVideo = storageVideoRef.putFile(uploadVideoUri);
      
          taskImage.on('state_changed', (taskSnapshotImage) => {
            console.log(
              `${taskSnapshotImage.bytesTransferred} transferred out of ${taskSnapshotImage.totalBytes}`,
            );
      
            setTransferredImage(
              Math.round(taskSnapshotImage.bytesTransferred / taskSnapshotImage.totalBytes) *
                100,
            );
          });

          taskVideo.on('state_changed', (taskSnapshotVideo) => {
            console.log(
              `${taskSnapshotVideo.bytesTransferred} transferred out of ${taskSnapshotVideo.totalBytes}`,
            );
      
            setTransferredVideo(
              Math.round(taskSnapshotVideo.bytesTransferred / taskSnapshotVideo.totalBytes) *
                100,
            );
          });
      
          try {
            await taskImage;
            await taskVideo
      
            const urlImage = await storageImageRef.getDownloadURL();
            const urlVideo = await storageVideoRef.getDownloadURL();
            setUploadingImage(false);
            setUploadingVideo(false);

            uri.Image = urlImage;
            uri.Video = urlVideo;

            return {
              "urlImage": urlImage,
              "urlVideo": urlVideo
            };
      
          } catch (e) {
            console.log(e);
            return null;
          }        
      }


  
    };

    const handleSharePost = async ()=>{
      setLoading(true);
      const uriFile = await uploadLibrary();
      if (uriFile === null) {
        Alert.alert("Something went wrong!")
        return;
      } else {
          await createNewsFeed(authContext.userID,status,uri?.Image,uri?.Video)
          .then((response)=>{
            setLoading(false);
            navigation.goBack();
          })
          .catch((error)=>{
            console.log(error.response);
            setLoading(false)
          });
      }
    }


    const renderItem = ({item, index}) => {
        return (
            <View style={{marginTop: heightScreen * 0.02, marginLeft:route.params?.data?.length ===1 ? null:heightScreen * 0.01}}>
              {item?.type === 'image/jpg' && <FastImage 
              resizeMode={((route.params.data[0]?.type).split('/')[0] === 'image' && route.params?.data?.length ===1)?FastImage.resizeMode.contain:FastImage.resizeMode.cover} 
              source={{ uri: item.uri }} 
              style={((route.params.data[0]?.type).split('/')[0] === 'image' && route.params?.data?.length ===1)? styles.imageonly: styles.image} />}
              {item?.type === 'video/mp4' && <Video
                  source={{uri: item.uri}} style={((route.params.data[0]?.type).split('/')[0] === 'video' && route.params?.data?.length ===1) ?styles.carouselVideoOnly: styles.carouselVideo}
                  resizeMode="contain"
                  muted={true}
                  autoplay={true}
                  controls={true}
                  ignoreSilentSwitch={"obey"}
                  playInBackground={true}
                  playWhenInactive={true}
                  pictureInPicture={true}
                  />}
            </View>
          );
    }
  return (
    <View style ={styles.container}>
      <View style = {styles.containerHeader}>
      <ButtonBack
              name='chevron-back'
              size={28}
              onPress={() => navigation.goBack()}
              styleButton={{marginTop:heightScreen * 0.044, backgroundColor:colors.GRAYDARK}}
          />
        <Text style = {styles.textHeader}>New Post</Text>
        <TouchableOpacity onPress={handleSharePost}>
        <Text style={styles.textShare}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style ={styles.header}>
        <View style = {{flexDirection:'row'}}>
        <FastImage
            source={{uri: axiosContext.person?.Avatar}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.avt}
        />
        <Text numberOfLines={1} style={styles.name}>{axiosContext.person?.FullName}</Text>
        </View>
    </View>
    <TextInput
        placeholder='Say something about this...'
        placeholderTextColor={colors.GRAYLIGHT}
        style={styles.textStatus}
        multiline={true}
        onChangeText={(text)=>setStatus(text)}
    />
    <FlatList
        horizontal
        data={route.params?.data}
        renderItem={renderItem}
        scrollEnabled={false}
    />
    <ReactNativeModal
      isVisible = {loading}
    >
      <View style={styles.modal}>
        <Text style={styles.titleModal}>Uploading</Text>
        <View style = {{marginVertical: heightScreen * 0.01}}>
        <View style={{marginVertical: heightScreen * 0.02}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.textUpload}>Image</Text>
            <Text style={[styles.textUpload, {marginRight:widthScreen * 0.05}]}>{transferredImage}%</Text>              
          </View>
          <Progress.Bar progress={transferredImage/100} width={widthScreen * 0.7} style={{alignSelf:'center'}} color={colors.MAIN}/>          
        </View>
        <View style={{marginVertical: heightScreen * 0.02}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.textUpload}>Video</Text>
            <Text style={[styles.textUpload, {marginRight:widthScreen * 0.05}]}>{transferredVideo}%</Text>              
          </View>
          <Progress.Bar progress={transferredVideo/100} width={widthScreen * 0.7} style={{alignSelf:'center'}} color={colors.MAIN}/>          
        </View>
        </View>
      </View>
    </ReactNativeModal>
    </View>
  )
}

export default CreatePost

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BG
      },
      containerHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:widthScreen * 0.05,
        height:heightScreen * 0.1,
        backgroundColor:colors.GRAYDARK
      },
      textShare:{
        marginTop:heightScreen * 0.055,
        fontSize:18,
        color:colors.MAIN,
        fontWeight:'bold',
        fontFamily:'Poppins'
      },
    textHeader:{
        fontFamily:'Poppins',
        fontSize:18,
        color:colors.WHITE,
        marginTop:heightScreen * 0.055,
        fontWeight:'bold',
      },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:widthScreen * 0.03,
        paddingBottom: heightScreen * 0.015,
        paddingTop: heightScreen * 0.015,
    },
    avt:{
        width: widthScreen * 0.1,
        height: widthScreen * 0.1,
        borderRadius: widthScreen * 0.1
    },
    name:{
        color: colors.WHITE,
        fontFamily:'Poppins',
        fontSize:18,
        alignSelf:'center',
        marginLeft: widthScreen * 0.03,
        fontWeight: '600'
    },
    textStatus:{
        width: widthScreen * 0.93,
        alignSelf:'center',
        justifyContent: 'center',
        color: colors.WHITE,
        fontSize:17
    },
    image:{
        marginRight:heightScreen * 0.01,
        width: widthScreen * 0.48,
        height: heightScreen * 0.35,
    },
    imageonly:{
      width: widthScreen,
      height: heightScreen * 0.45,
    },
    carouselVideo: {
        width: widthScreen * 0.48,
        height: heightScreen * 0.35,
    },
    carouselVideoOnly:{
      width: widthScreen,
      height: heightScreen * 0.45,
    },
    modal:{
      height: heightScreen * 0.3,
      width: widthScreen * 0.8,
      backgroundColor: colors.BG,
      alignSelf:'center',
      borderRadius: widthScreen * 0.04
    },
    titleModal:{
      alignSelf:'center',
      fontFamily:'Poppins',
      fontSize: 18,
      color:colors.WHITE,
      marginTop:heightScreen * 0.03,
      fontWeight:'600'
    },
    textUpload:{
      marginBottom:heightScreen * 0.015,
      marginLeft:heightScreen * 0.02,
      fontFamily:'Poppins',
      fontSize: 15,
      color:colors.WHITE
    }
})