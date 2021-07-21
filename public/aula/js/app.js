
fetch('http://puzzle.mead.io/puzzle').then(
    (response) => {
        response.json().then(
            (data) => {
                console.log(data)
            }
        )
    }
)


const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')

const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then(
        (response) => {
            response.json().then(
                (data) => {

                    if (data.errorMessage) {
                        console.log('Error: ' + data.errorMessage)
                        messageOne.textContent = data.errorMessage
                    } else {
                        console.log('Location: ' + data.location)
                        console.log('Forecast: ' + data.forecast)
                        messageOne.textContent = 'Location: '+data.location
                        messageTwo.textContent = 'Forecast: '+data.forecast
                        search.textContent = ""
                        search.value = ""
                    }
                }
            )
        }
    )

})