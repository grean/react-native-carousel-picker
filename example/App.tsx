import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

// import Picker from '@grean/react-native-carousel-picker';
import Picker from '../src/index';
import Data from './Data'

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 10,
}

const carouPicker = {
  // borderWidth: 0,
  // borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.8)',
  borderRadius: 50,
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderLeftWidth: 0,
  borderRightWidth: 0,
}
const carouPicker2 = {
  // borderWidth: 0,
  borderWidth: 2,
  borderColor: 'rgba(255,255,255,0.8)',
  borderRadius: 50,
  borderBottomWidth: 0,
  borderTopWidth: 0,
}


export default function App() {
  const currentItemIndex = 3
  const [itemIndex, setItemIndex] = useState(currentItemIndex);

  const onChanged = (itemIndex: number) => {
    setItemIndex(itemIndex)
    console.log(`onChanged itemIndex ${itemIndex}`)
  }

  let [fontsLoaded] = useFonts({
    // 'dancingVar': require('./fonts/DancingScript-VariableFont_wght.ttf'),
    'cookie': require('./fonts/Cookie-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null
  }

  const items = Data.map(item => item.title)

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.picker1}>
        <Picker
          {...{
            items,
            currentItemIndex,
            onChanged,
            marginVerticalPercentage: 0,
            marginHorizontalPercentage: 0.05,
            display: "TOP_BOTTOM",
            opacityRangeOut: [0, 0.6, 1, 0.6, 0],
            scaleRangeOut: [0, 0.6, 1, 0.6, 0],
            spaceBetween: 1 / 1.5,
            textStyle: {
              fontFamily: 'cookie',
              // padding: 10,
              ...textShadow
            },
            fontSize: 200,
          }}
        />
      </View>
      <View style={styles.picker2}>
        <Picker
          {...{
            containerStyle: {
              // backgroundColor: 'green',
              ...carouPicker,
              // textShadowColor: 'rgba(0, 0, 0, 0.75)',
              // textShadowOffset: { width: 3, height: 3 },
              // textShadowRadius: 10,
            },
            currentItemIndex,
            display: "TOP_BOTTOM",
            fontSize: 200,
            items,
            marginHorizontalPercentage: 0.1,
            marginVerticalPercentage: 0.2,
            // marginHorizontalPercentage: 0,
            // marginVerticalPercentage: 0,
            onChanged,
            opacityRangeOut: [0, 0.6, 1, 0.6, 0],
            scaleRangeOut: [0, 0.6, 1, 0.6, 0],
            spaceBetween: 1 / 1.5,
            textStyle: {
              fontFamily: 'cookie',
              // padding: 10,
              ...textShadow
            },
          }}
        />
      </View>
      <View style={styles.picker3}>
        <Picker
          {...{
            containerStyle: {
              // backgroundColor: 'green',
              ...carouPicker2,
              // textShadowColor: 'rgba(0, 0, 0, 0.75)',
              // textShadowOffset: { width: 3, height: 3 },
              // textShadowRadius: 10,
            },
            currentItemIndex,
            display: "CENTER_ONLY",
            fontSize: 400,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            marginHorizontalPercentage: 0.3,
            marginVerticalPercentage: 0.22,
            // marginHorizontalPercentage: 0,
            // marginVerticalPercentage: 0,
            onChanged,
            // opacityRangeOut: [0, 0.6, 1, 0.6, 0],
            // scaleRangeOut: [0, 0.6, 1, 0.6, 0],
            spaceBetween: 1 / 1.5,
            textStyle: {
              fontFamily: 'cookie',
              // padding: 10,
              ...textShadow
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picker1: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  picker2: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
  },
  picker3: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
});
