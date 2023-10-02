import Utility from "../utility/utility";

export default {
    USERS:[{
        userId:"abc123",
        email:"alex@beh.com",
        password: Utility.generateBcryptHashSync(process.env.DB_USER_SEEDING_PASSWORD_FOR_ALEX,10),
        name:"alex",
    },{
        userId:"def456",
        email:"nancy@beh.com",
        password: Utility.generateBcryptHashSync(process.env.DB_USER_SEEDING_PASSWORD_FOR_NANCY,10),
        name:"nancy",
    }]
};