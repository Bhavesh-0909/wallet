import { create } from 'zustand'

type user = {
  isLoggedIn: boolean,
  LogIn: () => void,
}

const userStore = create<user>()((set) => ({
  isLoggedIn: false,
  LogIn: () => set((state) => ({ isLoggedIn: !state})),
}))

export default userStore;
