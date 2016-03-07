import { stringify } from 'rebem-classname';

export function isPropsMatchBEM({ className }, bemjson) {
    if (className) {
        const targetClasses = className.split(' ');
        const matchClasses = stringify(bemjson).split(' ');

        return matchClasses.every(matchClass => {
            return targetClasses.indexOf(matchClass) !== -1;
        });
    }

    return false;
}
