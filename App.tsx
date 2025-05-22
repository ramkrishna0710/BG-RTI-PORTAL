import React from 'react'
import Navigation from './src/navigation/Navigation';
import '@unistyles/unistyles'
import { RootSiblingParent } from 'react-native-root-siblings';
import { AuthProvider } from './src/contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <RootSiblingParent>
        <Navigation />
      </RootSiblingParent>
    </AuthProvider>
  )
}

export default App