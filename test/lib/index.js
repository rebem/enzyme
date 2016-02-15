import React from 'react';
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
    ],
    tag: 'span'
};
const props = {
    className: 'block__elem block__elem_mod_val block2__elem2'
};

class TestSingle extends React.Component {
    render() {
        return React.createElement('div', null,
            React.createElement(bemjson.tag, props)
        );
    }
}

class TestMultiple extends React.Component {
    render() {
        return React.createElement('div', null,
            React.createElement(bemjson.tag, props),
            React.createElement(bemjson.tag, props)
        );
    }
}

describe('reBEM Enzyme', function() {
    describe.skip('mount', function() {
        describe('findBEM', function() {
            it('is function', function() {
                const wrapper = mount(
                    React.createElement('div')
                );

                assert.strictEqual(
                    typeof wrapper.findBEM,
                    'function'
                );
            });

            it('simple', function() {
                const wrapper = mount(
                    React.createElement(TestSingle)
                );

                assert.strictEqual(
                    wrapper.findBEM(bemjson).length,
                    1
                );
            });

            it('multiple', function() {
                const wrapper = mount(
                    React.createElement(TestMultiple)
                );

                assert.strictEqual(
                    wrapper.findBEM(bemjson).length,
                    2
                );
            });

            it('not found', function() {
                const wrapper = mount(
                    React.createElement(TestMultiple)
                );

                assert.strictEqual(
                    wrapper.findBEM({ block: 'beep' }).length,
                    0
                );
            });
        });
    });

    describe.skip('shallow', function() {
        describe('findBEM', function() {
            it('is function', function() {
                const wrapper = shallow(
                    React.createElement('div')
                );

                assert.strictEqual(
                    typeof wrapper.findBEM,
                    'function'
                );
            });

            it('simple', function() {
                const wrapper = shallow(
                    React.createElement(TestSingle)
                );

                assert.strictEqual(
                    wrapper.findBEM(bemjson).length,
                    1
                );
            });

            it('multiple', function() {
                const wrapper = shallow(
                    React.createElement(TestMultiple)
                );

                assert.strictEqual(
                    wrapper.findBEM(bemjson).length,
                    2
                );
            });

            it('not found', function() {
                const wrapper = shallow(
                    React.createElement(TestMultiple)
                );

                assert.strictEqual(
                    wrapper.findBEM({ block: 'beep' }).length,
                    0
                );
            });
        });
    });
});
