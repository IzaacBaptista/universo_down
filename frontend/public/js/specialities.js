var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("userId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var userId = localStorage.getItem("userId");
    var specialityId = $("#specialityId :selected").val();

    var data = {
      userId: userId,
      specialityId: specialityId,
    };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/specialities",
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
              location.reload(true);
            }
          },
          error: function (err) {
            erroHandler(err.status);
            location.reload(true);
          },
        });
      } catch (error) {
        alert("Erro ao Cadastrar! " + error);
      }
    } else {
      alert("Campo(s) em Branco!");
    }
  });
});
try {
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
          "<option value='" +
            value.id +
            "'>" +
            value.id +
            " - " +
            value.name +
            "</option>"
        );
      });
    },
    error: function (err) {
      erroHandler(err.status);
    },
  });
} catch (error) {
  alert("Erro ao Listar Especialidades! " + error);
}
