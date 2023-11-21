import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const SubmitShift = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>提出</Text>
      </View>
    </SafeAreaView>
  )
}

export default SubmitShift
