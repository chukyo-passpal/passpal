export type Result<T = undefined> = FailedResult | SucceededResult<T>;

interface FailedResult {
    isSuccess: false;
    err: Error;
}

interface SucceededResult<T> {
    isSuccess: true;
    result?: T;
}
