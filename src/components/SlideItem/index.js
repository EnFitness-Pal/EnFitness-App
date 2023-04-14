import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import React from 'react';

import { colors, heightScreen, widthScreen } from '../../utility';
const SlideItem = ({item}) => {

  return (
    <View style={styles.container}>
      <FastImage
        source={item?.img}
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: 0,
              },
            ],
          },
        ]}
      />
      <View style={styles.triangle} />
      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    height: heightScreen,
    backgroundColor: colors.BG,
  },
  image: {
    flex: 0.6,
    width: '100%',
    transform: [{ rotate: '90deg' }],
  },
  triangle: {
    position: 'absolute',
    // bottom: 0,
    borderStyle: 'solid',
    borderLeftWidth: widthScreen,
    borderBottomWidth: widthScreen * 0.3,
    borderLeftColor: 'transparent',
    borderBottomColor: colors.BG,
    overflow: 'hidden',
    transform: [{ rotate: '-deg' }],
    bottom: heightScreen * 0.4,
    clip: 'rect(0, ' + widthScreen * 0.7 + ', ' + widthScreen * 0.3 + ', 0)',
  },
  content: {
    flex:0.4,
    backgroundColor: colors.BG,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.WHITE,
    paddingTop: heightScreen * 0.09
  },
  description: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
});