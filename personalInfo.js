// username validation
let usernameValidation = false
let emailValidation = false
let phoneValidation = false
let dateValidation = false
// 
const username = document.getElementById('username')
let imgName = document.getElementById('imgName')
let error = document.getElementById('name-error')
error.style.color = 'red'

username.defaultValue = localStorage.getItem('username') ? localStorage.getItem('username') : ''

username.addEventListener('change', (el) => {   
    if(!el.target.value){    
        error.innerHTML = 'this field is required'
       imgName.src = ''

        usernameValidation = false
    }else if(username.value.length < 2){
        error.innerHTML = 'username must be at least 2 characters'
        usernameValidation = false
    }else{
       imgName.src = 'photos/doneIcon.png'
       error.innerHTML = ""
       localStorage.setItem('username', el.target.value.trim())
       usernameValidation = true
    }
})

//email validation 

const email = document.getElementById('email')
const compare = /^([A-Za-z0-9\._]+)@redberry.ge$/;
let imgEmail = document.getElementById('imgEmail')
let errorEmail = document.getElementById('email-error')
    errorEmail.style.color = 'red'

email.defaultValue = localStorage.getItem('email') ? localStorage.getItem('email') : ''

email.addEventListener('change', (el) => {
    if(!el.target.value){
        errorEmail.innerHTML = 'this field is required'
        imgEmail.src = ''
        emailValidation = false
    }else if(!el.target.value.match(compare)){
        errorEmail.innerHTML = 'example@redberry.ge'
        imgEmail.src = ''
        emailValidation = false
    }else{
        errorEmail.innerHTML = ''
        imgEmail.src = 'photos/doneIcon.png'
        localStorage.setItem('email', el.target.value.trim())
        emailValidation = true
    }
})

// phone validation
const phone = document.getElementById('phone')
let imgPhone = document.getElementById('imgPhone')
let errorPhone = document.getElementById('phone-error')
    errorPhone.style.color = 'red'

phone.defaultValue = localStorage.getItem('phone') ? localStorage.getItem('phone') : ''

phone.addEventListener('input', (el) =>{
    if(!el.target.value.trim().match((/^[0-9]+$/))){
        phone.value = el.target.value.slice(0, -1)
        phoneValidation = false
    }
})
phone.addEventListener('change', (el) => {
    if(el.target.value.trim().length !== 9 ){  
       errorPhone.innerHTML = 'phone number must be 9 digits'
       phoneValidation = false
       imgPhone.src = ''
    }else{
        errorPhone.innerHTML = ''  
        imgPhone.src = 'photos/doneIcon.png'
        localStorage.setItem('phone', el.target.value.trim())
        phoneValidation = true
    }
})

// Date validation

const date = document.getElementById('date')
let imgDate = document.getElementById('imgDate')
let errorDate = document.getElementById('date-error')
errorDate.style.color = 'red'

date.defaultValue = localStorage.getItem('date') ? localStorage.getItem('date') : ''

date.addEventListener('change', (el) =>{
    if(!el.target.value){   
        errorDate.innerHTML = 'this field is required'
        imgDate.src = ''
        dateValidation = false
    }else{
        imgDate.src = 'photos/doneIcon.png'
        errorDate.innerHTML = ''
        localStorage.setItem('date', el.target.value.trim())
        dateValidation = true
    }
})

// submit
const form = document.getElementById('form')

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    if(usernameValidation && emailValidation && phoneValidation && dateValidation){
        window.location.href = "/chessExp.html";
    }else{     
        alert('something went wrong')
    }
})