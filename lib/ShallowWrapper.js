import ShallowWrapper from 'enzyme/build/ShallowWrapper';

import { isPropsMatchBEM } from './utils';

export default class MyReactWrapper extends ShallowWrapper {
    constructor(...args) {
        super(...args);
    }

    findBEM(bemjson) {
        return this.findWhere(node => isPropsMatchBEM(node.props(), bemjson));
    }

    filterBEM(bemjson) {
        return this.filterWhere(node => isPropsMatchBEM(node.props(), bemjson));
    }

    notBEM(bemjson) {
        return this.filterWhere(node => !isPropsMatchBEM(node.props(), bemjson));
    }

    isBEM(bemjson) {
        return this.single(node => isPropsMatchBEM(this.wrap(node).props(), bemjson));
    }

    closestBEM(bemjson) {
        if (this.isBEM(bemjson)) {
            return this;
        }

        return this.parents().filterBEM(bemjson).first();
    }

    wrap(node) {
        if (node instanceof MyReactWrapper) {
            return node;
        }

        return new MyReactWrapper(node, this.root);
    }
}
