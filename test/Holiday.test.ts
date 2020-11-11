import {Holiday} from "../src/Holiday";

class HolidayStub extends Holiday {
    private readonly today: Date;

    constructor(mm, dd) {
        super();
        this.today = new Date(2020, mm, dd)
    }

    protected getToday() {
        return this.today
    }
}

describe('Holiday', () => {
    it('today is xmas', function () {
        const holiday = new HolidayStub(11, 25);
        expect(holiday.sayHello()).toBe('Merry Xmas');
    });

    it('today is not xmas', function () {
        const holiday = new HolidayStub(11, 24);
        expect(holiday.sayHello()).toBe('Today is not Xmas');
    });
})
