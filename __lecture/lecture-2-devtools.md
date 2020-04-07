# 5.1.2 Redux Devtools

---

## Why use Redux?

If we have `useReducer` in React, why do we need Redux?

---

- Adds structure to your application
- Performance optimized
- Side-effects (we'll see this soon!)
- Killer devtools!

---

# Devtools demo

https://zalmoxisus.github.io/examples/todomvc/

<!--
  Visit this page, do some stuff, show how the devtools
  let you time-travel!
-->

---

# Adding Devtools

Normally, creating a Redux store looks like this:

```js
import { createStore } from 'redux';

import reducer from './reducers';

const initialState = { hi: 5 };

const store = createStore(
  reducer, 
  initialState,
  enhancer
  );
```

---

# Adding Devtools

This function takes an optional third argument for _a store enhancer_.

```js
const store = createStore(reducer, initialState, enhancer);
```

---

Store enhancers are like plugins. They're 3rd-party addons that change how Redux works.

Here's how we use the Devtools enhancer:

```js
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;

const store = createStore(reducer, initialState, enhancer);
```

---
