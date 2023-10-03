export const jwtConstants = {
    secretForAccessToken: process.env.PRIVATE_KEY_USED_FOR_ACCESS_TOKEN_GENERATION,
    secretForRefreshToken: process.env.PRIVATE_KEY_USED_FOR_REFRESH_TOKEN_GENERATION
};