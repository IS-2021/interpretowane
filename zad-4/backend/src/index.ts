import { database } from "@/database";

const orderStatuses = await database.selectFrom("orderstatuses").select("status").execute();
console.log(orderStatuses);
