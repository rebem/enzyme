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
                    BEM({ block: 'root' },
                        $('div', props),
                        $('div', props)
                    )
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
                    BEM({ block: 'root' },
                        $('div', { className }),
                        $('div', { className })
                    )
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
                    BEM({ block: 'root' },
                        BEM(props),
                        BEM(props)
                    )
                );
            }
        }
    }
};

describe('closestBEM', function() {
    Object.keys(cases).forEach(function(type) {
        describe(type, function() {
            describe('mount', function() {
                it('is function', function() {
                    const wrapper = mount(
                        $(cases[type].single)
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
                        $(cases[type].single)
                    );
                    const firstChild = wrapper.children().first();

                    assert.strictEqual(
                        firstChild.closestBEM(bemjson),
                        firstChild
                    );
                });

                it('parent', function() {
                    const wrapper = mount(
                        $(cases[type].single)
                    );
                    const firstChild = wrapper.children().first();

                    assert.strictEqual(
                        firstChild.closestBEM({ block: 'root' }).length,
                        1
                    );
                });

                it('multiple parents', function() {
                    const wrapper = mount(
                        $(cases[type].multiple)
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
                        $(cases[type].single)
                    );
                    const firstChild = wrapper.children().first();

                    assert.strictEqual(
                        firstChild.closestBEM({ block: 'block' }).length,
                        0
                    );
                });

                it('error', function() {
                    const wrapper = mount(
                        $(cases[type].multiple)
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
                        $(cases[type].single)
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
                        $(cases[type].single)
                    );
                    const firstChild = wrapper.children().first();

                    assert.strictEqual(
                        firstChild.closestBEM(bemjson),
                        firstChild
                    );
                });

                it('parent', function() {
                    const wrapper = shallow(
                        $(cases[type].single)
                    );
                    const firstChild = wrapper.children().first();

                    assert.strictEqual(
                        firstChild.closestBEM({ block: 'root' }).length,
                        1
                    );
                });

                it('multiple parents', function() {
                    const wrapper = shallow(
                        $(cases[type].multiple)
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
                        $(cases[type].single)
                    );
                    const firstChild = wrapper.children().first();

                    assert.strictEqual(
                        firstChild.closestBEM({ block: 'block' }).length,
                        0
                    );
                });

                it('error', function() {
                    const wrapper = shallow(
                        $(cases[type].multiple)
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
    });
});
