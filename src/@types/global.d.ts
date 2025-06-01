import { EntityManager } from '@mikro-orm/core';

declare global {
    namespace Express {
        export interface Request {
            em?: EntityManager;
        }
    }

    namespace jsonwebtoken {
        export interface JwtPayloadUUID extends JwtPayload {
            uuid?: string;
        }
    }
}

export {JwtPayloadUUID};