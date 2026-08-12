export interface HttpOptions {
  body?: HttpBody;
  headers?: HttpHeaders;
}

type HttpBody = Record<string, unknown>;
type HttpHeaders = Record<string, string>;
