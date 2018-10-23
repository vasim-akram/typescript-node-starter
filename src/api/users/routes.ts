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
            ]);

            console.info('UserRoutes - Finish adding user routes.');

            resolve();
        });
    }
}
