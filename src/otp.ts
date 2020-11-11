export interface IToken {
    get_token(): number;
}

export class Otp implements IToken {
    get_token(): number {
        return Math.floor(Math.random() * Math.floor(1000000));
    }
}
