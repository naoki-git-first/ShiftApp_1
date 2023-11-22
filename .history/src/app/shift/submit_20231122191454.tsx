import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router'

const handlePress = (): void => {
  router.push('shift/home')
}
const SubmitShift = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View>
        <Text style={styles.title}>募集中のシフト</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 32
  }
})

export default SubmitShift
