export default () =>({
    DATASOURCE: process.env.DATASOURCE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT,10),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === "true" ? true : false,
})