import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const Index = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.checkShift}>
        <TouchableOpacity>
          <Text>シフト確認</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitShift}>
        <TouchableOpacity>
          <Text>シフト提出</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editShift}>
        <TouchableOpacity>
          <Text>シフト編集</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.other}>
        <TouchableOpacity>
          <Text>その他</Text>
        </TouchableOpacity>
      </View>
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
