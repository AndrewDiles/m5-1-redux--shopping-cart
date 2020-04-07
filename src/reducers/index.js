import React from 'react';


const initialState = {};

export default function cartReducer(state = initialState, action) {
  // console.log('state: ', state);
  // console.log('action: ', action);
  switch (action.type) {
    case 'ADD_ITEM': {
      // if (state[action.item.id]) console.log(state[action.item.id].quantity);
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: state[action.item.id] ? state[action.item.id].quantity +1 : 1,
        }
      }
    }
    case 'ADD_X_ITEMS': {
      // if (state[action.item.id]) console.log(state[action.item.id].quantity);
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: state[action.item.id].quantity + action.item.additionQuantity,
        }
      }
    }
    case 'REMOVE_ITEM': {
      const newState = { ...state};
      delete newState[action.item.id];
      return {...newState};
    }
    case 'CLEAR_CART': {
      return {...initialState};
    }
    case 'REMOVE_X_ITEMS': {
      if (state[action.item.id].quantity === action.item.removalQuantity) {
        const newState = { ...state};
        delete newState[action.item.id];
        return {...newState};
      }
      return {
        ...state,
        [action.item.id]: {
          ...action.item,
          quantity: state[action.item.id].quantity - action.item.removalQuantity,
        }
      }
    }

    //   if (state[action.item.id].quantity === 1) {
    //     // let newstate = state;
    //     // delete state[action.item.id];
    //     return {
    //       ...state, 
          
    //       // newstate
    //     }
    //   }
    //   else {
    //     return {
    //       ...state,
    //       [action.item.id]: {
    //         ...action.item,
    //         // quantity: 1,
    //         quantity: state[action.item.id].quantity -1,
    //       }
    //     }
    //   }

    // }

    default:
      return state;
  }
}

export const getStoreItemArray = (state) => Object.values(state);