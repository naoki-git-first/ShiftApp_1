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
            <View style={styles.icon}>
              <Text >画</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.profileText}>
            <Text>桑門秀典 さん</Text>
            <Text>ID: 0123</Text>
          </View>
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
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  icon: {
    width: 64,
    height: 64,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 12
  },
  profileText: {
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  checkShift: {
    backgroundColor: '#ff0000',
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  submitShift: {
    backgroundColor: '#00ff00',
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  editShift: {
    backgroundColor: '#0000ff',
    paddingVertical: 24,
    paddingHorizontal: 8
  }
})

export default Home
