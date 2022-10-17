import { user } from "../../entities";
import { UserService} from "../user.service";

let testUserService: UserService;

const testUser: user = {
    id: 1,
    firstName: 'Test',
    lastName: 'Testov',
    login: 'TestLogin'
}

const expect = require('chai').expect;

describe ('User service test:  year tests', () => {
    
    it('1. Adding user: ', () => {
        let test1 = testUserService.add(testUser, 1);
        expect(test1).to.be.false;
    });

})