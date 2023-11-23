import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#ff00ff'
    },
    headerTitle: 'Shift App',
    headerBackTitle: 'Back',
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold'
    }
  }}/>
}

export default Layout
