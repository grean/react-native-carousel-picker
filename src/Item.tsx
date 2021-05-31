import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  View,
  Text,
  PixelRatio,
  TextStyle,
  ViewStyle
} from "react-native";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { DisplayType } from './types'

const getStatesInterval = (display: string, index: number, height: number) => {
  'worklet'
  switch (display) {
    case "TOP_BOTTOM":
      return [(index - 2) * height, (index - 1) * height, (index) * height, (index + 1) * height, (index + 2) * height]
    case "CENTER_ONLY":
      return [(index - 1) * height, (index) * height, (index + 1) * height]
    default:
      return []
  }
}

const getOpacityRangeOut = (display: string) => {
  switch (display) {
    case "TOP_BOTTOM":
      return [0, 0.4, 1, 0.4, 0]
    case "CENTER_ONLY":
      return [0, 1, 0]
    default:
      return []
  }
}
const getScaleRangeOut = (display: string) => {
  switch (display) {
    case "TOP_BOTTOM":
      return [0, 0.4, 1, 0.4, 0]
    case "CENTER_ONLY":
      return [0, 1, 0]
    default:
      return []
  }
}

interface ItemProps<T> {
  itemHeight: number
  index: number
  scrollY: Animated.SharedValue<number>
  scrollX: Animated.SharedValue<number>
  value: T
  itemWidth: number
  allowFontScaling?: boolean
  containerStyle?: ViewStyle
  discoverable?: boolean
  display?: DisplayType
  fontSize?: number
  items?: T[]
  marginHorizontalPercentage?: number
  marginVerticalPercentage?: number
  opacityRangeOut?: number[]
  scaleRangeOut?: number[]
  spaceBetween?: number
  textStyle?: TextStyle
}

const Item = <T extends {}>({
  allowFontScaling = false,
  discoverable = true,
  display = "TOP_BOTTOM",
  fontSize = 200,
  itemHeight,
  index,
  // marginHorizontal = 0,
  opacityRangeOut = getOpacityRangeOut(display),
  scaleRangeOut = getScaleRangeOut(display),
  scrollX,
  scrollY,
  spaceBetween = 1 / 2.25,
  textStyle,
  value,
  itemWidth,
}: ItemProps<T>) => {
  const space = itemHeight * spaceBetween
  const animStyleContainer = useAnimatedStyle(() => {
    // console.log(`Item ${index}`)
    const statesInterval = getStatesInterval(display, index, itemHeight)

    const top = interpolate(
      -scrollY.value,
      [(index - 1) * itemHeight, (index) * itemHeight, (index + 1) * itemHeight],
      // [(index - 1) * itemHeight, (index) * itemHeight, (index + 1) * itemHeight],
      [(index - 1) * itemHeight + space, (index) * itemHeight, (index + 1) * itemHeight - space],
      Extrapolate.CLAMP
    )

    const opacity = interpolate(
      -scrollY.value,
      statesInterval,
      opacityRangeOut,
      Extrapolate.CLAMP
    )
    const scale = interpolate(
      -scrollY.value,
      statesInterval,
      scaleRangeOut,
      Extrapolate.CLAMP
    )

    return {
      width: discoverable ? itemWidth + (-Math.min(scrollX.value, 0)) : itemWidth,
      height: itemHeight,
      // backgroundColor: colors[index],
      opacity,
      transform: [
        { scale },
      ],
      top: -top,
      // left: -marginHorizontal,
    };
  });

  const animStyleTextItem = useAnimatedStyle(() => {
    // console.log(`scrollX ${scrollX.value}`)
    return {
      // backgroundColor: colors[index],
      left: Math.min(scrollX.value, 0)
    };
  });

  const pixelRatio = PixelRatio.get()
  const widthContainerPx = itemWidth * pixelRatio
  const heightContainerPx = itemHeight * pixelRatio

  // const fontSize = 200
  const window = Dimensions.get('window')
  // height of iphone 12 pro max
  let coef = (2778 / (window.height * pixelRatio))
  // if (coef > 1.5) {
  //   coef /= 2
  // }

  // const coef = fontSize * (heightContainerPx / pixelRatio)
  let fontScaleDp = ((heightContainerPx + widthContainerPx) * (fontSize / coef)) / (heightContainerPx + widthContainerPx) / pixelRatio

  // fontScaleDp = PixelRatio.roundToNearestPixel(fontScaleDp)






  return (
    <>
      <Animated.View style={[styles.container, animStyleContainer]}>
        <Animated.Text
          {...{
            allowFontScaling,
            ellipsizeMode: 'tail',
            numberOfLines: 1,
            style: [
              styles.title,
              {
                fontSize: fontScaleDp,
                // fontSize: height * 0.77 * fontScale,
                // padding: 10
                // paddingVertical: 10,
              },
              textStyle,
              animStyleTextItem
            ]
          }}
        >
          {value}
        </Animated.Text>
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: 'white'
    // backgroundColor: 'cyan',
    // overflow: 'hidden',h
  },
  title: {
    color: "white",
    textAlign: "center",
    // paddingHorizontal: 20,
    // marginHorizontal: 50,
    // fontFamily: 'cookie',
    // backgroundColor: "green",
    // fontSize: 40,
  },
});

export default Item
