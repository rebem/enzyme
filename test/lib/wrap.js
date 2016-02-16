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
