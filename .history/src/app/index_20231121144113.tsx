import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const Index = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View><Text>シフト提出</Text></View>
      <View><Text>シフト編集</Text></View>
      <View><Text>シフト確認</Text></View>
      <View><Text>その他</Text></View>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default Index
