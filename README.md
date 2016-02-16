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

:point_right: Examples below illustrates how it work with `shallow` wrapper just to be short – `mount` wrapper has absolutely the same methods.

### `findBEM(bem)`

```js
import { BEM } from 'rebem';
import { shallow } from 'rebem-enzyme';

const wrapper = shallow(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' }),
        BEM({ block: 'block2' })
    )
);

console.log(
    wrapper.findBEM({ block: 'block', elem: 'elem' }).length
);
// 1
```

### `filterBEM(bem)`

```js
import { BEM } from 'rebem';
import { shallow } from 'rebem-enzyme';

const wrapper = shallow(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' }),
        BEM({ block: 'block2' })
    )
);
const children = wrapper.children();

console.log(
    children.filterBEM({ block: 'block', elem: 'elem' }).length
);
// 1
```

### `notBEM(bem)`

```js
import { BEM } from 'rebem';
import { shallow } from 'rebem-enzyme';

const wrapper = shallow(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' }),
        BEM({ block: 'block2' })
    )
);
const children = wrapper.children();

console.log(
    children.notBEM({ block: 'block', elem: 'elem' }).length
);
// 1
```

### `isBEM(bem)`

```js
import { BEM } from 'rebem';
import { shallow } from 'rebem-enzyme';

const wrapper = shallow(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' })
    )
);
const children = wrapper.children();

console.log(
    children.isBEM({ block: 'block', elem: 'elem' })
);
// true
```
