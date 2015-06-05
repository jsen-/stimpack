require('reflect-metadata');

export interface Annotable extends Function {
    annotations?: Annotable[];
    propAnnotations?: Map<string|symbol, Annotable>;
}

export class Injector {

    private types = new Map();

    constructor() {
        this.types.set(Injector, this);
    }

    get(Type: Annotable): any {
        var instance = this.types.get(Type);
        if (!instance) {
            const params = [];
            instance = Object.create(Type.prototype);
            if (Type.annotations) {
                for (let TargetType of Type.annotations) {
                    params.push(this.get(TargetType));
                }
                Type.apply(instance, params);
            }
            if (Type.propAnnotations) {
                for (const [propName, TargetType] of Type.propAnnotations) {
                    instance[propName] = this.get(TargetType);
                }
            }
            Type.apply(instance, params);
            this.types.set(Type, instance);
        }
        return instance;
    }
}

class InjectBase {
    Type: Annotable;
}

export function Inject(target: Annotable|Object, propertyKey?: string|symbol) {
    if (typeof target === 'object') {
        const Type = Reflect.getMetadata('design:type', target, propertyKey);
        const Ctor: Annotable = target.constructor;
        const propAnnotations = Ctor.propAnnotations || (Ctor.propAnnotations = new Map<string, Annotable>());
        propAnnotations.set(propertyKey, Type);
    } else {
        (<Annotable>target).annotations = Reflect.getMetadata('design:paramtypes', target);
    }
}