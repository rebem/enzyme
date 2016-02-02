import cases from './cases';
import * as rebem from './rebem';

describe('reBEM Enzyme', function() {
    describe('rebem', function() {
        describe('BEM', function() {
            cases(rebem.BEMTests());
        });
    });
});
