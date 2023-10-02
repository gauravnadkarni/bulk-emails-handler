import * as bcrypt from "bcrypt";
import * as yaml from 'js-yaml';
import { readFileSync } from "fs";
import { join } from "path";

export default class Utility {
    static async generateBcryptHash(value:string, rounds:number):Promise<string> {
        return await bcrypt.hash(value, rounds);
    }

    static generateBcryptHashSync(value:string, rounds:number):string {
        return bcrypt.hashSync(value, rounds);
    }

    static checkBcryptHash(plainValue:string, encryptedValue:string):Promise<boolean> {
        return bcrypt.compare(plainValue,encryptedValue);
    }

    static readYamlFile(path:string, fileName:string) {
        return yaml.load(
            readFileSync(join(path, fileName), 'utf8'),
        ) as Record<string, any>;
    }
}