export interface Annotable extends Function {
    annotations?: Annotable[];
    propAnnotations?: Map<string | symbol, Annotable>;
}
export declare class Injector {
    private types;
    constructor();
    get(Type: Annotable): any;
}
export declare function Inject(target: Annotable | Object, propertyKey?: string | symbol): void;
