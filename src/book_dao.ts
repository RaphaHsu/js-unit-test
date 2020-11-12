export interface IBookDao {
    insert(order): void;
}

export class BookDao implements IBookDao {
    insert(order) {
        console.log(`order type:${order.orderType}`);
    }
}
