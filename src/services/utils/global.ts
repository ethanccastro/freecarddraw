import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtPayloadUUID } from "../../@types/global.js";
import { v4 as uuidv4 } from 'uuid';

interface SystemData {
    guid: string;
    create_time: Date;
    update_time: Date;
}

interface MetaData {
    file: string | null;
    func: string | null;
}

export default class Global {

    static getUUID(): string {
        return uuidv4();
    }

    static getCurrentTime(): Date {
        return new Date();
    }

    static setSystemData(): SystemData {
        const guid: string = uuidv4();
        const create_time: Date = new Date();
        const update_time: Date = new Date();

        return {
            guid,
            create_time,
            update_time
        };
    }

    static setVerificationToken(uuid: string): string {
        const payLoad: { uuid: string } = {
            uuid: uuid,
        };

        const secretKey: string = 'secret_key';
        const options: jwt.SignOptions = { expiresIn: '50m' };

        return jwt.sign(payLoad, secretKey, options);
    }

    static getVerificationToken(token: string): JwtPayloadUUID | null {
        try {
            const secret_key: string = 'secret_key';
            const uuid = jwt.verify(token, secret_key) as JwtPayload;

            return uuid as JwtPayloadUUID;
            
        } catch (error) {
            return null;
        }
    }

    static getMetaData(): MetaData {
        let fileName: string | null = null;
        const stack: string[] | undefined = new Error().stack?.split('\n');
        
        if (stack && stack.length > 2) {
            const line: string | undefined = new Error().stack?.split('\n')[2];
        }    

        return {
            file: fileName,
            func: Global.getMetaData.caller?.name || null
        };
    }
}