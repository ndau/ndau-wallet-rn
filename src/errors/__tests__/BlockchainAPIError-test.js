import BlockchainAPIError from '../BlockchainAPIError'
import {Messages} from '../BlockchainAPIError'

test('identify error from substrings', () => {
  try {
    throw new BlockchainAPIError("source == destination")
  } catch (error) {
    expect(error.toString()).toEqual(`Error: ${Messages.SRC_DEST_SAME}`)
  }
})

test('identify error from code', () => {
  try {
    throw new BlockchainAPIError("1004")
  } catch (error) {
    expect(error.toString()).toEqual(`Error: ${Messages.SRC_DEST_SAME}`)
  }
})
