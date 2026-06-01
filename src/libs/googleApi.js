const GOOGLE_API_HOST = process.env.GOOGLE_API_HOST || 'https://www.googleapis.com/';
const GOOGLE_TOKEN_API_HOST = process.env.GOOGLE_TOKEN_API_HOST || 'https://oauth2.googleapis.com/';

export async function getAccessTokenbyGoogleAPI(code, returnURL) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_TOKEN_CLIENT_ID,
      client_secret: process.env.GOOGLE_TOKEN_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: returnURL,
    });
    const res = await fetch(`${GOOGLE_TOKEN_API_HOST}token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('getAccessTokenbyGoogleAPI error', e);
    return null;
  }
}

export async function getUserbyGoogleAPI(token) {
  try {
    const res = await fetch(`${GOOGLE_API_HOST}oauth2/v2/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('getUserbyGoogleAPI error', e);
    return null;
  }
}
