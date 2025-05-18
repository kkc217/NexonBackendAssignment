export function successWrapper<T = any>(data: T) {
  return { success: true, data };
}

export function errorWrapper(message: string, code = 500) {
  return { success: false, message, code };
}
