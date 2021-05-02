$(document).ready(function(){
    $('button').click(function(e){
        e.preventDefault()
        const location = $('input').val()
        const url = '/weather?address=' + location

        $('#message-1').text('Loading...')
        $('#message-2').text('')

        fetch(url).then((response) => {
            response.json().then((data) => {
                if( data.error ) {
                    $('#message-1').text(data.error)
                } else {
                    $('#message-1').text(data.location)
                    $('#message-2').text(data.forecast)
                }

            })
        })
    })
})
