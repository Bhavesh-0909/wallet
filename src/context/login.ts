import { create } from 'zustand'

type user = {
  isLoggedIn: boolean,
  seed: string,
  LogIn: () => void,
  setSeed: (seed: string) => void,
}

const userStore = create<user>()((set) => ({
  isLoggedIn: false,
  seed: '',
  LogIn: () => set((state) => ({ isLoggedIn: !state})),
  setSeed: (seed) => set({ seed: seed}),
}))

export default userStore;
