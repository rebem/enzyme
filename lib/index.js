import * as enzyme from 'enzyme';

import ReactWrapper from './ReactWrapper';
import ShallowWrapper from './ShallowWrapper';

const reBEMEnzyme = Object.create(enzyme);

reBEMEnzyme.mount = function(node, options) {
    return new ReactWrapper(node, null, options);
};

reBEMEnzyme.shallow = function(node, options) {
    return new ShallowWrapper(node, null, options);
};

export default reBEMEnzyme;
