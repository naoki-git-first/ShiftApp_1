import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const EditShop = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.text}>店舗名：</Text>
      </View>
      <View>
        <Text style={styles.text}>店長：</Text>
      </View>
      <View>
        <Text style={styles.text}>住所：</Text>
      </View>
      <View>
        <Text style={styles.text}>営業日：</Text>
      </View>
      <View>
        <Text style={styles.text}>定休日：</Text>
      </View>
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

export default EditShop
