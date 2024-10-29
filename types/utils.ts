
type ResponseSuccess<T = undefined> = {
    success: true;
    code: 200 | 201 | 202 | 203 | 204;
    message: string;
    data?: T;
  };
  
  type ResponseError = {
    success: false;
    error: {
      code: 400 | 401 | 402 | 403 | 404 | 405 | 406 | 408 | 410 | 422 | 429 | 500 | 502 | 503;
      message: string;
    };
  };
  
  type ResponseWithMessage = ResponseSuccess | ResponseError;
  
  export function response<T>(response: ResponseSuccess<T> | ResponseError): ResponseSuccess<T> | ResponseError {
    return response;
  }