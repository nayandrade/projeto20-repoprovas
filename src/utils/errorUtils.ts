type AppErrorTypes =
  | "conflict"
  | "not_found"
  | "unauthorized"
  | "unprocessable_entity";
export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === "unauthorized") return 401;
  if (type === "not_found") return 404;
  if (type === "conflict") return 409;
  if (type === "unprocessable_entity") return 422;
  return 400;
}