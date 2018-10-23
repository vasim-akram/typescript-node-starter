import * as Hapi from 'hapi';
import Config from '../config';

export default class Plugins {
    public static async status(server: Hapi.Server): Promise<Error | any> {
        try {
            console.info('Plugins - Registering status-monitor');

            await Plugins.register(server, {
                register: require('hapijs-status-monitor'),
            });
        } catch (error) {
            console.error(`Plugins - Oops, something went wrong when registering status plugin: ${error}`);
        }
    }
    public static async boom(server: Hapi.Server): Promise<Error | any> {
        try {
            console.info('Plugins - Registering hapi-boom-decorators');

            await Plugins.register(server, {
                register: require('hapi-boom-decorators'),
            });
        } catch (error) {
            console.error(`Plugins - Oops, something went wrong when registering boom plugin: ${error}`);
        }
    }
    public static async registerAll(server: Hapi.Server): Promise<Error | any> {
        if (process.env.NODE_ENV === 'development') {
            await Plugins.status(server);
        }
        await Plugins.boom(server);
    }
    private static register(server: Hapi.Server, plugin: any): Promise<Error | any> {
        return new Promise((resolve, reject) => {
            server.register(plugin, error => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });
    }
}
