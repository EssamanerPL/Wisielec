const passwordBox = document.getElementById("password")
const photoBox = document.getElementById("photos")
const keyboard = document.getElementById("keyboardBox")
const guessBox = document.getElementById("guessBox")
const buttons = document.querySelectorAll('.btn')
const photo = document.getElementById("photo")
const ammountOfErrors = document.getElementById("ammountOfErrors")

function passwordFun() {
    passwordBox.style.display = "none"
    photoBox.style.display = "flex"
    keyboard.style.display = "flex"
    
    const password = document.getElementById("passwordInput").value.toLowerCase()
    let passwordSelect = document.getElementById("passwordSelect").value.toLowerCase()
    let passwordArray = []
    let errors = 1
    const sports = ["lewandowski", "swiatek", "kubica", "stoch", "kowalczyk", "malysz", "kubacki", "gortat", "blaszczykowski", "szpilka"]
    const animals = ["kot", "pies", "słon", "krowa", "kon", "kura", "kaczka", "wilk", "jelen", "sarna"]
    const cars = ["fiat", "ford", "opel", "audi", "bmw", "mercedes", "volkswagen", "renault", "peugeot", "citroen"]

    if (password != "" && passwordSelect == "") {
        console.log("wpisane")
        passwordArray = password.split('')
    } else if (password == "" && passwordSelect != "") {
        console.log("wybrane: " + passwordSelect)
        let random = Math.floor(Math.random() * 10)
        console.log(random)
        if (passwordSelect == "sports") {
            passwordArray = sports[random].split('')
        } else if (passwordSelect == "animals") {
            passwordArray = animals[random].split('')
        } else if (passwordSelect == "cars") {
            passwordArray = cars[random].split('')
        }
    } else {
        alert("Wpisz hasło lub wybierz hasło z listy")
    }
    
    passwordArray.forEach(element => {
        if (element === " ") {
            const div = document.createElement('div')
            div.classList.add("letter")
            div.style.width = `50px`
            div.innerHTML = " "
            guessBox.appendChild(div)
        } else {
        const div = document.createElement('div')
        div.id = element
        div.classList.add("letter")
        div.style.borderBottom = '4px black solid'
        div.style.width = `50px`
        div.style.display = `flex`
        div.style.fontSize = `30px`
        div.style.fontWeight = `700`
        div.style.justifyContent = `center`
        
        guessBox.appendChild(div)
        }
    });
    
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (passwordArray.includes(btn.innerText)) {
                btn.style.backgroundColor = "green"
                
                Array.from(guessBox.children).forEach(div => {
                    if (div.id === btn.innerText && div.innerText === "") {
                        div.innerHTML = btn.innerText
                    }
                }) 
            } else {
                btn.style.backgroundColor = "red"
                errors++
                ammountOfErrors.innerHTML = `liczba błędów: ${errors -1}/9`
                photo.src = `photos/${errors}.png`
                if (errors === 10) {
                    alert("Przegrałeś!")
                    location.reload()
                }
            }
            
            function checkWin() {
                const allFilled = Array.from(guessBox.children).every(div => {
                    return div.innerText !== "" || div.innerText === " ";
                })
                if (allFilled) {
                    alert("Gratulacje, wygrałeś!")
                    location.reload()

                }
            }
            checkWin()
            
        })
    })
}