// React
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
// EXPO
import { router, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
// FireStore
import { auth, db } from '../config'
import { doc, onSnapshot } from 'firebase/firestore'
// 独自コンポーネント
import { type tProfile } from './types/profile'
import List from '../components/List'
import LogOutButton from '../components/LogOutButton'
import Footer from '../components/Footer'

// プロフィール編集
const authProfile = (): void => { router.push('user/profile') }
// シフト確認
const checkShift = (): void => { router.push('shift/calendar') }
// シフト提出
const submitShift = (): void => { router.push('shift/ask_shift_list') }
// シフト編集
const editShift = (): void => { router.push('utility/shift_shop_list') }
// シフト募集
const wantedShift = (): void => { router.push('shift/create_ask_shift') }
// メンバー管理
const memberList = (): void => { router.push('utility/member_shop_list') }
// 店舗管理
const shopList = (): void => { router.push('shops/shop_list') }
// 加入申請
const applyToJoin = (): void => { router.push('application/join') }

const Home = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton /> }
    })
  }, [])

  const [profile, setProfile] = useState<tProfile | null>(null)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const userId = auth.currentUser.uid
    const ref = doc(db, 'users', userId)
    const unsubscribe = onSnapshot(ref, (profileDoc) => {
      if (profileDoc.exists()) {
        const {
          userName,
          mailAddress,
          password,
          position,
          storeIDs
        } = profileDoc.data() as tProfile
        setProfile({
          id: userId,
          userName,
          mailAddress,
          password,
          position,
          storeIDs
        })
      }
    })
    return unsubscribe
  }, [])
  // 役職によって表示するコンポーネントを変更するためのするための変数
  // const admin = profile?.position === '管理者'
  // const manager = profile?.position === '店長'
  // const worker = profile?.position === 'アルバイト'

  // // 全部表示
  const admin = true
  const manager = true
  const worker = true

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={authProfile}>
            <View style={styles.icon}>
              <Text >画</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.profileText}>
            <Text>{profile?.position}</Text>
            <Text>{profile?.userName} さん</Text>
          </View>
        </View>
        {/* アルバイト表示 */}
        {worker && <List text='シフト確認' onPress={checkShift} />}
        {worker && <List text='シフト提出' onPress={submitShift} />}
        {worker && <List text='店舗に参加する' onPress={applyToJoin} />}
        {/* 店長表示 */}
        {manager && <List text='シフト編集' onPress={editShift} />}
        {manager && <List text='シフト募集' onPress={wantedShift} />}
        {manager && <List text='メンバー管理' onPress={memberList} />}
        {/* 管理者表示 */}
        {admin && <List text='店舗管理' onPress={shopList} />}
        <StatusBar style="auto" />
      </View>
      <Footer position={profile.position} />
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
