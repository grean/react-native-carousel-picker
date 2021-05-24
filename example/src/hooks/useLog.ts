
import { Platform } from 'react-native'


export default function useLog(text: string, platform: string = 'android') {
  if (platform === Platform.OS) {
    console.log(text)
  }
}