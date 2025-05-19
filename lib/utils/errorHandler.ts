export const errorHandler = (error: unknown) => {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unknown server error" }),
    };
  };
  