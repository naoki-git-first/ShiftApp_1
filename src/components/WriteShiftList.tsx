import { Text, View, TouchableOpacity } from 'react-native'
// import { type inArrayMap } from '../app/types/in-array-map'
import { type Pre } from '../app/types/pre-shift'
// import { Link } from 'expo-router'

interface Props {
  onPress?: () => void
  // ask: inArrayMap
  pre: Pre
}

const WriteShiftList = (props: Props): JSX.Element | null => {
  const { onPress, ask, pre } = props
  // const { userID, start, end} = ask
  const { submitted } = pre
  if (submitted === null) { return null }
  // const stringStart = start.toDate().toISOString()
  return (
      <TouchableOpacity onPress={onPress}>
        <Text>{submitted}</Text>
      </TouchableOpacity>
  )
}

export default WriteShiftList
