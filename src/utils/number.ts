import { BigNumber } from 'bignumber.js'
import { BigNumberish } from 'ethers'

export const formatNumber = (input: BigNumberish, units: number = 18) => {
  return new BigNumber(input.toString()).div(10 ** units).toFormat(0)
}
