import {Authentication, INotification} from "../src/authentication";

import {IToken} from "../src/otp";
import {Profile} from "../src/profile";

class StubProfile extends Profile {
    get_password(account): any {
        return this._password;
    }

    private _password: any;

    set_password(password) {
        this._password = password;
    }
}

class StubOtp implements IToken {
    private _token;

    get_token() {
        return this._token;
    }

    set_token(token) {
        this._token = token;
    }
}

class StubNotification implements INotification {
    send(msg): void {}
}

describe('authenticate account is valid', function () {
    let stubProfile: StubProfile;
    let stubOtp: StubOtp;
    let stubNotification: StubNotification;
    let authentication: Authentication;

    beforeEach(() => {
        stubProfile = new StubProfile();
        stubOtp = new StubOtp();
        stubNotification = new StubNotification();
        authentication = new Authentication(stubProfile, stubOtp, stubNotification);
    })

    function givenPassword(password: string) {
        stubProfile.set_password(password);
    }

    function givenToken(token: string) {
        stubOtp.set_token(token);
    }

    function shouldVerifyPass(account: string, password: string) {
        expect(authentication.is_valid(account, password)).toBe(true);
    }

    function shouldVerifyFail(account: string, password: string) {
        expect(authentication.is_valid(account, password)).toBe(false);
    }

    it('should be valid', () => {
        givenPassword('91');
        givenToken('000000');
        shouldVerifyPass('joey', '91000000');
    });

    it('should be invalid', () => {
        givenPassword('91');
        givenToken('000000');
        shouldVerifyFail('joey', '81000000');
    });

    it('should send message to account when invalid', () => {
        const spy = jest.spyOn(stubNotification, 'send');
        givenPassword('91');
        givenToken('000000');
        shouldVerifyFail('joey', '81000000');
        expect(spy).toHaveBeenCalled();
        expect(spy).toBeCalledWith(expect.stringContaining('joey'));
        expect(spy).toBeCalledWith(expect.stringContaining('login failed'));
    });
});
