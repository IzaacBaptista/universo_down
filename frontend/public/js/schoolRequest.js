import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("assistedId");
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var assistedId = localStorage.getItem("assistedId");
    var date = document.getElementById("date");
    var responseDate = document.getElementById("responseDate");
    var status = $("#status :selected").val();
    var observation = document.getElementById("observation");

    var data = {
      assistedId: assistedId,
      date: date.value,
      responseDate: responseDate.value,
      status: status,
      observation: observation.value,
    };
    console.log(JSON.stringify(data));
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
        }
        location.reload(true);
      },
      error: function (err) {
        alert("Erro Desconhecido! " + JSON.stringify(err));
      },
    });
  });
});

