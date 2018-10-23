import * as Hapi from 'hapi';
import UserRoutes from './api/users/routes';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
        console.info('Router - Start adding routes.');

        await new UserRoutes().register(server);

        console.info('Router - Finish adding routes.');
    }
}
