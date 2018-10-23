import Repository from './base-repository';

export default class CrudResolver<T> {
    constructor(protected repository: Repository<T>) {}

    public async save(data: T): Promise<T> {
        return await this.repository.save(data);
    }
}
