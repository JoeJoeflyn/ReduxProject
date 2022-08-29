import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const bookInforSlice = createSlice({
  name: "bookinfor",
  initialState,
  reducers: {
    addInfor: (state, { payload }) => {
      return {
        ...state,
        books: [payload, ...state.books],
      };
    },
    deleteBook: (state, { payload }) => {
      return {
        ...state,
        books: state.books.filter((init) => init.id !== payload),
      };
    },
    editInfor: (state, { payload }) => {
      const mappedBooks = state.books.map((init) => {
        if (init.id === payload.id) {
          return {
            ...init,
            ...payload,
          };
        } else {
          return init;
        }
      });
      return {
        ...state,
        books: mappedBooks,
      };
    },
  },
});

export const { editInfor, addInfor, deleteBook } = bookInforSlice.actions;

export default bookInforSlice.reducer;
