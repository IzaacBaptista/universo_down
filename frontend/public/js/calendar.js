import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("userId");
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var userId = localStorage.getItem("userId");
    var dayOfWeek = $("#dayOfWeek :selected").val();
    var startHour = document.getElementById("startHour");
    var endHour = document.getElementById("endHour");

      var data = {
        dayOfWeek: dayOfWeek,
        startHour: startHour.value,
        endHour: endHour.value,
        userId: userId,
      };
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
          alert("Erro Desconhecido! " + JSON.stringify(err));
        },
      });
  });
});
