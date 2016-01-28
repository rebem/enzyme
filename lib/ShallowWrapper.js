import ShallowWrapper from 'enzyme/build/ShallowWrapper';

import { isPropsMatchBEM } from './utils';

export default class extends ShallowWrapper {
    constructor(...args) {
        super(...args);
    }

    findBEM(bemjson) {
        return this.findWhere(node => isPropsMatchBEM(node.props(), bemjson));
    }
}
