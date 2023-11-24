import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import List from '../../components/List'
import { useEffect } from 'react'
import LogOutButton from '../../components/LogOutButton'

const logOut = (): void => {
  router.replace('auth/log_in')
}

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
  router.push('utility/shift_shop_list')
}
const memberList = (): void => {
  router.push('utility/member_shop_list')
}
const shopList = (): void => {
  router.push('utility/shop_list')
}
const wantedShift = (): void => {
  router.push('utility/wanted_shift')
}

const Home = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton onPress={logOut}/> }
    })
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <List text='シフト確認' onPress={checkShift} />
        <List text='シフト提出' onPress={submitShift} />
        <List text='シフト編集' onPress={editShift} />
        <List text='メンバー管理' onPress={memberList} />
        <List text='店舗管理' onPress={shopList} />
        <List text='シフト募集' onPress={wantedShift} />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
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
  }
})

export default Home
