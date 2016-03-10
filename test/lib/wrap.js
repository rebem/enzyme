import React, { createElement as $ } from 'react';
import { BEM } from 'rebem';
import { stringify } from 'rebem-classname';
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
const className = stringify(bemjson);
const props = {
    ...bemjson
};

const cases = {
    // no rebem for children, testing pure BEM props without className
    'only BEM props': class extends React.Component {
        render() {
            return BEM({ block: 'root' },
                $('div', props)
            );
        }
    },
    // no rebem for children, testing only className, without BEM props
    'only className': class extends React.Component {
        render() {
            return BEM({ block: 'root' },
                $('div', { className })
            );
        }
    },
    // with rebem, testing mixed BEM props and className (could be dublicated)
    'BEM props + className': class extends React.Component {
        render() {
            return BEM({ block: 'root' },
                BEM(props)
            );
        }
    }
};

describe('wrap', function() {
    Object.keys(cases).forEach(function(type) {
        describe(type, function() {
            describe('mount', function() {
                it('node', function() {
                    const wrapper = mount(
                        $(cases[type])
                    );
                    const node = document.createElement('div');

                    assert.ok(
                        wrapper.wrap(node) instanceof ReactWrapper
                    );
                });

                it('already wrapped', function() {
                    const wrapper = mount(
                        $(cases[type])
                    );

                    assert.ok(
                        wrapper.wrap(wrapper) instanceof ReactWrapper
                    );
                });
            });

            describe('shallow', function() {
                it('node', function() {
                    const wrapper = shallow(
                        $(cases[type])
                    );
                    const node = document.createElement('div');

                    assert.ok(
                        wrapper.wrap(node) instanceof ShallowWrapper
                    );
                });

                it('already wrapped', function() {
                    const wrapper = shallow(
                        $(cases[type])
                    );

                    assert.ok(
                        wrapper.wrap(wrapper) instanceof ShallowWrapper
                    );
                });
            });
        });
    });
});
