import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const EditShift = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>編集</Text>
      </View>
    </SafeAreaView>
  )
}

export default EditShift
