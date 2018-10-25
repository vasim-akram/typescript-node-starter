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

    public getById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            console.info(`GET - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            const entity: T = await this.crudResolver.getById(id);

            return response({
                statusCode: 200,
                data: entity,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public getAll = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            console.info(`GET - ${Utils.getUrl(request)}`);

            const entities: T[] = await this.crudResolver.getAll();

            return response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public updateById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            console.info(`PUT - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            const entity: T = await this.crudResolver.updateById(id, request.payload);

            return response({
                statusCode: 200,
                data: entity,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public deleteById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            console.info(`DELETE - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            await this.crudResolver.deleteById(id);

            return response({
                statusCode: 200,
                data: { id },
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };
}
