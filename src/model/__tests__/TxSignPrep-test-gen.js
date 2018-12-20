// This is a sample of the kind of tests we want the go code to generate;
// this file will be replaced with generated code.

import TxSignPrep from '../TxSignPrep'

describe('Transaction object prepare tests', () => {
  it('should build an object for Lock and convert to known b64', () => {
    var locktx = {
      target: 'ndaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac',
      period: '90d',
      sequence: 123
    }

    var bb = new TxSignPrep().prepare(locktx)
    var len = locktx.target.length + locktx.period.length + 8
    expect(bb.length()).toEqual(len)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      'OTBkAAAAAAAAAHtuZGFxOWNqZjU0Y3Q1OWJtdWE3OGl1djZndHBqdGR1bmM3OHE4amVid2dteHlhYw=='
    )
  })
})
