export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error,
});

export const created = (data: any) => ({
  statusCode: 201,
  body: data,
});

export const serverError = () => ({
  statusCode: 500,
  body: new Error('Internal server error'),
});

export const ok = (data: any) => ({
  statusCode: 200,
  body: data,
});

export const noContent = (data?: any) => ({
  statusCode: 204,
  body: data,
});
