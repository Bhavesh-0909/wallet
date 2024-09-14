import { create } from 'zustand'

type passwordType = {
    password: string,
    setPassword: (password: string) => void,
}

const passwordStore = create<passwordType>()((set) => ({
    password: '',
    setPassword: (password) => set({ password: password}),
}))

export default passwordStore;
