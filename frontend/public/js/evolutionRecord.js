var baseUrlApi = "http://localhost:3000/api/v1";
import { erroHandler } from "../js/fns/erroHandler.js";
import { checkProperties } from "../js/fns/checkForm.js";

$(document).ready(function () {
  //height
  $("#height").mask("9.99");

  window.localStorage.removeItem("assistedId");
  $("#save-btn").click(function (e) {
    var assistedId = localStorage.getItem("assistedId");
    var date = document.getElementById("date");
    var status = $("#status :selected").val();
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var report = document.getElementById("report");
    var dateNow = new Date();
    var data = dateNow.toLocaleDateString('en');
    if ( date.value >= data) {
      var data = {
        assistedId: assistedId,
        date: date.value,
        status: status,
        weight: weight.value,
        height: height.value,
        report: report.value,
      };
    } else {
      alert("Data Inválida");

    }
    console.log("DATE " + data + "  DATA  " + date.value);
    
    console.log("UOBA" + JSON.stringify(data));
    try {
      if (checkProperties(data) === false) {
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
            location.reload(true);
            erroHandler(err.status);
          },
        });
      } else {
        alert("Campo(s) em branco");
      }
    } catch (error) {
      erroHandler(error.status);
      alert("Erro ao cadastrar " + error);
    }
  });
});
