import React, { useEffect, useState } from 'react'
import { View, Text, LayoutChangeEvent, StyleSheet, LayoutRectangle, ViewStyle, TextStyle } from 'react-native'
import { runOnJS } from 'react-native-reanimated'

// import Label from './Label'
import Picker from './Picker'
import { DisplayType } from './types'

interface ViewportProps<T> {
  allowFontScaling?: boolean
  containerStyle?: ViewStyle
  discoverable?: boolean
  display?: DisplayType
  fontSize?: number
  index?: number
  items?: T[]
  marginHorizontalPercentage?: number
  marginVerticalPercentage?: number
  onChanged?: (index: number) => void
  opacityRangeOut?: number[]
  scaleRangeOut?: number[]
  spaceBetween?: number
  textStyle?: TextStyle
}

const Viewport = <T extends {}>({
  allowFontScaling,
  containerStyle,
  discoverable,
  display,
  fontSize,
  index = 0,
  items,
  marginHorizontalPercentage,
  marginVerticalPercentage,
  onChanged,
  opacityRangeOut,
  scaleRangeOut,
  spaceBetween,
  textStyle,
}: ViewportProps<T>) => {
  console.log(`RENDER Viewport`)
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  // const [currentItemIndex, setCurrentItemIndex] = useState(index);

  const onCurrentIndexChanged = (newIndex: number) => {
    'worklet'
    // console.log(`onCurrentIndexChanged ${newIndex}`)
    // runOnJS(setCurrentItemIndex)(newIndex)
    if (onChanged !== undefined) {
      runOnJS(onChanged)(newIndex)
    }
  }

  // useEffect(() => {
  //   console.log(`Viewport effect controlled index ${index}`)
  //   if (onChanged !== undefined && index !== currentItemIndex) {
  //     setCurrentItemIndex(index)
  //     // onChanged(currentItemIndex)
  //   }
  // }, [index]);

  // useEffect(() => {
  //   console.log(`Viewport effect currentItemIndex ${currentItemIndex}`)
  //   if (onChanged !== undefined && index !== currentItemIndex) {
  //     // setCurrentItemIndex(index)
  //     onChanged(currentItemIndex)
  //   }
  // }, [currentItemIndex]);

  // const window = useWindowDimensions();
  // console.log(`WINDOW width ${window.width} height ${window.height}`)
  // console.log(`PICKER LAYOUT width ${layout?.width ?? 'null'} height ${layout?.height ?? 'null'}`)
  return (
    <View
      onLayout={({ nativeEvent: { layout } }: LayoutChangeEvent) => {
        console.log(`Viewport event x ${layout.x} y ${layout.y} width ${layout.width} height ${layout.height}`)
        setLayout(layout)
      }}
      style={[styles.child, {
        backgroundColor: 'transparent',
        // backgroundColor: 'blue',
      }]}
    >
      {layout && <>
        {/* {console.log(`width ${layout.width} height ${layout.height}`)} */}
        <Picker
          {...{
            allowFontScaling,
            containerStyle,
            currentItemIndex: index,
            discoverable,
            display,
            fontSize,
            height: layout.height,
            items,
            marginHorizontalPercentage,
            marginVerticalPercentage,
            onCurrentIndexChanged,
            opacityRangeOut,
            scaleRangeOut,
            spaceBetween,
            textStyle,
            width: layout.width,
          }}
        />
        {/* <View style={{ position: 'absolute', backgroundColor: 'red', width: 300, height: 1 }}>
        </View> */}
      </>}
    </View>
  )
}

const styles = StyleSheet.create({
  child: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Viewport
