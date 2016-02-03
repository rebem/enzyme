import React from 'react';
import { BEM, blockFactory } from 'rebem';

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

export default {
    BEM() {
        const props = {
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
                    BEM(props)
                );
            }
        }

        return {
            bemjson,
            TestSingle,
            TestMultiple
        };
    },

    blockFactory() {
        const block = blockFactory('block');
        const props = {
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

        class TestSingle extends React.Component {
            render() {
                return React.createElement('div', null,
                    block(props)
                );
            }
        }

        class TestMultiple extends React.Component {
            render() {
                return React.createElement('div', null,
                    block(props),
                    block(props)
                );
            }
        }

        return {
            bemjson,
            TestSingle,
            TestMultiple
        };
    }
};
