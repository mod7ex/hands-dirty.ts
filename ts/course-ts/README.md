## `any` and `unknown` are universal types you can assign to them anything `object, string ...`

## but `any` can be assigned to any variable not like `unknown` it can't be assigned to a different type like `boolean`

```
let x: unknown;
let y: any;

let bool: boolean = y; // because y is of type any
let str: string = x; // error ==> because x is of type unknown
```

# so `unknown` is a safe version of `any`

---
