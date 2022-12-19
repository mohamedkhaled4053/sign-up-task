let emailContainer = document.querySelector('.content p')

let email = JSON.parse(localStorage.getItem('email'))

if(email){
    emailContainer.textContent = email
}