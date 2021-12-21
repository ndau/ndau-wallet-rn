/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from '../screens/Settings'

const Stack = createNativeStackNavigator()
const SettingsStack = ()  => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

export default SettingsStack
