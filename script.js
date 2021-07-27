

var productNameInpu = document.getElementById("productNameInput");
var productPriceInpu = document.getElementById("productPriceInput");
var productCategoryInpu = document.getElementById("productCategoryInput");
var productDescInpu = document.getElementById("productDescInput");
var total = 0;
var productsContainer;
var totalTmp;
var productsCount = 0;
var addBtn = document.getElementById("addBtn");
var currentindex = 0;




addBtn.addEventListener("click", function () {

    if (addBtn.innerHTML == "إضافة منتج") {
        addProduct();
    }
    else {

        saveUpdate();
        newStart();
        location.reload();

    }
})

if (localStorage.getItem("myProducts") == null) {
    productsContainer = [];


}
else {
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
    for (var i = 0; i < productsContainer.length; i++) {
        total += productsContainer[i].desc;
    }

    document.getElementById("totalCell").innerHTML = total;


}

emptyFields();


function addProduct() {
    var product =
    {
        name: productNameInpu.value,
        price: productPriceInpu.value,
        category: productCategoryInpu.value,
        desc: productPriceInpu.value * productCategoryInpu.value
    }
    productsContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    total += productPriceInpu.value * productCategoryInpu.value;
    totalTmp = total;

    newStart();
    displayProducts();
}


function displayProducts() {
    var cartona = "";
    for (var i = 0; i < productsContainer.length; i++) {

        cartona +=
            `<tr>
        <td style="font-weight:bold">`+ i + `</td>
         <td style="font-weight:bold">` + productsContainer[i].name + `</td><td style="font-weight:bold">` + productsContainer[i].price + `</td>
         <td style="font-weight:bold">`+ productsContainer[i].category + `</td><td style="font-weight:bold">` + productsContainer[i].desc + `</td>
         <td style="font-weight:bold"><button onclick='updateProduct(`+ i + `)' style="font-weight:bold" class='btn btn-success'>تعديل</button></td>
         <td><button onclick='deleteProduct(`+ i + `)' style="font-weight:bold" class='btn btn-danger '>حذف</button></td>
           
         </tr>`
    }
    document.getElementById("totalCell").innerHTML = total;
    document.getElementById("tableBody").innerHTML = cartona;

}

function newStart() {
    document.getElementById("productNameInput").value = " ";
    document.getElementById("productPriceInput").value = " ";
    document.getElementById("productCategoryInput").value = " ";
}






var today = new Date();
var date = today.getFullYear() + ' - ' + (today.getMonth() + 1) + ' - ' + today.getDate();
var time = today.getHours() + " : " + today.getMinutes();

var dateTime = date + "  || " + time;
document.getElementById("time").innerHTML = dateTime;


function clearLocalStorage() {

    var status = confirm("مسح بيانات اليوم الحالية؟");
    if (status == true) {
        localStorage.clear();
        location.reload();

    }

}

function searchProduct(term) {
    var box = ` `;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.includes(term) == true) {
            box += `<tr>
        <td>`+ i + `</td>
        <td>` + productsContainer[i].name + `</td><td>` + productsContainer[i].price + `</td>
        <td>`+ productsContainer[i].category + `</td><td>` + productsContainer[i].desc + `</td>
        <td><button onclick='updateProduct(`+ i + `)' class='btn btn-success'>تعديل</button></td>
        <td><button onclick='deleteProduct(`+ i + `)' class='btn btn-danger '>حذف</button></td>
        </tr>`;


        }
    }
    document.getElementById("tableBody").innerHTML = box;

}

function deleteProduct(index) {

    productsContainer.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts();
    location.reload();
}


function updateProduct(index) {
    currentindex = index;
    document.getElementById("productNameInput").value = productsContainer[index].name;
    document.getElementById("productPriceInput").value = productsContainer[index].price;
    document.getElementById("productCategoryInput").value = productsContainer[index].category;
    addBtn.innerHTML = "تحديث منتج";

}


function saveUpdate() {

    var product =
    {
        name: productNameInpu.value,
        price: productPriceInpu.value,
        category: productCategoryInpu.value,
        desc: productPriceInpu.value * productCategoryInpu.value
    }
    productsContainer[currentindex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts();
    addBtn.innerHTML = "إضافة منتج";

}




