
$(document).ready(function () {
  //phone
  $("#phone").mask("(99) 99999-9999");

  //CPF
  $("#identification").mask("999.999.999-99");

  //zip_code
  $("#zip_code").mask("99999-999");

  //generalRegistration
  $("#generalRegistration").mask("99.999.999-0");
});

$(document).ready(function (e) {
  $("#save-btn").click(function () {
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
        nationalIdentity: $("#nationalIdentity").val(),
      };
      console.log(data);
      console.log(JSON.stringify(data));
      $.ajax({
        url: "http://localhost:3000/api/v1/user",
        type: "POST",
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
            alert("Cadastro Realizado!");
            console.log(data);
        },
        error: function (err) {
          if (err.status == 200) {
            alert("Not ????!!");
          }
          if (err.status == 304) {
            alert("Not Modified!!");
          }
          if (err.status == 400) {
            alert("Estrutura de requisição inválida!!");
          }
          if (err.status == 401) {
            alert("Usuário não possui permissão para esta ação!");
          }
          if (err.status == 500) {
            alert("O servidor encontrou uma situação com a qual não sabe lidar");
          } else {
            alert(err + "ERRO " + JSON.stringify(err));
          }
        },
      });
    })});