export default {
    USERS:[{
        userId:"abc123",
        email:"alex@beh.com",
        password: process.env.DB_USER_SEEDING_PASSWORD_FOR_ALEX,
        name:"alex",
    },{
        userId:"def456",
        email:"nancy@beh.com",
        password: process.env.DB_USER_SEEDING_PASSWORD_FOR_NANCY,
        name:"nancy",
    }]
};