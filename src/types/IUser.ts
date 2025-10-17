export interface IUser {
    readonly _uid: string;
    username: string;
    balance: IBalance;
    avatarUrl: string;
}

export interface IBalance {
    id: number;
    type: string;
    amout: number;
}

export type BalanceType = 'money' | 'gem';
