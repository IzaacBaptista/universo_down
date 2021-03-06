var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";
import { ajaxRequest } from "../js/fns/ajaxRequest";

$(document).ready(function () {
  //height
  $("#height").mask("9.99");
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("assistedId");
  $("#form").submit(function(e) {
    e.preventDefault();
    var assistedId = localStorage.getItem("assistedId");
    var userId = localStorage.getItem("userId");
    var date = document.getElementById("date");
    var status = $("#status :selected").val();
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var report = document.getElementById("report");

      var data = {
        assistedId: assistedId,
        userId: userId,
        date: date.value,
        status: status,
        weight: weight.value,
        height: height.value,
        report: report.value,
      };
   
    if (checkProperties(data) === false) {
      try {
          $.ajax({
            url: baseUrlApi + "/evolution-record",
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
      alert("Campo(s) em branco!");
    }
  });
});
