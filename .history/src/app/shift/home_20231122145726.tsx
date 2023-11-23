import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const profile = (): void => {
  router.push('user/profile')
}
const checkShift = (): void => {
  router.push('shift/check')
}
const submitShift = (): void => {
  router.push('shift/submit')
}
const editShift = (): void => {
  router.push('shift/edit')
}

const Home = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={profile}>
            <Text>桑門秀典 さん</Text>
            <Text>ID: 0123 アルバイト</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkShift}>
          <TouchableOpacity onPress={checkShift}>
            <Text>シフト確認</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitShift}>
          <TouchableOpacity onPress={submitShift}>
            <Text>シフト提出</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editShift}>
          <TouchableOpacity onPress={editShift}>
            <Text>シフト編集</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fffffff'
  },
  container: {
    flex: 1
  },
  profile: {
    flex: 1,
    backgroundColor: '#ffff00',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  checkShift: {
    flex: 1,
    backgroundColor: '#ff0000',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  submitShift: {
    flex: 1,
    backgroundColor: '#00ff00',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  editShift: {
    flex: 1,
    backgroundColor: '#0000ff',
    fontSize: 34,
    paddingVertical: 24,
    paddingHorizontal: 8
  }
})

export default Home
