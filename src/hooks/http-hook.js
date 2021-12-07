// HTTP hook

import { useState, useCallback, useRef, useEffect } from 'react';
import { isDevEnv } from '../util/utils';

export const useHttpClient = (caller) => {
  if (isDevEnv) console.log(`HOOK: useHttpClient (${caller || '?'})`);

  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(undefined); // error state

  // prevent errors if page is switched while this is loading, where we would
  // try to update the state of a component not on the screen anymore cancel
  // the ongoing http request using useRef hook it will turn into a reference:
  // data that will not change / be re-initialized when the page re-renders
  const activeHttpRequests = useRef([]);

  // wrap the entire thing in `useCallback` to avoid an infinite loop (or merely
  // an inefficient re-render cycle) if/when the component that calls this hook
  // re-renders and would call this function again
  const sendRequest = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {}
  ) => {

    setIsLoading(true); // to enable loading indicator in UX

    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      // forward the params to `fetch`
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
        credentials: 'include'
      });

      const responseData = await response.json(); // should be the data

      // if request was successful, filter out the specific AbortController for
      // this request; we don't try to cancel a request that already completed
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
        );

      // error may result in no response; but a 'successful' response may also
      // bring an error; to catch these errors use `ok`
      // `ok` property of response object is true for 200ish status codes,
      // false for 4-500ish codes
      if (!response.ok) {
        console.log(responseData.message);
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      // return the data to the component that is using this hook
      return responseData;

    } catch (err) {
      setError(err.message || 'Http-hook: something went wrong.');
      setIsLoading(false);
      // throw error, so that the component using this hook knows that something
      // went wrong and to not continue
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  // cleanup function
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError
  };
};