let levelValid = true
let selectValid = true
let participatedValid = true





const level = document.getElementById('level');
level.value = localStorage.getItem('experience_level') 
    ? localStorage.getItem('experience_level')
    : "";

level.addEventListener('change', (el) => {
    if(!el.target.value){
        level.classList.add('error')
        levelValid = false
    }else{
        level.classList.remove('error')
        localStorage.setItem('experience_level', el.target.value)
        levelValid = true
    }
})


const select = document.getElementById('grandMasters');
fetch('https://chess-tournament-api.devtest.ge/api/grandmasters')
    .then(response => response.json())
    .then(result => {
        result.forEach(item => {
            const option = document.createElement('option');
            option.innerHTML = item.name;
            option.value = item.id
            select.appendChild(option)
            if(localStorage.getItem('character_id') && item.id == localStorage.getItem('character_id')) {
                select.value = localStorage.getItem('character_id');
            }
        })
    })


select.addEventListener('change', (el) => {
    if(!el.target.value){
        select.classList.add('error')
        selectValid = false
    }else{
        select.classList.remove('error')
        selectValid = true
        localStorage.setItem('character_id', el.target.value)
    }
})


const yes = document.getElementById('yes');
const no = document.getElementById('no');
if(localStorage.getItem('already_participated') && no.value == localStorage.getItem('already_participated')){
    no.checked = true;
};
if(localStorage.getItem('already_participated') && yes.value == localStorage.getItem('already_participated')){
    yes.checked = true;
};

// already_participated
yes.addEventListener('click', (el) => {
    localStorage.setItem('already_participated',el.target.value)
    participatedValid = true
})
no.addEventListener('click', (el) => {
    localStorage.setItem('already_participated',el.target.value)
    participatedValid = true
})


const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(!level.value){
        level.classList.add('error')
        levelValid = false
    }
    if(!select.value){
        select.classList.add('error')
        selectValid = false
    }
    if(!localStorage.getItem('already_participated')){
        alert('Make sure everything is filled')
        participatedValid = false
    }
    if(levelValid && selectValid && participatedValid){
        fetch('https://chess-tournament-api.devtest.ge/api/register',{
            method: 'POST',
            body: JSON.stringify({
                "name": localStorage.getItem('username'),
                "email": localStorage.getItem('email'),
                "phone": localStorage.getItem('phone'),
                "date_of_birth": localStorage.getItem('date'),
                "already_participated": JSON.parse(localStorage.getItem('already_participated')),
                "experience_level": localStorage.getItem('experience_level'),
                "character_id": localStorage.getItem('character_id'),
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'        
              },
        })
            .then(response => {
                if(response.status === 201){
                    location.href = 'completed.html'
                }else{
                    console.log("ERROR!!!");
                }
            })
    }    
})


// console.log('local storage get item NAME =',localStorage.getItem('username'));
// console.log('local storage get item EMAIL =',localStorage.getItem('email'));
// console.log('local storage get item PHONE =',localStorage.getItem('phone'));
// console.log('local storage get item DATE_OF_BIRTH =',localStorage.getItem('date'));
// console.log('local storage get item EXPERIENCE_LEVEL =',localStorage.getItem('experience_level'));
// console.log(typeof JSON.parse(localStorage.getItem('already_participated')));
// console.log('local storage get item CHARACHTER ID =',localStorage.getItem('character_id'));


