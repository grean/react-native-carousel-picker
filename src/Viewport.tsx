import React, { useEffect, useState } from 'react'
import { View, Text, LayoutChangeEvent, StyleSheet } from 'react-native'
import { runOnJS } from 'react-native-reanimated'

// import Label from './Label'
import Picker, { ItemsType } from './Picker'

type ParentLayout = {
  width: number
  height: number
}
type TextShadowOffsetType = {
  width: number
  height: number
}
export type TextStyleType = {
  fontFamily?: string
  // fontSize?: number
  backgroundColor?: string
  color?: string
  textShadowColor?: string
  textShadowOffset?: TextShadowOffsetType
  textShadowRadius?: number
}
export type ContainerStyleType = {
  backgroundColor?: string
  borderWidth?: number
  borderColor?: string
  borderRadius?: number
  borderBottomWidth?: number
  borderTopWidth?: number
}

interface ViewportProps {
  allowFontScaling?: boolean
  items: ItemsType
  currentItemIndex: number
  marginVerticalPercentage: number
  marginHorizontalPercentage: number
  onChanged: (index: number) => void
  display: "TOP_BOTTOM" | "CENTER_ONLY"
  opacityRangeOut?: number[]
  scaleRangeOut?: number[]
  spaceBetween?: number
  textStyle?: TextStyleType
  containerStyle?: ContainerStyleType
  fontSize: number
}

function Viewport({
  allowFontScaling,
  items,
  currentItemIndex,
  onChanged,
  marginVerticalPercentage = 0,
  marginHorizontalPercentage = 0,
  display,
  opacityRangeOut,
  scaleRangeOut,
  spaceBetween,
  textStyle,
  containerStyle,
  fontSize,
}: ViewportProps) {
  const [layout, setLayout] = useState<ParentLayout | null>(null);
  const [itemIndex, setItemIndex] = useState(currentItemIndex);

  const onIndexChanged = (index: number) => {
    'worklet'
    console.log(`setValue done ${index}`)
    runOnJS(setItemIndex)(index)
  }

  useEffect(() => {
    onChanged(itemIndex)
  }, [itemIndex]);

  // const window = useWindowDimensions();
  // console.log(`WINDOW width ${window.width} height ${window.height}`)
  // console.log(`PICKER LAYOUT width ${layout?.width ?? 'null'} height ${layout?.height ?? 'null'}`)
  return (
    <View
      onLayout={({ nativeEvent: { layout: { x, y, width, height } } }: LayoutChangeEvent) => {
        // console.log(`PICKER event x ${x} y ${y} width ${width} height ${height}`)
        setLayout({ width, height })
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
            width: layout.width,
            height: layout.height,
            // width,
            // height,
            display,
            spaceBetween,
            opacityRangeOut,
            scaleRangeOut,
            items,
            itemIndex,
            onIndexChanged,
            marginVerticalPercentage,
            marginHorizontalPercentage,
            textStyle,
            containerStyle,
            fontSize,
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
