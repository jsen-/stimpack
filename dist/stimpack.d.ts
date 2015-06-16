declare module "stimpack" {

	export interface Annotable extends Function {
		annotations?: Annotable[];
		propAnnotations?: Map<string | symbol, Annotable>;
	}
	export class Injector {
		private types;
		constructor();
		get(Type: Annotable): any;
	}
	export function Inject(target: Annotable | Object, propertyKey?: string | symbol): void;
}