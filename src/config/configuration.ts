export default () => ({
    port: parseInt(process.env.PORT, 10) || 4300,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306
    }
});