export default class CircularArray {
  constructor (size) {
    this._arraySize = size
    this.clear()
  }

  /**
   * Private helper function to put the pointers back
   * at the front of the array.
   */
  _initializePointers () {
    this._head = 1
    this._tail = 0
  }

  /**
   * Write any type of item to this CircularArray.
   * There is a head and tail moving around the array
   * the item is always stored on the tail and we
   * move around with the head. Once the head hits the
   * end of the array we `_initializePointers()` which set us
   * back to the start of the array.
   *
   * See `writeArrayToFile` for how we have to write
   * the array out.
   *
   * @param {*} item
   */
  write (item) {
    this._array[this._tail] = item

    // if the head is at the end of the array then
    // we need to initialize and reset our pointers
    if (this._head === this._array.length) {
      this._initializePointers()
      return
    }

    this._head++
    this._tail++
  }

  /**
   * Function used to clear and reset the log data
   */
  clear () {
    this._array = new Array(this._arraySize)

    this._initializePointers()
  }

  /**
   * Write the information within the array out
   * into a file. We send back the array data starting
   * with the head to the end as this is the older
   * data in the array (using `slice()`). We then `concat()`
   * the start to the tail; this is always the most recent
   * data in the array.
   *
   * @param {*} fileIO a class that will writeFile, namely'
   * the react-native-fs library
   * @param {string} absolutePath absolute file to be written
   */
  async writeArrayToFile (fileIO, absolutePath) {
    await fileIO.writeFile(
      absolutePath,
      JSON.stringify(
        this._array
          .slice(this._head - 1, this._array.length)
          .concat(this._array.slice(0, this._tail))
          .filter(data => data !== null)
      ),
      'utf8'
    )
  }
}
