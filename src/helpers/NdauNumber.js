import ndaujs from 'ndaujs'
import DataFormatHelper from '../helpers/DataFormatHelper'
import AppConfig from '../AppConfig'
import AppConstants from '../AppConstants'

export default class NdauNumber {

  /**
   *
   * @param {integer,string} napu an integer representing napu or a string that looks like a float that is ndau.
   */
  constructor(amt) {
    if (amt === undefined) {
      this.napu = 0
    } else if (Object.prototype.toString.call(amt) === '[object String]') {
      this.napu = DataFormatHelper.getNapuFromNdau(amt)
    } else if (Number.isInteger(amt)) {
      this.napu = amt
    } else {
      throw new Error(`${amt} is not an integer.`)
    }
  }

  setNdau(ndau) {
    this.napu = DataFormatHelper.getNapuFromNdau(ndau)
  }

  setNapu(napu) {
    this.napu = napu
  }

  // returns a string formatted for a summary display of ndau
  toSummary() {
    let ndau = ndaujs.formatNapuForDisplay(this.napu, AppConfig.NDAU_SUMMARY_PRECISION, false)
    console.log("Started with ", ndau)
    if (this.napu === 0) {
      ndau = "0.00"
    } else if (this.napu < (AppConstants.QUANTA_PER_UNIT / 100) ) {
      // if there is less than 1 ndau
      ndau = ndaujs.formatNapuForDisplay(this.napu, AppConfig.NDAU_DETAIL_PRECISION, false)
    }
    console.log ("ended with", ndau)
    return ndau
  }

  // returns a string formatted for a detail display of ndau
  toDetail() {
    return ndaujs.formatNapuForDisplay(this.napu, AppConfig.NDAU_DETAIL_PRECISION, false)
  }

}

