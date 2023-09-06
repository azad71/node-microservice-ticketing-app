export type THTTPMethod = "get" | "patch" | "post" | "put" | "delete";

export interface IUseRequest {
  url: string;
  method: THTTPMethod;
  body?: Record<string, string>;
}

export interface IErrorResponse {
  message: string;
  field?: string;
}
