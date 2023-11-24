import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import CircleButton from '../../components/CircleButton'

const profileEdit = (): void => {
  router.push('user/profile_edit')
}

const Profile = (): JSX.Element => {
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
          <Text style={styles.text}>名前： </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>役職：</Text>
      </View>
      <View>
        <Text style={styles.text}>店舗：</Text>
      </View>
      <View>
        <Text style={styles.text}>メールアドレス：</Text>
      </View>
      <View>
        <Text style={styles.text}>パスワード：</Text>
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
