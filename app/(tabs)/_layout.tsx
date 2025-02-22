import { createMaterialTopTabNavigator, 
    MaterialTopTabNavigationOptions, 
    MaterialTopTabNavigationEventMap } 
from '@react-navigation/material-top-tabs'
import React from 'react'
import { withLayoutContext } from 'expo-router'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'


const { Navigator } = createMaterialTopTabNavigator()
export  const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions, 
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator)

const Layout = () => {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen name='index' options={{ title: 'Home', tabBarLabelStyle: { fontWeight: 'bold' } }} />
      <MaterialTopTabs.Screen name='Scanner' options={{ title: 'Scanner', tabBarLabelStyle: { fontWeight: 'bold' } }} />
    </MaterialTopTabs>
  )
}

export default Layout