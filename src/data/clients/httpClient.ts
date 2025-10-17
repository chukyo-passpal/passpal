import * as Application from "expo-application";
import { fetch } from "expo/fetch";
import { Platform } from "react-native";

import {
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    NetworkError,
    NotFoundError,
    ServiceTemporarilyUnavailableError,
    TimeoutError,
    UnauthorizedError,
} from "@/src/data/errors/NetworkError";

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_USER_AGENT = createDefaultUserAgent();

type KnownError =
    | BadRequestError
    | ForbiddenError
    | InternalServerError
    | NetworkError
    | NotFoundError
    | ServiceTemporarilyUnavailableError
    | TimeoutError
    | UnauthorizedError;

const KNOWN_ERROR_CLASSES = [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    NetworkError,
    NotFoundError,
    ServiceTemporarilyUnavailableError,
    TimeoutError,
    UnauthorizedError,
] as const;

export interface HttpRequestOptions extends Omit<RequestInit, "headers"> {
    /** Custom headers merged with the defaults */
    headers?: HeadersInit;
    /** Override timeout in milliseconds. Set to Infinity or 0 to disable. */
    timeoutMs?: number;
    /** Override default user agent header. */
    userAgent?: string;
}

export interface HttpResponse<T> {
    data: T;
    response: Response;
}

export async function request(input: string | URL, options: HttpRequestOptions = {}): Promise<Response> {
    const { headers, timeoutMs = DEFAULT_TIMEOUT_MS, userAgent, signal: externalSignal, body, ...rest } = options;

    const controller = new AbortController();
    let timedOut = false;

    if (externalSignal) {
        if (externalSignal.aborted) {
            controller.abort(externalSignal.reason);
        } else {
            externalSignal.addEventListener("abort", () => controller.abort(externalSignal.reason), { once: true });
        }
    }

    const timeoutActive = Number.isFinite(timeoutMs) && timeoutMs > 0;
    const timeoutId: ReturnType<typeof setTimeout> | undefined = timeoutActive
        ? setTimeout(() => {
              timedOut = true;
              controller.abort();
          }, timeoutMs)
        : undefined;

    const mergedHeaders = buildHeaders(headers, userAgent);

    try {
        const response = await fetch(input.toString(), {
            ...rest,
            body: body ?? undefined,
            headers: mergedHeaders,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw await buildHttpError(response);
        }

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === "AbortError") {
                if (timedOut) {
                    throw new TimeoutError();
                }

                throw error;
            }

            if (isKnownError(error)) {
                throw error;
            }

            throw new NetworkError({ cause: error });
        }

        throw new NetworkError();
    } finally {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }
}

export async function requestJson<T = unknown>(input: string | URL, options?: HttpRequestOptions): Promise<HttpResponse<T | undefined>> {
    const response = await request(input, options);

    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return { data: undefined, response };
    }

    try {
        const data = (await response.json()) as T;
        return { data, response };
    } catch (error) {
        throw new NetworkError({ cause: error instanceof Error ? error : undefined });
    }
}

export async function requestText(input: string | URL, options?: HttpRequestOptions): Promise<HttpResponse<string>> {
    const response = await request(input, options);
    const data = await response.text();
    return { data, response };
}

export const httpClient = {
    request,
    json: requestJson,
    text: requestText,
};

export default httpClient;

function buildHeaders(headers: HeadersInit | undefined, userAgent?: string): Headers {
    const merged = new Headers(headers ?? {});
    const resolvedUserAgent = userAgent ?? DEFAULT_USER_AGENT;

    if (!merged.has("User-Agent")) {
        merged.set("User-Agent", resolvedUserAgent);
    }

    return merged;
}

async function buildHttpError(response: Response): Promise<KnownError | NetworkError> {
    const baseError = mapStatusToError(response.status);

    const cloned = response.clone();
    let responseBody: unknown;
    try {
        const text = await cloned.text();
        if (text) {
            try {
                responseBody = JSON.parse(text);
            } catch {
                responseBody = text;
            }
        }
    } catch {
        // ignore body parsing issues – they aren't critical
    }

    return Object.assign(baseError, {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: responseBody,
        response,
    });
}

function mapStatusToError(status: number): KnownError {
    switch (status) {
        case 400:
            return new BadRequestError();
        case 401:
            return new UnauthorizedError();
        case 403:
            return new ForbiddenError();
        case 404:
            return new NotFoundError();
        case 408:
            return new TimeoutError();
        case 500:
            return new InternalServerError();
        case 503:
            return new ServiceTemporarilyUnavailableError();
        default:
            if (status >= 500) {
                return new InternalServerError();
            }
            return new NetworkError();
    }
}

function createDefaultUserAgent(): string {
    try {
        const appName = Application.applicationName ?? "PassPal";
        const version = Application.nativeApplicationVersion ?? "dev";
        const build = Application.nativeBuildVersion;
        const os = Platform.OS;
        const osVersion = typeof Platform.Version === "string" ? Platform.Version : Platform.Version?.toString() ?? "unknown";

        const buildSuffix = build ? ` (${build})` : "";
        return `${appName}/${version}${buildSuffix} (${os}; ${osVersion})`;
    } catch {
        return "PassPal/unknown";
    }
}

function isKnownError(error: Error): error is KnownError {
    return KNOWN_ERROR_CLASSES.some((ErrorClass) => error instanceof ErrorClass);
}
