import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Item from "./Item";
import type { DisplayType } from './types'


type ContextType = {
  // startX: number
  startY: number
  oldIndex: number
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

interface PickerProps<T> {
  currentItemIndex: number
  height: number
  onCurrentIndexChanged: (index: number) => void
  width: number
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

const Picker = <T extends {}>({
  allowFontScaling,
  containerStyle,
  discoverable,
  display,
  fontSize,
  height,
  items = [],
  currentItemIndex,
  marginHorizontalPercentage = 0,
  marginVerticalPercentage = 0,
  onCurrentIndexChanged,
  opacityRangeOut,
  scaleRangeOut,
  spaceBetween,
  textStyle,
  width,
}: PickerProps<T>) => {
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
  const contentOffsetY = -itemHeight * currentItemIndex
  const snapPoints = items.map((_, index) => index * -itemHeight)

  // console.log(`Platform ${Platform.OS} | marginVertical ${marginVertical} | containerHeight ${containerHeight} | itemWidth ${itemWidth} | itemHeight ${itemHeight} | contentOffsetY ${contentOffsetY}\nsnapPoints ${snapPoints}`)

  scrollY.value = withSpring(contentOffsetY, getSpringConfig())

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      if (ctx.oldIndex === undefined) {
        ctx.oldIndex = currentItemIndex
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
        const currentItemIndex = Math.round(-dest / itemHeight)
        if (cancelled && ctx.oldIndex !== currentItemIndex) {
          onCurrentIndexChanged(currentItemIndex)
          ctx.oldIndex = currentItemIndex
        }
      })
    },
  });

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[{
        flex: 1,
        marginVertical,
        marginHorizontal,
        paddingTop: itemHeight / 2 - marginVertical,
        overflow: 'visible',
        backgroundColor: "transparent",
      },
        containerStyle
      ]}>
        {items.map((value, index) => (
          <Item {...{
            allowFontScaling,
            discoverable,
            display,
            fontSize,
            itemHeight,
            index,
            key: index,
            scrollX,
            scrollY,
            opacityRangeOut,
            scaleRangeOut,
            spaceBetween,
            textStyle,
            value,
            itemWidth,
          }} />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Picker;
