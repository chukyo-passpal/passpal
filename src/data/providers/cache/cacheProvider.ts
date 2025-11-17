import AsyncStorage from "@react-native-async-storage/async-storage";

import { CacheKey } from "../../constants/cache";

export interface CacheEntry<T> {
    storedAt: number;
    value: T;
}

export interface FetchWithCacheOptions<T> {
    key: CacheKey;
    fetcher: () => Promise<T>;
    maxAgeMs?: number;
    staleAgeMs?: number;
}

export interface CacheProvider {
    get<T>(key: CacheKey): Promise<CacheEntry<T> | null>;
    set<T>(key: CacheKey, value: T): Promise<void>;
    remove(key: CacheKey): Promise<void>;
    fetchWithCache<T>(options: FetchWithCacheOptions<T>): Promise<T>;
}

export class AsyncStorageCacheProvider implements CacheProvider {
    private readonly namespace: string;
    private static readonly DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1000;
    private static readonly DEFAULT_STALE_AGE_MS = AsyncStorageCacheProvider.DEFAULT_MAX_AGE_MS * 2;

    constructor(namespace = "cache") {
        this.namespace = namespace;
    }

    public async get<T>(key: CacheKey): Promise<CacheEntry<T> | null> {
        const raw = await AsyncStorage.getItem(this.makeKey(key));
        if (!raw) return null;

        try {
            const parsed = JSON.parse(raw) as CacheEntry<T>;
            if (typeof parsed?.storedAt !== "number" || parsed.value === undefined) {
                await this.remove(key);
                return null;
            }
            return parsed;
        } catch {
            await this.remove(key);
            return null;
        }
    }

    public async set<T>(key: CacheKey, value: T): Promise<void> {
        const payload: CacheEntry<T> = {
            storedAt: Date.now(),
            value,
        };
        await AsyncStorage.setItem(this.makeKey(key), JSON.stringify(payload));
    }

    public async remove(key: CacheKey): Promise<void> {
        await AsyncStorage.removeItem(this.makeKey(key));
    }

    public async fetchWithCache<T>({
        key,
        fetcher,
        maxAgeMs = AsyncStorageCacheProvider.DEFAULT_MAX_AGE_MS,
        staleAgeMs = AsyncStorageCacheProvider.DEFAULT_STALE_AGE_MS,
    }: FetchWithCacheOptions<T>): Promise<T> {
        if (staleAgeMs < maxAgeMs) {
            staleAgeMs = maxAgeMs;
        }

        const cached = await this.get<T>(key);
        const now = Date.now();
        const age = cached ? now - cached.storedAt : null;

        if (cached && age !== null && age < maxAgeMs) {
            return cached.value;
        }

        try {
            const fresh = await fetcher();
            await this.set(key, fresh);
            return fresh;
        } catch (error) {
            if (cached) {
                return cached.value;
            }
            throw error;
        }
    }

    private makeKey(key: string): string {
        return `${this.namespace}:${key}`;
    }
}

const cacheProviderInstance = new AsyncStorageCacheProvider("palapi-json");
export default cacheProviderInstance;
