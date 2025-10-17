import * as SecureStore from "expo-secure-store";
import { StateStorage } from "zustand/middleware";

export const SecureStorage: StateStorage = {
    getItem: (name: string) => SecureStore.getItemAsync(name),
    setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
    removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};
