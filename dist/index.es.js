import{query as a}from"faunadb";const c=c=>a.Reduce(a.Lambda(["acc","val"],a.Append(a.Var("acc"),[a.Var("val")])),[],c);export{c as Reverse};
