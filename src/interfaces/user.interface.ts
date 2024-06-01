import { StringExpressionOperatorReturningString } from "mongoose";

export interface IUser{
    email: string,
    id: StringExpressionOperatorReturningString,
    msg: string
}