import isEqual from 'lodash.isequal';

export function isPropsMatchBEM(props, bemjson) {
    return props.block === bemjson.block &&
           props.elem === bemjson.elem &&
           props.tag === bemjson.tag &&
           isEqual(props.mods, bemjson.mods) &&
           isEqual(props.mix, bemjson.mix);
}
