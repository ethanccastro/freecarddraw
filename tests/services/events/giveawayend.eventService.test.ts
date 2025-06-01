const mockSendEmailEntryNumberWinner = jest.fn(async () => {});

import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { EntityManager, EntityRepository } from "@mikro-orm/mysql";
import { Giveaway } from "../../../src/entities/giveaway.entity.js";
import { Entry } from "../../../src/entities/entry.entity.js";
import { EntryUserToken } from "../../../src/entities/entryusertoken.entity.js";
import { GiftcardGiveaway_V } from "../../../src/entities/giftcardgiveaway_v.entity.js";
import { ServiceTrigger } from "../../../src/entities/servicetrigger.entity.js";
import GiveawayEmail from "../../../src/services/utils/giveawayemail.js";
import ErrorHandler from "../../../src/services/utils/errorhandler.utilsService.js";
import { giveawayEndEventService } from "../../../src/services/events/giveawayend.eventService.js";

jest.spyOn(GiveawayEmail, 'sendEmailEntryNumberWinner').mockImplementation(mockSendEmailEntryNumberWinner);

describe("giveawayEndEventService", () => {
    let mockEm: jest.Mocked<EntityManager>;
    let mockGiftcardGiveaway_VRepository: jest.Mocked<EntityRepository<GiftcardGiveaway_V>>;
    let mockEntryRepository: jest.Mocked<EntityRepository<Entry>>;
    let mockServiceTriggerRepository: jest.Mocked<EntityRepository<ServiceTrigger>>;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Initialize mock repositories
        mockEm = {
            execute: jest.fn(),
            flush: jest.fn()
        } as any;

        mockGiftcardGiveaway_VRepository = {
            find: jest.fn()
        } as any;

        mockEntryRepository = {
            find: jest.fn()
        } as any;

        mockServiceTriggerRepository = {
            findOne: jest.fn()
        } as any;
    });

    it("should handle no winners gracefully", async () => {
        // Mock empty result from stored procedure
        mockEm.execute.mockResolvedValueOnce([[]]);

        await giveawayEndEventService(
            mockEm,
            mockGiftcardGiveaway_VRepository,
            mockEntryRepository,
            mockServiceTriggerRepository
        );

        expect(mockEm.execute).toHaveBeenCalledWith(
            expect.stringContaining("CALL GetEntryWinners()"),
            [],
            "all"
        );
        expect(mockSendEmailEntryNumberWinner).not.toHaveBeenCalled();
    });

    it("should process winners and send emails", async () => {
        // Mock winners from stored procedure
        const mockWinners = [{
            entry_email: "winner@example.com",
            giftcardgiveaway_v: {
                giftcardgiveaway_v_giveawayuuid: "uuid-1"
            }
        }];

        const mockGiveaway = {
            giftcardgiveaway_v_giveawayuuid: "uuid-1",
            giftcardgiveaway_v_ID: "giveaway-1",
            giftcardgiveaway_v_TITLE: "Test Giveaway"
        };

        const mockServiceTrigger = {
            uuid: "38c5a182-0dcb-4ce8-ac55-b8c2adb26910",
            servicetrigger_lastexecutedtime: new Date()
        };

        mockEm.execute.mockResolvedValueOnce([mockWinners]);
        mockGiftcardGiveaway_VRepository.find.mockResolvedValueOnce([mockGiveaway]);
        mockServiceTriggerRepository.findOne.mockResolvedValueOnce(mockServiceTrigger);

        await giveawayEndEventService(
            mockEm,
            mockGiftcardGiveaway_VRepository,
            mockEntryRepository,
            mockServiceTriggerRepository
        );

        expect(mockSendEmailEntryNumberWinner).toHaveBeenCalledWith({
            giveawayid: "giveaway-1",
            entryemail: "winner@example.com",
            giftcard: "Test Giveaway"
        });
        expect(mockEm.flush).toHaveBeenCalled();
    });

    it("should throw NotFoundError when service trigger is not found", async () => {
        const mockWinners = [{
            entry_email: "winner@example.com",
            giftcardgiveaway_v: {
                giftcardgiveaway_v_giveawayuuid: "uuid-1"
            }
        }];

        mockEm.execute.mockResolvedValueOnce([mockWinners]);
        mockGiftcardGiveaway_VRepository.find.mockResolvedValueOnce([]);
        mockServiceTriggerRepository.findOne.mockResolvedValueOnce(null);

        await expect(giveawayEndEventService(
            mockEm,
            mockGiftcardGiveaway_VRepository,
            mockEntryRepository,
            mockServiceTriggerRepository
        )).rejects.toThrow(ErrorHandler.NotFoundError);
    });
});
