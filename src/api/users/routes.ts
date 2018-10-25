import * as Hapi from 'hapi';
import IRoute from '../../helper/route';
import UserController from './controller';

export default class UserRoutes implements IRoute {
    public async register(server: Hapi.Server): Promise<any> {
        return new Promise(resolve => {
            console.info('UserRoutes - Start adding user routes.');
            const controller = new UserController();

            server.route([
                {
                    method: 'POST',
                    path: '/api/users',
                    config: {
                        handler: controller.create,
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/api/user/{id}',
                    config: {
                        handler: controller.getById,
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/api/users',
                    config: {
                        handler: controller.getAll,
                        auth: false,
                    },
                },
                {
                    method: 'PUT',
                    path: '/api/user/{id}',
                    config: {
                        handler: controller.updateById,
                        auth: false,
                    },
                },
                {
                    method: 'DELETE',
                    path: '/api/user/{id}',
                    config: {
                        handler: controller.deleteById,
                        auth: false,
                    },
                },
            ]);

            console.info('UserRoutes - Finish adding user routes.');

            resolve();
        });
    }
}
