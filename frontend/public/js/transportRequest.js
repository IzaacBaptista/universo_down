var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("id");
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
        date: date.value,
        responseDate: responseDate.value,
        status: status,
        observation: observation.value,
        assistedId: assistedId,
      };
    } else {
      alert("Data Inválida!");
    }
    console.log(data);
    if (checkProperties(data) === false) {
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
          erroHandler(err.status);
        },
      });
    } else {
      alert("Campo(s) em Branco!");
    }
  });
});
