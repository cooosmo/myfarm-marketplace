document.addEventListener('DOMContentLoaded',()=>{
    getData()
})

const params = new URLSearchParams(location.search)
console.log(params)
let id = params.get('id')

/* GET DEI DATI*/
function getData(){
    fetch("https://striveschool-api.herokuapp.com/api/product/",{
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
            "content-type": "application/json",
        },
    }).then(response => {
        response.json().then(data => {
            //console.log(data)
            let productList = document.querySelector('#product-wrapper')
            productList.innerHTML = ''
            data.forEach(element => {
                //console.log(element)
                
                productList.innerHTML +=
                `
                <div class="col-6 card mb-3 p-0" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${element.imageUrl}" class="img-fluid rounded-start card-img-style" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h3 class=" card-title">${element.name}</h3>
                      <h4 class="h5">Descrizione</h4>
                      <p class="card-text">${element.description}</p>
                      <h4 class="h5">Prezzo</h4>
                      <p class="card-text">€ ${element.price},00</p> 
                      <a href="details.html?id=${element._id}" class="card-link me-3 link-success">Scopri di più</a>
                      <a href="#" class="btn btn-success" onclick="alert('Mi dispiace ma non ho avuto tempo')">Aggiungi al carrello</a>
                    </div>
                  </div>
                </div>
              </div>
                `
                
            } );
        })
    })
}




function addToCart(id, price){
   let cart = localStorage.getItem('cart')
   let cartObj = {
    id: id,
    price: price,
    qty: 1
   }
   if(cart == null){
    localStorage.setItem('cart',JSON.stringify([cartObj]))
   } else {
    cart = JSON.parse(cart)
    let exit = 1
    cart.forEach((element, index) => {
        if(element.id === id){
            cartObj.qty += 1
            cart.splice(index)
            localStorage.setItem('cart',JSON.stringify([cartObj]))
            exit=0
        } if(exit === 1){
            cart.push(cartObj)
            localStorage.setItem('cart',JSON.stringify(cart))
        }
    })
    
   }
}

let navLinks = document.querySelectorAll('nav a')
navLinks.forEach(navLink =>{
    navLink.addEventListener('click', ()=>{
        alert('Davvero? Non hai davvero capito che sono finti?')
    })
})