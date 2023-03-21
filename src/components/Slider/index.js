import {Animated, FlatList, StyleSheet,View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../../assets/GettingData';
import SlideItem from '../SlideItem';
import Pagination from '../Pagination';
import Button from '../Button';
import { colors, heightScreen, widthScreen } from '../../utility';
import { useNavigation } from '@react-navigation/native';


const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const handleGetting = () => {
    // navigation.navigate('SignIn');
    // // await storeData(HAS_LAUNCHED, 'true');
    // dispatch(setLauch(true));
  }
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (

      <View>
        <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
          />
          {
              index == 2 &&
              <Button
                stylesContainer={styles.button}
                  title={'Start Now'}
                  icon = 'right'
                  stylesTitle={{color:colors.WHITE}}
          stylesIcon={{ fontSize: 20, color: colors.WHITE }}
          onPress= {()  =>  navigation.navigate('SexScreen')}
                />
          }
        <Pagination data={Slides} scrollX={scrollX} index={index} />
      </View>

  );
};

export default Slider;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        marginTop: heightScreen * 0.8,
        width: widthScreen *  0.4
    }
});