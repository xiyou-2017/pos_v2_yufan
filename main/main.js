'use strict';

let printReceipt = (inputs)=> {
  // let cartItems = buildItems(inputs);
  // let itemsSubtotal = buildReceiptItems(cartItems);
  // let receipt = buildReceipt(itemsSubtotal);
  // printCartItemsReceipt(receipt);
}


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
