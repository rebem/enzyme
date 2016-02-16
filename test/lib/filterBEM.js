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

describe('filterBEM', function() {
    describe('mount', function() {
        it('is function', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                typeof wrapper.filterBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.filterBEM,
                'function'
            );
        });

        it('simple', function() {
            const wrapper = mount(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.filterBEM(bemjson).length,
                2
            );
        });

        it('not found', function() {
            const wrapper = mount(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.filterBEM({ block: 'block' }).length,
                0
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
                typeof wrapper.filterBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.filterBEM,
                'function'
            );
        });

        it('simple', function() {
            const wrapper = shallow(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.filterBEM(bemjson).length,
                2
            );
        });

        it('not found', function() {
            const wrapper = shallow(
                React.createElement(TestMultiple)
            );
            const children = wrapper.children();

            assert.strictEqual(
                children.filterBEM({ block: 'block' }).length,
                0
            );
        });
    });
});
