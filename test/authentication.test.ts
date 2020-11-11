import {Authentication} from "../src/authentication";

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

describe('authenticate account is valid', function () {
    let stubProfile: StubProfile;
    let stubOtp: StubOtp;
    let authentication: Authentication;

    beforeEach(() => {
        stubProfile = new StubProfile();
        stubOtp = new StubOtp();
        authentication = new Authentication(stubProfile, stubOtp);
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

    it('should be valid', () => {
        givenPassword('91');
        givenToken('000000');
        shouldVerifyPass('joey', '91000000');
    });
});
