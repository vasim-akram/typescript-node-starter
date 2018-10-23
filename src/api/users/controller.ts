import User from '../../model/user';
import Resolver from './resolver';
import CrudController from '../../common/crud-controller';

export default class UserController extends CrudController<User> {
    constructor() {
        super(new Resolver());
    }
}
