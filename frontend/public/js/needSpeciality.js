var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("id");
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var data = {
      evolutionRecordId: $("#evolutionRecordId").val(),
      specialityId: $("#specialityId").val(),
    };
    console.log(data);
    $.ajax({
      url: baseUrlApi + "/need-speciality",
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
          document.location.reload(true);
        }
      },
      error: function (err) {
        if (err.status == 400) {
          alert("Estrutura de requisição inválida!!");
        }
        if (err.status == 401) {
          alert("Usuário não possui permissão para esta ação!");
        }
        if (err.status == 500) {
          alert("O servidor encontrou uma situação com a qual não sabe lidar");
        }
      },
    });
  });
  $.ajax({
    url: baseUrlApi + "/speciality",
    type: "GET",
    dataType: "JSON",
    headers: {
      "x-access-token": localStorage.getItem("Authorization"),
    },
    success: function (data) {
      // $("#specialityId").empty();
      $.each(data, function (index, value) {
        $("#specialityId").append(
          "<option value='" + value.id + "'>" + value.id + " - " + value.name + "</option>"
        );
      });
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
});
