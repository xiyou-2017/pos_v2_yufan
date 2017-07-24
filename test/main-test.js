'use strict';

describe('pos', () => {
  let inputs, dateDigitToString;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    dateDigitToString = num => num < 10 ? `0${num}` : num;
  });

  it('should print correct text', () => {

    spyOn(console, 'log');
    printReceipt(inputs);

    const currentDate = new Date(),
      year = dateDigitToString(currentDate.getFullYear()),
      month = dateDigitToString(currentDate.getMonth() + 1),
      date = dateDigitToString(currentDate.getDate()),
      hour = dateDigitToString(currentDate.getHours()),
      minute = dateDigitToString(currentDate.getMinutes()),
      second = dateDigitToString(currentDate.getSeconds()),
      formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;

    const expectText = `***<没钱赚商店>收据***
打印时间：${formattedDateString}
----------------------
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

describe('unit test', () => {
  describe('buildItems', () => {
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    it('should return correct items', () => {
      const countedItems = [
        {
          item:new Item('ITEM000001', '雪碧', '瓶', 3.00),
          count: 5
        },
        {
          item:new Item('ITEM000003', '荔枝', '斤', 15.00),
          count: 2
        },
        {
          item:new Item('ITEM000005', '方便面', '袋', 4.50),
          count: 3
        }
      ];


      console.log(countedItems);

      expect(buildItems(inputs)).toEqual(countedItems);
    });
  });

});
