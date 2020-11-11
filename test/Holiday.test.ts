class Holiday {
    sayHello() {
        return 'Merry Xmas'
    }
}

describe('Holiday', () => {
    it('today is xmas', function () {
        const holiday = new Holiday();
        expect(holiday.sayHello()).toBe('Merry Xmas');
    });

    it('today is not xmas', function () {
        const holiday = new Holiday();
        expect(holiday.sayHello()).toBe('Today is not Xmas');
    });
})
