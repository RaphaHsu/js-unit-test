import {BookDao} from "./book_dao";

export interface IOrder {
   orderType: string
}

export class OrderService {
    private readonly _bookDao: any;

    constructor(bookDao = new BookDao()) {
        this._bookDao = bookDao ;
    }


    sync_book_orders(): void {
        let orders: IOrder[] = this.get_orders();
        console.log(orders);

        orders.filter((order) => {
            return order.orderType === "Book";
        }).forEach((order) => {
            this._bookDao.insert(order);
        });
    }

    get_orders(): IOrder[] {
        const parse = require('csv-parse');
        const fs = require('fs');
        const fsPromises = fs.promises;
        const path = require('path');

        const inputFilePath = path.resolve(__dirname, './orders.csv');

        // @ts-ignore
        return main();

        async function main(): Promise<IOrder[] | Error> {
            const inputFile = await fsPromises.readFile(inputFilePath);
            const parsedResult = await parseCSV(inputFile, {
                delimiter: ',',
                columns: true,
            });

            console.log('parsedResult', parsedResult);
            return parsedResult;
        }

        function parseCSV(input, options): Promise<IOrder[]|Error> {
            return new Promise((resolve, reject) => {
                parse(input, options, (error, output) => {
                    if (error) {
                        console.error('[ERROR] parseCSV: ', error.message);
                        // @ts-ignore
                        reject('[ERROR] parseCSV: ', error.message);
                    }

                    resolve(output);
                });
            });
        }
    }
}
