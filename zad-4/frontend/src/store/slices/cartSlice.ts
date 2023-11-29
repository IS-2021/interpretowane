import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "@/api/types";

type CartItemPayload = {
	quantity: number;
} & Pick<Product, "productid" | "name" | "unitprice" | "unitweight">;

type AppState = {
	cart: Record<string, number>;
};

export const initialAppState: AppState = {
	cart: {},
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialAppState,
	reducers: {
		addCartItem: (state, { payload }: PayloadAction<CartItemPayload>) => {
			if (payload.productid in state.cart) {
				state.cart[payload.productid]++;
			} else {
				state.cart[payload.productid] = 1;
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

			state.cart[payload.productid] = payload.quantity;
		},
		incrementCartItemQuantity: (
			state,
			{ payload }: PayloadAction<Pick<CartItemPayload, "productid">>,
		) => {
			state.cart[payload.productid]++;
		},
		decrementCartItemQuantity: (state, { payload }: PayloadAction<CartItemPayload>) => {
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
