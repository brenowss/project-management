/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Debounces a function, ensuring it is only called after a specified delay
 * since the last time it was invoked.
 *
 * @template T - The type of the function being debounced.
 * @param {T} callback - The function to be debounced.
 * @param {number} waitFor - The delay in milliseconds to wait before invoking the debounced function.
 * @returns {(...args: Parameters<T>) => ReturnType<T>} - The debounced function.
 */
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};
