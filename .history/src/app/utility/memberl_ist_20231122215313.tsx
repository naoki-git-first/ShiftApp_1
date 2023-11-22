import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

const MemberList = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBrock}>
        <View style={styles.icon}>
          <Text >画</Text>
        </View>
        <View>
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
  nameText: {
    fontSize: 20
  }
})

export default MemberList
