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

    public getById(_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.dataStore.findOne({ _id }, (error, document) => {
                if (error) {
                    reject(error);
                }
                resolve(document);
            });
        });
    }

    public getAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({}, {}, (error, documents) => {
                if (error) {
                    reject(error);
                }
                resolve(documents);
            });
        });
    }

    public updateById(_id: string, data: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataStore.update({ _id }, data, {multi: true}, error => {
                if (error) {
                    reject(error);
                }
                this.getById(_id).then(value => resolve(value));
            });
        });
    }

    public deleteById(_id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            
            this.dataStore.remove({ _id }, error => {
                if (error) {
                    reject(error);
                }
                resolve(_id);
            });
        });
    }
}
