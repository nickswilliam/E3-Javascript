class Pizzas {
  constructor(id, nombre, ingredientes, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.precio = precio;
    this.img = img;
  }
}

const pizzasObj = [
  new Pizzas(1, 'Muzzarella Simple', ['Muzzarella', 'Aceitunas', 'Aceite', 'Oregano'], 900, '<img src="./assets/imgs/muzzarella.jpg" alt="muzza">'),
  new Pizzas(2, 'Jamón y Morrón', ['Muzzarella', 'Morrón', 'Jamón', 'Oregano'], 1500, '<img src="./assets/imgs/jamon-morron.jpg" alt="jamon-morron">'),
  new Pizzas(3, 'Roquefort', ['Roquefort', 'Aceitunas', 'Aceite', 'Oregano'], 1700, '<img src="./assets/imgs/roquefort.jpg" alt="roquefort">'),
  new Pizzas(4, 'Napolitana', ['Muzzarella', 'Tomate', 'Provenzal', 'Adobo'], 1400, '<img src="./assets/imgs/napolitana.jpg" alt="napolitana">'),
  new Pizzas(5, 'Fugazzetta', ['Cremoso', 'Cebolla', 'Aceitunas', 'Oregano'], 1800, '<img src="./assets/imgs/fugazzetta.jpg" alt="fugazzetta">'),
  new Pizzas(6, 'Calabresa', ['Muzzarella', 'Aceitunas', 'Salami', 'Adobo'], 1900, '<img src="./assets/imgs/calabresa.jpg" alt="calabresa">'),
];

const form = document.getElementById('formtype')
const inputNumber = document.getElementById('input-number')
const container = document.querySelector('.container')

const hiddenContainer = () => {
  if (inputNumber.value === '') {
    container.classList.add('hidden')
    container.classList.remove('error')
  }
}

const errorContainer = () => {
  container.classList.add('error')
  container.classList.remove('hidden')
}

const showContainer = () => {
  container.classList.remove('error')
  container.classList.remove('hidden')
}

const findPizzaHtml = (value) => pizzasObj.find(pizza => pizza.id === value);

const renderResult = pizza => {
  if (!pizza) {
    errorContainer();
    container.innerHTML = 'No hay pizzas para el ID ingresado'
    localStorage.clear();
  } else {
    showContainer();
    container.innerHTML = `
    <div class="container-pizza">
    <h2>${pizza.nombre}</h2>
    ${pizza.img}
    <p>Ingredientes: ${pizza.ingredientes.join(', ')}</p>
    <h3>Precio: $${pizza.precio}</h3>
</div>
`
    saveToStorage(pizza)
  }
}

const saveToStorage = pizzaFind => {
  localStorage.setItem('pizza', JSON.stringify(pizzaFind))
}


const searchID = (e) => {
  e.preventDefault();
  const inputSearch = inputNumber.value;
  const inputToInt = parseInt(inputSearch);


  if (!inputSearch) {
    errorContainer();
    container.innerHTML = 'Debe ingresar un valor';
    localStorage.clear();
    return;
  }

  const searchedPizza = findPizzaHtml(inputToInt);

  renderResult(searchedPizza);
  inputNumber.value = '';
}


hiddenContainer();
form.addEventListener('submit', searchID);

if(localStorage.length !== 0) {
  renderResult(JSON.parse(localStorage.getItem('pizza')))
}

