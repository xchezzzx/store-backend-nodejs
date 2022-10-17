const isLeapYear = require('../func.js').isLeapYear;

const expect = require('chai').expect;

describe ('Leap year tests', () => {
    
    it('1. Check regular not leap', () => {
        let NotLeap1 = isLeapYear(1919);
        expect(NotLeap1).to.be.false;
    });

    it('2. Check regular not leap', () => {
        let NotLeap2 = isLeapYear(1919);
        expect(NotLeap2).to.be.false;
    });

    it('3. Check regular not leap', () => {
        let NotLeap3 = isLeapYear(1919);
        expect(NotLeap3).to.be.false;
    });

    it('4. Check millenium', () => {
        let NotLeap4 = isLeapYear(2000);
        expect(NotLeap4).to.be.false;
    });
})
