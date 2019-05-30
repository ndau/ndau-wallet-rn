export default class CircularArray {
  constructor (size) {
    this._array = new Array(size)

    this._head = 0
    this._tail = 0
  }

  _next (n) {
    var next = n + 1
    if (next === this._array.length) {
      this._array.shift()
      return next - 1
    } else {
      return next
    }
  }

  /**
   * Write any item to thhis CircularArray. Once we
   * react the length of the array we will start
   * adding new items to the head again.
   *
   * @param {*} item
   */
  write (item) {
    // this._array[this._tail] = item

    // if (this._tail === this._head) {
    //   this._array[this._tail] =
    // }

    // this._tail++

    // if the tail is at the end of the array
    // start pop it to the zeroith element
    // if (this._tail === this._array.length - 1) {
    //   this._tail = 0
    // }

    this._head = this._next(this._head)
    this._array[this._head] = item
  }

  /**
   * Send back the array data
   */
  read () {
    return this._array
  }
}
