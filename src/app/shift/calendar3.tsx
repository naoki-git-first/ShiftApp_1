// npm install react-native-table-component
// 公式ドキュメント
// https://github.com/dohooo/react-native-table-component#api

import { useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, Animated, Dimensions, type LayoutChangeEvent, TouchableOpacity, Modal } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component'

const TableComponent = (): JSX.Element => {
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
  const cellHeight = windowHeight / 18
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
  const maxRow = 10 // 行の長さ
  const maxCol = 31 // 列の長さ
  // 行
  const tableHead = []
  for (let i = 1; i <= maxRow; i += 1) {
    tableHead.push(i)
  }
  // 列
  const tableTitle = []
  for (let i = 1; i <= maxCol; i += 1) {
    tableTitle.push(i)
  }
  // テーブルデータ
  const sampleData = []
  for (let i = 1; i <= maxCol; i += 1) {
    const rowData = []
    for (let j = 1; j <= maxRow; j += 1) {
      const x = i * j
      const xString = x.toString()
      rowData.push(xString)
    }
    sampleData.push(rowData)
  }
  // 各セルのwitdthとheight
  const widthArr: number[] = []
  for (let i = 1; i <= maxRow; i += 1) {
    widthArr.push(cellWidth)
  }
  const heightArr = []
  for (let i = 1; i <= maxCol; i += 1) {
    heightArr.push(cellHeight)
  }

  // セルを選択し、値を更新するモーダルのためのコード
  const [tableData, setTableData] = useState(sampleData)
  const [selectedRowIndex, setSelectedRowIndex] = useState(0)
  const [selectedCellIndex, setSelectedCellIndex] = useState(0)
  const [editedCellValue, setEditedCellValue] = useState('')
  const [toggleModal, setToggleModal] = useState(false)

  // Modalを開くと同時にタップしたセルの情報を取得
  const openEditorModal = (rowIndex: number, cellIndex: number, initialValue: string): void => {
    setSelectedRowIndex(rowIndex)
    setSelectedCellIndex(cellIndex)
    setEditedCellValue(initialValue)
    setToggleModal(true)
  }

  // tableDataを更新
  const saveCellValue = (cellIndex: number): void => {
    if (selectedRowIndex !== null) {
      const newData = [...tableData]
      newData[selectedRowIndex][cellIndex] = editedCellValue // Assuming the editable cell is in the third column
      setTableData(newData)
      // 以下、値の初期化
      setSelectedRowIndex(0)
      setSelectedCellIndex(0)
      setEditedCellValue('')
      // Modalを閉じる
      setToggleModal(false)
    }
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
              <View onLayout={handleLayout} style={{ zIndex: 1 }}>
                <Table>
                  <Rows
                    // dataを一つずつ取り出しTouchableOpacityを付与してRowに配置
                    data={tableData.map((rowData, rowIndex) =>
                      rowData.map((cellData, cellIndex) => (
                        <TouchableOpacity
                          key={cellIndex}
                          onPress={() => { openEditorModal(rowIndex, cellIndex, cellData) }}
                          style={styles.cell}
                        >
                          <Text>{cellData}</Text>
                        </TouchableOpacity>
                      ))
                    )}
                    widthArr={widthArr}
                    style={[styles.row, { height: cellHeight }]}
                  />
                </Table>
              </View>
            </TableWrapper>

          </TableWrapper>
        </ScrollView>
      </ScrollView>
      {/* Editable Cell Modal */}
      <Modal visible={toggleModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            value={editedCellValue}
            onChangeText={(text) => { setEditedCellValue(text) }}
          />
          <TouchableOpacity style={styles.modalButton} onPress={() => { saveCellValue(selectedCellIndex) }}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  singleHead: { backgroundColor: '#f1f8ff' },
  head: { backgroundColor: '#f1f8ff' },
  title: { backgroundColor: '#f1f8ff' },
  row: { backgroundColor: '#ffffe0' },
  text: { textAlign: 'center' },
  cell: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalInput: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5
  }
})

export default TableComponent
