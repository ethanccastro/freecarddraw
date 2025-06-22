import * as MikroORMModule from '@mikro-orm/mysql';
import type { EntityRepository, EntityManager } from '@mikro-orm/mysql';
const { MikroORM } = MikroORMModule;
import { GiftcardGiveaway_V } from '../../../src/entities/giftcardgiveaway_v.entity.js';
import CategoryRouteService from '../../../src/services/routes/category.routeService.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

describe('CategoryRouteService', () => {
    let giftcardGiveaway_VRepositoryMock: jest.Mocked<EntityRepository<GiftcardGiveaway_V>>;
    let entityManagerMock: jest.Mocked<EntityManager>;
    let categoryRouteService: CategoryRouteService;

    beforeEach(() => {
        entityManagerMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<EntityManager>;

        giftcardGiveaway_VRepositoryMock = {
            getEntityManager: jest.fn().mockReturnValue(entityManagerMock)
        } as unknown as jest.Mocked<EntityRepository<GiftcardGiveaway_V>>;

        categoryRouteService = new CategoryRouteService(giftcardGiveaway_VRepositoryMock);
    });

    describe('getRecentGiveawaysByType', () => {
        it('should return recent giveaways for a valid type', async () => {
            const mockGiveaways = [
                {
                    giftcardgiveaway_v_ID: '1',
                    giftcardgiveaway_v_giftcardtype: 'Amazon',
                    giftcardgiveaway_v_TITLE: 'Amazon Gift Card'
                },
                {
                    giftcardgiveaway_v_ID: '2',
                    giftcardgiveaway_v_giftcardtype: 'Amazon',
                    giftcardgiveaway_v_TITLE: 'Another Amazon Gift Card'
                }
            ] as GiftcardGiveaway_V[];

            entityManagerMock.execute.mockResolvedValueOnce(mockGiveaways);

            const result = await categoryRouteService.getRecentGiveawaysByType('Amazon');

            expect(result).toEqual(mockGiveaways);
            expect(entityManagerMock.execute).toHaveBeenCalledWith(
                expect.stringContaining('SELECT *'),
                ['Amazon']
            );
            expect(giftcardGiveaway_VRepositoryMock.getEntityManager).toHaveBeenCalled();
        });

        it('should throw error when database query fails', async () => {
            const error = new Error('Database connection failed');
            entityManagerMock.execute.mockRejectedValueOnce(error);

            await expect(categoryRouteService.getRecentGiveawaysByType('Amazon'))
                .rejects
                .toThrow('Database connection failed');
        });

        it('should handle empty results gracefully', async () => {
            entityManagerMock.execute.mockResolvedValueOnce([]);

            const result = await categoryRouteService.getRecentGiveawaysByType('NonExistentType');

            expect(result).toEqual([]);
        });
    });

    describe('getClosedGiveawaysByType', () => {
        it('should return closed giveaways for a valid type', async () => {
            const mockClosedGiveaways = [
                {
                    giftcardgiveaway_v_ID: '3',
                    giftcardgiveaway_v_giftcardtype: 'Steam',
                    giftcardgiveaway_v_TITLE: 'Steam Gift Card',
                    giftcardgiveaway_v_giveawayenddate: new Date('2023-01-01')
                }
            ] as unknown as GiftcardGiveaway_V[];

            entityManagerMock.execute.mockResolvedValueOnce(mockClosedGiveaways);

            const result = await categoryRouteService.getClosedGiveawaysByType('Steam');

            expect(result).toEqual(mockClosedGiveaways);
            expect(entityManagerMock.execute).toHaveBeenCalledWith(
                expect.stringContaining('SELECT'),
                ['Steam']
            );
        });

        it('should throw error when database query fails', async () => {
            const error = new Error('Database error');
            entityManagerMock.execute.mockRejectedValueOnce(error);

            await expect(categoryRouteService.getClosedGiveawaysByType('Steam'))
                .rejects
                .toThrow('Database error');
        });
    });

    describe('validateCategoryType', () => {
        it('should return true for existing category type', async () => {
            entityManagerMock.execute.mockResolvedValueOnce([{ count: 5 }]);

            const result = await categoryRouteService.validateCategoryType('Amazon');

            expect(result).toBe(true);
            expect(entityManagerMock.execute).toHaveBeenCalledWith(
                expect.stringContaining('COUNT(*)'),
                ['Amazon']
            );
        });

        it('should return false for non-existing category type', async () => {
            entityManagerMock.execute.mockResolvedValueOnce([{ count: 0 }]);

            const result = await categoryRouteService.validateCategoryType('NonExistentType');

            expect(result).toBe(false);
        });

        it('should throw error when database query fails', async () => {
            const error = new Error('Database connection failed');
            entityManagerMock.execute.mockRejectedValueOnce(error);

            await expect(categoryRouteService.validateCategoryType('Amazon'))
                .rejects
                .toThrow('Database connection failed');
        });

        it('should handle edge case with count greater than 1', async () => {
            entityManagerMock.execute.mockResolvedValueOnce([{ count: 10 }]);

            const result = await categoryRouteService.validateCategoryType('PopularType');

            expect(result).toBe(true);
        });
    });
}); 