export type Response<T> = {
  message: string;
  data: T;
};

export function response<T>(message: string, data: T): Response<T> {
  return {
    message,
    data,
  };
}
