import express from 'express';
import * as MikroORMModule from '@mikro-orm/mysql';
import type { MikroORM, EntityManager, SqlEntityRepository } from '@mikro-orm/mysql';
const { EntityRepository, MikroORM: MikroORMClass, EntityManager: EntityManagerClass, SqlEntityRepository: SqlEntityRepositoryClass } = MikroORMModule;
import { RequestContext, EntityName } from '@mikro-orm/core';
import { Entry } from '../src/entities/entry.entity.js';
import { EntryUserToken } from '../src/entities/entryusertoken.entity.js';
import { ErrorLog } from '../src/entities/errorlog.entity.js';
import { Giftcard } from '../src/entities/giftcard.entity.js';
import { Giveaway } from '../src/entities/giveaway.entity.js';
import { GiftcardGiveaway_V } from '../src/entities/giftcardgiveaway_v.entity.js';
import { ServiceTrigger } from '../src/entities/servicetrigger.entity.js';
import { _test_resetORMCache, initMiddleware, initORM } from '../src/server-init.js';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Define Services interface locally to avoid import conflict
interface Services {
    orm: MikroORM;
    em: EntityManager;
    entry: SqlEntityRepository<Entry>;
    entryusertoken: SqlEntityRepository<EntryUserToken>;
    errorlog: SqlEntityRepository<ErrorLog>;
    giftcard: SqlEntityRepository<Giftcard>;
    giveaway: SqlEntityRepository<Giveaway>;
    giftcardGiveaway_v: SqlEntityRepository<GiftcardGiveaway_V>;
    servicetrigger: SqlEntityRepository<ServiceTrigger>;
}

// Mock dependencies
jest.mock('express', () => {
    const actual = jest.requireActual('express') as typeof express;
    return {
        ...actual,
        Router: jest.fn(() => ({
            use: jest.fn(),
            get: jest.fn(),
            post: jest.fn()
        }))
    };
});

jest.mock('@mikro-orm/mysql', () => ({
    MikroORM: {
        init: jest.fn()
    },
    EntityManager: jest.fn(),
    EntityRepository: jest.fn(),
    SqlEntityRepository: jest.fn()
}));



describe('Server Initialization', () => {
    let mockApp: express.Application;
    let mockORM: jest.Mocked<MikroORM>;
    let mockEntityManager: jest.Mocked<EntityManager>;
    let mockServices: Services;

    let spiedRequestContextCreate: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
        jest.clearAllMocks();
        _test_resetORMCache();

        // Create mock app with proper typing
        mockApp = {
            use: jest.fn(),
            set: jest.fn(),
            router: jest.fn()
        } as unknown as express.Application;

        // Create mock repositories
        const mockRepositories = {
            entry: {} as SqlEntityRepository<Entry>,
            entryusertoken: {} as SqlEntityRepository<EntryUserToken>,
            errorlog: {} as SqlEntityRepository<ErrorLog>,
            giftcard: {} as SqlEntityRepository<Giftcard>,
            giveaway: {} as SqlEntityRepository<Giveaway>,
            giftcardGiveaway_v: {} as SqlEntityRepository<GiftcardGiveaway_V>,
            servicetrigger: {} as SqlEntityRepository<ServiceTrigger>
        };

        // Create mock entity manager with simplified getRepository implementation
        mockEntityManager = {
            getRepository: jest.fn((entityName: string | Function) => {
                const name = typeof entityName === 'string' ? entityName : entityName.name;
                switch (name) {
                    case 'Entry': return mockRepositories.entry;
                    case 'EntryUserToken': return mockRepositories.entryusertoken;
                    case 'ErrorLog': return mockRepositories.errorlog;
                    case 'Giftcard': return mockRepositories.giftcard;
                    case 'Giveaway': return mockRepositories.giveaway;
                    case 'GiftcardGiveaway_V': return mockRepositories.giftcardGiveaway_v;
                    case 'ServiceTrigger': return mockRepositories.servicetrigger;
                    default: throw new Error(`Repository not found for entity: ${name}`);
                }
            })
        } as unknown as jest.Mocked<EntityManager>;

        // Create mock ORM
        mockORM = {
            em: mockEntityManager
        } as unknown as jest.Mocked<MikroORM>;

        // Setup mock services
        mockServices = {
            orm: mockORM,
            em: mockEntityManager,
            ...mockRepositories
        };

        // Setup MikroORM.init mock
        jest.spyOn(MikroORMClass, 'init').mockResolvedValue(mockORM);

        spiedRequestContextCreate = jest.spyOn(RequestContext, 'create')
            .mockImplementation((entityManager, next) => {
                // Our mock implementation: simply call next()
                // It receives the actual entityManager (orm.em from server-init) and next function
                if (typeof next === 'function') {
                    next();
                }
                // You could also return something if the original create method returns a value
                // For RequestContext.create, it often returns the result of next() or void
                return undefined; // Or whatever is appropriate
            });
    });

    afterEach(() => {
        if (typeof (global as any).cache !== 'undefined') {
            (global as any).cache = undefined;
        }
        if (spiedRequestContextCreate) {
            spiedRequestContextCreate.mockRestore();
        }        
    });

    describe('initORM', () => {
        it('should initialize ORM and return services', async () => {
            const result = await initORM();

            expect(MikroORMClass.init).toHaveBeenCalled();
            expect(result.orm).toBe(mockORM);
            expect(result.em).toBe(mockEntityManager);
            expect(result.em.getRepository).toHaveBeenCalledTimes(7);
            expect(result.entry).toBeDefined();
        });

        it('should return cached services on subsequent calls', async () => {
            // const mockCache = { services: undefined as Services | undefined };
             //(global as any).cache = mockCache;

            const firstResult = await initORM();
            expect(MikroORMClass.init).toHaveBeenCalledTimes(1);
            // expect(mockCache.services).toBe(firstResult);

            const secondResult = await initORM();
            expect(MikroORMClass.init).toHaveBeenCalledTimes(1);
            // expect(secondResult).toBe(firstResult);
        });
    });

    describe('initMiddleware', () => {
        it('should set up middleware and routes', async () => {
            _test_resetORMCache();
            await initMiddleware(mockApp);
        
            const useCalls = (mockApp.use as jest.Mock).mock.calls;
        
            expect((useCalls as any)[0][0].name).toBe('serveStatic');
            expect((useCalls as any)[1][0].name).toBe('urlencodedParser');
            expect((useCalls as any)[2][0].name).toBe('jsonParser');
            expect(mockApp.set).toHaveBeenCalledWith('view engine', 'ejs');
        
            const requestContextSetupMiddleware = useCalls[3][0] as (req: any, res: any, next: any) => void;
            const mockReq = {};
            const mockRes = {};
            const mockNext = jest.fn();
        
            requestContextSetupMiddleware(mockReq, mockRes, mockNext);
        
            // Assert against the spy instance
            expect(spiedRequestContextCreate).toHaveBeenCalledTimes(1);
            expect(spiedRequestContextCreate).toHaveBeenCalledWith(mockEntityManager, mockNext);
        
            expect(useCalls.some(call => typeof call[0] === 'function')).toBe(true);
            expect(useCalls.some(call => typeof call[0] === 'string')).toBe(true);
        });

        it('should initialize services correctly', async () => {
            _test_resetORMCache(); 
            // (global as any).cache = { services: undefined };

            await initMiddleware(mockApp);

            expect(MikroORMClass.init).toHaveBeenCalled();
            expect(mockEntityManager.getRepository).toHaveBeenCalledTimes(7);
        });
    });
});