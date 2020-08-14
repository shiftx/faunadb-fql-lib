# faunadb-fql-lib

[![Npm Version](https://img.shields.io/npm/v/faunadb-fql-lib)](https://www.npmjs.com/package/faunadb-fql-lib)
[![License](https://img.shields.io/npm/l/faunadb-fql-lib)](https://raw.githubusercontent.com/shiftx/faunadb-fql-lib/master/LICENSE)
[![Test](https://github.com/shiftx/faunadb-fql-lib/workflows/Test/badge.svg)](https://github.com/shiftx/faunadb-fql-lib/actions?query=workflow%3ATest)

## Quickstart

### Installation

`yarn add faunadb-fql-lib` or `npm install faunadb-fql-lib`

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

Most functions in this library are built using pure FQL, and can be safly generated and used in Fauna.
Expetions are marked and will be made pure if possible by future releases of Fauna.

### [Functions](#Functions)

* [ArrayReverse](#arrayreverse)
* [CreateAt](#createat)
* [Debug](#debug)
* [DeepMerge](#deepmerge)
* [DeleteAt](#deleteat)
* [EventExistsAt](#eventexistsat)
* [Find](#find)
* [FindIndex](#findindex)
* [Flatten](#flatten)
* [FlattenDoc](#flattendoc)
* [GetAll](#getall)
* [InsertAtIndex](#insertatindex)
* [MapSelect](#mapselect)
* [ObjectKeys](#objectkeys)
* [PaginateReverse](#paginatereverse)
* [PageToObject](#pagetoobject)
* [RandomString](#randomstring) - Experimental
* [SelectRef](#selectref)
* [Slice](#slice)
* [StringSplit](#stringsplit)
* [Switch](#switch)
* [ToJson](#tojson)
* [Trace](#trace)
* [UpdateAt](#updateat) - Experimental
* [WithIndex](#withindex)

### [FQLib functions](#fqlib-functions) - alternatives to built-in FQL functions

These are functions that extend and/or alternate the behaviour of existing FQL functions.
All functions suffixed with `FQLib` already exists but behaves differently.

* [ContainsFQLib](#ContainsFQLib)
* [MapFQLib](#MapFQLib)
* [SelectFQLib](#SelectFQLib)

## Functions


### ArrayReverse

```js
import { query as q } from "faunadb-fql-lib"

q.ArrayReverse([1, 2, 3]) // => [3,2,1]
```

### CreateAt

```js
import { query as q } from "faunadb-fql-lib"

q.CreateAt(q.Collection("Foos"), 150000000000000, {
    data: { foo: "bar" },
})
```

### Debug
A debug/dev utility for aborting the query at any point and return a JSON object.

```js
import { query as q } from "faunadb-fql-lib"

q.Debug({ foo: 'Bar' })
```

### DeepMerge
Deep merges two objects. Provide depth level as third argument. Note: Currently Fauna does not
support recursion without creating a user defined function so the function is not 100% pure FQL
and will need a pre-set depth limit.

```js
import { query as q } from "faunadb-fql-lib"

q.DeepMerge(
    { data: { a: { a1: 1 } } },
    { data: { a: { a2: 2 } } },
    3
) // => { data: { a: { a1: 1, a2: 2 } } }
```


### DeleteAt

Helper around Insert. Will Insert a delete event at the given timestamp.

```js
import { query as q } from "faunadb-fql-lib"

q.DeleteAt(q.Ref(q.Collection("Foos"), '1234'), 150000000000000)
```

### EventExistsAt

Check if there exists an event at the exact given timestamp.

```js
import { query as q } from "faunadb-fql-lib"

q.EventExistsAt(q.Ref(q.Collection("Foos"), '1234'), 150000000000000) // => truer
```

### Find

Wrapper around `Filter` that returns the first match.

```js
import { query as q } from "faunadb-fql-lib"

const array = [{ id: "1" }, { id: "2" }, { id: "3" }]

q.Find(
    array,
    q.Lambda(
        "item",
        q.Equals("3", q.Select(["id"], q.Var("item")))
    )
) // => { id: "3" }
```

### FindIndex

Returns the index of the first item in an array that matches a Lambda expression.

```js
import { query as q } from "faunadb-fql-lib"

const array = [{ id: "1" }, { id: "2" }, { id: "3" }]

q.FindIndex(
    array,
    q.Lambda(
        "item",
        q.Equals("3", q.Select(["id"], q.Var("item")))
    )
) // => 2
```

### Flatten

Flatten an Array. (one level deep only)

```js
import { query as q } from "faunadb-fql-lib"

q.Flatten([["a", "b"], ["c", "d"], "e"]) // => ["a", "b", "c", "d", "e"]
```

### FlattenDoc

```js
import { query as q } from "faunadb-fql-lib"

q.FlattenDoc({
    ref: q.Ref(q.Collection("Foos"), "1"),
    ts: 1234,
    data: {
        foo: 1,
        bar: 2
    }
}) /* => {
    ref: q.Ref(q.Collection("Foos"), "1"),
    ts: 1234,
    foo: 1,
    bar: 2
} */
```

### GetAll

For indexes returning only one Ref as value GetAll is a shorthand for using map to Get all items.

```js
import { query as q } from "faunadb-fql-lib"

// These two queries are the same.

q.GetAll(
    q.Paginate(
        q.Documents(q.Collection('Foos')),
        { size: 10 }
    )
)

q.Map(
    q.Paginate(
        q.Documents(q.Collection('Foos')),
        { size: 10 }
    ),
    q.Lambda('ref', q.Get(q.Var('ref')))
)
```

### InsertAtIndex

Insert item in array at given index. -1 will add to the end of array.

```js
import { query as q } from "faunadb-fql-lib"

q.InsertAtIndex(["a", "b", "c", "d"], 2, "foo") // => ["a", "b", "foo", "c", "d"]
q.InsertAtIndex(["a", "b", "c", "d"], 0, "foo") // => ["foo", "a", "b", "c", "d"]
q.InsertAtIndex(["a", "b", "c", "d"], -1, "foo") // => ["a", "b", "c", "d", "foo"]
```

### MapSelect

`Map` and `Select` combined.

```js
import { query as q } from "faunadb-fql-lib"

q.MapSelect([{ id: "1" }, { id: "2" }, { id: "3" }], ["id"]) // => ["1", "2", "3"]
```

### ObjectKeys

```js
import { query as q } from "faunadb-fql-lib"

q.ObjectKeys({ foo: "1", bar: "2" }) // => ["foo", "bar"]
```

### PageToObject

This function takes the `before`, `after` and `data` properties on Page and creates an Object.
Usful with other functions that don"t accept Pages. PageToObject is used by MapFQLib.

```js
import { query as q } from "faunadb-fql-lib"

q.PageToObject(q.Paginate(...))
```

### PaginateReverse

Paging a set in reverse is possible but a bit tricky. This pure FQL function takes away the pain. Use it like Paginate.

NOTE: Wrapping `PaginateReverse` in `Map` will fail. Use `MapFQLib` instead.

```js
import { query as q } from "faunadb-fql-lib"

q.MapFQLib(
    q.PaginateReverse(setRef, opts),
    q.Lambda("ref", q.Get(q.Var("ref")))
)
```

### SelectRef

Select and return the ref from an object.

```js
import { query as q } from "faunadb-fql-lib"

q.SelectRef({
    ref: q.Ref(q.Collection("Foos"), "1234"),
    ts: 150000000000000,
    data: {...}
}) // => q.Ref(q.Collection("Foos"), "1234")
```

### Slice

Slice an array by start and optional end index positions.

```js
import { query as q } from "faunadb-fql-lib"

const array = [1, 2, 3, 4, 5, 6]

q.Slice(array, 1, 2) // => [2, 3]
q.Slice(array, 1) // => [2, 3, 4, 5, 6]
```

### StringSplit

Takes a string and an optional delimiter (defaults to `.`) and splits the string into an array.

```js
import { query as q } from "faunadb-fql-lib"

q.StringSplit("foo.bar.fooBar") // => ["foo", "bar", "fooBar"]
q.StringSplit("foo bar fooBar", " ") // => ["foo", "bar", "fooBar"]
q.StringSplit("foo-bar-fooBar", "-") // => ["foo", "bar", "fooBar"]
```

### RandomString

Generates a random string of a given length. Provide optional alphabet.

```js
import { query as q } from "faunadb-fql-lib"

q.RandomString(10) // => "1RsBc2SmCc"
q.RandomString(5, "ABC") // => "BCCBC"
```

### Switch

Creates a switch statement that checks a string and evaluates the matching expression in a matchers object.
A third argument can be provided as default value if no match is found. Without default the transaction will abort.

NOT 100% PURE! The switchObject provided can't be dynamically generated in Fauna and needs to be provided on the client.

```js
import { query as q } from "faunadb-fql-lib"

const switchObject = {
    foo: q.Add(1,2),
    bar: q.Concat(["Hi", "there"], " ")
}

q.Switch("foo", switchObject) // => 3
q.Switch("bar", switchObject) // => "Hi there"
q.Switch("missing", switchObject) // => ERR: transaction aborted, Key 'missing' not supported by Switch
q.Switch("missing", switchObject, q.UpperCase("fallback expr")) // => "FALLBACK EXPR"
```

### ToJson

A simple wrapper around `Format` that takes any expression and returns it as a JSON string. Also great for returning errors in `q.Abort()`.

```js
import { query as q } from "faunadb-fql-lib"

q.ToJson({ foo: "1", bar: q.Add(1, 2) }) // => {"foo":"1","bar":3}
```

### Trace

Debug function that will add a keyword to your position trace if the query fails.
Usefull when debugging complex and deeply nested fql queries.

```js
import { query as q } from "faunadb-fql-lib"

const array = [1, 2, 3, 4, 5, 6]

q.Trace('keyWord', q.Get(...))
```

### UpdateAt (Experimental)

Experimental function that will allow you to update a document at a given point in time and merge the change with newer events.
Please see test file for more information.

### WithIndex

Takes an array and wraps each element in an array containing the original value and the index. 

```js
import { query as q } from "faunadb-fql-lib"

q.WithIndex(["a", "b"]) // => [["a", 0], ["b", 1]]

q.Map(q.WithIndex(["foo", "bar"]), q.Lambda(["val", "i"], q.Var("i"))) // => [0, 1]
```

## FQLib functions

### ContainsFQLib

Alternative to `Contains` that supports both array and string as path.

```js
import { query as q } from "faunadb-fql-lib"

q.ContainsFQLib([foo, 1], { foo: ["a", "b"] }) // => true
q.ContainsFQLib("foo.1", { foo: ["a", "b"] }) // => true
```

### MapFQLib

A wrapper around `Map` that also works on "Page-like" objects. There is currently no way
to construct a Page object in FQL so passing `{ data: [] }` to Map will not work.

```js
import { MapFQLib } from "faunadb-fql-lib"

q.MapFQLib({ data: ["foo", "bar"]}, q.Lambda("item", q.Var("item"))) // => ["foo", "bar"]
```

### SelectFQLib

Alternative to `Select` that supports both array and string as path and does not evaluate
the default value unless there is no match.

```js
import { query as q } from "faunadb-fql-lib"

q.SelectFQLib([foo, 1], { foo: ["a", "b"] }) // => "b"
q.SelectFQLib("foo.1", { foo: ["a", "b"] }) // => "b"
q.SelectFQLib("bar.2", { foo: ["a", "b"] }, "default") // => "default"

/* The current Select in FQL always evaluates the default statement and will
create a document even if the value was found */
q.Select(["bar", 0], { foo: ["a", "b"] }, q.Create(q.Collection('Foos'))) // => "a" + document created in Foos

/* SelectFQLLib will only evaluate if there is no match, so mutations are safe */
q.SelectFQLib(["bar", 0], { foo: ["a", "b"] }, q.Create(q.Collection('Foos'))) // => "a" no ducument created
```


