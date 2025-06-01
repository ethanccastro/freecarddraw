export default class ErrorHandler {

    static NotFoundError = class extends Error {
        constructor(tableName: string, id: string) {
            super(`${tableName} not found with id: ${id}`);
            this.name = 'NotFoundError';
        }
    }
}