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
const memberList = (): void => {
  router.push('utility/member_list')
}
const shopList = (): void => {
  router.push('utility/shop_list')
}
const wantedShift = (): void => {
  router.push('utility/wanted_shift')
}
// const  = (): void => {
//   router.push('')
// }

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
          <TouchableOpacity onPress={checkShift}>
        <View style={styles.checkShift}>
            <Text>シフト確認   ＞</Text>
        </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitShift}>
        <View style={styles.submitShift}>
            <Text>シフト提出   ＞</Text>
        </View>
          </TouchableOpacity>
        <View style={styles.editShift}>
          <TouchableOpacity onPress={editShift}>
            <Text>シフト編集   ＞</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editShift}>
          <TouchableOpacity onPress={memberList}>
            <Text>メンバー管理   ＞</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editShift}>
          <TouchableOpacity onPress={shopList}>
            <Text>店舗管理   ＞</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editShift}>
          <TouchableOpacity onPress={wantedShift}>
            <Text>シフト募集   ＞</Text>
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
    flex: 1,
    backgroundColor: '#ffffff'
  },
  profile: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  icon: {
    width: 64,
    height: 64,
    backgroundColor: '#dddddd',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 12
  },
  profileText: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  checkShift: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  submitShift: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 8
  },
  editShift: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 8
  }
})

export default Home
