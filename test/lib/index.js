import React from 'react';
import { BEM } from 'rebem';
import assert from 'assert';

import ReactWrapper from '../../lib/ReactWrapper';
import ShallowWrapper from '../../lib/ShallowWrapper';
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

describe('wrap', function() {
    describe('mount', function() {
        it('node', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );
            const node = document.createElement('div');

            assert.ok(
                wrapper.wrap(node) instanceof ReactWrapper
            );
        });

        it('already wrapped', function() {
            const wrapper = mount(
                React.createElement(TestSingle)
            );

            assert.ok(
                wrapper.wrap(wrapper) instanceof ReactWrapper
            );
        });
    });

    describe('shallow', function() {
        it('node', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );
            const node = document.createElement('div');

            assert.ok(
                wrapper.wrap(node) instanceof ShallowWrapper
            );
        });

        it('already wrapped', function() {
            const wrapper = shallow(
                React.createElement(TestSingle)
            );

            assert.ok(
                wrapper.wrap(wrapper) instanceof ShallowWrapper
            );
        });
    });
});

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
