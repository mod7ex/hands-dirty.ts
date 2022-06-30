namespace Custom_Utility_Types {}

// *******************************************

namespace Test_0 {
  let toFunctional = function (fn: Function): Function {
    let argsCount = fn.length;

    function createOrExe(subArgs: unknown[]) {
      return function (this: unknown) {
        let newArgs = subArgs.concat(Array.from(arguments));

        if (newArgs.length > argsCount) {
          throw new Error("Too many arguments");
        } else if (newArgs.length === argsCount) {
          return fn.call(this, ...newArgs);
        }
        return createOrExe(newArgs);
      };
    }

    return createOrExe([]);
  };

  interface MapperFunc<I, O> {
    (): MapperFunc<I, O>;
    (input: I[]): O[];
  }

  interface MapFunc {
    (): MapFunc;
    <I, O>(mapper: (x: I) => O): MapperFunc<I, O>;
    <I, O>(mapper: (x: I) => O, input: I[]): O[];
  }

  let map = toFunctional(<I, O>(mapper: (x: I) => O, input: I[]): O[] => input.map(mapper)) as MapFunc;

  // ----------------------------------------------------------------------------------------

  interface FiltererFunc<T> {
    (): FiltererFunc<T>;
    (input: T[]): T[];
  }

  interface FilterFunc {
    (): FilterFunc;
    <T>(filterer: (x: T) => boolean): FiltererFunc<T>;
    <T>(filterer: (x: T) => boolean, input: T[]): T[];
  }

  let filter = toFunctional(<T>(filterer: (x: T) => boolean, input: T[]): T[] => input.filter(filterer)) as FilterFunc;

  // ----------------------------------------------------------------------------------------

  interface ReducerFunc<I, O> {
    (): ReducerFunc<I, O>;
    (input: I[]): O;
  }

  interface InitializedReducerFunc<I, O> {
    (): InitializedReducerFunc<I, O>;
    (initialVal: O): ReducerFunc<I, O>;
    (initialVal: O, input: I[]): O;
  }

  interface ReduceFunc {
    (): ReduceFunc;
    <O, I>(reducer: (acc: O, curr: I[]) => O): InitializedReducerFunc<I, O>;
    <O, I>(reducer: (acc: O, curr: I[]) => O, initialVal: O): ReducerFunc<I, O>;
    <O, I>(reducer: (acc: O, curr: I[]) => O, initialVal: O, input: I[]): O;
  }

  let reduce = toFunctional(<O, I>(reducer: (acc: O, curr: I) => O, initialVal: O, input: I[]): O => input.reduce(reducer, initialVal)) as ReduceFunc;

  // ----------------------------------------------------------------------------------------

  interface NumericFunc {
    (): NumericFunc;
    (x: number): number;
  }

  interface NumericFunc0 {
    (): NumericFunc0;
    (a: number): NumericFunc;
    (a: number, b: number): number;
  }

  let add = toFunctional((a: number, b: number) => a + b) as NumericFunc0;
  let subtract = toFunctional((a: number, b: number) => a - b) as NumericFunc0;

  // ----------------------------------------------------------------------------------------

  interface PropExtractor<T extends object, K extends keyof T> {
    (): PropExtractor<T, K>;
    (prop: K): T[K];
  }

  interface PropFunc {
    (): PropFunc;
    <T extends object, K extends keyof T>(target: T): PropExtractor<T, K>;
    <T extends object, K extends keyof T>(target: T, prop: K): T[K];
  }

  let prop = toFunctional(<T extends object, K extends keyof T>(target: T, prop: K): T[K] => target[prop]) as PropFunc;

  // ----------------------------------------------------------------------------------------

  type Func = (...args: any[]) => any;

  type LastItem<T extends any[], D = undefined> = T extends [...infer F, infer L] ? L : D;

  type ExecuterFunc<T extends Function[]> = (...args: unknown[]) => ReturnType<LastItem<T, Func>>; // well this isn't true it's not exact

  interface PipeFunc {
    (): PipeFunc;
    <T extends Function[]>(...functions: T): ExecuterFunc<T>;
  }

  let pipe: PipeFunc = function (...functions: Function[]) {
    if (arguments.length === 0) {
      return pipe;
    }
    return function () {
      let nextArguments = Array.from(arguments);
      let result;
      for (const func of functions) {
        result = func(...nextArguments);
        nextArguments = [result];
      }
      return result;
    };
  };
}
