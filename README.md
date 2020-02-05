# faunadb-fql-lib

[![Npm Version](https://img.shields.io/npm/v/faunadb-fql-lib)](https://www.npmjs.com/package/faunadb-fql-lib)
[![License](https://img.shields.io/npm/l/faunadb-fql-lib)](https://raw.githubusercontent.com/shiftx/faunadb-fql-lib/master/LICENSE)

## Functions

### `Reverse`

```js
import { Reverse } from "faunadb-fql-lib"

Reverse([1, 2, 3]) // => [3,2,1]
```

### `MapExtended`

A wrapper around `Map` that also works on "Page-like" objects. There is currently no way to construct a Page object
in FQL so passing `{ data: []}` to Map will not work.

```js
import { MapExtended } from "faunadb-fql-lib"

MapExtended({ data: ['foo', 'bar']}, Lambda('item', q.Var('item'))) // => ['foo', 'bar']
```

### `PaginateReverse`

Paging a set in reverse is possible but a bit tricky. This pure FQL function takes away the pain. Use it like Paginate.

NOTE: Wrapping `PaginateReverse` in `Map` will fail. Use `MapExtended` instead.

```js
import { query as q } from "faunadb"
import { PaginateReverse, MapExtended } from "faunadb-fql-lib"

MapExtended(
    PaginateReverse(setRef, opts),
    q.Lambda("ref", q.Get(q.Var("ref")))
)
```
