const auth = () => {
    const buttonAuth = document.querySelector('.button-auth') 
    const modalAuth = document.querySelector('.modal-auth') 
    const closeAuth = document.querySelector('.close-auth')
    const logInForm = document.querySelector('#logInForm') 
    const inputLogin = document.getElementById('login')
    const inputPassword = document.getElementById('password')
    const buttonOut = document.querySelector('.button-out')
    const userName = document.querySelector('.user-name')
    const cartButton = document.getElementById('cart-button')
    const buttonLogin = document.querySelector('.button-login')


    // Функция входа
    const login = (user) => {
        buttonAuth.style.display = 'none'
        buttonOut.style.display = 'flex'
        userName.style.display = 'flex'
        userName.textContent = user.login
        modalAuth.style.display = 'none'
        cartButton.style.display = 'flex'
    }

    // Функция выхода
    const logout = () => {
        buttonOut.style.display = 'none'
        buttonAuth.style.display = 'flex'
        userName.textContent = ''
        userName.style.display = 'none'
        cartButton.style.display = 'none'

        localStorage.removeItem('user')
    }

    // Открытие модального окна
    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex'
    }) 

    // Закрытие модального окна
    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none'
    })

    // Валидация
    inputLogin.oninput = () =>{
        if(inputLogin.value.charAt(0) === ' '){
            inputLogin.value = ''
        }
    }
    inputPassword.oninput = () =>{
        if(inputPassword.value.charAt(0) === ' '){
            inputPassword.value = ''
        }
    }

   // Получение данных при входе
   logInForm.addEventListener('submit', (event) => { 
        if(inputLogin.value == '' || inputPassword.value == '' ){
            logout()
            return
        }

        event.preventDefault()
        
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }

        localStorage.setItem('user',JSON.stringify(user))
        login(user)
        })    

        // Проверка на  добавленный аккаунт 
        if (localStorage.getItem('user')){
            login(JSON.parse(localStorage.getItem('user')))
        }

        // Выход
        buttonOut.addEventListener('click', () => {
        logout()
    })
}
auth()
