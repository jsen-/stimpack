'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.Inject = Inject;

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

require('reflect-metadata');

var Injector = (function () {
    function Injector() {
        _classCallCheck(this, Injector);

        this.types = new Map();
        this.types.set(Injector, this);
    }

    _createClass(Injector, [{
        key: 'get',
        value: function get(Type) {
            var instance = this.types.get(Type);
            if (!instance) {
                var params = [];
                instance = Object.create(Type.prototype);
                if (Type.annotations) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Type.annotations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var TargetType = _step.value;

                            params.push(this.get(TargetType));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator['return']) {
                                _iterator['return']();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    Type.apply(instance, params);
                }
                if (Type.propAnnotations) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = Type.propAnnotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _step2$value = _slicedToArray(_step2.value, 2);

                            var propName = _step2$value[0];
                            var TargetType = _step2$value[1];

                            instance[propName] = this.get(TargetType);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                _iterator2['return']();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
                Type.apply(instance, params);
                this.types.set(Type, instance);
            }
            return instance;
        }
    }]);

    return Injector;
})();

exports.Injector = Injector;

var InjectBase = function InjectBase() {
    _classCallCheck(this, InjectBase);
};

function Inject(target, propertyKey) {
    if (typeof target === 'object') {
        var Type = Reflect.getMetadata('design:type', target, propertyKey);
        var Ctor = target.constructor;
        var propAnnotations = Ctor.propAnnotations || (Ctor.propAnnotations = new Map());
        propAnnotations.set(propertyKey, Type);
    } else {
        target.annotations = Reflect.getMetadata('design:paramtypes', target);
    }
}
//# sourceMappingURL=stimpack.js.map
