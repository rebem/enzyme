import React from 'react';
import { BEM } from 'rebem/jsx';

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
            return (
                <div>
                    <BEM {...props} />
                </div>
            );
        }
    }

    class TestMultiple extends React.Component {
        render() {
            return (
                <div>
                    <BEM {...props} />
                    <BEM {...props} />
                </div>
            );
        }
    }

    return {
        bemjson,
        TestSingle,
        TestMultiple
    };
}
