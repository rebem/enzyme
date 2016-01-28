import ReactWrapper from 'enzyme/build/ReactWrapper';

import { isPropsMatchBEM } from './utils';

export default class extends ReactWrapper {
    constructor(...args) {
        super(...args);
    }

    findBEM(bemjson) {
        return this.findWhere(node => isPropsMatchBEM(node.props(), bemjson));
    }
}
