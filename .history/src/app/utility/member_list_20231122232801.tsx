import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const profile = (): void => {
  router.push('user/profile')
}

const MemberList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.memberList} onPress={profile}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text>アルバイト</Text>
          <Text style={styles.nameText}>名前： </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
  memberList: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dddddd'
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: '#dddddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 12
  },
  nameText: {
    fontSize: 20
  }
})

export default MemberList
