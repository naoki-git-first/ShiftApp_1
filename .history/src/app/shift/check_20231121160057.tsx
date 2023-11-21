import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const CheckShift = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>確認</Text>
      </View>
    </SafeAreaView>
  )
}

export default CheckShift
