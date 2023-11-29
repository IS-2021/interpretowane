import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CartItem } from "@/api/types";

type CartItemPayload = CartItem;

type AppState = {
	cart: Record<string, CartItem>;
};

export const initialAppState: AppState = {
	cart: {},
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialAppState,
	reducers: {
		addCartItem: (state, { payload }: PayloadAction<CartItemPayload>) => {
			const cartItem = state.cart[payload.productid];
			if (cartItem) {
				cartItem.quantity++;
			} else {
				console.log(payload);
				state.cart[payload.productid] = { ...payload, quantity: 1 };
			}
		},
		removeCartItem: (state, { payload }: PayloadAction<CartItemPayload>) => {
			delete state.cart[payload.productid];
		},
		setCartItemQuantity: (state, { payload }: PayloadAction<CartItemPayload>) => {
			if (payload.quantity <= 0) {
				delete state.cart[payload.productid];
				return;
			}

			const cartItem = state.cart[payload.productid];
			if (cartItem) {
				cartItem.quantity = payload.quantity;
			}
		},
		incrementCartItemQuantity: (
			state,
			{ payload }: PayloadAction<Pick<CartItemPayload, "productid">>,
		) => {
			const cartItem = state.cart[payload.productid];
			if (cartItem) {
				cartItem.quantity++;
			}
		},
		decrementCartItemQuantity: (state, { payload }: PayloadAction<CartItemPayload>) => {
			const cartItem = state.cart[payload.productid];
			if (!cartItem) {
				return;
			} else if (cartItem.quantity === 1) {
				delete state.cart[payload.productid];
			}
			cartItem.quantity--;
		},
	},
});

export const { addCartItem, removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity } =
	cartSlice.actions;
export const cartReducer = cartSlice.reducer;
