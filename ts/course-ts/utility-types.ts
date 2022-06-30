namespace UtilityClasses {
  // my own implementation of utility types

  type C_Partial<T extends object> = { [K in keyof T]?: T[K] };
  type C_Partial0<T extends object> = T extends { [K in keyof T]: infer V } ? { [K in keyof T]?: V } : never;
  type C_Partial1<T extends object> = T extends { [K in keyof T]: T[K] } ? { [K in keyof T]?: T[K] } : never;

  type C_Required<T extends object> = { [K in keyof T]-?: T[K] };
  type C_ReadOnly<T extends object> = { readonly [K in keyof T]: T[K] };

  type C_Record<K extends string | number | symbol, T> = { [P in K]: T };

  type C_Pick0<T, K> = { [P in Extract<K, keyof T>]: T[P] };
  type C_Pick<T extends object, Props extends keyof T> = { [k in Props]: T[k] };

  type C_Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P] };

  type C_NonNullable<T> = Exclude<T, undefined | null>;

  // type C_Params<T> = T extends (...agrs: [...infer P])=> any ? P : never
  type C_Params<T> = T extends (...agrs: infer P) => any ? P : never;

  type C_ConstructorParams<T> = T extends new (...args: infer P) => any ? P : never;

  /* ************************************ Mixin pattern ************************************ */

  // constructor function
  let deletabale = <T extends new (...args: any[]) => {}>(Base: T) => {
    // creates new classes with functionality of deletion
    return class extends Base {
      // @ts-ignore
      deleted: boolean;
      delete() {}
    };
  };

  class Car {
    constructor(public name: string) {}

    drive() {}

    buildCar() {
      // instantiate a car with some features
    }
  }

  type XCar = InstanceType<typeof Car>;

  class User {
    constructor(public name: string) {}
  }

  const DeletabaleCar = deletabale(Car);
  const DeletabaleUser = deletabale(User);

  type DeletabaleCarInstance = InstanceType<typeof DeletabaleCar>; // get type from anonymous classes
  type DeletabaleUserInstance = InstanceType<typeof DeletabaleUser>; // get type from anonymous classes

  class Profile {
    constructor(public user?: DeletabaleUserInstance, public car?: DeletabaleCarInstance) {}
  }

  let profile = new Profile();
  profile.user = new DeletabaleUser("Mourad");
  profile.car = new DeletabaleCar("Range-Rover");

  /* ************************************ This keyword (context) ************************************ */

  /* Note that the 'noImplicitThis' flag must be enabled to use this utility. */

  interface MyObject {
    sayHello(): void;
  }

  interface MyObjectThis {
    helloWorld(): string;
  }

  const myObject: MyObject & ThisType<MyObjectThis> = {
    // this object (context is of type MyObjectThis)
    sayHello() {
      console.log(this.helloWorld());
    },
  };

  let ctx: MyObjectThis = {
    helloWorld() {
      return "Hello world";
    },
  };

  myObject.sayHello = myObject.sayHello.bind(ctx);

  /* ************************************ This keyword (param) ************************************ */

  function zoo(this: string) {
    return this.toLocaleLowerCase();
  }

  type C_ThisParameterType<T> = T extends (this: infer N, ...args: any) => any ? N : unknown;
  type C_OmitThisParameter<T> = T extends (this: any, ...args: infer N) => infer R ? (...args: N) => R : never;

  type thisZooType = ThisParameterType<typeof zoo>;
  type thisZooOmitted = OmitThisParameter<typeof zoo>;

  /* ************************************ ***************** ************************************ */

  type C_Pick_0<T extends object, K extends keyof T> = {
    [Nk in K]: T[Nk];
  };

  type ZZ = Pick<{ x: number; y: string }, "x">;
}
