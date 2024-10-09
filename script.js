const bodyDiv = document.getElementById("body-div");

async function getData() {
  const res = await fetch(
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
  );
  const data = await res.json();
  const completeData = data.items;
  console.log(completeData);

  let elm = "";
  let elm1 = "";
  let totalPrice = 0;

  completeData.forEach((item, index) => {
    let itemTotal = (item.price * item.quantity) / 100;
    totalPrice += itemTotal;

    elm += `<tr>
              <td><img class="table-img" src="${item.image}" alt="" /></td>
              <td>
                <div class="p-name">Product:</div>
                <div class="product">${item.product_title}</div>
              </td>
              <td class="price">
                <div class="p-price">Price:</div>
                <div class="pr-price">Rs. ${item.price / 100}.00</div>
              </td>
              <td>
                <div class="qty-div">
                  <div class="p-qty">Qty:</div>
                  <div class="counter-div">
                    <input
                      type="number"
                      value="${item.quantity}"
                      min="1"
                      class="quantity-input"
                      id="quantity-${index}"
                      onclick="updateQuantity(${index}, this.value, ${
      item.price
    })"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="sub-total">Subtotal:</div>
                <div class="total" id="subtotal-${index}">Rs. ${itemTotal}.00</div>
              </td>
              <td><img class="delete" src="assets/remove.png" alt="" onclick="remove(${index})" /></td>
            </tr>`;
  });

  elm1 += `<h1>Cart Totals</h1>
            <div class="sub-total-div">
              <p>Subtotal</p>
              <p id="cart-subtotal">Rs. ${totalPrice}.00</p>
            </div>
            <div class="total-div">
              <p>Total</p>
              <h3 id="cart-total">Rs. ${totalPrice}.00</h3>
            </div>
            <button class="checkOut-btn">Check Out</button>`;

  document.getElementById("body-div").innerHTML = elm;
  document.querySelector(".right-side").innerHTML = elm1;
}

function updateQuantity(index, newQuantity, itemPrice) {
  const priceElement = document.getElementById(`subtotal-${index}`);

  const newSubtotal = ((itemPrice * newQuantity) / 100).toFixed(2);
  priceElement.textContent = `Rs. ${newSubtotal}`;

  cart();
}

function cart() {
  const cartRows = document.querySelectorAll("#body-div tr");
  let total = 0;

  cartRows.forEach((row) => {
    const subtotal = parseFloat(
      row.querySelector(".total").textContent.replace("Rs. ", "")
    );
    total += subtotal;
  });

  document.getElementById("cart-subtotal").textContent = `Rs. ${total.toFixed(
    2
  )}`;
  document.getElementById("cart-total").textContent = `Rs. ${total.toFixed(2)}`;
}

// Remove item
function remove(index) {
  const rows = document.querySelectorAll("#body-div tr");
  rows[index].remove();
  cart();
}

getData();
