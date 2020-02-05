# faunadb-fql-lib

[![Npm Version](https://img.shields.io/npm/v/faunadb-fql-lib)](https://www.npmjs.com/package/faunadb-fql-lib)
[![License](https://img.shields.io/npm/l/faunadb-fql-lib)](https://raw.githubusercontent.com/shiftx/faunadb-fql-lib/master/LICENSE)
[![Test](https://github.com/shiftx/faunadb-fql-lib/workflows/Test/badge.svg)](https://github.com/shiftx/faunadb-fql-lib/actions?query=workflow%3ATest)

## Quickstart

### Installation

`yarn add faunadb-fql-lib` or `npm install aunadb-fql-lib`

### Usage

#### Merged with faunadb-js query

You can import `query` from faunadb-fql-lib and the functions will be merged with all of Faunas built-in functions.
If there is ever a naming conflict in an updated version of faunadb-js then this will throw an error.

```
import { query as q } from "faunadb-fql-lib"
```

Or import each function as needed.

```
import { MapFQLib } from "faunadb-fql-lib"
```

## List of all functions

All functions in this library are built using pure FQL. That means that they are also safe to use in stored Fauna Functions.

### [`Functions`](#Functions)

* [`ArrayReverse`](#ArrayReverse)
* [`ObjectKeys`](#ObjectKeys)
* [`PaginateReverse`](#PaginateReverse)
* [`PageToObject`](#PageToObject)
* [`StringSplit`](#PaginateReverse)

### [`FQLib functions`](#fqlib-functions) - alternatives to built-in FQL functions

These are functions that extend and/or alternate the behaviour of existing FQL functions.
All functions suffixed with `FQLib` already exists but behaves differently.

* [`ContainsFQLib`](#ContainsFQLib)
* [`MapFQLib`](#MapFQLib)
* [`SelectFQLib`](#SelectFQLib)

## Functions


### `ArrayReverse`

```js
import { query as q } from "faunadb-fql-lib"

q.ArrayReverse([1, 2, 3]) // => [3,2,1]
```


### `ObjectKeys`

```js
import { query as q } from "faunadb-fql-lib"

q.ObjectKeys({ foo: "1", bar: "2" }) // => ["foo", "bar"]
```

### `PaginateReverse`

Paging a set in reverse is possible but a bit tricky. This pure FQL function takes away the pain. Use it like Paginate.

NOTE: Wrapping `PaginateReverse` in `Map` will fail. Use `MapFQLib` instead.

```js
import { query as q } from "faunadb-fql-lib"

q.MapFQLib(
    q.PaginateReverse(setRef, opts),
    q.Lambda("ref", q.Get(q.Var("ref")))
)
```

### `PageToObject`

This function takes the `before`, `after` and `data` properties on Page and creates an Object.
Usful with other functions that don"t accept Pages. PageToObject is used by MapFQLib.

```js
import { query as q } from "faunadb-fql-lib"

q.PageToObject(q.Paginate(...))
```

### `StringSplit`

Takes a string and an optional delimiter (defaults to `.`) and splits the string into an array.

```js
import { query as q } from "faunadb-fql-lib"

q.StringSplit("foo.bar.fooBar") // => ["foo", "bar", "fooBar"]
q.StringSplit("foo bar fooBar", " ") // => ["foo", "bar", "fooBar"]
q.StringSplit("foo-bar-fooBar", "-") // => ["foo", "bar", "fooBar"]
```

## FQLib functions

### `ContainsFQLib`

Alternative to `Contains` that supports both array and string as path.

```js
import { query as q } from "faunadb-fql-lib"

ContainsFQLib([foo, 1], { foo: ["a", "b"] }) // => true
ContainsFQLib("foo.1", { foo: ["a", "b"] }) // => true
```

### `MapFQLib`

A wrapper around `Map` that also works on "Page-like" objects. There is currently no way
to construct a Page object in FQL so passing `{ data: [] }` to Map will not work.

```js
import { MapFQLib } from "faunadb-fql-lib"

MapFQLib({ data: ["foo", "bar"]}, Lambda("item", q.Var("item"))) // => ["foo", "bar"]
```

### `SelectFQLib`

Alternative to `Select` that supports both array and string as path and does not evaluate
the default value unless there is no match.

```js
import { query as q } from "faunadb-fql-lib"

SelectFQLib([foo, 1], { foo: ["a", "b"] }) // => "b"
SelectFQLib("foo.1", { foo: ["a", "b"] }) // => "b"
SelectFQLib("bar.2", { foo: ["a", "b"] }, "default") // => "default"

/*
The below will create a document even if the value was found
*/

Select(["bar", 0], { foo: ["a", "b"] }, q.Create(q.Collection('Foos'))) // => "a" + document created in Foos
SelectFQLib(["bar", 0], { foo: ["a", "b"] }, q.Create(q.Collection('Foos'))) // => "a" no ducument created
```


