import React from 'react';
import { BEM } from 'rebem';
import assert from 'assert';

import { mount, shallow } from '../../lib/';

const bemjson = {
    block: 'block',
    elem: 'elem',
    mods: {
        mod: 'val'
    },
    mix: [
        {
            block: 'block2',
            elem: 'elem2'
        }
    ]
};
const props = {
    ...bemjson
};

class TestSingle extends React.Component {
    render() {
        return BEM({ block: 'root' },
            BEM(props)
        );
    }
}

class TestMultiple extends React.Component {
    render() {
        return BEM({ block: 'root' },
            BEM({ block: 'root' },
                BEM(props),
                BEM(props)
            )
        );
    }
}

describe('closestBEM', function() {
    describe('mount', function() {
        it('is function', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                typeof wrapper.closestBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.closestBEM,
                'function'
            );
        });

        it('self', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const firstChild = wrapper.children().first();

            assert.strictEqual(
                firstChild.closestBEM(bemjson),
                firstChild
            );
        });

        it('parent', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const firstChild = wrapper.children().first();

            assert.strictEqual(
                firstChild.closestBEM({ block: 'root' }).length,
                1
            );
        });

        it('multiple parents', function() {
            const wrapper = mount(
                React.createElement(TestMultiple)
            );
            const firstChild = wrapper.children().children().first();

            assert.strictEqual(
                firstChild.closestBEM({ block: 'root' }).length,
                1
            );
        });

        // FIXME: https://github.com/airbnb/enzyme/issues/193
        it.skip('not found', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const firstChild = wrapper.children().first();

            assert.strictEqual(
                firstChild.closestBEM({ block: 'block' }).length,
                0
            );
        });

        it('error', function() {
            const wrapper = mount(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children().children();
            const errorMessage = 'This method is only meant to be run on single node';

            assert.throws(
                function() {
                    children.closestBEM(bemjson);
                },
                function(error) {
                    return error.message.indexOf(errorMessage) === 0;
                }
            );
        });
    });

    describe('shallow', function() {
        it('is function', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                typeof wrapper.closestBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.closestBEM,
                'function'
            );
        });

        it('self', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const firstChild = wrapper.children().first();

            assert.strictEqual(
                firstChild.closestBEM(bemjson),
                firstChild
            );
        });

        it('parent', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const firstChild = wrapper.children().first();

            assert.strictEqual(
                firstChild.closestBEM({ block: 'root' }).length,
                1
            );
        });

        it('multiple parents', function() {
            const wrapper = shallow(
                React.createElement(TestMultiple)
            );
            const firstChild = wrapper.children().children().first();

            assert.strictEqual(
                firstChild.closestBEM({ block: 'root' }).length,
                1
            );
        });

        // FIXME: https://github.com/airbnb/enzyme/issues/193
        it.skip('not found', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const firstChild = wrapper.children().first();

            assert.strictEqual(
                firstChild.closestBEM({ block: 'block' }).length,
                0
            );
        });

        it('error', function() {
            const wrapper = shallow(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children().children();
            const errorMessage = 'This method is only meant to be run on single node';

            assert.throws(
                function() {
                    children.closestBEM(bemjson);
                },
                function(error) {
                    return error.message.indexOf(errorMessage) === 0;
                }
            );
        });
    });
});
