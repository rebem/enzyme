import { buildClassName } from 'rebem';

export function isPropsMatchBEM(props, bemjson) {
    if (props.className) {
        const targetClasses = props.className.split(' ');
        const matchClasses = buildClassName(bemjson).split(' ');

        return matchClasses.every(matchClass => {
            return targetClasses.indexOf(matchClass) !== -1;
        });
    }

    return false;
}
