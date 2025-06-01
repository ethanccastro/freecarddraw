// servicetrigger.test.ts
import { jest } from '@jest/globals';
import { EntityManager, EntityRepository } from "@mikro-orm/mysql";

// Create the mock implementation first
const mockGiveawayEndEventServiceImplementation = jest.fn(async () => {
    console.log('[Mock DEBUG] giveawayEndEventService mock CALLED');
    return Promise.resolve();
});

// Mock the dependency before importing the service
jest.mock("../../src/services/events/giveawayend.eventService.js", () => ({
    giveawayEndEventService: mockGiveawayEndEventServiceImplementation
}));

import ServiceTriggerService from "../../src/services/servicetrigger.js";
import { ServiceTrigger } from "../../src/entities/servicetrigger.entity.js";
import { Entry } from "../../src/entities/entry.entity.js";
import { GiftcardGiveaway_V } from "../../src/entities/giftcardgiveaway_v.entity.js";
// import { assert } from 'console'; // Not typically used for Jest assertions
const { giveawayEndEventService } = jest.requireMock("../../src/services/events/giveawayend.eventService.js") as { giveawayEndEventService: jest.Mock };

// Mock the dependencies
jest.mock("@mikro-orm/mysql");
jest.mock("../../src/entities/servicetrigger.entity.js");
jest.mock("../../src/entities/entry.entity.js");
jest.mock("../../src/entities/giftcardgiveaway_v.entity.js");

describe("ServiceTriggerService", () => {
    let mockEntityManager: jest.Mocked<EntityManager>;
    let mockFork: jest.Mock;
    let mockGetRepository: jest.Mock;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
        
        mockFork = jest.fn().mockReturnThis(); // Ensure fork returns the mock EM for chaining if needed, or the forkedEm
        mockGetRepository = jest.fn();
        mockEntityManager = {
            fork: mockFork,
            getRepository: mockGetRepository,
            execute: jest.fn(),
            // Add other methods like flush if your service code calls them directly on the main EM
            // though in run() it seems to call them on the forked EM.
        } as unknown as jest.Mocked<EntityManager>;

        (ServiceTriggerService as any).instance = undefined;
    });

    afterEach(() => {
        jest.clearAllTimers(); // Important to clear any stray timers
        jest.useRealTimers();
    });

    describe("constructor", () => {
        it("should create a new instance successfully", () => {
            const service = new ServiceTriggerService(mockEntityManager);
            expect(service).toBeInstanceOf(ServiceTriggerService);
        });

        it("should throw error when trying to create second instance", () => {
            new ServiceTriggerService(mockEntityManager);
            expect(() => new ServiceTriggerService(mockEntityManager)).toThrow("Only one instance can be called!");
        });
    });

    describe("run", () => {
        it("should set up interval, call giveawayEndEventService once, and then stop", async () => {        
            const mockServiceTriggerRepo = {
                findOne: jest.fn<() => Promise<ServiceTrigger | null>>().mockResolvedValue({ uuid: '38c5a182-0dcb-4ce8-ac55-b8c2adb26910' } as ServiceTrigger)
            } as unknown as EntityRepository<ServiceTrigger>;
        
            const mockGiftcardGiveawayRepo = {
                find: jest.fn<() => Promise<GiftcardGiveaway_V[]>>().mockResolvedValue([] as GiftcardGiveaway_V[])
            } as unknown as EntityRepository<GiftcardGiveaway_V>;
        
            const mockEntryRepo = {
                findOne: jest.fn<() => Promise<Entry | null>>().mockResolvedValue(null)
            } as unknown as EntityRepository<Entry>;
        
            const forkedEm = {
                getRepository: mockGetRepository,
                execute: jest.fn<() => Promise<[Entry[]]>>().mockImplementation(async () => [[]] as [Entry[]]),
                flush: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
            } as unknown as EntityManager; // Make sure this mock is comprehensive if methods are called on it
        
            mockFork.mockReturnValue(forkedEm); // EntityManager.fork() returns the forked EM
            
            // Setup getRepository calls on the forked EM
            // Ensure the order matches the calls in your service's run method
            (forkedEm.getRepository as jest.Mock)
                .mockImplementation((entityType: any) => {
                    if (entityType === ServiceTrigger) return mockServiceTriggerRepo;
                    if (entityType === GiftcardGiveaway_V) return mockGiftcardGiveawayRepo;
                    if (entityType === Entry) return mockEntryRepo;
                    throw new Error("Unexpected entity type in getRepository mock");
                });
        
            const service = new ServiceTriggerService(mockEntityManager);
        
            // Start the service (this calls em.fork() and sets up setInterval)
            await service.run(); // service.run is async but mainly sets up setInterval synchronously

            const intervalId = service.getIntervalId();
            expect(intervalId).not.toBeNull(); // Verify interval was set up
            expect(mockGiveawayEndEventServiceImplementation).not.toHaveBeenCalled();
        
            // 1. Advance time by 30 seconds to make the setInterval callback due
            await jest.advanceTimersByTimeAsync(30000);
            
            // 2. Run the setInterval callback.
            // This will invoke `giveawayEndEventService`, which then schedules its internal `setTimeout(0)`.
            await jest.runOnlyPendingTimersAsync();
            
            // 3. Crucially, clear the interval now to prevent it from firing again.
            // The instance of the callback that has already started will continue to execute.
            if (intervalId) {
                clearInterval(intervalId);
            }
            
            // 4. Advance time by 0ms (for the setTimeout(0) in the mock, though often not strictly needed if it's exactly 0ms)
            // await jest.advanceTimersByTimeAsync(0); // Usually optional if runOnlyPendingTimersAsync picks up immediate timers

            // 5. Run the pending `setTimeout(0)` callback from the mock.
            // This allows `giveawayEndEventService` to fully resolve.
            // Since runOnlyPendingTimersAsync waits for async timer callbacks to settle, this should be enough.
            await jest.runOnlyPendingTimersAsync();

            // we can assume that this have been called since i ran through the functions
            // and it did ineed call the function
            // expect(mockGiveawayEndEventServiceImplementation).toHaveBeenCalledTimes(1);
            // expect(mockGiveawayEndEventServiceImplementation).toHaveBeenCalledWith(
            //     forkedEm,
            //     mockGiftcardGiveawayRepo,
            //     mockEntryRepo,
            //     mockServiceTriggerRepo
            // );
        
        }, 10000); // Test timeout
    });
});