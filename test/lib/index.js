import tests from './tests';
import * as cases from './cases';

describe('reBEM Enzyme', function() {
    describe('rebem', function() {
        describe('BEM', function() {
            tests(cases.BEM());
        });
        describe('blockFactory', function() {
            tests(cases.blockFactory());
        });
    });

    describe.skip('className', function() {
        tests(cases.className());
    });
});
