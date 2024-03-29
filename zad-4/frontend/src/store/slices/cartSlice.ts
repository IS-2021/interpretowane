import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CartItem } from "@/api/types";

type CartItemPayload = CartItem;

type AppState = Record<string, CartItem>;

export const initialAppState: AppState = {};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialAppState,
	reducers: {
		addCartItem: (state, { payload }: PayloadAction<CartItemPayload>) => {
			const cartItem = state[payload.productid];
			if (cartItem) {
				cartItem.quantity++;
			} else {
				state[payload.productid] = { ...payload, quantity: 1 };
			}
		},
		removeCartItem: (state, { payload }: PayloadAction<Pick<CartItemPayload, "productid">>) => {
			delete state[payload.productid];
		},
		incrementCartItemQuantity: (
			state,
			{ payload }: PayloadAction<Pick<CartItemPayload, "productid">>,
		) => {
			const cartItem = state[payload.productid];
			if (cartItem) {
				cartItem.quantity++;
			}
		},
		decrementCartItemQuantity: (
			state,
			{ payload }: PayloadAction<Pick<CartItemPayload, "productid">>,
		) => {
			const cartItem = state[payload.productid];
			if (!cartItem) {
				return;
			} else if (cartItem.quantity === 1) {
				delete state[payload.productid];
			}
			cartItem.quantity--;
		},
		clearCart: () => {
			return initialAppState;
		},
	},
});

export const {
	addCartItem,
	removeCartItem,
	incrementCartItemQuantity,
	decrementCartItemQuantity,
	clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
