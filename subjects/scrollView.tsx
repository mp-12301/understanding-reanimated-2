import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const WORDS = ['Whats', 'up', 'mobile', 'devs']

interface PageProps {
  title: string
  index: number,
  translateX: Animated.SharedValue<number>
}

const { height, width } = Dimensions.get('window')
const SIZE = width * 0.7

const Page: React.FC<PageProps> = ({index, title, translateX }) => {
  const inputRange = [(index-1) * width, index * width, (index+1) * width]

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP)

    const borderRadius = interpolate(translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP)

    return {borderRadius, transform: [ {scale} ] }
  })


  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [height / 2, 0, -height / 2])

    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolate.CLAMP)

    return {
      opacity,
      transform: [
        {
          translateY,
        }
      ]
    }
  })


  return (
    <View style={[styles.pageContainer, {backgroundColor: `rgba(0,0,256,0.${index + 2})`}]}>
      <Animated.View style={[styles.square, rStyle]}/>
      <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  )

}

const ScrollViewSubject = () => {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <Animated.ScrollView 
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal style={styles.container}
    >
      {WORDS.map((title, index) => {
        return <Page title={title} index={index} key={index} translateX={translateX} />
      })}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)'
  },
  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 70,
    color: 'white',
    textTransform: 'uppercase',
  }
})

export default ScrollViewSubject
