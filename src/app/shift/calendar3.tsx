// npm install react-native-table-component
// npm i --save-dev @types/react-native-table-component
// 公式ドキュメント
// https://github.com/dohooo/react-native-table-component#api

import { useRef, useState } from 'react'
import { StyleSheet, View, ScrollView, Animated, Dimensions, type LayoutChangeEvent } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component'

const calendar3 = (): JSX.Element => {
  // <Rows data={tableData}>（表本体）のheight,widthを取得
  const [elementSize, setElementSize] = useState({ height: 0, width: 0 })
  const handleLayout = (event: LayoutChangeEvent): void => {
    const { height, width } = event.nativeEvent.layout
    setElementSize({ height, width })
  }

  // ウィンドウのサイズを取得
  // セルの大きさとアニメーションの範囲を定義
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const cellWidth = windowWidth / 6
  const cellHeight = windowHeight / 10
  const animaMaxWidth = cellWidth * 32
  const animaMaxHeight = elementSize.height

  // 縦と横のバーのスクロールを固定する関数
  const scrollX = useRef(new Animated.Value(0)).current
  const handleScrollX = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  )
  const translateX = scrollX.interpolate({
    inputRange: [0, animaMaxWidth], // スクロールが0からanimaMaxWidthの間で
    outputRange: [0, animaMaxWidth], // translateYを0からanimaMaxWidthに変化させる
    extrapolate: 'clamp' // inputRange外の値はclamp（範囲外の値を端に固定）する
  })

  const scrollY = useRef(new Animated.Value(0)).current
  const handleScrollY = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )
  const translateY = scrollY.interpolate({
    inputRange: [0, animaMaxHeight], // スクロールが0からanimaMaxHeightの間で
    outputRange: [0, animaMaxHeight], // translateYを0からanimaMaxHeightに変化させる
    extrapolate: 'clamp' // inputRange外の値はclamp（範囲外の値を端に固定）する
  })

  // テーブルの中身を作成
  const max = 20 // 行列の長さ
  // 行
  const tableHead = []
  for (let i = 1; i <= max; i += 1) {
    tableHead.push(i)
  }
  // 列
  const tableTitle = []
  for (let i = 1; i <= max; i += 1) {
    tableTitle.push(i)
  }
  // テーブルデータ
  const tableData = []
  for (let i = 1; i <= max; i += 1) {
    const rowData = []
    for (let j = 1; j <= max; j += 1) {
      const x = i * j
      rowData.push(x)
    }
    tableData.push(rowData)
  }
  // 各セルのwitdthとheight
  const widthArr: number[] = []
  for (let i = 1; i <= max; i += 1) {
    widthArr.push(cellWidth)
  }
  const heightArr = []
  for (let i = 1; i <= max; i += 1) {
    heightArr.push(cellHeight)
  }

  // borderStyle={{ borderWidth: 1 }}
  return (
    <View style={styles.container}>
      <ScrollView horizontal onScroll={handleScrollX} scrollEventThrottle={16}>
        <ScrollView onScroll={handleScrollY} scrollEventThrottle={16}>
          <TableWrapper style={{ position: 'relative' }}>

            <Animated.View style={{ transform: [{ translateY }], zIndex: 2 }}>
              <TableWrapper style={{ flexDirection: 'row', position: 'relative' }}>
                <Animated.View style={{ transform: [{ translateX }], zIndex: 2 }}>
                  <Table>
                    <Cell data='' style={[styles.singleHead, { height: cellHeight, width: cellWidth }]}/>
                  </Table>
                </Animated.View>
                <Table style={{ zIndex: 1 }}>
                  <Row data={tableHead} widthArr={widthArr} style={[styles.head, { height: cellHeight }]} textStyle={styles.text}/>
                </Table>
              </TableWrapper>
            </Animated.View>

            <TableWrapper style={{ flexDirection: 'row', position: 'relative', zIndex: 1 }}>
              <Animated.View style={{ transform: [{ translateX }], zIndex: 2 }}>
                <Table>
                  <Col data={tableTitle} heightArr={heightArr} style={[styles.title, { width: cellWidth }]} textStyle={styles.text}/>
                </Table>
              </Animated.View>
              <View onLayout={handleLayout}>
                <Table style={{ zIndex: 1 }}>
                  <Rows data={tableData} widthArr={widthArr} style={[styles.row, { height: cellHeight }]} textStyle={styles.text}/>
                </Table>
              </View>
            </TableWrapper>

          </TableWrapper>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  singleHead: { backgroundColor: '#f1f8ff' },
  head: { backgroundColor: '#f1f8ff' },
  title: { backgroundColor: '#f1f8ff' },
  row: { backgroundColor: '#ffffe0' },
  text: { textAlign: 'center' }
})

export default calendar3
