import { stringify } from 'rebem-classname';

export function isPropsMatchBEM(props, bemjson) {
    const targetClasses = new Set(stringify(props).split(' '));
    const matchClasses = stringify(bemjson).split(' ');

    return matchClasses.every(matchClass => targetClasses.has(matchClass));
}
