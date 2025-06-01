import { Collection, EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { GiftcardGiveaway_V } from '../../../src/entities/giftcardgiveaway_v.entity.js';
import { Entry } from '../../../src/entities/entry.entity.js';
import { EntryUserToken } from '../../../src/entities/entryusertoken.entity.js';
import GiveawayEmail from '../../../src/services/utils/giveawayemail.js';
import Global from '../../../src/services/utils/global.js';
import ErrorHandler from '../../../src/services/utils/errorhandler.utilsService.js';
import GiveawayRouteService from '../../../src/services/routes/giveaway.routeService.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals'; 

// jest.mock('@mikro-orm/mysql');
// jest.mock('../../entities/giftcardgiveaway_v.entity.js');
// jest.mock('../../entities/entry.entity.js');
// jest.mock('../../entities/entryusertoken.entity.js');
// jest.mock('../utils/giveawayemail.js');
// jest.mock('../utils/global.js');
// jest.mock('../utils/errorhandler.utilsService.js');

const EntityManagerMock = jest.mocked(EntityManager);
const GiftcardGiveaway_VMock = jest.mocked(EntityRepository<GiftcardGiveaway_V>);
const EntryMock = jest.mocked(EntityRepository<Entry>);
const EntryUserTokenMock = jest.mocked(EntityRepository<EntryUserToken>);
const GiveawayEmailMock = jest.mocked(GiveawayEmail);
const GlobalMock = jest.mocked(Global);
const ErrorHandlerMock = jest.mocked(ErrorHandler);

describe('GiveawayRouteServiceClass', () => {
    let giftcardGiveaway_VRepositoryMock: jest.Mocked<EntityRepository<GiftcardGiveaway_V>>
    let emMock: jest.Mocked<EntityManager>;
    let entryReposioryMock: jest.Mocked<EntityRepository<Entry>>;
    let entryUserTokenRepositoryMock: jest.Mocked<EntityRepository<EntryUserToken>>;
    let giveawayRouteService: GiveawayRouteService;
    let giftcardGiveaway_VMock: GiftcardGiveaway_V;

    beforeEach(() => {
        emMock = {
            persistAndFlush: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
            execute: jest.fn()
        } as unknown as jest.Mocked<EntityManager>
        
        const entryUserTokenMock: EntryUserToken = {
            createtime: new Date('2025-05-03 15:29:22'),
            entryusertoken_entryemail: 'f@df.com',
            entryusertoken_giveawayuuid: 'd27462ee-2866-11f0-92a2-7d501b98a883',
            updatetime: new Date('2025-05-03 15:29:22'),
            uuid: '2234d738-3c29-4dda-9cdd-33a3e1513a78'
        } as EntryUserToken;

        giftcardGiveaway_VMock = {
            giftcardgiveaway_v_giftcardtype: 'Roblox',
            giftcardgiveaway_v_giftcardvalue: 5,
            giftcardgiveaway_v_giveawaybegindate: '2025-03-05 23:59:59',
            giftcardgiveaway_v_giveawayenddate: '2025-04-01 23:59:59',
            giftcardgiveaway_v_giveawaynumber: 0,
            giftcardgiveaway_v_giveawayuuid: '0bfbd832-294b-11f0-92a2-7d501b98a883',
            giftcardgiveaway_v_IMAGE: 'Roblox.png',
            giftcardgiveaway_v_LINKTITLE: '5-roblox-gift-card-giveaway',
            giftcardgiveaway_v_TITLE: '$5 Roblox Gift Card giveaway (ID: 0BFBD832)',
            giftcardgiveaway_v_URLTITLE: '/0bfbd832/5-roblox-gift-card-giveaway',
            giftcardgiveaway_v_ID: '0BFBD832',
            entries: new Collection<Entry>(Entry)
        } as GiftcardGiveaway_V;

        const entryMock: Entry = {
            uuid: '40a4ad2f-ac68-4fdc-93af-81906839c4ec',
            createtime: new Date('2025-05-05 17:13:55'),
            updatetime: new Date('2025-05-05 17:13:55'),
            entry_email: 'ew@sd.com',
            entry_name: 'john',
            entry_date: new Date('2025-05-05 17:13:55'),
            entry_giveawaynumber: 684,
            giftcardgiveaway_v: giftcardGiveaway_VMock,
            entry_giveawayuuid: '0bfbd832-294b-11f0-92a2-7d501b98a883',
        } as Entry;

        entryUserTokenRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<EntityRepository<EntryUserToken>>;

        giftcardGiveaway_VRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<EntityRepository<GiftcardGiveaway_V>>;

        entryReposioryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<EntityRepository<Entry>>;

        giveawayRouteService = new GiveawayRouteService(
            emMock,
            giftcardGiveaway_VRepositoryMock,
            entryReposioryMock,
            entryUserTokenRepositoryMock
        );
    });

    describe("getGiveawayByID", () => {
        it("should return giveaway by ID", async () => {
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(giftcardGiveaway_VMock);
    
            const result = await giveawayRouteService.getGiveawayByID("0BFBD832");
            expect(result).toEqual(giftcardGiveaway_VMock);
            expect(giftcardGiveaway_VRepositoryMock.findOne).toHaveBeenCalledWith(
                { giftcardgiveaway_v_ID: "0BFBD832" }
            );
        });

        it("should throw NotFoundError when giveaway not found", async () => {
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(null);
            
            await expect(giveawayRouteService.getGiveawayByID("NONEXISTENT"))
                .rejects
                .toThrow(ErrorHandler.NotFoundError);
        });
    });

    describe("getEntryUserTokenByUUID", () => {
        it("should return entry user token by UUID", async () => {
            const entryUserTokenMock: EntryUserToken = {
                createtime: new Date('2025-05-03 15:29:22'),
                entryusertoken_entryemail: 'f@df.com',
                entryusertoken_giveawayuuid: 'd27462ee-2866-11f0-92a2-7d501b98a883',
                updatetime: new Date('2025-05-03 15:29:22'),
                uuid: '2234d738-3c29-4dda-9cdd-33a3e1513a78'
            } as EntryUserToken;

            entryUserTokenRepositoryMock.findOne.mockResolvedValueOnce(entryUserTokenMock);

            const result = await giveawayRouteService.getEntryUserTokenByUUID("2234d738-3c29-4dda-9cdd-33a3e1513a78");
            expect(result).toEqual(entryUserTokenMock);
            expect(entryUserTokenRepositoryMock.findOne).toHaveBeenCalledWith(
                { uuid: "2234d738-3c29-4dda-9cdd-33a3e1513a78" }
            );
        });

        it("should throw NotFoundError when entry user token not found", async () => {
            entryUserTokenRepositoryMock.findOne.mockResolvedValueOnce(null);
            
            await expect(giveawayRouteService.getEntryUserTokenByUUID("NONEXISTENT"))
                .rejects
                .toThrow(ErrorHandler.NotFoundError);
        });
    });

    describe("isEntryEmailUnique", () => {
        it("should return true when email is unique", async () => {
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(giftcardGiveaway_VMock);
            entryReposioryMock.findOne.mockResolvedValueOnce(null);

            const result = await giveawayRouteService.isEntryEmailUnique("0BFBD832", "unique@email.com");
            expect(result).toBe(true);
        });

        it("should return false when email is not unique", async () => {
            const entryMock: Entry = {
                uuid: '40a4ad2f-ac68-4fdc-93af-81906839c4ec',
                createtime: new Date('2025-05-05 17:13:55'),
                updatetime: new Date('2025-05-05 17:13:55'),
                entry_email: 'existing@email.com',
                entry_name: 'john',
                entry_date: new Date('2025-05-05 17:13:55'),
                entry_giveawaynumber: 684,
                giftcardgiveaway_v: giftcardGiveaway_VMock,
                entry_giveawayuuid: '0bfbd832-294b-11f0-92a2-7d501b98a883',
            } as Entry;

            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(giftcardGiveaway_VMock);
            entryReposioryMock.findOne.mockResolvedValueOnce(entryMock);

            const result = await giveawayRouteService.isEntryEmailUnique("0BFBD832", "existing@email.com");
            expect(result).toBe(false);
        });

        it("should throw NotFoundError when giveaway not found", async () => {
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(null);
            
            await expect(giveawayRouteService.isEntryEmailUnique("NONEXISTENT", "test@email.com"))
                .rejects
                .toThrow(ErrorHandler.NotFoundError);
        });
    });

    describe("enterGiveaway", () => {
        it("should successfully enter giveaway and return entry user token UUID", async () => {
            const mockUUID = "new-uuid-123";
            const mockVerificationToken = "verification-token-123";
            
            jest.spyOn(Global, 'getUUID').mockReturnValue(mockUUID);
            jest.spyOn(Global, 'setVerificationToken').mockReturnValue(mockVerificationToken);
            jest.spyOn(GiveawayEmail, 'sendEmailConfirmation').mockResolvedValue();
            
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(giftcardGiveaway_VMock);
            emMock.persistAndFlush.mockResolvedValueOnce();

            const result = await giveawayRouteService.enterGiveaway(
                "0BFBD832",
                "test@email.com",
                "Test User"
            );

            expect(result).toBe(mockUUID);
            expect(emMock.persistAndFlush).toHaveBeenCalled();
            expect(GiveawayEmail.sendEmailConfirmation).toHaveBeenCalled();
        });

        it("should throw NotFoundError when giveaway not found", async () => {
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(null);
            
            await expect(giveawayRouteService.enterGiveaway(
                "NONEXISTENT",
                "test@email.com",
                "Test User"
            )).rejects.toThrow(ErrorHandler.NotFoundError);
        });
    });

    describe("getEntryNumber", () => {
        it("should successfully get and assign entry number", async () => {
            const mockEntryUserToken: EntryUserToken = {
                uuid: "token-uuid-123",
                entryusertoken_entryemail: "test@email.com",
                entryusertoken_giveawayuuid: "giveaway-uuid-123"
            } as EntryUserToken;

            const mockEntry: Entry = {
                uuid: "entry-uuid-123",
                entry_email: "test@email.com",
                entry_giveawaynumber: null,
                giftcardgiveaway_v: giftcardGiveaway_VMock
            } as Entry;

            jest.spyOn(Global, 'getVerificationToken').mockReturnValue({ uuid: "token-uuid-123" });
            entryUserTokenRepositoryMock.findOne.mockResolvedValueOnce(mockEntryUserToken);
            giftcardGiveaway_VRepositoryMock.findOne.mockResolvedValueOnce(giftcardGiveaway_VMock);
            entryReposioryMock.findOne.mockResolvedValueOnce(mockEntry);
            emMock.execute.mockResolvedValueOnce([{ entry_giveawaynumber: 123 }]);
            emMock.persistAndFlush.mockResolvedValueOnce();
            jest.spyOn(GiveawayEmail, 'sendEmailentryNumber').mockResolvedValue();

            const result = await giveawayRouteService.getEntryNumber("valid-jwt-token");

            expect(result).toBe(123);
            expect(emMock.remove).toHaveBeenCalledWith(mockEntryUserToken);
            expect(emMock.flush).toHaveBeenCalled();
            expect(GiveawayEmail.sendEmailentryNumber).toHaveBeenCalled();
        });

        it("should throw NotFoundError when entry user token not found", async () => {
            jest.spyOn(Global, 'getVerificationToken').mockReturnValue({ uuid: "token-uuid-123" });
            entryUserTokenRepositoryMock.findOne.mockResolvedValueOnce(null);
            
            await expect(giveawayRouteService.getEntryNumber("valid-jwt-token"))
                .rejects
                .toThrow(ErrorHandler.NotFoundError);
        });
    });

    describe("getEmailPageMessage", () => {
        it("should return confirmation message with entry number", async () => {
            const result = await giveawayRouteService.getEmailPageMessage(true, 123);
            
            expect(result).toEqual({
                subject: "Entry Confirmed",
                body: expect.stringContaining("123")
            });
        });

        it("should return entry message without entry number", async () => {
            const result = await giveawayRouteService.getEmailPageMessage(false);
            
            expect(result).toEqual({
                subject: "Giveaway Entered",
                body: expect.stringContaining("You're Almost In!")
            });
        });
    });
});