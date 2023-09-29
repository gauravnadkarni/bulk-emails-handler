import bcrypt from "bcrypt";

export default class Utility {
    static async generateBcryptHash(value:string, rounds:number=10):Promise<string> {
        return await bcrypt.hash(value, rounds);
    }

    static checkBcryptHash(plainValue:string, encryptedValue:string):Promise<boolean> {
        return bcrypt.compare(plainValue,encryptedValue);
    }
}