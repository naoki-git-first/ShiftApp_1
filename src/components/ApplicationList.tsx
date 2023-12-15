import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { type Application } from '../app/types/application'

// import { Link } from 'expo-router'

interface Props {
  onPress?: () => void
  application: Application
}

const ApplicationList = (props: Props): JSX.Element | null => {
  const { application, onPress } = props
  const { storeID, userID, userName } = application
  if (userName === null) { return null }
  return (
  //   <Link
  //   href={{ pathname: 'shops/shop_info', params: { id: shop.id } }}
  //   asChild
  // >
      <TouchableOpacity style={styles.listContainer} onPress={onPress}>
        <Text style={styles.text}>{userName}さんの加入申請</Text>
      </TouchableOpacity>
  // </Link>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: 'center'
  },
  listContainer: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 12
  }
})

export default ApplicationList
