let scatolaProdotti = document.getElementById('prodotti-aggiunti')

function aggiungiProdotto(){
    //console.log('ciao')
    let getName = document.getElementById('name').value
    let getDesc = document.getElementById('description').value
    let getBrand = document.getElementById('brand').value
    let getImgUrl = document.getElementById('imageUrl').value
    let getPrice = document.getElementById('price').value
    
    //console.log(getPrice)

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
            "Content-Type": "application/json",
        },
        method:"POST",
        body: JSON.stringify({
            name: getName,
            description: getDesc, 
            brand: getBrand,
            imageUrl: getImgUrl,
            price: getPrice
        })
    }).then(response =>{
        //console.log(response)
        if(response.status === 200) {
            alert('Prodotto creato')
        } else {
            alert('articolo già in magazzino')
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renderElementi()
})


function renderElementi (){
    fetch("https://striveschool-api.herokuapp.com/api/product/",{
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
            "content-type": "application/json",
        },
    }).then(response => {
        response.json().then(data => {
            //console.log(data)
            scatolaProdotti.innerHTML = ''
            data.forEach(element => {

                scatolaProdotti.innerHTML += `
                <tr style="vertical-align: middle;">
                      <td>${element._id}</td>
                      <td>${element.name}</td>
                      <td>${element.description}</td>
                      <td><img src="${element.imageUrl}" width="100"></td>
                      <td>€ ${element.price},00</td>
                      <td><a href="#" class="btn btn-success"><i class="bi bi-pencil" onclick="modifica('${element._id}')"></i></a><a href="#" class="btn btn-danger m-2"> <i class="bi bi-trash" onclick="cancella('${element._id}')"></i></a></td>
                </tr>
                
                `
                
                //console.log(scatolaProdotti)
            });
        })
    })
}

function modifica (id){
    console.log('modifica ' + id)
    let overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')
    let editModal = document.querySelector('#edit-modal')
    editModal.classList.add('d-block')

    fetch("https://striveschool-api.herokuapp.com/api/product/"+ id,{
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
            "content-type": "application/json",
        },
    }).then(response => {
        response.json().then(data => {
            console.log(data.name)
            document.getElementById('name_mod').value = data.name
            document.getElementById('description_mod').value = data.description
            document.getElementById('brand_mod').value = data.brand
            document.getElementById('imageUrl_mod').value = data.imageUrl
            document.getElementById('price_mod').value = data.price
            document.getElementById('id_mod').value = data._id
        })
    })

    
}

function modificaProdotto(){
    let name_mod = document.getElementById('name_mod').value
    let description_mod = document.getElementById('description_mod').value
    let brand_mod = document.getElementById('brand_mod').value
    let imageUrl_mod = document.getElementById('imageUrl_mod').value 
    let price_mod = document.getElementById('price_mod').value
    let _id_mod = document.getElementById('id_mod').value

    fetch("https://striveschool-api.herokuapp.com/api/product/" + _id_mod, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
            "Content-Type": "application/json",
        },
        method:"PUT",
        body: JSON.stringify({
            name: name_mod,
            description: description_mod, // Correzione della chiave
            brand: brand_mod,
            imageUrl: imageUrl_mod,
            price: price_mod
        })
    }).then(response =>{
        //console.log(response)
        if(response.status === 200) {
            alert('Prodotto modificato')
            chiudiModal()
            renderElementi()

        } else {
            alert('Errore ')
        }
    })




}

function cancella (id){
    console.log('cancella ' + id)
    let modalFooter = document.getElementById('modal-footer')
    modalFooter.innerHTML = ''
    modalFooter.innerHTML += `<button type="button" class="btn btn-primary" onclick="confermaEliminaziomne('${id}')">Cancella</button>`
    let modal = document.getElementById('delete-modal')

    let overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')

    modal.classList.add('d-block')
}

function chiudiModal(){
    let modal = document.getElementById('delete-modal')
    modal.classList.remove('d-block')

    let overlay = document.getElementById('overlay')
    overlay.classList.add('d-none')

    let editModal = document.querySelector('#edit-modal')
    editModal.classList.remove('d-block')
}

function confermaEliminaziomne(id){
    console.log('confermo eliminaizione id ' + id)
    fetch("https://striveschool-api.herokuapp.com/api/product/"+ id,{
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4ODIwNThmYzBmMzAwMTU1ZTViNDciLCJpYXQiOjE3MTgxMjUwNjEsImV4cCI6MTcxOTMzNDY2MX0.pp9sY7tcrVHY-AvEfab5xwVJJXByqQ6v_n9oystTUUA",
            "content-type": "application/json",
        }
    }).then(response => {
        // console.log(response)
        if(response.status === 200) {
            chiudiModal()
            scatolaProdotti.innerHTML = ''
            renderElementi()
            
        } else {
            alert('Errore, riprova tra un minuto')
        }

    })




}


