const params = new URLSearchParams(location.search)
console.log(params)
let id = params.get('id')

fetch("https://striveschool-api.herokuapp.com/api/product/" + id,{
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
        "content-type": "application/json",
    },
}).then(response => {
    response.json().then(data => {
        //console.log(data)
        let detailContent = document.querySelector('#product-container')
        console.log(detailContent)
        detailContent.innerHTML +=
            `
            <div class="col">
                <img src="./assets/img/myfarm-logo.png" alt="site-logo" class="logo-style">
                <h1 class=" text-center my-3">${data.name}</h1>
                <div class="img-wrapper bg-success-subtle p-5 mb-5">
                <img src="${data.imageUrl}" alt=""
                    class="w-50">
                </div>

                <h2>Descrizione</h2>

                <p>${data.description}</p>
                <p class="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint hic optio consequuntur id, quae
                dolor dignissimos voluptatum nulla a in.</p>
                <p><small><strong>Ok, potevo impegnarmi di più, lo ammetto. Purtroppo il tempo è tiranno.</strong></small></p>
                <h3>Prezzo</h3>
                <p class="mb-3">€ ${data.price},00</p>
                <div class="btn-wrapper">
                <a href="frontend.html" class="card-link me-3 link-success">Torna ai prodotti</a>
                <a href="#" class="btn btn-success" onclick="alert('Spiacente, non puoi comprarlo davvero.')">Acquista</a>
                </div>
            </div>
            `
    })
})

