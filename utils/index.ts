import fetch from 'isomorphic-unfetch';

export const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res: Response) => res.json());
