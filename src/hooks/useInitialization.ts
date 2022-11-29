import React,{ useEffect, useState } from 'react'

import { createSignClient } from '../utils/WalletConnectUtil'

export default function useInitialization() {
  const [ready, setReady] = useState(false)

  async function onInitializeSign() {
    // await createSignClient()
    setReady(true)
  }

  useEffect(() => {
    onInitializeSign()
  }, [])

  return ready
}
