import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const Other = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>その他</Text>
      </View>
    </SafeAreaView>
  )
}

export default Other
