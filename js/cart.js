const cart = () => {
    const cartButton = document.getElementById('cart-button')        
    const modalCart = document.querySelector('.modal-cart')
    const close = modalCart.querySelector('.close')
    const modalBody = modalCart.querySelector('.modal-body')
    const buttonPrimary = modalCart.querySelector('.button-primary')
    const clearCart = modalCart.querySelector('.clear-cart')
    const modalPricetag = modalCart.querySelector('.modal-pricetag')

// Отрисовка корзины
    const renderItems = (data) => {
        modalBody.innerHTML = ''
        if(data.length === 0){
            clearCart.style.display = 'none'
            buttonPrimary.style.display = 'none'
            modalPricetag.style.display = 'none' 
            modalBody.textContent = 'Корзина пуста'
        }
        let sum = 0
        data.forEach(cartItem => {
            const cartElem = document.createElement('div')
            cartElem.classList.add('food-row')
            cartElem.innerHTML =`
                <span class="food-name">${cartItem.name}</span>
				<strong class="food-price">${cartItem.price}₽</strong>
				<div class="food-counter">
					<button class="counter-button btn-dec" data-index ="${cartItem.id}">-</button>
					<span class="counter">${cartItem.count}</span>
					<button class="counter-button btn-inc" data-index ="${cartItem.id}">+</button>
				</div>
            ` 
            modalBody.append(cartElem)

            sum += cartItem.price * cartItem.count
        });
        modalPricetag.textContent = `${sum} ₽`
    }

// Обнуление корзины 
    const resetCart = () =>{
        modalBody.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }

// Увелечение количества
    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if(item.id === id){
                item.count++
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

// Уменьшение количества
    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if(item.id === id){
                item.count = item.count > 1 ? item.count -1 : cartArray.splice(cartArray.indexOf(item),1)
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

// Изменение количества 
    modalBody.addEventListener('click', (e) =>{
        e.preventDefault() // Остановка перезагрузки

        if(e.target.classList.contains('btn-inc')){
            incrementCount(e.target.dataset.index)
        }else if(e.target.classList.contains('btn-dec')){
            decrementCount(e.target.dataset.index)
        }
    })

// Оформить заказ
    buttonPrimary.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart')

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', 
            body: cartArray, 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => { response.ok ? resetCart() : null})
        .catch(e =>{console.error(e);});
    })

// Открыть корзина
    cartButton.addEventListener('click', () => {
        if (localStorage.getItem('cart')){
            renderItems(JSON.parse(localStorage.getItem('cart')))
            clearCart.style.display = 'flex'
            buttonPrimary.style.display = 'flex'
            modalPricetag.style.display = 'flex' 
        }else{
            clearCart.style.display = 'none'
            buttonPrimary.style.display = 'none'
            modalPricetag.style.display = 'none' 
            modalBody.textContent = 'Корзина пуста'
        }
        modalCart.classList.add('is-open')
    })

// Закрыть корзину
    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })

// Отмена корзины
    clearCart.addEventListener('click', () => {
        resetCart()
    })
}
cart()