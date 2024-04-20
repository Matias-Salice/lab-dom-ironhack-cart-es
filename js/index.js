// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');
  const productSubtotal = price.innerHTML * quantity.value;
  const subtotal = product.querySelector('.subtotal span');
  if (productSubtotal >= 0) {
    subtotal.innerHTML = productSubtotal;
  } else {
    subtotal.innerHTML = 0;
    quantity.value = 0;
  }
  return subtotal;
}

function calculateAll() {
  const allProducts = document.querySelectorAll('tr.product');
  let total = 0;

  allProducts.forEach((product) => {
    const subtotal = updateSubtotal(product);
    total = total + parseFloat(subtotal.innerHTML);
  });

  const totalValue = document.querySelector('#total-value span');
  totalValue.innerHTML = total;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);

  const productFind = target.closest('.product'); // El metodo closest() busca el primer padre que coincida con la clase o id pasados).
  if (productFind) {
    productFind.remove();
    calculateAll();
  }
}

// ITERATION 5

function createProduct() {
  const productName = document.querySelector(
    'input[placeholder="Product Name"]'
  );
  const productPrice = document.querySelector(
    'input[placeholder="Product Price"]'
  );
  const tableBody = document.querySelector('.table-body');

  let tableRow = document.createElement('tr');
  tableRow.classList.add('product');
  let nameCell = document.createElement('td');
  nameCell.classList.add('name');
  let productNameSpan = document.createElement('span');
  productNameSpan.textContent = productName.value;
  nameCell.appendChild(productNameSpan);
  tableRow.appendChild(nameCell);

  let priceCell = document.createElement('td');
  priceCell.classList.add('price');
  let productPriceSpan = document.createElement('span');
  productPriceSpan.textContent = productPrice.value;
  priceCell.appendChild(document.createTextNode('$'));
  priceCell.appendChild(productPriceSpan);
  tableRow.appendChild(priceCell);

  let quantityCell = document.createElement('td');
  quantityCell.classList.add('quantity');
  let quantityInput = document.createElement('input');
  quantityInput.setAttribute('type', 'number');
  quantityInput.setAttribute('value', '0');
  quantityInput.setAttribute('min', '0');
  quantityInput.setAttribute('placeholder', 'Quantity');
  quantityCell.appendChild(quantityInput);
  tableRow.appendChild(quantityCell);

  let subtotalCell = document.createElement('td');
  subtotalCell.classList.add('subtotal');
  let subtotalSpan = document.createElement('span');
  subtotalSpan.textContent = '0';
  let subtotalSymbol = document.createTextNode('$');
  subtotalCell.appendChild(subtotalSymbol);
  subtotalCell.appendChild(subtotalSpan);
  tableRow.appendChild(subtotalCell);

  let removeCell = document.createElement('td');
  removeCell.classList.add('action');
  let removeButton = document.createElement('button');
  removeButton.classList.add('btn', 'btn-remove');
  removeButton.textContent = 'Remove';
  removeCell.appendChild(removeButton);
  tableRow.appendChild(removeCell);

  tableBody.appendChild(tableRow);

  productName.value = '';
  productPrice.value = '0';
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const tableBody = document.querySelector('.table-body');

  tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remove')) {
      const productRow = event.target.closest('.product');
      if (productRow) {
        productRow.remove();
        calculateAll(); // Recalcular el total después de eliminar un producto
      }
    }
  });

  const btnCreate = document.querySelector('#create');
  btnCreate.addEventListener('click', createProduct);
});

