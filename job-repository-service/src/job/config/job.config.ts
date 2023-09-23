import { registerAs } from "@nestjs/config";

export default registerAs('jobs',() => ({
    REPOSITORY_IDENTIFIER: process.env.JOB_REPOSITORY_IDENTIFIER || "JOB_REPOSITORY",
}));