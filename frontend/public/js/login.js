var baseUrlApi = "http://localhost:3000/api/v1";

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
          window.location.href = '/frontend/index.html';
          window.localStorage.setItem('Authorization', token);
        },
        error: function (err) {
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
    }
  });
});
