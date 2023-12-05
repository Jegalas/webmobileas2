const productsContainer = document.getElementById("products-container")
const categorySelection = document.getElementById("categorySelection")
const paginationDiv = document.getElementById("pages")
const searchBox = document.getElementById("searchbox")
let products;
let categories;

async function getProducts() {
    let result;
    try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        result = await response.json();
    } catch (e) {
        console.log('Error occuried');
    }
    products = result.products;
    display(products)
}

async function getCategories() {
    try {
        const response = await fetch("https://dummyjson.com/product/categories");
        categories = await response.json();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelection.appendChild(option);
        });
    } catch (e) {
        console.log('Error occuried');
    }
}

let currentPage = 1
const productPerPage = 10

const createCard = (props) => {
    const card = document.createElement("div")
    card.id = props.id;
    card.classList.add('card');

    //title
    const title = document.createElement("div")
    title.textContent = props.title
    title.classList.add('title')

    //thumbnail 
    const thumbnail = document.createElement("div")
    thumbnail.classList.add('thumbnail')
    const thumbnailImg = document.createElement("img")
    thumbnailImg.src = props.thumbnail
    const discountPercentage = document.createElement("div")
    discountPercentage.classList.add("discountPercentage")
    discountPercentage.textContent = "-" + props.discountPercentage + "%"
    thumbnail.appendChild(thumbnailImg)
    thumbnail.appendChild(discountPercentage)

    //details
    const details = document.createElement("div")
    details.classList.add("details")
    const price = document.createElement("div")
    price.classList.add("price")
    price.textContent = props.price + "$"
    const rating = document.createElement("div")
    rating.classList.add("rating")
    rating.textContent = props.rating + "/5"
    details.appendChild(price)
    details.appendChild(rating)

    //description
    const description = document.createElement("div")
    description.classList.add("description")
    description.textContent = props.description

    //market
    const market = document.createElement("div")
    market.classList.add("market")
    const brand = document.createElement("div")
    brand.classList.add("brand")
    brand.textContent = props.brand
    const more = document.createElement("div")
    more.classList.add("more")
    more.textContent = "See more"
    more.onclick = () => {
        window.location = "./product.html?id=" + props.id
    }
    const stock = document.createElement("div")
    stock.classList.add("stock")
    stock.textContent = "Stock: " + props.stock
    market.appendChild(brand)
    market.appendChild(more)
    market.appendChild(stock)

    card.appendChild(title)
    card.appendChild(thumbnail)
    card.appendChild(details)
    card.appendChild(description)
    card.appendChild(market)
    return card
}


function display(list) {
    productsContainer.innerHTML = ""
    let index1 = (currentPage - 1) * productPerPage
    let index2 = index1 + productPerPage
    list.slice(index1, index2).forEach(element => {
        productsContainer.appendChild(createCard(element))
    });
    addPagination(list)
}

function addPagination(selectedProducts) {
    const totalPages = Math.ceil(selectedProducts.length / productPerPage);
    paginationDiv.innerHTML = ""

    for (let i = 1; i <= totalPages; i++) {
        const page = document.createElement('div');
        page.classList.add('page');
        page.id = i;
        if (i == currentPage) page.classList.add('active');
        page.innerText = i;
        page.onclick = () => {
            currentPage = i
            filterDisplay()
        }
        paginationDiv.appendChild(page);
    }
}

function filterDisplay() {
    const searchInput = searchBox.value.toLowerCase()
    const currentCategory = categorySelection.value

    const selectedProducts = products.filter(product => {
        const cond1 = product.title.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput) ||
            product.brand.toLowerCase().includes(searchInput)
        const cond2 = !currentCategory || product.category == currentCategory;
        const cond3 = product.category && product.category.toLowerCase().includes(searchInput);
        return cond2 && (cond1 || cond3)
    })
    display(selectedProducts)
}

categorySelection.addEventListener("change", filterDisplay)
searchBox.addEventListener("input", filterDisplay)


await getProducts();
await getCategories();

