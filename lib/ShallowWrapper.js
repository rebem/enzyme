import ShallowWrapper from 'enzyme/build/ShallowWrapper';

import { isClassNameMatchBEM } from './utils';

export default class MyReactWrapper extends ShallowWrapper {
    constructor(...args) {
        super(...args);
    }

    findBEM(bemjson) {
        return this.findWhere(node => {
            const className = node.prop('className');

            return isClassNameMatchBEM(className, bemjson);
        });
    }

    filterBEM(bemjson) {
        return this.filterWhere(node => {
            const className = node.prop('className');

            return isClassNameMatchBEM(className, bemjson);
        });
    }

    notBEM(bemjson) {
        return this.filterWhere(node => {
            const className = node.prop('className');

            return !isClassNameMatchBEM(className, bemjson);
        });
    }

    isBEM(bemjson) {
        return this.single(node => {
            const className = this.wrap(node).prop('className');

            return isClassNameMatchBEM(className, bemjson);
        });
    }

    closestBEM(bemjson) {
        if (this.isBEM(bemjson)) {
            return this;
        }

        return this.parents().filterBEM(bemjson).first();
    }

    someBEM(bemjson) {
        return this.nodes.some(node => {
            const className = this.wrap(node).prop('className');

            return isClassNameMatchBEM(className, bemjson);
        });
    }

    everyBEM(bemjson) {
        return this.nodes.every(node => {
            const className = this.wrap(node).prop('className');

            return isClassNameMatchBEM(className, bemjson);
        });
    }

    wrap(node) {
        if (node instanceof MyReactWrapper) {
            return node;
        }

        return new MyReactWrapper(node, this.root);
    }
}
