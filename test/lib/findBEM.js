import React, { createElement as $ } from 'react';
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

class TestSingleProps extends React.Component {
    render() {
        return $('div', { block: 'root' },
            $('div', {
                ...props,
                // messing everything up with className
                className: 'block__elem block__elem_mod_val block2__elem2'
            })
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

describe('findBEM', function() {
    describe('mount', function() {
        it('is function', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const children = wrapper.children();

            assert.strictEqual(
                typeof wrapper.findBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.findBEM,
                'function'
            );
        });

        describe('simple', function() {
            it('className', function() {
                const wrapper = mount(
                    React.createElement(TestSingle)
                );

                assert.strictEqual(
                    wrapper.findBEM(bemjson).length,
                    1
                );
            });

            it('props', function() {
                const wrapper = mount(
                    React.createElement(TestSingleProps)
                );

                assert.strictEqual(
                    wrapper.findBEM(bemjson).length,
                    1
                );
            });
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
                wrapper.findBEM({ block: 'block' }).length,
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
                typeof wrapper.findBEM,
                'function'
            );

            assert.strictEqual(
                typeof children.findBEM,
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
                wrapper.findBEM({ block: 'block' }).length,
                0
            );
        });
    });
});
