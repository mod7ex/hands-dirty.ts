namespace Conditional_Types {

    type TypeName<T> = 
        T extends string ? 'string' :
        T extends number ? 'number' : 
        T extends symbol ? 'symbol' : 
        T extends Function ? 'function' : 
        T extends null ? 'null' : 
        T extends undefined ? 'undefined' : 
        T extends boolean ? 'boolean' : 
        'object';

    function typeName<T>(t: T): TypeName<T>{
        return typeof t as TypeName<T>
    }

    let str = typeName("Modex98");
    let n = typeName(null);
}
