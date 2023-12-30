import { router } from 'expo-router'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const authProfile = (): void => { // プロフィール編集
  router.push('user/profile')
}
const checkShift = (): void => { // シフト確認
  router.push('shift/calendar')
}
const submitShift = (): void => { // シフト提出
  router.push('shift/ask_shift_list')
}
const editShift = (): void => { // シフト編集
  router.push('utility/shift_shop_list')
}
const wantedShift = (): void => { // シフト募集
  router.push('shift/create_ask_shift')
}
const memberList = (): void => { // メンバー管理
  router.push('utility/member_shop_list')
}
const shopList = (): void => { // 店舗管理
  router.push('shops/shop_list')
}
const applyToJoin = (): void => { // 加入申請
  router.push('application/join')
}

interface Props {
  position: string
}

const Footer = ({ position }: Props): JSX.Element => {
  return (
    <View style={styles.view}>
      {/* アルバイト表示 */}
      { position === 'アルバイト' && (
        <View style={styles.container}>
          <TouchableOpacity onPress={checkShift} ><Text style={styles.item}>シフト確認</Text></TouchableOpacity>
          <TouchableOpacity onPress={submitShift} ><Text style={styles.item}>シフト提出</Text></TouchableOpacity>
          <TouchableOpacity onPress={applyToJoin} ><Text style={styles.item}>店舗に参加する</Text></TouchableOpacity>
          <TouchableOpacity onPress={authProfile} ><Text style={styles.item}>プロフィール</Text></TouchableOpacity>
        </View>
      )}
      {/* 店長表示 */}
      { position === '店長' && (
        <View style={styles.container}>
          <TouchableOpacity onPress={editShift} ><Text style={styles.item}>シフト編集</Text></TouchableOpacity>
          <TouchableOpacity onPress={wantedShift} ><Text style={styles.item}>シフト募集</Text></TouchableOpacity>
          <TouchableOpacity onPress={memberList} ><Text style={styles.item}>メンバー管理</Text></TouchableOpacity>
          <TouchableOpacity onPress={authProfile} ><Text style={styles.item}>プロフィール</Text></TouchableOpacity>
        </View>
      )}
      {/* 管理者表示 */}
      { position === '管理者' && (
        <View style={styles.container}>
          <TouchableOpacity onPress={shopList} ><Text style={styles.item}>店舗管理</Text></TouchableOpacity>
          <TouchableOpacity onPress={authProfile} ><Text style={styles.item}>プロフィール</Text></TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 92,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#000000',
    backgroundColor: '#dd0000'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  item: {
    fontWeight: 'bold'
  }
})

export default Footer
