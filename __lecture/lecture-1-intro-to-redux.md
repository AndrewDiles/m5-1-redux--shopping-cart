# 5.1.1 Intro to Redux

---

### What is Redux?

Redux is a _state management library_ commonly used with React

---

# The Flux Wars

In 2014-2015, React was a very different library.

It had state, but no context, no reducers...

It was difficult to use it in a large application.

---

# The Flux Wars

**Flux** was an architectural idea around managing state.

It was not a library. It was a schematic.

---

# The Flux Wars

Every week, a new library was released claiming to be the best Flux implementation.

They were all pretty cumbersome.

---

# The Flux Wars

Redux was released in 2015. It won the war.

---

# The idea

- Your state lives in a **redux store**.
- You **connect** React components to that store.

---

<img src='./assets/redux-flowchart.png' />

---

That diagram never makes sense to people at first.

Keep it around, look at it later. It'll make more sense.

---

## Two NPM Packages

- `redux` is technically not related to React at all. It's an independent state library.
- `react-redux` are the _react bindings_.

We need both to use Redux

---

## Creating a Redux store

```js
import { createStore } from 'redux';

function reducer(state, action) {
  switch (action.type) {
    case 'SOMETHING':
      return 5;
    default:
      return state;
  }
}

const initialState = 10;

const store = createStore(reducer, initialState);
```

---

## Providing the store to React

```js
// In src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

const store = ReactDOM.render(
  // All the create-store stuff
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

---

### Selecting data from the Redux store

```js
// components/AppleFarm.js
import { useSelector } from 'react-redux';

const AppleFarm = () => {
  const numberOfApples = useSelector((state) => {
    return state.numberOfApples;
  });

  return <div>Number of apples: {numberOfApples}</div>;
};
```

---

# Exercises

Write selector functions to pluck out the right state.

---

```js
/*
Our state shape:

{
  fridge: [
    'apple',
    'wine',
    'ketchup',
    'potatoes',
    'ice cream'
  ],
  oven: [
    'celery'
  ],
  pantry: [
    'salmon',
  ]
}
*/
import { useSelector } from 'react-redux';

const FridgeContents = () => {
  const fridgeItems = useSelctor((state) => {
    return state.fridge;
  })

  return (
    <div>
      <h1>Your fridge contains:</h1>

      {fridgeItems.map(item => (
        <div key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};
```

---

```js
/*
Our state shape:

{
  myFavouriteGenre: 'scifi',
  myFavouriteMovies: {
    horror: 'Terror at Jarry Park',
    scifi: 'Deep Voyage: Laval and Beyond',
    romcom: 'Anjou Amour',
    kungfu: 'Fracas in the Plateau'
  },
  boyfriendFavouriteGenre: 'horror',
  boyfriendFavouriteMovies: {
    horror: 'Westmount Chainsaw Massacre',
    scifi: 'Island of the Nuns',
    romcom: 'He said bonjour, I said hi',
    kungfu: 'Scuffle in the Sud-Ouest'
  },
}
*/

const App = () => {
  // We're going to watch OUR favourite movie,
  // in our BOYFRIEND's favourite genre.
  // (Terror at Jarry Park)
  const movie = useSelectoe((state) => {
    
    return state.myFavouriteMovies[state.boyfriendFavouriteGenre]
  })

  return (
    <div>
      Tonight, we'll watch: {movie}
    </div>
  );
};
```

---

```js
/*
Our state shape:

{
  address: {
    line1: '129 W. 81st St',
    line2: 'Apartment 5A'
  },
  city: 'New York',
  state: 'New York',
}
*/

const UserProfile = () => {
  // `streetAddress` should be formatted as:
  // "129 W. 81st St, Apartment 5A"
  const streetAddress = useSelectoe((state) => {
  return = `${state.address.line1}, ${state.address.line2}` 
  })

// use condition to make sure the second line exists and only include the coma if it does


  return (
    <div>
      You live at {streetAddress}.
    </div>
  );
};
```

---

```js
/*
Our state shape:

{
  myStatus: 'online',
  users: [
    {
      name: 'leonardo',
      online: true,
    },
    {
      name: 'michelangelo',
      online: false,
    },
    {
      name: 'donatello',
      online: true,
    },
    {
      name: 'raphael',
      online: true,
    },
  ]
}
*/

const OnlineUsers = () => {
  const myStatus = useSelector((state) => state.myStatus);  //implicit return.  word return is assumed
  const onlineUsers = useSelector((state=> {
    return state.users.filter(user => user.online);
  })

  return onlineUsers.map(user => (
    <div key={user.name}>
      {user.name}
    </div>
  ));
};
```

---

# Actions and Action Creators

Like we got used to in React, an action is an _object that describes an event_.

An "action creator" is a function that produces an action.

---

By convention, action creators in redux all live together in the same file(s):

```js
// actions.js
export const addTodo = (todoItem) => {
  return {
    type: 'ADD_TODO',
    todoItem,
  };
};

export const markTodoAsCompleted = (todoId) => {
  return {
    type: 'MARK_TODO_AS_COMPLETED',
    todoId,
  };
};

export const deleteTodo = (todoId) => {
  return {
    type: 'DELETE_TODO',
    todoId,
  };
};
```

---

# Dispatching actions

We have another hook, `useDispatch`.

---

```js
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  markTodoAsCompleted
} from '../actions';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.value}

          <button onClick={() => {
            dispatch(
              markTodoAsCompleted(todo.id)
            );
          }}>
        </li>
      ))}
    </ul>
  );
};
```

---

# Exercises

Wire in the action and dispatch it.

---

```js
import { useDispatch, useSelector } from 'react-redux';

import { pokeUser } from '../actions';

const OnlineUsers = () => {
  // TODO: Something missing here...
  // added:
  const dispatch = useDispatch();

  const onlineUsers = useSelector((state) => {
    return state.users.filter((user) => user.online);
  });

  return onlineUsers.map((user) => (
    <div key={user.name}>
      <button 
        onClick={() => dispatch(pokeUser(user))}
      >Message {user.name}</button>
    </div>
  ));
};

//actions.js file
const pokeUser = user => {
  return {
    type: 'POKE_USER',
    user,
  }
})
```

---

```js
import { useDispatch } from 'react-redux';

import { addItemToFridge } from '../actions';

const FridgeForm = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={() => {
        dispatch(addItemToFridge(value));
      }}
    >
      <input type='text' onChange={(ev) => setValue(ev.target.value)} />

      <button type='submit'>Submit</button>
    </form>
  );
};
```

---

```js
import { useDispatch } from 'react-redux';

import { dismissModal } from '../actions';

const Modal = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleKeydown = (ev) => {
      // TODO: Close modal when 'Escape' is pressed
      if (ev.key === 'ESCAPE') dispatch(dismissModal());
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return <div>Hello</div>;
};
```

---

# Quick note

As with everything, Redux has changed a lot recently.

If you're googling, be mindful that most redux resources are out-of-date!

---
