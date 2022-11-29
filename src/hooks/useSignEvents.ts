
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { SignClientTypes } from '@walletconnect/types'
import React, { useEffect } from 'react'

import SessionBloc from '../blocs/SessionBloc'
import { createSignClient, Socket } from '../utils/WalletConnectUtil'
// import { signClient } from '../utils/WalletConnectUtil'

// export default function useSignEventHandler() {
// const navigation = useNavigation<NativeStackNavigationProp<any>>()


    

//     console.log('data.......return ')

//    return () => {
//      console.log('data.......return ')
   
//     }
//   }, [])
// }
