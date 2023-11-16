import { db } from "@/database/db";
import type { NewOrder, NewOrderItem, OrderUpdate } from "@/database/types";

export async function getAllOrders() {
	return db.selectFrom("orders").selectAll().execute();
}

export async function getOrderById(orderId: string) {
	return db
		.selectFrom("orders")
		.where("orderid", "=", orderId)
		.selectAll()
		.executeTakeFirstOrThrow();
}

export async function getOrdersByUsername(username: string) {
	return db
		.selectFrom("orders")
		.innerJoin("users", "orders.userid", "users.userid")
		.where("username", "=", username)
		.selectAll()
		.execute();
}

export async function addOrder(order: NewOrder) {
	return db.insertInto("orders").values(order).returningAll().executeTakeFirstOrThrow();
}

export async function addOrderItem(item: NewOrderItem) {
	return db
		.insertInto("orderitems")
		.values(item)
		.returning(["orderitemid", "productid", "quantity", "unitprice"])
		.executeTakeFirstOrThrow();
}

export async function getOrdersByStatusId(statusId: string) {
	return db
		.selectFrom("orders")
		.innerJoin("orderstatuses", "orders.orderstatusid", "orderstatuses.orderstatusid")
		.where("orderstatuses.orderstatusid", "=", statusId)
		.selectAll()
		.execute();
}

export async function updateOrderStatus(orderId: string, orderStatusId: string) {
	return db
		.updateTable("orders")
		.set({ orderstatusid: orderStatusId })
		.where("orderid", "=", orderId)
		.returningAll()
		.executeTakeFirst();
}

export async function updateOrder(orderId: string, orderData: OrderUpdate) {
	return db
		.updateTable("orders")
		.set(orderData)
		.where("orderid", "=", orderId)
		.returningAll()
		.executeTakeFirst();
}

export async function deleteOrder(orderId: string) {
	return db.deleteFrom("orders").where("orderid", "=", orderId).execute();
}
