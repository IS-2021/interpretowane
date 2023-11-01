import { db } from "@/database/db";
import type { NewOrder } from "@/database/types";

export async function getAllOrders() {
	return db.selectFrom("orders").selectAll().execute();
}

export async function getOrderById(orderId: string) {
	return db.selectFrom("orders").where("orderid", "=", orderId).selectAll().execute();
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
	return db.insertInto("orders").values(order).returningAll().executeTakeFirst();
}

export async function getOrdersByStatusId(statusId: string) {
	return db
		.selectFrom("orders")
		.innerJoin("orderstatuses", "orders.orderstatusid", "orderstatuses.orderstatusid")
		.where("orderstatuses.orderstatusid", "=", statusId)
		.selectAll()
		.execute();
}

export async function updateOrderStatus(orderId: string, orderStatusName: string) {
	const orderStatus = await db
		.selectFrom("orderstatuses")
		.where("status", "=", orderStatusName)
		.select("orderstatusid")
		.executeTakeFirst();

	if (!orderStatus) {
		throw new Error(`Couldn't find OrderStatus with name ${orderStatusName}`);
	}

	return db
		.updateTable("orders")
		.set({ orderstatusid: orderStatus.orderstatusid })
		.where("orderid", "=", orderId)
		.returningAll()
		.executeTakeFirst();
}
