// `@ts-nocheck`
// this comment will ignore all errors in the page

namespace Index {
  type Falsy = null | undefined | false | "" | 0;

  type NotFalsy<T = Falsy> = T extends Falsy ? never : T;

  let x: NotFalsy<string> = "";

  // ********************************************************************************* Distribution

  // it filters U from T --- called Exclude in ts ---
  type Filter<T, U> = T extends U ? never : T;

  type FilteredResult = Filter<"a" | "b" | "c", "a" | "z">;

  // *********************************************************************************
}

namespace Ts {
  const a = [1, 2, 3, 4, 5] as const;
  // const a = [1, 2, 3, 4, 5];
  const b = a[2];

  /*
		type X = typeof a["length"];

		const arr = [1, 2, 3] as const;
		type N = typeof arr[number];
	*/

  type IndexesOf<T extends readonly unknown[], S extends number[] = []> = T["length"] extends S["length"] ? S[number] : IndexesOf<T, [S["length"], ...S]>;

  type IndexesOfA = IndexesOf<typeof a>;

  // @ts-ignore
  a.map((_v, i: IndexesOfA) => {
    const c = a[i];
  });

  // *********************************************************************************

  type Row = "a" | "b";
  type Col = 1 | 2;

  const toPosition = (position: `${Row}${Col}`) => {};

  // *********************************************************************************

  type CountTo<N extends number, S extends 0[] = []> = S["length"] extends N ? S : CountTo<N, [...S, 0]>;
  type Inc<N extends number> = [...CountTo<N>, 0]["length"];
  type Dec<N extends number> = CountTo<N> extends [infer H, ...infer T] ? T["length"] : 0;

  type Result = CountTo<10>;

  // ********************************************************************************* Look up types

  type A = ["a", 0, "b", 1];
  type Index = A[number];

  type Person = {
    name: {
      first: string;
      last: string;
    };
    age: number;
    address: {
      country: string;
      state: string;
      city: string;
      zip_code: number;
    };
    friends: Person[];
    gender: "male" | "female";
  };

  type PersonFields = keyof Person;
  let fields: PersonFields[] = ["gender", "friends"];

  let name: Person["name"];
  let friend: Person["friends"][0];
  let oneOfTheFriends: Person["friends"][number];

  // *********************************************************************************************

  type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };

  // all possible combinations will be there
  type Primitive = string | number | symbol;
  type TupleUnion<U extends Primitive, R extends Primitive[] = []> = { [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]> }[U] & string[];

  // ----------------------------------------------------------------------------------------------
  type ValueOf<T extends object> = T[keyof T];
  type KeyOf<T extends object, V extends ValueOf<T>> = ValueOf<{ [K in keyof T]: V extends T[K] ? K : never }>;

  type IndexOf<T extends unknown[], K extends T[number]> = ValueOf<{
    [NK in IndexesOf<T>]: K extends T[NK] ? NK : never;
  }>;

  // *********************************************************************************************

  type Circle = { radius: number };
  type Square = { size: number };
  const example = getShape();

  // if (someCondition && 'radius' in example) { // this has a cost in run time
  if (someCondition) {
    // so we use this
    // @ts-ignore
    declare const example: Circle; // this doesn't have a cost
    console.log("i am sure it is a circle ", example.radius);
  }

  // ---------------------------------------------------------------------------------------------- Template literals

  let id: `user-${string}`;
  let image: `img-${string}.png`;

  type CSSValue =
    | number // implies 'px
    | string; // number + px|em|rem

  let size = function (input: CSSValue) {
    return typeof input === "number" ? input + "px" : input;
  };

  size("12ex"); // Error
  type Good_CSSValue =
    | number // implies 'px
    | `${number}px`
    | `${number}em`
    | `${number}rem`;

  let good_size = function (input: Good_CSSValue) {
    return typeof input === "number" ? input + "px" : input;
  };

  good_size("sss"); // Error

  // ---------------------------------------------------------------------------------------------- Object keys
  // this is how we do in js
  /**
   * @typedef {Object} Prizes
   * @property {string} first
   * @property {string} second
   */

  type Prizes = {
    first: string;
    second: string;
  };

  /** @param {Prizes} prizes */ // this is how we do in js
  function logPrizes(prizes: Prizes) {
    let key: keyof Prizes;
    for (key in prizes) {
      console.log(key, prizes[key].toUpperCase());
    }
  }

  // ---------------------------------------------------------------------------------------------- Type Guards
  type Squarre = {
    type: "square";
    size: number;
  };

  type Rectangle = {
    type: "rectangle";
    height: number;
    width: number;
  };

  type Shape = Squarre | Rectangle;

  let isRectangle = (item: Shape): item is Rectangle => item.type === "rectangle"; // this is what a type guard is

  const shapes: Shape[] = [];
  let sq = shapes.find((s): s is Squarre => s.type === "square");
  sq!.size;

  // ---------------------------------------------------------------------------------------------- Opaque Types
  type AccountNumber = number & { _: "account_number" };
  type AccountBalance = number & { _: "account_balance" };

  let makeAccountNumber = (num: number) => num as AccountNumber;
  let makeAccountBalance = (num: number) => num as AccountBalance;

  let setupAccount = (num: AccountNumber, bl: AccountBalance) => {
    //
  };

  let num = makeAccountNumber(100);
  let bl = makeAccountBalance(23);

  // setupAccount(bl, num);// this is an error
  setupAccount(num, bl);

  // ---------------------------------------------------------------------------------------------- null & undefined

  console.log(null == undefined); // true
  console.log(undefined == null); // true
  console.log(undefined == undefined); // true
  console.log(undefined == undefined); // true
  console.log(null == null); // true

  function exo(value: string | null | undefined) {
    if (value == null) {
      // here value is null or undefined
      console.log(value);
    }

    if (value != null) {
      // here value isn't null and isn't undefined ==> it is a string
      console.log(value);
    }

    if (value !== null) {
      // here value is undefined or string
      console.log(value);
    }
  }
}
