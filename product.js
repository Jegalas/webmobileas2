function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const productId = getQueryParam('id');

console.log(productId);

const handleRender = (data) => {
    document.title = data.title;

    const productTitle = document.getElementById('productTitle');
    productTitle.textContent = data.title;

    const productDescription = document.getElementById('productDescription');
    productDescription.textContent = data.description;

    const productPrice = document.getElementById('productPrice');
    productPrice.textContent = "Price: $" + data.price;

    const productRating = document.getElementById('productRating');
    productRating.textContent = "Rating: " + data.rating;

    const productStock = document.getElementById('productStock');
    productStock.textContent = "Stock: " + data.stock;

    const productBrand = document.getElementById('productBrand');
    productBrand.textContent = "Brand: " + data.brand;

    const productCategory = document.getElementById('productCategory');
    productCategory.textContent = "Category: " + data.category;

    const productImages = document.getElementById('productImages');
    data.images.forEach(image => {
        const tempImgElement = document.createElement("img");
        tempImgElement.src = image;
        productImages.appendChild(tempImgElement);
    });
};

fetch("https://dummyjson.com/product/" + productId)
    .then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    }).then(data => {
        console.log(data);
        handleRender(data);
    }).catch(err => {
        console.error(err);
        // You might want to display a user-friendly error message here
    });
