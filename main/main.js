'use strict';

let printReceipt = (inputs)=> {
  let cartItems = buildItems(inputs);
  let itemsSubtotal = buildReceiptItems(cartItems);
  let receipt = buildReceipt(itemsSubtotal);
  printCartItemsReceipt(receipt);
};


function buildItems(inputs) {

  let allItems = Item.all();
  let carItems = [];

  inputs.forEach(function (input, index, array) {
    let barcode = input.split('-')[0];
    let count = 0;

    if (input.split('-')[1]) {
      count = parseFloat(input.split('-')[1]);
    } else count = 1;

    let carItem = carItems.find(function (carItem) {
      return carItem.item.barcode == barcode;
    });

    if (carItem) {
      carItem.count += count;
    }

    else {
      let item = allItems.find(function (item) {
        return item.barcode === barcode
      });
      carItems.push({item: item, count: count});
    }
  });

  return carItems;

}

function buildReceiptItems(cartItems) {

  let itemsSubtotal = [];

  cartItems.forEach(function (cartItem) {

    if (Promotion.all()[0].barcodes.find((barcode) => {return barcode == cartItem.item.barcode})) {
      if (Promotion.all()[0].type == "BUY_TWO_GET_ONE_FREE") {
        let money = cartItem.count * cartItem.item.price;
        let saved = parseInt(cartItem.count / 3) * cartItem.item.price;
        let subtotal = money - saved;
        itemsSubtotal.push({cartItem, saved, subtotal});
      }
    }
    else {
      let subtotal = cartItem.count * cartItem.item.price;
      let saved = 0;
      itemsSubtotal.push({cartItem, saved, subtotal});
    }
  });

  return itemsSubtotal;
}

function buildReceipt(itemsSubtotal) {
  let savedTotal = 0;
  let total = 0;

  itemsSubtotal.forEach(function (itemsSub) {
    savedTotal += itemsSub.saved;
    total += itemsSub.subtotal;
  });

  return {itemsSubtotal, savedTotal, total};
}


function printCartItemsReceipt(receipt) {
  let String = "***<没钱赚商店>收据***";

  let dateDigitToString = (num) =>{
    return num < 10 ? '0' + num : num;
  };

  let currentDate = new Date();
   let year = dateDigitToString(currentDate.getFullYear());
   let month = dateDigitToString(currentDate.getMonth() + 1);
   let day = dateDigitToString(currentDate.getDate());
  let  hour = dateDigitToString(currentDate.getHours());
  let  minute = dateDigitToString(currentDate.getMinutes());
  let  second = dateDigitToString(currentDate.getSeconds());



  String +='\n打印时间：'+year+"年"+month+"月"+day+"日 "+hour+":"+minute+":"+second+'\n----------------------';



  receipt.itemsSubtotal.forEach(function (itemsSubtotal) {
    String += '\n名称：' + itemsSubtotal.cartItem.item.name + '，数量：' + itemsSubtotal.cartItem.count + itemsSubtotal.cartItem.item.unit + '，单价：' + itemsSubtotal.cartItem.item.price.toFixed(2) + '(元)，小计：' + itemsSubtotal.subtotal.toFixed(2) + '(元)';
  });

  String += '\n----------------------' + '\n总计：' + receipt.total.toFixed(2) + '(元)' + '\n节省：' + receipt.savedTotal.toFixed(2) + '(元)' + '\n**********************';
  console.log(String);
}
