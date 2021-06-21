import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';

// import Picker from '@grean/react-native-carousel-picker';
import Picker from '../src/index';
import Data from './Data'

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: 3, height: 3 },
  textShadowRadius: 10,
}

export default function App() {
  const currentItemIndex = 3
  const [itemIndex, setItemIndex] = useState(currentItemIndex);

  const onChanged = (index: number) => {
    setItemIndex(index)
    console.log(`onChanged index ${index}`)
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={styles.picker}>
        <Picker
          {...{
            items,
            index: itemIndex,
            onChanged,
            marginVerticalPercentage: 0,
            marginHorizontalPercentage: 0.05,
            display: "TOP_BOTTOM",
            opacityRangeOut: [0, 0.6, 1, 0.6, 0],
            scaleRangeOut: [0, 0.6, 1, 0.6, 0],
            spaceBetween: 1 / 1.75,
            textStyle: {
              fontFamily: 'cookie',
              paddingVertical: 10,
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
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.5)',
              borderRadius: 50,
              // textShadowColor: 'rgba(0, 0, 0, 0.75)',
              // textShadowOffset: { width: 3, height: 3 },
              // textShadowRadius: 10,
            },
            itemIndex,
            display: "TOP_BOTTOM",
            // discoverable: false,
            fontSize: 160,
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
              padding: 20,
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
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.8)',
              borderRadius: 50,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              // textShadowColor: 'rgba(0, 0, 0, 0.75)',
              // textShadowOffset: { width: 3, height: 3 },
              // textShadowRadius: 10,
            },
            itemIndex,
            display: "CENTER_ONLY",
            discoverable: false,
            fontSize: 400,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            marginHorizontalPercentage: 0.3,
            marginVerticalPercentage: 0.22,
            onChanged,
            spaceBetween: 1 / 1.5,
            textStyle: {
              fontFamily: 'cookie',
              // padding: 0,
              ...textShadow
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  picker: {
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
