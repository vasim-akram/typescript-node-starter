import * as Hapi from 'hapi';
import * as Boom from 'boom';
import Utils from '../helper/utils';
import CrudResolver from './base-resolver';

export default class CrudController<T> {
    constructor(protected crudResolver: CrudResolver<T>) {}

    public create = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            console.info(`POST - ${Utils.getUrl(request)}`);

            const data: any = await this.crudResolver.save(request.payload);

            return response({
                statusCode: 200,
                data: {
                    id: data['_id'],
                },
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };
}
