import cases from './cases';
import * as rebem from './rebem';
import * as rebemJSX from './rebem-jsx';

describe('reBEM Enzyme', function() {
    describe('rebem', function() {
        describe('BEM', function() {
            cases(rebem.BEMTests());
        });
        describe('blockFactory', function() {
            cases(rebem.blockFactoryTests());
        });
    });

    describe.skip('rebem/jsx', function() {
        describe('BEM', function() {
            cases(rebemJSX.BEMTests());
        });
    });
});
