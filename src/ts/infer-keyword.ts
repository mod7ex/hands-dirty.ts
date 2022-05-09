type QueueJob<Q extends string, P> = {
	queue: Q;
	payload: P;
};

type WelcomeEmail = {
	to: string;
	body: string;
};

type ProcessPayment = {
	userName: string;
	accountId: number;
};

type WelcomeEmailJob = QueueJob<"email", WelcomeEmail>;

type ProcessPaymentJob = QueueJob<"batch", ProcessPayment>;

type QueueName<T extends QueueJob<string, unknown>> = T extends QueueJob<infer N, unknown> ? N : never;

type EmailQueue = QueueName<WelcomeEmailJob>;

// ********************************************************************************** next infer with array

// fake type to check if equality

type CustomEqual<A, B> = A extends B ? true : never;

// check if an array includes a specific type

type Includes<T extends any[], U> = T extends [infer F, ...infer R] ? (CustomEqual<F, U> extends true ? true : Includes<R, U>) : false;

// ********************************************************************************** next with functions

type FirstParam<T extends (...args: any[]) => any> = T extends (...args: [infer F, ...any[]]) => any ? F : never;
type MyParams<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never;
type MyReturn<T> = T extends (...args: any[]) => infer R ? R : never;

// ********************************************************************************** next

type Chars = " " | "_" | ".";

type Trim<T extends string> = T extends `${Chars}${infer R}` ? Trim<R> : T extends `${infer L}${Chars}` ? Trim<L> : T;

// ********************************************************************************** next

type WS = " " | "\n" | "\t";

type TrimLeft<S extends string> = S extends `${WS}${infer R}` ? TrimLeft<R> : S;

type TrimRight<S extends string> = S extends `${infer L}${WS}` ? TrimRight<L> : S;

type Trim1<S extends string> = TrimRight<TrimLeft<S>>;

// ********************************************************************************** next

type Replace<S extends string, From extends string, To extends string> = From extends "" ? S : S extends `${infer Prefix}${From}${infer Rest}` ? `${Prefix}${To}${Rest}` : S;

type ReplaceAll<S extends string, From extends string, To extends string> = From extends "" ? S : S extends `${infer Prefix}${From}${infer Rest}` ? `${Replace<Prefix, From, To>}${To}${Replace<Rest, From, To>}` : S;

// ********************************************************************************** next

type StartsWith<S extends string, I extends string> = S extends `${I}${infer _}` ? true : false;
type EndsWith<S extends string, I extends string> = S extends `${infer _}${I}` ? true : false;

// ********************************************************************************** next

interface User {
	id: string;
}

interface Message {
	id: number;
}

let getId0 = <T extends { id: any }>(obj: T): T extends User ? string : number => {
	return obj.id;
};

let getId = <T extends { id: any }>(obj: T): T extends { id: infer N } ? N : never => {
	return obj.id;
};

let userId = getId({} as User);
let messageId = getId({} as Message);

// ********************************************************************************** next
type KeysTypes<T extends object = object> = T extends infer R ? keyof R : never;
type ValuesTYpes<T extends object = object> = T extends infer R ? R[keyof R] : never;

type X = KeysTypes<{ name: "string"; age: 12 }>;
type Y = ValuesTYpes<{ name: "string"; age: 12 }>;

// ********************************************************************************** next

// type GetStatus<T> = T extends { status: string } ? T["status"] : null;
type GetStatus<T> = T extends infer R ? (R extends { status: any } ? R["status"] : null) : null;

type Status = GetStatus<{ status: "23" }>;

// ********************************************************************************** next
type PropType<T> = T extends { a: infer A; b?: number } ? A : any;
type PropTypeComb<T> = T extends { a: infer A; b?: infer B } ? A & B : any;

type XT = PropType<{ a: boolean; b: number }>;
type YT = PropTypeComb<{ a: { Akey: void }; b: { Bkey: "number" } }>;

// ********************************************************************************** next Instance

type C_InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : unknown;
