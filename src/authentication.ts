import {Profile} from "./profile.js";
import {IToken, Otp} from "./otp";

export interface INotification {
    send(account): void
}

class Notification implements INotification {
    send(msg) {
        console.log(msg);
    }
}

export class Authentication {
    constructor(profile: Profile = new Profile(), otp: IToken = new Otp(), notification: INotification = new Notification()) {
        this._profile = profile;
        this._otp = otp;
        this._notification = notification;
    }

    private readonly _profile: Profile;
    private readonly _otp: IToken;
    private readonly _notification: INotification;

    is_valid(account, password) {
        const password_from_profile = this._profile.get_password(account);
        const token = this._otp.get_token();
        console.log(`password:${password_from_profile}, token:${token}`);

        const valid_password = password_from_profile + token;
        if (valid_password === password) {
            return true;
        } else {
            this._notification.send(`account: ${account} login failed`);
            return false;
        }
    }
}
