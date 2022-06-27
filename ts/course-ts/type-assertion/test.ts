import { IsTypeEqual, typeAssert } from "./index";


let getMaxIndex = <T>(input: T[], comparator: (a: T, b: T) => number)=>{
    if (input.length === 0) {
        return -1;
    }
    var maxIndex = 0;
    for (var i = 1; i < input.length; i++) {
        if (comparator(input[i]!, input[maxIndex]!) > 0) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

typeAssert<
    IsTypeEqual<
        typeof getMaxIndex,
        <T>(input: T[], comparator: (a: T, b: T) => number) => number
    >
>();