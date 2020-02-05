import { ExprArg, Lambda, ExprVal } from "faunadb";
export declare const MapExtended: (collection: ExprArg, lambdaExpr: string | number | boolean | import("faunadb").Expr | {
    [key: string]: any;
} | ExprVal[] | Lambda) => ExprVal;
