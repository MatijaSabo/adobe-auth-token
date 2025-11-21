import axios from "axios";
import qs from "qs";

export const handler = async (event) => {
  try {
    // Prepare form-urlencoded body
    const body = qs.stringify({
      grant_type: "client_credentials",
      client_id: process.env.FIREFLY_SERVICES_CLIENT_ID,
      client_secret: process.env.FIREFLY_SERVICES_CLIENT_SECRET,
      scope: process.env.FIREFLY_SERVICES_SCOPES,
    });

    // Send POST request to Adobe IMS
    const response = await axios.post(
      "https://ims-na1.adobelogin.com/ims/token/v3",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Return JSON response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.data,
      }),
    };
  } catch (err) {
    console.error("Error fetching token:", err.response?.data || err.message);

    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({
        message: "Failed to fetch barrier token",
        error: err.response?.data || err.message,
      }),
    };
  }
};
