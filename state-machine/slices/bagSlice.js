import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addToBag: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBag: (state, action) => {
      const index = state.items.findIndex(
        (bagItem) => bagItem.id === action.payload.id
      );

      let newBag = [...state.items];
      if (index >= 0) {
        // Item exists
        newBag.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove the product (id: ${action.payload.id}) because it's not in the bag`
        );
      }

      state.items = newBag;
    },
  },
});

export const { addToBag, removeFromBag } = bagSlice.actions;

export const selectItems = (state) => state.bag.items; //'bag' is coming from store.js

// Calculating the total price for checkout page
// We kept '0' because initial total will be '0 at first'
export const selectTotal = (state) =>
  state.bag.items.reduce((total, item) => total + item.price, 0);

export default bagSlice.reducer;
