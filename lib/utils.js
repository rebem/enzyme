import { buildClassName } from 'rebem';

export function isClassNameMatchBEM(className, bemjson) {
    if (className) {
        const targetClasses = className.split(' ');
        const matchClasses = buildClassName(bemjson).split(' ');

        return matchClasses.every(matchClass => {
            return targetClasses.indexOf(matchClass) !== -1;
        });
    }

    return false;
}
