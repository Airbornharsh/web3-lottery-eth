export enum LOTTERYSTATE {
  OPEN = 0,
  CLOSED = 1,
}

export interface Winner {
  address: string
  amount: number
}
