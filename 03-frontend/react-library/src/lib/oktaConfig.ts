export const oktaConfig = {
    clientId: `0oanqcspi32WnZLw35d7`,
    issuer: `https://dev-49064111.okta.com/oauth2/default`,
    redirectUri: 'http://localhost:5173/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
    useClassicEngine: true
  };
  