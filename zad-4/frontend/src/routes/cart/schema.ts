import { z } from "zod";

export const createOrderSchema = z.object({
	user: z.object({
		username: z.string().min(1, "Użytkownik musi mieć nazwę"),
		email: z.string().email("Niepoprawny adres email").min(1, "Użytkownik musi mieć adres email"),
		telephone: z.string().min(9, "Użytkownik musi mieć numer telefonu"),
	}),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export const createOrderDefaultValues: CreateOrderSchema = {
	user: {
		username: "",
		email: "",
		telephone: "",
	},
};
