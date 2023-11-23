import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

const MemberList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.memberList}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text>アルバイト</Text>
          <Text style={styles.nameText}>名前： </Text>
        </View>
      </View>
      <View style={styles.memberList}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text>アルバイト</Text>
          <Text style={styles.nameText}>名前： </Text>
        </View>
      </View>
      <View style={styles.memberList}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text>アルバイト</Text>
          <Text style={styles.nameText}>名前： </Text>
        </View>
      </View>
      <View style={styles.memberList}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
          <Text>アルバイト</Text>
          <Text style={styles.nameText}>名前： </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  memberList: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddddddd'
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
