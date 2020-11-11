import {Profile} from "./profile.js";
import {IToken, Otp} from "./otp";

export class Authentication {
    constructor(profile: Profile = new Profile(), otp: IToken = new Otp()) {
        this._profile = profile;
        this._otp = otp;
    }

    private readonly _profile: Profile;
    private readonly _otp: IToken;

    is_valid(account, password) {
        const password_from_profile = this._profile.get_password(account);
        const token = this._otp.get_token();
        console.log(`password:${password_from_profile}, token:${token}`);

        const valid_password = password_from_profile + token;
        if (valid_password === password) {
            return true;
        } else {
            return false;
        }
    }

    send(account) {
        console.log(`account: ${account} login failed`);
    }
}
