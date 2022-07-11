export type TTransaction = {
    __typename: string,
    status: "pending" | "failed" | "sucessful",
    title: string,
    description: string,
    type: "credit" | "debit",
    amount: number,
    currency: "NGN" | "EUR" | "USD"
    date: string
}

export type TSortedTransaction = {
  date: string,
  data: TTransaction
}