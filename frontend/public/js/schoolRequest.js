var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("assistedId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var assistedId = localStorage.getItem("assistedId");
    var date = document.getElementById("date");
    var responseDate = document.getElementById("responseDate");
    var status = $("#status :selected").val();
    var observation = document.getElementById("observation");
    var dateNow = new Date().toISOString().substring(0, 10);

    if (date.value <= responseDate.value) {
      var data = {
        assistedId: assistedId,
        date: date.value,
        responseDate: responseDate.value,
        status: status,
        observation: observation.value,
      };
    } else {
      alert("Data Inválida!");
    }

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/school-request",
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
        alert("Erro ao cadastrar! " + error);
      }
    } else {
      alert("Campo(s) em Branco!");
    }
  });
});
