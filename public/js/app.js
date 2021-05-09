console.log('Client side java script file is loaded !')

// fetch('http://localhost:9000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log('error , you must enter an address' + ',' + data.error)
//         }
//         else {
//             console.log(data.Address)
//             console.log(data.latitude)
//         }
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ''
// messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    fetch('http://localhost:9000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            console.log('error , you must enter an address' + ',' + data.error)
            messageTwo.textContent = ''
        }
        else {
            // console.log(data.Address)
            // console.log(data.latitude)
            messageTwo.textContent = data.Weather_description.forecast
            messageOne.textContent = ''
            console.log(data.Weather_description.forecast)
        }
    })
})
})