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
            <h2 class="card-title text-clip">
            ${el.title}
            <div class="badge badge-secondary">NEW</div>
            </h2>
            <p class="truncate" >${el.description}</p>
            <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
            </div>
            </div>
            </div>
            </article>`;
            
        });
    }
}

fakeshop()

