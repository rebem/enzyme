import { stringify, validate } from 'rebem-classname';
import Set from 'core-js/es6/set';

export function isPropsMatchBEM(props, bemjson) {
    const targetClasses = new Set(stringify(props).split(' '));
    const matchClasses = stringify(validate(bemjson)).split(' ');

    return matchClasses.every(matchClass => targetClasses.has(matchClass));
}
