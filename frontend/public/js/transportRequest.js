import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";
$(document).ready(function () {
  window.localStorage.removeItem("id");
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var assistedId = localStorage.getItem("id");
    var date = document.getElementById("date");
    var responseDate = document.getElementById("responseDate");
    var status = $("#status :selected").val();
    var observation = document.getElementById("observation");

    var data = {
      date: date.value,
      responseDate: responseDate.value,
      status: status,
      observation: observation.value,
      assistedId: assistedId,
    };
    $.ajax({
      url: baseUrlApi + "/transport-request",
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
        alert("Erro Desconhecido!" + JSON.stringify(err));
      },
    });
  });
});

$(document).ready(function () {
  window.localStorage.removeItem("id");
  function arrayOfNAmes() {
    var arrayNames = [];
    $.ajax({
      url: baseUrlApi + "/assisted",
      type: "GET",
      dataType: "JSON",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      success: function (data) {
        $.each(data, function (index, value) {
          arrayNames.push({
            id: value.id,
            name: value.name,
          });
        });
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
    // console.log(arrayNames)
    return arrayNames;
  }

  autocomplete(document.getElementById("searchBar"), arrayOfNAmes());
});
