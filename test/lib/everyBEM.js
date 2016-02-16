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
            BEM(props),
            BEM({ block: 'beep' }),
            BEM(props)
        );
    }
}

describe('everyBEM', function() {
    describe('mount', function() {
        it('is function', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                typeof wrapper.everyBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.everyBEM,
                'function'
            );
        });

        it('true', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.everyBEM(bemjson),
                true
            );
        });

        it('false', function() {
            const wrapper = mount(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.everyBEM(bemjson),
                false
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
                typeof wrapper.everyBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.everyBEM,
                'function'
            );
        });

        it('true', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.everyBEM(bemjson),
                true
            );
        });

        it('false', function() {
            const wrapper = shallow(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.everyBEM(bemjson),
                false
            );
        });
    });
});
