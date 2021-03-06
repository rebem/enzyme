import React, { createElement as $ } from 'react';
import { BEM } from 'rebem';
import { stringify } from 'rebem-classname';
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
const className = stringify(bemjson);
const props = {
    ...bemjson
};

const cases = {
    // no rebem for children, testing pure BEM props without className
    'only BEM props': {
        single: class extends React.Component {
            render() {
                return BEM({ block: 'root' },
                    $('div', props)
                );
            }
        },
        multiple: class extends React.Component {
            render() {
                return BEM({ block: 'root' },
                    $('div', props),
                    $('div', { block: 'beep' }),
                    $('div', props)
                );
            }
        }
    },
    // no rebem for children, testing only className, without BEM props
    'only className': {
        single: class extends React.Component {
            render() {
                return BEM({ block: 'root' },
                    $('div', { className })
                );
            }
        },
        multiple: class extends React.Component {
            render() {
                return BEM({ block: 'root' },
                    $('div', { className }),
                    $('div', { className: 'beep' }),
                    $('div', { className })
                );
            }
        }
    },
    // with rebem, testing mixed BEM props and className (could be dublicated)
    'BEM props + className': {
        single: class extends React.Component {
            render() {
                return BEM({ block: 'root' },
                    BEM(props)
                );
            }
        },
        multiple: class extends React.Component {
            render() {
                return BEM({ block: 'root' },
                    BEM(props),
                    BEM({ block: 'beep' }),
                    BEM(props)
                );
            }
        }
    }
};

describe('filterBEM', function() {
    Object.keys(cases).forEach(function(type) {
        describe(type, function() {
            describe('mount', function() {
                it('is function', function() {
                    const wrapper = mount(
                        $(cases[type].single)
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
                        $(cases[type].multiple)
                    );
                    const children = wrapper.children();

                    assert.strictEqual(
                        children.filterBEM(bemjson).length,
                        2
                    );
                });

                it('not found', function() {
                    const wrapper = mount(
                        $(cases[type].multiple)
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
                        $(cases[type].single)
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
                        $(cases[type].multiple)
                    );
                    const children = wrapper.children();

                    assert.strictEqual(
                        children.filterBEM(bemjson).length,
                        2
                    );
                });

                it('not found', function() {
                    const wrapper = shallow(
                        $(cases[type].multiple)
                    );
                    const children = wrapper.children();

                    assert.strictEqual(
                        children.filterBEM({ block: 'block' }).length,
                        0
                    );
                });
            });
        });
    });
});
