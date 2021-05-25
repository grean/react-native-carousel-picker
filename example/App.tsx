import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

// import Picker from '@grean/react-native-carousel-picker';
import Picker from '../src/index';
import Data from './Data'

export default function App() {



  const currentItemIndex = 3
  const [itemIndex, setItemIndex] = useState(currentItemIndex);
  const display = "TOP_BOTTOM"
  // const spaceBetween = 0
  const spaceBetween = 1 / 2.25
  const opacityRangeOut = [0, 0.6, 1, 0.6, 0]
  const scaleRangeOut = [0, 0.6, 1, 0.6, 0]
  const items = Data.map(item => item.title)
  const marginVerticalPercentage = 0
  // const marginVerticalPercentage = 0.2
  // const marginVerticalPercentage = 0
  // const marginVerticalPercentage = 0.2
  // const marginVerticalPercentage = 0.3
  const marginHorizontalPercentage = 0
  // const marginHorizontalPercentage = 0.05
  const fontSize = 200

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

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.item}>lol</Text>
      </View>
      <View style={styles.picker}>
        <Picker
          {...{
            items,
            currentItemIndex,
            onChanged,
            marginVerticalPercentage,
            marginHorizontalPercentage,
            display,
            opacityRangeOut,
            scaleRangeOut,
            spaceBetween,
            textStyle: {
              fontFamily: 'cookie',
              // padding: 10,
              // ...textShadow
            },
            containerStyle: {
              // backgroundColor: 'green',
              // ...carouPicker,
              // textShadowColor: 'rgba(0, 0, 0, 0.75)',
              // textShadowOffset: { width: 3, height: 3 },
              // textShadowRadius: 10,
            },
            fontSize,
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.item}>lol</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
  },
  item: {
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  }
});
