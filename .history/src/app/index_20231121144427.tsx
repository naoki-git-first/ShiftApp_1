import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const Index = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity>
          <Text>シフト確認</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>シフト提出</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>シフト編集</Text>
        </TouchableOpacity>
      </View>
      <View>
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
