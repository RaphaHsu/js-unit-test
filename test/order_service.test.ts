import {IOrder, OrderService} from "../src/order_service";
import {IBookDao} from "../src/book_dao";

class FakeOrder implements IOrder {
    public orderType: any;

    constructor(type) {
        this.orderType = type;
    }
}

class FakeOrderService extends OrderService {
    get_orders(): FakeOrder[] {
        return [
            new FakeOrder('Book'),
            new FakeOrder('Video'),
            new FakeOrder('Book'),
        ]
    }
}

class FakeDao implements IBookDao {
    insert(order) {
    }
}

describe('sync book orders', function () {
    it('should only sync book orders', () => {
        const fakeDao = new FakeDao();
        const spy = jest.spyOn(fakeDao, 'insert')
        let orderService = new FakeOrderService(fakeDao);
        orderService.sync_book_orders();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toBeCalledWith(expect.objectContaining({orderType: 'Book'}))
    });
});
