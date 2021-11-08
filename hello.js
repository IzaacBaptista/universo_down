$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/organizations",
        contentType: 'application/json',
        cache: false,
        method: 'GET',
        dataType: 'json',
        data: data
    }).then(function(data) {
        console.log(data.nome)
       $('.greeting-id').append(data.id).toString();
       $('.greeting-content').append(data.name);
    });
});