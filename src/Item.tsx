import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  View,
  Text,
  PixelRatio,
  TextStyle
} from "react-native";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

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
const colors = ['#00b5ad', '#2185D0', '#B5CC18', '#FBBD08', '#F2711C', '#DB2828', '#E03997', '#6435C9', '#A5673F', '#AAA', '#888', '#666', '#444', '#222', '#000']

interface ItemProps<T> {
  allowFontScaling?: boolean
  display: "TOP_BOTTOM" | "CENTER_ONLY"
  fontSize: number
  height: number
  index: number
  opacityRangeOut: number[]
  scaleRangeOut: number[]
  scrollY: Animated.SharedValue<number>
  scrollX: Animated.SharedValue<number>
  spaceBetween: number
  textStyle?: TextStyle
  // marginHorizontal?: number
  value: T
  width: number
}

const Item = <T extends {}>({
  allowFontScaling = false,
  display,
  fontSize = 200,
  height,
  index,
  // marginHorizontal = 0,
  opacityRangeOut,
  scaleRangeOut,
  scrollX,
  scrollY,
  spaceBetween,
  textStyle,
  value,
  width,
}: ItemProps<T>) => {
  const animStyleContainer = useAnimatedStyle(() => {
    // console.log(`Item ${index}`)
    const statesInterval = getStatesInterval(display, index, height)

    const top = interpolate(
      -scrollY.value,
      [(index - 1) * height, (index) * height, (index + 1) * height],
      // [(index - 1) * height, (index) * height, (index + 1) * height],
      [(index - 1) * height + spaceBetween, (index) * height, (index + 1) * height - spaceBetween],
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
      width: width + (-Math.min(scrollX.value, 0)),
      height,
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
  const widthContainerPx = width * pixelRatio
  const heightContainerPx = height * pixelRatio

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
