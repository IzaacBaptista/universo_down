var baseUrlApi = "http://localhost:3000/api/v1";

import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  //phone
  $("#phone").mask("(99) 99999-9999");

  //identification
  $("#identification").mask("999.999.999-99");

  //generalRegistration
  $("#generalRegistration").mask("999.999.999-9");

  //zipCode
  $("#zipCode").mask("99999-999");
});

$(document).ready(function (e) {
  $("#form").submit(function (e) {
    e.preventDefault();
    var data = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      plainPassword: $("#plainPassword").val(),
      plainPasswordConfirmation: $("#plainPasswordConfirmation").val(),
      adminRole: $("#adminRole").val(),
      userRole: $("#userRole").val(),
      birthday: $("#birthday").val(),
      gender: $("#gender").val(),
      identification: $("#identification").val(),
      generalRegistration: $("#generalRegistration").val(),
      issue: $("#issue").val(),
      issuer: $("#issuer").val(),
      zipCode: $("#zipCode").val(),
      address: $("#address").val(),
      number: $("#number").val(),
      neighborhood: $("#neighborhood").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      phone: $("#phone").val(),
      nationalIdentity: $("#nationalIdentity").val()
    };
    if (checkProperties(data) === false) {
      $.ajax({
        url: baseUrlApi + "/user",
        type: "POST",
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
          if (data != "") {
            alert("Cadastro Realizado!");
          }
          location.reload(true);
        },
        error: function (err) {
          erroHandler(err.status);
          location.reload(true);
        },
      });
    } else {
      alert("Campo(s) em Branco!");
    }
  });
});
