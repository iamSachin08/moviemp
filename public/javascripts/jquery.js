$(document).ready(function () {
    $.get('/state/fetch_all_states', function (data) {
        data.result.map((item) => {
            $('#stateid').append($('<option>').text(item.statename).val(item.stateid))
        })
    })

    $('#stateid').change(function () {

        $.get('/cities/fetch_all_cities', { stateid: $('#stateid').val() }, function (data) {

            $('#cityid').empty()
            $('#cityid').append($('<option>').text('City'))

            data.result.map((item) => {
                $('#cityid').append($('<option>').text(item.cityname).val(item.cityid))


            })
        })
    })

    $('#cityid').change(function () {

        $.get('/cinema/fetch_all_cinemas', { cityid: $('#cityid').val() }, function (data) {
            $('#cinemaid').empty()
            $('#cinemaid').append($('<option>').text('Cinemas'))

            data.result.map((item) => {
                $('#cinemaid').append($('<option>').text(item.cinemaname).val(item.cinemaid))

            })
        })
    })
    $('#cinemaid').change(function () {

        $.get('/screen/fetch_all_screens', { cinemaid: $('#cinemaid').val() }, function (data) {
            $('#screenid').empty()
            $('#screenid').append($('<option>').text('Screen'))

            data.result.map((item) => {
                $('#screenid').append($('<option>').text(item.screenname).val(item.screenid))

            })
        })
    })
    $('#picture').change(function(e){
        $('#poster').attr('src',URL.createObjectURL(e.currentTarget.files[0]))
    
    })

})



