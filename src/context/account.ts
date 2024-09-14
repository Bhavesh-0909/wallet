import { create } from 'zustand'

type accountType = {
  account: [],
  setAccount: (account: []) => void,
}

const accountStore = create<accountType>()((set) => ({
  account: [],
  setAccount: (account) => set({ account: account}),
}))

export default accountStore;
