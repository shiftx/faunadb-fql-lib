# faunadb-fql-lib

[![Npm Version](https://img.shields.io/npm/v/faunadb-fql-lib)](https://www.npmjs.com/package/faunadb-fql-lib)
[![License](https://img.shields.io/npm/l/faunadb-fql-lib)](https://raw.githubusercontent.com/shiftx/faunadb-fql-lib/master/LICENSE)

## Quickstart

### Installation

`yarn add faunadb-fql-lib` or `npm install aunadb-fql-lib`

### Usage

#### Merged with faunadb-js query

You can import query from faunadb-fql-lib and the functions will be merged with all of Faunas built-in functions.

```
import { query as q } from "faunadb-fql-lib"
```

Or import each function as needed.

```
import { MapExtended } from "faunadb-fql-lib"
```

## Functions

* [`MapExtended`](#MapExtended)
* [`ObjectKeys`](#ObjectKeys)
* [`Reverse`](#Reverse)
* [`PaginateReverse`](#PaginateReverse)

### `MapExtended`

A wrapper around `Map` that also works on "Page-like" objects. There is currently no way to construct a Page object
in FQL so passing `{ data: []}` to Map will not work.

```js
import { MapExtended } from "faunadb-fql-lib"

MapExtended({ data: ["foo", "bar"]}, Lambda("item", q.Var("item"))) // => ["foo", "bar"]
```

### `ObjectKeys`

Return the keys as array from an object

```js
import { query as q } from "faunadb-fql-lib"

q.ObjectKeys({ foo: "1", bar: "2" }) // => ["foo", "bar"]
```


### `Reverse`

```js
import { query as q } from "faunadb-fql-lib"

q.Reverse([1, 2, 3]) // => [3,2,1]
```

### `PaginateReverse`

Paging a set in reverse is possible but a bit tricky. This pure FQL function takes away the pain. Use it like Paginate.

NOTE: Wrapping `PaginateReverse` in `Map` will fail. Use `MapExtended` instead.

```js
import { query as q } from "faunadb-fql-lib"

q.MapExtended(
    q.PaginateReverse(setRef, opts),
    q.Lambda("ref", q.Get(q.Var("ref")))
)
```
