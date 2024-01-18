import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Link } from 'expo-router'
import { type Pre } from '../app/types/pre-shift'

interface Props {
  onPress?: () => void
  pre: Pre
}

const AskShiftList = (props: Props): JSX.Element | null => {
  const { pre, onPress } = props
  const { startDate, endDate } = pre
  if (startDate === null || endDate === null) { return null }
  return (
    <Link
    href={{ pathname: 'shift/submit_form', params: { id: pre.id } }}
    asChild
  >
      <TouchableOpacity style={styles.listContainer} onPress={onPress}>
        <Text>何ちゃら店</Text>
        <Text style={styles.text}>{startDate}~{endDate}</Text>
      </TouchableOpacity>
    </Link>
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

export default AskShiftList
