import * as DataStore from 'nedb';

export default class Repository<T> {
    public dataStore = new DataStore({
        inMemoryOnly: true,
    });

    public save(data: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataStore.insert(data, (error, document) => {
                if (error) {
                    reject(error);
                }

                resolve(document);
            });
        });
    }
}
