import { ExprArg, Lambda } from "faunadb";
export declare const MapExtended: (collection: ExprArg, lambdaExpr: string | number | boolean | import("faunadb").Expr | {
    [key: string]: any;
} | import("faunadb").ExprVal[] | Lambda) => import("faunadb").Expr;
