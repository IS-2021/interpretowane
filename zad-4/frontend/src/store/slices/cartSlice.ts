import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
	productid: string;
	quantity: number;
}

interface AppState {
	cart: Record<string, number>;
}

export const initialAppState: AppState = {
	cart: {},
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialAppState,
	reducers: {
		addCartItem: (state, { payload }: PayloadAction<CartItem>) => {
			if (payload.productid in state.cart) {
				state.cart[payload.productid]++;
			} else {
				state.cart[payload.productid] = 1;
			}
		},
		removeCartItem: (state, { payload }: PayloadAction<CartItem>) => {
			delete state.cart[payload.productid];
		},
		setCartItemQuantity: (state, { payload }: PayloadAction<CartItem>) => {
			if (payload.quantity <= 0) {
				delete state.cart[payload.productid];
				return;
			}

			state.cart[payload.productid] = payload.quantity;
		},
		incrementCartItemQuantity: (state, { payload }: PayloadAction<Pick<CartItem, "productid">>) => {
			state.cart[payload.productid]++;
		},
		decrementCartItemQuantity: (state, { payload }: PayloadAction<CartItem>) => {
			const cartItemQuantity = state.cart[payload.productid];
			if (!cartItemQuantity) {
				return;
			} else if (cartItemQuantity === 1) {
				delete state.cart[payload.productid];
			}
			state.cart[payload.productid] = cartItemQuantity - 1;
		},
	},
});

export const { addCartItem, removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity } =
	cartSlice.actions;
export const cartReducer = cartSlice.reducer;
