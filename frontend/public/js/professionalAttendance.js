var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("evolutionRecordId");
  $("#form").submit(function(e) {
    e.preventDefault();
    var evolutionRecordId = localStorage.getItem("evolutionRecordId");
    console.log(evolutionRecordId);
    var date = document.getElementById("date");
    var result = document.getElementById("result");
    var quantify = document.getElementById("quantify");

      var data = {
        evolutionRecordId: evolutionRecordId,
        date: date.value,
        result: result.value,
        quantify: quantify.value,
      };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/professionalAttendance",
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
          },
        });
      } catch (error) {
        alert("Erro ao cadastrar! " + error);
      }
    } else {
      alert("Campo(s) em branco!");
    }
  });
});
