import { View, Text, SafeAreaView, StyleSheet } from "react-native"

const Profile = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>アイコン</Text>
      </View>
      <View>
        <Text>名前：</Text>
      </View>
      <View>
        <Text>役職：</Text>
      </View>
      <View>
        <Text>店舗：</Text>
      </View>
      <View>
        <Text>メールアドレス：</Text>
      </View>
      <View>
        <Text>パスワード：</Text>
      </View>
    </SafeAreaView>
  )
}

export Profile
