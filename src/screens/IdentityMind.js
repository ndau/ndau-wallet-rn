import React, { Component } from 'react'

class IdentityMind extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const identitymindHtml = require('../html/identitymind.html')
    return <WebView source={identitymindHtml} style={{ flex: 1 }} />
  }
}

export default IdentityMind
