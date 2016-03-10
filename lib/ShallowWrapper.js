import ShallowWrapper from 'enzyme/build/ShallowWrapper';

import { isPropsMatchBEM } from './utils';

export default class MyReactWrapper extends ShallowWrapper {
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

    someBEM(bemjson) {
        return this.nodes.some(node => isPropsMatchBEM(this.wrap(node).props(), bemjson));
    }

    everyBEM(bemjson) {
        return this.nodes.every(node => isPropsMatchBEM(this.wrap(node).props(), bemjson));
    }

    wrap(node) {
        if (node instanceof MyReactWrapper) {
            return node;
        }

        return new MyReactWrapper(node, this.root);
    }
}
