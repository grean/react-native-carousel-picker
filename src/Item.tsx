import React from "react";
import {
  Dimensions,
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

// const colors = ['#00b5ad', '#2185D0', '#B5CC18', '#FBBD08', '#F2711C', '#DB2828', '#E03997', '#6435C9', '#A5673F', '#AAA', '#888', '#666', '#444', '#222', '#000']


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
      // left: Math.min(scrollX.value, 0)
      left: discoverable ? Math.min(scrollX.value, 0) : 0
    };
  });

  const pixelRatio = PixelRatio.get()
  const widthContainerPx = itemWidth * pixelRatio
  const heightContainerPx = itemHeight * pixelRatio

  const window = Dimensions.get('window')
  // height of iphone 12 pro max
  let coef = (2778 / (window.height * pixelRatio))

  let fontScaleDp = ((heightContainerPx + widthContainerPx) * (fontSize / coef)) / (heightContainerPx + widthContainerPx) / pixelRatio

  return (
    <>
      <Animated.View style={[
        {
          justifyContent: "center",
        },
        animStyleContainer
      ]}>
        <Animated.Text
          {...{
            allowFontScaling,
            ellipsizeMode: 'tail',
            numberOfLines: 1,
            style: [
              {
                color: "white",
                fontSize: fontScaleDp,
                textAlign: "center",
              },
              animStyleTextItem,
              textStyle,
            ]
          }}
        >
          {value}
        </Animated.Text>
      </Animated.View>
    </>
  );
};

export default Item
