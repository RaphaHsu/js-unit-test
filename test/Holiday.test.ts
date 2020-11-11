import {Holiday} from "../src/Holiday";

class HolidayStub extends Holiday {
    private today: Date;

    public setToday(mm, dd) {
        this.today = new Date(2020, mm, dd)
    }

    protected getToday() {
        return this.today
    }
}

describe('Holiday', () => {
    let holiday: HolidayStub;

    beforeEach(() => {
        holiday = new HolidayStub();
    })

    it('today is xmas', function () {
        holiday.setToday(11, 25);
        expect(holiday.sayHello()).toBe('Merry Xmas');
    });

    it('today is not xmas', function () {
        holiday.setToday(11, 23);
        expect(holiday.sayHello()).toBe('Today is not Xmas');
    });
})
