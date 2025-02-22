import { createMaterialTopTabNavigator, 
    MaterialTopTabNavigationOptions, 
    MaterialTopTabNavigationEventMap } 
from '@react-navigation/material-top-tabs'
import { View, Text } from 'react-native'
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
        <MaterialTopTabs.Screen name='index' options={{title: 'Home'}}/>
    </MaterialTopTabs>
  )
}

export default Layout