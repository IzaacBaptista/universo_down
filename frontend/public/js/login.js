var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from '../js/fns/erroHandler.js'

$(document).ready(function () {
  $("#login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == "" || password == "") {
      $('input[type="text"],input[type="password"]').css(
        "border",
        "2px solid red"
      );
      $('input[type="text"],input[type="password"]').css(
        "box-shadow",
        "0 0 3px red"
      );
      alert("Campo em Branco!!!");
    } else {
      $("input")
        .keyup(function () {
          var value = $(this).val();
          $("#email").text(value);
          $("#password").text(value);
        })
        .keyup();
      var data = {
        email: $("#email").val(),
        plainPassword: $("#password").val(),
      };
      $.ajax({
        url: baseUrlApi + "/login",
        headers: {
          'Authorization':'Authorization ' + data.token,
          'Content-Type':'application/json'
      },
        type: "POST",
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
          const token = data.token;
          window.localStorage.clear();
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("Authorization", token);
          window.location.href = "/frontend/index.html";
        },
        error: function (err) {
          erroHandler(err.status);

        },
      });
    }
  });
});
$("#selectSpeciality").on('change', function(){
        var data = {};
        var specialityId = localStorage.getItem("selectSpeciality");
        console.log(specialityId);
        $.ajax({
          type: "GET",
          url: baseUrlApi + "/specialities/" + specialityId,
          headers: {
            "x-access-token": localStorage.getItem("Authorization"),
          },
          dataType: "JSON",
          success: function (data) {
            var data = data;
            console.log(data)
            $.each(data, function (index, value) {
              var id = data.specialityId;

              var specialityId = data.speciality.id;
              var specialitiesName = data.user.firstName;
              var specialityName = data.speciality.name;

              var tr_str =
                "<tr id='" +
                id +
                "'>" +
                "<td align='center' class='col-2' id='" +
                id +
                "'>" +
                id + 
                + specialityId +
                "</td>" +
                "<td align='center' class='col-7'>" +
                specialitiesName +
                "</td>" +
                "<td align='center' class='col-7'>" +
                specialityName +
                "</td>" +
                "<td class='col-3 '><button type='submit' class='btn btn-success col-3 offset-1'> <i class='bi bi-pencil-square'></i></button>" +
                "<button type='button' id='btnExcluir' class='btn btn-danger col-3 offset-1'><i class='bi bi-trash'></i></button>" +
                "</td>" +
                "</tr>";

              $("#specialityTable tbody").append(tr_str);
            });
          },
          error: function (err) {
            alert("erro" + JSON.stringify(err));
          },
        });
      });