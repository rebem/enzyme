import ReactWrapper from 'enzyme/build/ReactWrapper';

import { isPropsMatchBEM } from './utils';

export default class MyReactWrapper extends ReactWrapper {
    constructor(...args) {
        super(...args);
    }

    findBEM(bemjson) {
        return this.findWhere(node => isPropsMatchBEM(node.props(), bemjson));
    }

    filterBEM(bemjson) {
        return this.filterWhere(node => isPropsMatchBEM(node.props(), bemjson));
    }

    wrap(node) {
        if (node instanceof MyReactWrapper) {
            return node;
        }

        return new MyReactWrapper(node, this.root);
    }
}
