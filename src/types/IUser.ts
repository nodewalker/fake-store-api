export interface IUser {
    readonly _uid: string;
    username: string;
    balance: IBalance;
}

export interface IBalance {
    id: number;
    type: string;
    amout: number;
}