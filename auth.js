export const handler = async (event) => {
  const token = event.headers?.Authorization;

  // Example: check against a static token (you can validate JWT here)
  const expectedToken = process.env.API_AUTH_TOKEN || "my-secret-token";

  if (!token || token !== `Bearer ${expectedToken}`) {
    return {
      isAuthorized: false,
    };
  }

  return {
    isAuthorized: true,
  };
};