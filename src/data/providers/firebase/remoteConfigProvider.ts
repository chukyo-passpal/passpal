import { fetchAndActivate, getRemoteConfig, setDefaults } from "@react-native-firebase/remote-config";

export interface RemoteConfigProvider {
    /**
     * Firebase Remote Configから最新の設定を取得し、アプリケーションに反映させます。
     */
    fetchRemoteConfig(): Promise<void>;
}

export class IntegratedRemoteConfigProvider implements RemoteConfigProvider {
    async fetchRemoteConfig(): Promise<void> {
        const remoteConfig = getRemoteConfig();

        await setDefaults(remoteConfig, {
            // admin
            maintenanceMode: false,
            minimumVersion: "0.0.0",

            // auth
            allowedMailDomain: "m.chukyo-u.ac.jp",
            webClientId: "106090766697496251493",
        });

        const fetchedRemotely = await fetchAndActivate(remoteConfig);
        if (fetchedRemotely) {
            console.log("[Firebase Remote Config] Configs were retrieved from the backend and activated.");
        } else {
            console.warn("[Firebase Remote Config] No configs were fetched from the backend, and the local configs were already activated");
        }
    }
}

const remoteConfigProviderInstance = new IntegratedRemoteConfigProvider();
export default remoteConfigProviderInstance;
