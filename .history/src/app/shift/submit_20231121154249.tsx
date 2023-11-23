import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const SubmitShift = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
      </View>
    </SafeAreaView>
  )
}

export default SubmitShift
