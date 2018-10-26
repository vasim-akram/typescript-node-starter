import * as Hapi from 'hapi';
import Logger from './helper/logger';
import UserRoutes from './api/users/routes';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
        Logger.info('Router - Start adding routes.');

        await new UserRoutes().register(server);

        Logger.info('Router - Finish adding routes.');
    }
}
