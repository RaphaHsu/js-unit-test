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

    function givenToday(mm: number, dd: number) {
        holiday.setToday(mm, dd);
    }

    it('today is xmas', function () {
        givenToday(11, 25);
        outputShouldBe('Merry Xmas')
    });

    function outputShouldBe(msg: string) {
        expect(holiday.sayHello()).toBe(msg);
    }

    it('today is not xmas', function () {
        givenToday(11, 23);
        outputShouldBe('Today is not Xmas');
    });
    
    it('today is xmas at Dec 24', function () {
        givenToday(11, 24);
        outputShouldBe('Today is Xmas');
    });
})
