var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("evolutionRecordId");
    $("#form").submit(function(e) {
      e.preventDefault();
      var evolutionRecordId = localStorage.getItem("evolutionRecordId");
      var dayOfWeek = $("#dayOfWeek :selected").val();
      var startHour = document.getElementById("startHour");
      var endHour = document.getElementById("endHour");

        var data = {
          dayOfWeek: dayOfWeek,
          startHour: startHour.value,
          endHour: endHour.value,
          evolutionRecordId: evolutionRecordId,
        };
      if (checkProperties(data) === false) {
        try {
          $.ajax({
            url: baseUrlApi + "/calendar",
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
          alert("Erro ao cadastrar! " + error)
        }
      } else {
        alert("Campo(s) em branco");
      }
    });
  });

