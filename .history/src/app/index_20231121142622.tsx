import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const Index = (): JSX.Element => {
  return (
    <View>
      <View><Text>シフト提出</Text></View>
      <View><Text>シフト編集</Text></View>
      <View><Text>シフト確認</Text></View>
      <View><Text>その他</Text></View>
      <StatusBar style="auto" />
    </View>
  )
}

export default Index
