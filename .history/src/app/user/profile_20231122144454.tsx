import { View, Text, SafeAreaView, StyleSheet } from 'react-native'

const Profile = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.shopNameText}>店名</Text>
      </View>
      <View >
        <Text >アイコン</Text>
      </View>
      <View>
        <Text style={styles.nameText}>名前：</Text>
      </View>
      <View>
        <Text style={styles.roleText}>役職：</Text>
      </View>
      <View>
        <Text style={styles.branchText}>店舗：</Text>
      </View>
      <View>
        <Text style={styles.mailText}>メールアドレス：</Text>
      </View>
      <View>
        <Text style={styles.passwordText}>パスワード：</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ff0000'
  },
  shopNameText: {
    fontSize: 36
  },
  nameText: {
    fontSize: 24
  },
  roleText: {
    fontSize: 24
  },
  branchText: {
    fontSize: 24
  },
  mailText: {
    fontSize: 24
  },
  passwordText: {
    fontSize: 24
  }
})

export default Profile
