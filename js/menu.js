const menu = () => {

    const cardsMenu = document.querySelector('.cards-menu')

// Отрисовка заголовка ресторана
    const changeTitle = (restaurant) =>{
        const restaurantTitle = document.querySelector('.restaurant-title') 
        const rating = document.querySelector('.rating')
        const price = document.querySelector('.price')
        const category = document.querySelector('.category')

        restaurantTitle.textContent = restaurant.name
        rating.textContent = restaurant.stars
        price.textContent = restaurant.price
        category.textContent = restaurant.kitchen
    }

// Увелечение количества в localStorage
    const addToCard = (cartItem) =>{
        const cartArray = localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : []

        if(cartArray.some((item) => item.id === cartItem.id)){
            cartArray.map((item) => {
                if(item.id === cartItem.id){
                    item.count++
                }
                return item
            })
        }else{
            cartArray.push(cartItem)
        }
        localStorage.setItem('cart', JSON.stringify(cartArray))
    }

// Отрисоовка продуктов
    const renderItems = (data) => {
        data.forEach(({description, id, image, name, price}) => {
            const card = document.createElement('div')
            card.classList.add('card')

            card.innerHTML = `
                <div class="card">
                    <img src="${image}" alt="${name}" class="card-image" />
                    <div class="card-text">
                        <div class="card-heading">
                            <h3 class="card-title card-title-reg">${name}</h3>
                        </div>
                        <div class="card-info">
                            <div class="ingredients">${description}
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="button button-primary button-add-cart">
                                <span class="button-card-text">В корзину</span>
                                <span class="button-cart-svg"></span>
                            </button>
                            <strong class="card-price-bold">${price} </strong>
                        </div>
                    </div>
                </div>
            `
            card.querySelector('.button-add-cart').addEventListener('click', () =>{
                addToCard({id,name,price, count: 1})
            })
            cardsMenu.append(card)
        });
    }

// Подключение к JSON'ну
    if (localStorage.getItem('restaurant')){
        const restaurant = JSON.parse(localStorage.getItem('restaurant'))
        changeTitle(restaurant)

        fetch(`./db/${restaurant.products}`)
        .then((response) => response.json())
        .then((data) =>(
            renderItems(data)
            ))
        .catch((error) => {
            console.log(error);
    })}else{
        window.location.href = '/'
    }
}
menu()