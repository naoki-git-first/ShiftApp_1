import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const ShopInfo = (): JSX.Element => {
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
  text: {
    fontSize: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12
  }
})

export default ShopInfo
