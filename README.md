# faunadb-fql-lib

[![Npm Version](https://img.shields.io/npm/v/faunadb-fql-lib)](https://www.npmjs.com/package/faunadb-fql-lib)
[![License](https://img.shields.io/npm/l/faunadb-fql-lib)](https://raw.githubusercontent.com/shiftx/faunadb-fql-lib/master/LICENSE)

## Functions

### `Reverse`

```js
import { Reverse } from "faunadb-fql-lib"

Reverse([1, 2, 3]) // => [3,2,1]
```

### `PaginateReverse`

Paging a set in reverse is possible but a bit tricky. This pure FQL function takes away the pain. Use it like Paginate.

NOTE: There is currently no way to construct a Page object in FQL so you have to use the `MapFakePage` function instead of the regular `Map`. Using `Map` will result in an error

```js
import { query as q } from "faunadb"
import { PaginateReverse, MapFakePage } from "faunadb-fql-lib"

MapFakePage(
    PaginateReverse(setRef, opts),
    q.Lambda("ref", q.Get(q.Var("ref")))
)
```
