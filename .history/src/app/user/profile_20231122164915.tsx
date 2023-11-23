import { View, Text, SafeAreaView, StyleSheet } from 'react-native'

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
          <Text style={styles.nameText}>名前： </Text>
        </View>
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
  shopNameText: {
    fontSize: 36
  },
  nameText: {
    fontSize: 20
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
