import React from 'react';
import { BEM } from 'rebem';

export function BEMTests() {
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
    const bemjson = { ...props };

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
}
