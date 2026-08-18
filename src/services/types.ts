export interface HttpOptions {
  body?: HttpBody;
  headers?: HttpHeaders;
}

type HttpBody = Record<string, any>;
type HttpHeaders = Record<string, string>;
