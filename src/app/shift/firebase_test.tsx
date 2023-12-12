import { Button, View } from 'react-native'
import { collection, addDoc } from 'firebase/firestore'

import { db } from '../../config'

const handlePress = (): void => {
  addDoc(collection(db, 'test'), {
    Text: 'test'
  })
    .then(() => {
      console.log('success')
    })
    .catch((error) => {
      console.log(error)
    })
}

const firebasetest = (): JSX.Element => {
  return (
    <View>
        <Button title="Add to Firestore" onPress={handlePress}/>
    </View>
  )
}

export default firebasetest
