import {StyleSheet, Animated, View} from 'react-native';
import React from 'react';
import { heightScreen, widthScreen, colors } from '../../utility';
const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * widthScreen, idx * widthScreen, (idx + 1) * widthScreen];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [15, 35, 15],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', colors.MAIN, '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    bottom: heightScreen*0.08,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 4,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: colors.GRAYDARK,
  },
  dotActive: {
    backgroundColor: '#000',
  },
});