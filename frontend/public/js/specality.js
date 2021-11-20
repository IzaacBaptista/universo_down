var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var name = $("#name").val();
    if (name == "") {
      alert("Campo em Branco!!!");
    } else {
      var data = {
        name: name,
      };

      $.ajax({
        url: baseUrlApi + "/speciality",
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
          location.reload(true);
        },
        error: function (err) {
          location.reload(true);
          switch (err.status) {
            case 304:
              alert("Sem Alteração!!");
              break;
            case 400:
              alert("Estrutura de requisição inválida!!");
              break;
            case 401:
              alert("Usuário não possui permissão para esta ação!");
              break;
            case 500:
              alert(
                "O servidor encontrou uma situação com a qual não sabe lidar"
              );
              break;
            default:
              alert("Erro Desconhecido" + err.status);
          }
        },
      });
    }
  });
});