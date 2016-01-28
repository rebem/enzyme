[![npm](https://img.shields.io/npm/v/rebem-enzyme.svg?style=flat-square)](https://www.npmjs.com/package/rebem-enzyme)
[![travis](http://img.shields.io/travis/rebem/enzyme.svg?style=flat-square)](https://travis-ci.org/rebem/enzyme)
[![coverage](https://img.shields.io/codecov/c/github/rebem/enzyme.svg?style=flat-square)](https://codecov.io/github/rebem/enzyme)
[![deps](https://img.shields.io/gemnasium/rebem/enzyme.svg?style=flat-square)](https://gemnasium.com/rebem/enzyme)

[reBEM](https://github.com/rebem/rebem) addons for [Enzyme](http://airbnb.io/enzyme/).

## Install

```
npm i -D rebem-enzyme
```

## Overview

In addition to usual Enzyme methods there are few new which lets you search for components by [BEM PropTypes](https://github.com/rebem/rebem#bem-proptypes):

* `block`
* `elem`
* `mods`
* `mix`
* `tag`

### `findBEM(bem)`

```js
import { BEM } from 'rebem';
import { mount, shallow } from 'rebem-enzyme';

// Full DOM Rendering
const reactWrapper = mount(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' })
    )
);

console.log(
    reactWrapper.findBEM({ block: 'block', elem: 'elem' }).length
);
// 1

// Shallow Rendering
const shallowWrapper = shallow(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' })
    )
);

console.log(
    shallowWrapper.findBEM({ block: 'block', elem: 'elem' }).length
);
// 1
```
