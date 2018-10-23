import * as Hapi from 'hapi';
import * as DotEnv from 'dotenv';
import Plugin from './plugin';
import Router from './route';

export default class Server {
    private static _instance: Hapi.Server;

    public static async start(): Promise<Hapi.Server> {
        try {
            DotEnv.config();
            Server._instance = new Hapi.Server();

            Server._instance.connection({
                host: process.env.HOST,
                port: process.env.PORT,
            });

            await Plugin.registerAll(Server._instance);
            await Router.loadRoutes(Server._instance);
            await Server._instance.start();

            console.info('Server - Up and running!');

            return Server._instance;
        } catch (error) {
            console.error(`Server - There was something worng: ${error}`);

            throw error;
        }
    }
    public static stop(): Promise<Error | any> {
        console.log('Server - Stopping!');

        return Server._instance.stop();
    }
    public static async recycle(): Promise<Hapi.Server> {
        await Server.stop();

        return await Server.start();
    }
    public static instance(): Hapi.Server {
        return Server._instance;
    }
}
