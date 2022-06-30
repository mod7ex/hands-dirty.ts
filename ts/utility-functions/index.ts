namespace Utility_Functions {
  /*
        --> the function countSubStrings counts how many (separated or not) times the srearchSubject appears in str
        --> countSubStrings('sss', 'ss', true) => 1
        --> countSubStrings('sss', 'ss') => 2
    */

  const countSubStrings = (
    str: string,
    srearchSubject: string,
    separated: boolean
  ): number => {
    if (!srearchSubject) return 0;

    let step: number = separated ? srearchSubject.length : 1,
      count: number = 0,
      i: number = 0,
      r: number;

    while (true) {
      r = str.indexOf(srearchSubject, i);
      if (r !== -1) [count, i] = [count + 1, r + step];
      else return count;
    }
  };

  let maybeRun = function (cb: Function, allow: boolean, ctx: object = window) {
    return function () {
      if (!allow) return;

      cb.call(ctx, ...arguments);
      // cb.apply(ctx, arguments);
    };
  };

  /* *********************************************************** */

  function toFunctional<T extends Function>(func: T): Function {
    const fullArgCount = func.length;
    function createSubFunction(curriedArgs: unknown[]) {
      return function (this: unknown) {
        const newCurriedArguments = curriedArgs.concat(Array.from(arguments));
        if (newCurriedArguments.length > fullArgCount) {
          throw new Error("Too many arguments");
        }
        if (newCurriedArguments.length === fullArgCount) {
          return func.apply(this, newCurriedArguments);
        }
        return createSubFunction(newCurriedArguments);
      };
    }
    return createSubFunction([]);
  }
}
