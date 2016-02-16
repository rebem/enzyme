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
        return React.createElement('div', null,
            BEM(props)
        );
    }
}

class TestMultiple extends React.Component {
    render() {
        return React.createElement('div', null,
            BEM(props),
            BEM({ block: 'beep' }),
            BEM(props)
        );
    }
}

describe('isBEM', function() {
    describe('mount', function() {
        it('is function', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                typeof wrapper.isBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.isBEM,
                'function'
            );
        });

        it('simple', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.isBEM(bemjson),
                true
            );
        });

        it('not found', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.isBEM({ block: 'block' }),
                false
            );
        });

        it('multiple', function() {
            const wrapper = mount(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();
            const errorMessage = 'This method is only meant to be run on single node';

            assert.throws(
                function() {
                    children.isBEM(bemjson);
                },
                function(error) {
                    if (error.message.indexOf(errorMessage) === 0) {
                        return true;
                    }
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
                typeof wrapper.isBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.isBEM,
                'function'
            );
        });

        it('simple', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.isBEM(bemjson),
                true
            );
        });

        it('not found', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.isBEM({ block: 'block' }),
                false
            );
        });

        it('multiple', function() {
            const wrapper = shallow(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();
            const errorMessage = 'This method is only meant to be run on single node';

            assert.throws(
                function() {
                    children.isBEM(bemjson);
                },
                function(error) {
                    return error.message.indexOf(errorMessage) === 0;
                }
            );
        });
    });
});
