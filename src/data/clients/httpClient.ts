import * as Application from "expo-application";
import { fetch } from "expo/fetch";
import { Platform } from "react-native";

import { MaintenanceError, NetworkError, TimeoutError } from "../errors/NetworkError";

const DEFAULT_TIMEOUT_MS = 10000;

type HttpClientMode = "default" | "portal" | "palapi";

type HttpClientOptions = RequestInit & {
    timeoutMs?: number;
    clientMode?: HttpClientMode;
};

const buildUserAgent = (): string => {
    const appName = Application.applicationName ?? "PassPal";
    const appVersion = Application.nativeApplicationVersion ?? "unknown";
    const os = Platform.OS ?? "unknown";

    return `${appName}/${appVersion} (${os})`;
};

const userAgent = buildUserAgent();

const isAbortError = (error: unknown): boolean => {
    if (!error) {
        return false;
    }

    if (error instanceof Error) {
        return error.name === "AbortError";
    }

    return false;
};

export const httpClient = async (input: string | URL, options: HttpClientOptions = {}): Promise<Response> => {
    const { timeoutMs: timeoutOverride = DEFAULT_TIMEOUT_MS, clientMode, mode, headers, signal, ...requestInit } = options;

    const timeoutMs = timeoutOverride ?? DEFAULT_TIMEOUT_MS;
    const httpClientMode: HttpClientMode = clientMode ?? "default";

    const controller = new AbortController();
    let timedOut = false;

    const timeoutId = setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, timeoutMs);

    const abortCallback = () => controller.abort();
    if (signal) {
        if (signal.aborted) {
            controller.abort();
        } else {
            signal.addEventListener("abort", abortCallback);
        }
    }

    const finalHeaders = new Headers(headers);
    finalHeaders.set("User-Agent", userAgent);

    try {
        const url = typeof input === "string" ? input : input.toString();
        const { body, ...restInit } = requestInit as typeof requestInit & {
            body?: BodyInit | null;
        };

        const response = await fetch(url, {
            ...restInit,
            ...(body != null ? { body } : {}),
            headers: finalHeaders,
            signal: controller.signal,
            mode,
        });

        if (!response.ok) {
            if (httpClientMode === "portal" && response.status === 503) {
                throw new MaintenanceError();
            }

            throw new NetworkError({
                cause: new Error(`HTTP error: ${response.status} ${response.statusText}`),
            });
        }

        return response;
    } catch (error) {
        if (error instanceof MaintenanceError || error instanceof NetworkError || error instanceof TimeoutError) {
            throw error;
        }

        if (isAbortError(error) && timedOut) {
            throw new TimeoutError({ cause: error });
        }

        throw new NetworkError({ cause: error });
    } finally {
        clearTimeout(timeoutId);
        if (signal) {
            signal.removeEventListener("abort", abortCallback);
        }
    }
};

export type { HttpClientMode, HttpClientOptions };
