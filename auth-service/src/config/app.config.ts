
export default () => ({
    APP:{
        PASSWORD_SALT_ROUNDS: process.env.BCRYPT_HASH_ROUNDS,
    }
});