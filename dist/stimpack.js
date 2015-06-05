'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

_Object$defineProperty(exports, '__esModule', {
    value: true
});

exports.Inject = Inject;
require('reflect-metadata');

var Injector = (function () {
    function Injector() {
        _classCallCheck(this, Injector);

        this.types = new _Map();
        this.types.set(Injector, this);
    }

    _createClass(Injector, [{
        key: 'get',
        value: function get(Type) {
            var instance = this.types.get(Type);
            if (!instance) {
                var params = [];
                instance = _Object$create(Type.prototype);
                if (Type.annotations) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _getIterator(Type.annotations), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                        for (var _iterator2 = _getIterator(Type.propAnnotations), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
        var propAnnotations = Ctor.propAnnotations || (Ctor.propAnnotations = new _Map());
        propAnnotations.set(propertyKey, Type);
    } else {
        target.annotations = Reflect.getMetadata('design:paramtypes', target);
    }
}
//# sourceMappingURL=stimpack.js.map
