import { CACHE_KEYS, CacheKey } from "../constants/cache";
import cacheProviderInstance, { CacheProvider } from "../providers/cache/cacheProvider";

export interface CacheRepository {
    /**
     * キャッシュをクリアします。
     * @returns キャッシュクリアのPromise
     */
    clearCache: () => Promise<void>;
}

export class IntegratedCacheRepository implements CacheRepository {
    private readonly cacheProvider;

    constructor(cacheProvider: CacheProvider = cacheProviderInstance) {
        this.cacheProvider = cacheProvider;
    }

    public async clearCache(): Promise<void> {
        const ignoredKeys: CacheKey[] = [];
        for (const key of CACHE_KEYS) {
            if (ignoredKeys.includes(key)) continue;
            await this.cacheProvider.remove(key);
        }
    }
}

const cacheRepositoryInstance = new IntegratedCacheRepository();
export default cacheRepositoryInstance;
