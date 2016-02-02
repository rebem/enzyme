import React from 'react';
import assert from 'assert';

import { mount, shallow } from '../../lib/';

export default function({ TestSingle, TestMultiple, bemjson }) {
    describe('mount', function() {
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

    describe('shallow', function() {
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
}
