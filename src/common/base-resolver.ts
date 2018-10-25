import Repository from './base-repository';

export default class CrudResolver<T> {
    constructor(protected repository: Repository<T>) {}

    public async save(data: T): Promise<T> {
        return await this.repository.save(data);
    }

    public async getById(_id: string): Promise<any> {
        return await this.repository.getById(_id);
    }

    public async getAll(): Promise<any[]> {
        return await this.repository.getAll();
    }

    public async updateById(_id: string, data: T): Promise<T> {
        return await this.repository.updateById(_id, data);
    }

    public async deleteById(_id: string): Promise<string> {
        return await this.repository.deleteById(_id);
    }
}
