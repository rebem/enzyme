[![npm](https://img.shields.io/npm/v/rebem-enzyme.svg?style=flat-square)](https://www.npmjs.com/package/rebem-enzyme)
[![travis](http://img.shields.io/travis/rebem/enzyme.svg?style=flat-square)](https://travis-ci.org/rebem/enzyme)
[![coverage](https://img.shields.io/codecov/c/github/rebem/enzyme.svg?style=flat-square)](https://codecov.io/github/rebem/enzyme)
[![deps](https://img.shields.io/gemnasium/rebem/enzyme.svg?style=flat-square)](https://gemnasium.com/rebem/enzyme)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-46bc99.svg?style=flat-square)](https://gitter.im/rebem/rebem)

[reBEM](https://github.com/rebem/rebem) addons for [Enzyme](http://airbnb.io/enzyme/).

## Install

```
npm i -D rebem-enzyme
```

## Overview

In addition to usual Enzyme methods there are few new which lets you search for components by [BEM PropTypes](https://github.com/rebem/rebem#bem-proptypes) instead of [`selector`](http://airbnb.io/enzyme/GLOSSARY.html#selector):

```js
{
    block
    elem
    mods
    mix
}
```

This object may be called `bemjson`.

## API

:point_right: Examples below illustrates how it work with `shallow` wrapper just to be short – `mount` wrapper has absolutely the same methods.

### `findBEM(bemjson)`

In addition to [`find()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html).

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

### `filterBEM(bemjson)`

In addition to [`filter()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/filter.html).

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

### `notBEM(bemjson)`

In addition to [`not()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/not.html).

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

### `isBEM(bemjson)`

In addition to [`is()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/is.html).

```js
import { BEM } from 'rebem';
import { shallow } from 'rebem-enzyme';

const wrapper = shallow(
    BEM({ block: 'block', elem: 'elem' })
);

console.log(
    wrapper.isBEM({ block: 'block', elem: 'elem' })
);
// true
```

### `closestBEM(bemjson)`

In addition to [`closest()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/closest.html).

```js
import { BEM } from 'rebem';
import { shallow } from 'rebem-enzyme';

const wrapper = shallow(
    BEM({ block: 'block', mods: { mod: true } },
        BEM({ block: 'block', elem: 'elem' }),
        BEM({ block: 'block2' })
    )
);
const firstChild = wrapper.children().first();

console.log(
    firstChild.closestBEM({ block: 'block', mods: { mod: true } }).length
);
// 1
```

### `someBEM(bemjson)`

In addition to [`some()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/some.html).

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
    children.someBEM({ block: 'block', elem: 'elem' })
);
// true
```

### `everyBEM(bemjson)`

In addition to [`every()`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/every.html).

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
    children.everyBEM({ block: 'block', elem: 'elem' })
);
// false
```
