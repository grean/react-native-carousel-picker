import React from "react";
import { StyleSheet, PixelRatio, Platform } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Item from "./Item";
import { ContainerStyleType, TextStyleType } from './Viewport'
// import ReLabel from "./ReLabel";

export type ItemsType = number[] | string[]

export type ItemType = number | string

type ContextType = {
  startX: number
  startY: number
  oldIndex: number
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

export const getSpringConfig = (velocity: number = 400) => {
  'worklet'
  // console.log(velocity)
  return {
    stiffness: 150,
    damping: 30,
    mass: 1,
    overshootClamping: false,
    restSpeedThreshold: 10,
    restDisplacementThreshold: 10,
    velocity,
  }
}

const defaultDisplay = "TOP_BOTTOM"
const defaultSpaceBetween = 1 / 2.25

type PickerProps = {
  allowFontScaling?: boolean
  items: ItemsType
  itemIndex: number
  width: number
  height: number
  marginVerticalPercentage: number
  marginHorizontalPercentage: number
  onIndexChanged: (index: number) => void
  display: "TOP_BOTTOM" | "CENTER_ONLY"
  opacityRangeOut?: number[]
  scaleRangeOut?: number[]
  spaceBetween?: number
  textStyle?: TextStyleType
  containerStyle?: ContainerStyleType
  fontSize: number
}

const Picker = ({
  allowFontScaling,
  items,
  itemIndex,
  width,
  height,
  onIndexChanged,
  marginVerticalPercentage,
  marginHorizontalPercentage,
  display = defaultDisplay,
  opacityRangeOut = getOpacityRangeOut(display),
  scaleRangeOut = getScaleRangeOut(display),
  spaceBetween = defaultSpaceBetween,
  textStyle,
  containerStyle,
  fontSize,
}: PickerProps) => {
  console.log(`RENDER Picker`)
  const scrollY = useSharedValue(0)
  const scrollX = useSharedValue(0)
  const marginVertical = height * marginVerticalPercentage
  const marginHorizontal = width * marginHorizontalPercentage
  const containerHeight = height
  // const containerHeight = height - marginVertical * 2
  // const containerWidth = width
  const containerWidth = width - marginHorizontal * 2
  const itemHeight = containerHeight / 2
  // const itemHeight = containerHeight / 3
  const itemWidth = containerWidth
  // const indexOfValue = items.findIndex((v: ItemType) => v === items)
  const contentOffsetY = -itemHeight * itemIndex
  const snapPoints = items.map((_: ItemType, index: number) => index * -itemHeight)

  // console.log(`Platform ${Platform.OS} | marginVertical ${marginVertical} | containerHeight ${containerHeight} | itemWidth ${itemWidth} | itemHeight ${itemHeight} | contentOffsetY ${contentOffsetY}\nsnapPoints ${snapPoints}`)

  scrollY.value = withSpring(contentOffsetY, getSpringConfig())

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      if (ctx.oldIndex === undefined) {
        ctx.oldIndex = itemIndex
      }
      ctx.startY = scrollY.value;
    },
    onActive: ({ translationY, translationX }, ctx) => {
      scrollY.value = ctx.startY + translationY;
      scrollX.value = translationX;
    },
    onEnd: ({ velocityY }, ctx) => {
      const dest = snapPoint(scrollY.value, velocityY, snapPoints)

      scrollX.value = withSpring(0, getSpringConfig(velocityY))

      scrollY.value = withSpring(dest, getSpringConfig(velocityY), (cancelled) => {
        const itemIndex = Math.round(-dest / itemHeight)
        if (cancelled && ctx.oldIndex !== itemIndex) {
          onIndexChanged(itemIndex)
          ctx.oldIndex = itemIndex
        }
      })
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical,
      marginHorizontal,
      // left: -marg,
      paddingTop: itemHeight / 2 - marginVertical,
      overflow: 'visible',
      // borderWidth: 2,
      // borderColor: 'rgba(255,255,255,0.8)',
      // borderRadius: 50,
      // borderBottomWidth: 0,
      // borderTopWidth: 0,
      // shadowOpacity: 1,
      // // shadowColor: 'rgba(0, 0, 0, 0.75)',
      // shadowOffset: { width: 3, height: 13 },
      // shadowRadius: 10,
      // borderLeftWidth: 0,
      // borderRightWidth: 0,
      // overflow: 'hidden',
      backgroundColor: "transparent",
    },
  });

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[styles.container, containerStyle]}>
        {/* <ReLabel {...{ scrollY }} /> */}
        {items.map((value: ItemType, index: number) => (
          <Item {...{
            allowFontScaling,
            key: index,
            height: itemHeight,
            width: itemWidth,
            spaceBetween: itemHeight * spaceBetween,
            value,
            scrollY,
            scrollX,
            index,
            display,
            opacityRangeOut,
            scaleRangeOut,
            textStyle,
            fontSize,
          }} />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Picker;
