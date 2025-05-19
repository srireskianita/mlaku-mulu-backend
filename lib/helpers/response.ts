export const successResponse = (statusCode: number, data: unknown) => ({
    statusCode,
    body: JSON.stringify(data),
  });
  
  export const errorResponse = (statusCode: number, message: string) => ({
    statusCode,
    body: JSON.stringify({ message }),
  });
  