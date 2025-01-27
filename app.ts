type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const main = "https://fakestoreapi.com/products";
const cardContainer = document.querySelector("#card-container");

const searchInput = document.querySelector<HTMLInputElement>("#search-input");
const searchBtn = document.querySelector<HTMLInputElement>("#search-btn");

let cart: Product[] = []

async function fakeshop() {
  try {
    const response = await fetch(main);
    const prods: Product[] = await response.json();
    genProductCard(prods)
    if(searchInput && searchBtn){
        searchBtn.addEventListener("click", () => {
            const input = searchInput.value.toLowerCase();
            const filteredProducts = prods.filter(prods =>
                prods.title.toLowerCase().includes(input) ||
                prods.description.toLowerCase().includes(input)
            );
            genProductCard(filteredProducts)})
    }
    createCategoryDropdown(prods)
  } catch (err) {
    console.warn("Error" + err);
  }
}


function genProductCard(prods:Product[]){
    if(cardContainer){
        cardContainer.innerHTML = ''
        prods.forEach((el) => {
            
            
            cardContainer.innerHTML += `
            <article>
            <div class="card bg-white w-[20vw] h-[60vh] shadow-2xl p-2 text-gray-950" >
            <figure>
            <img class="shadow-2xl"
            src="${el.image}"
            alt="${el.description}" />
            </figure>
            <div class="card-body">
            <h2 class=" text-clip">
            ${el.title}
            <div class="badge badge-accent ">${el.rating.rate}</div>
            </h2>
            <p class="truncate text-gray-500" >${el.description}</p>
            <div class="card-actions justify-end">
            <div class="text-xl" >${el.price.toFixed(2)}$</div>
            <button class="btn btn-sm btn-primary add-to-cart-btn" data-id="${el.id}">Add to Cart</button>
            </div>
            </div>
            </div>
            </article>`;
            
        });
        document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
          button.addEventListener("click", (event) => {
            const target = event.target as HTMLButtonElement;
            const productId = parseInt(target.dataset.id || "0");
            const product = prods.find((prod) => prod.id === productId);
            if (product) {
              addToCart(product);
            }
          });
        });
    }
}
function createCategoryDropdown(prods: Product[]) {
  const navbarCenter = document.querySelector(".navbar-center");
  if (navbarCenter) {
    const categories = Array.from(new Set(prods.map((prod) => prod.category)));

    const dropdown = document.createElement("select");
    dropdown.className = "select select-bordered";
    dropdown.innerHTML = `<option value="">Sort by Category</option>`;
    categories.forEach((cat) => {
      dropdown.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    dropdown.addEventListener("change", () => {
      const selectedCategory = dropdown.value;
      const filteredProducts =
        selectedCategory === ""
          ? prods
          : prods.filter((prod) => prod.category === selectedCategory);
      genProductCard(filteredProducts);
    });

    navbarCenter.appendChild(dropdown);
  }
}

function addToCart(product: Product) {
  cart.push(product);
  updateCartBadge();
  alert(`${product.title} added to the cart!`);
}

function updateCartBadge() {
  const cartBadge = document.querySelector(".indicator .badge");
  if (cartBadge) {
    cartBadge.textContent = cart.length.toString();
  }
}

fakeshop()

