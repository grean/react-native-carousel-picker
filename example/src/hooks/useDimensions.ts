
import { useEffect, useState } from 'react'
import { Dimensions, ScaledSize, PixelRatio } from 'react-native'
import useLog from './useLog';

type DimensionsType = {
  window: ScaledSize
  screen: ScaledSize
}

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  })

  const isLandscape = dimensions.window.height < dimensions.window.width;

  useEffect(() => {
    useLog(`useEffect Dimensions`)
    let timeoutId: any = null;
    const onChange = (dims: DimensionsType) => {

      const { height, width } = dims.window
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => {
        console.log(`onChange ${height} ${width}`)
        setDimensions(dims)
      }, 10);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  return { dimensions, isLandscape }
}