import React from 'react';

type JsonObject<T> = {
  value: T;
  expireUnixTime: number;
};

export const useLocalStorage = <T>(initialValue: T, key: string, limitInSeconds: number) => {
  const [value, setValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const currentJson = localStorage.getItem(key);
    const currentJsonObject: JsonObject<T> | null = currentJson === null ? null : JSON.parse(currentJson);
    let timerSeconds: number = 0;

    if (currentJsonObject === null) {
      if (value !== initialValue) {
        localStorage.setItem(
          key,
          JSON.stringify({
            value,
            expireUnixTime: new Date().getTime() + limitInSeconds * 1000,
          })
        );
        setValue(value);
        timerSeconds = limitInSeconds;
      }
    } else {
      const isExpired = new Date().getTime() > currentJsonObject.expireUnixTime;
      if (isExpired) {
        localStorage.removeItem(key);
        setValue(initialValue);
      } else {
        setValue(currentJsonObject.value);
        timerSeconds = Math.round((currentJsonObject.expireUnixTime - new Date().getTime()) / 1000);
      }
    }

    if (timerSeconds !== 0) {
      const timerId = setTimeout(() => {
        localStorage.removeItem(key);
        setValue(initialValue);
      }, timerSeconds * 1000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [initialValue, key, limitInSeconds, value]);

  return [value, setValue] as const;
};
