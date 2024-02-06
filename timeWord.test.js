const { timeWord, convertToWords } = require('./timeWord');

describe('timeWord', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });

  test('00:00 is midnight', () => {
    expect(timeWord('00:00')).toBe('midnight');
  });  

  test('00:12 is twelve twelve am', () => {
    expect(timeWord('00:12')).toBe('twelve twelve am');
  });

  test("01:00 is one o'clock am", () => {
    expect(timeWord('01:00')).toBe("one o'clock am");
  });

  test('06:01 is six oh one am', () => {
    expect(timeWord('06:01')).toBe('six oh one am');
  });

  test('06:10 is six ten am', () => {
    expect(timeWord('06:10')).toBe('six ten am');
  });

  test('06:18 is six eighteen am', () => {
    expect(timeWord('06:18')).toBe('six eighteen am');
  });

  test('06:30 is six thirty am', () => {
    expect(timeWord('06:30')).toBe('six thirty am');
  });

  test('10:34 is ten thirty four am', () => {
    expect(timeWord('10:34')).toBe('ten thirty four am');
  });

  test('12:00 is noon', () => {
    expect(timeWord('12:00')).toBe('noon');
  });

  test('12:09 is twelve oh nine pm', () => {
    expect(timeWord('12:09')).toBe('twelve oh nine pm');
  });

  test('23:23 is eleven twenty three pm', () => {
    expect(timeWord('23:23')).toBe('eleven twenty three pm');
  });
});

describe('convertToWords', () => {
  test('it is a function', () => {
    expect(typeof convertToWords).toBe('function');
  });
});
