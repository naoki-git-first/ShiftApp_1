// React
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
// EXPO
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// FireStore
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../../config'
// 独自コンポーネント
import CircleButton from '../../components/CircleButton'
import { type tProfile } from '../types/profile'

// プロフィール画面へ遷移
const profileEdit = (): void => {
  router.push('user/profile_edit')
}
// プロフィール
const Profile = (): JSX.Element => {
  // const id = String(useLocalSearchParams().id)
  const [profile, setProfile] = useState<tProfile | null>(null)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const userId = auth.currentUser.uid
    // CurrentUserのドキュメント参照
    const ref = doc(db, 'users', userId)
    const unsubscribe = onSnapshot(ref, (profileDoc) => {
      if (profileDoc.exists()) {
        const {
          userName,
          mailAddress,
          password,
          position
        } = profileDoc.data() as tProfile
        setProfile({
          id: profileDoc.id,
          userName,
          mailAddress,
          password,
          position
        })
      }
    })
    return unsubscribe
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.shopNameText}>店名</Text>
      </View>
      <View style={styles.topBrock}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text style={styles.text}>名前：{profile?.userName}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>役職：{profile?.position}</Text>
      </View>
      <View>
        <Text style={styles.text}>店舗：</Text>
      </View>
      <View>
        <Text style={styles.text}>メールアドレス：{profile?.mailAddress}</Text>
      </View>
      <View>
        <Text style={styles.text}>パスワード：{profile?.password}</Text>
      </View>
      <CircleButton buttonColor='#22ff22' textColor='white' onPress={profileEdit}>
        <MaterialCommunityIcons name='account-edit' size={40} />
      </CircleButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  shopNameText: {
    fontSize: 32,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingHorizontal: 12,
    textAlign: 'center'
  },
  topBrock: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center'
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
  text: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  }
})

export default Profile
