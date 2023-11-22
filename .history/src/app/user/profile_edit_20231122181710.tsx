import { View, Text, SafeAreaView, StyleSheet, Picker } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const Profile = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.shopNameText}>店名</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.icon}>
          <Text>画</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.nameText}>名前： </Text>
          <TextInput style={styles.input}/>
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
    backgroundColor: '#ffffff'
    padding: 4
  },
  shopNameText: {
    fontSize: 32,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingHorizontal: 12,
    textAlign: 'center'
  },
  rowContainer: {
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
  nameText: {
    fontSize: 20
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#0000ff',
    borderRadius: 5,
    padding: 6,

  },
  role: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  roleText: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  branchText: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  mailText: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  passwordText: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  }
})

export default Profile