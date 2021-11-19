
var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("assistedId");
    $("#save-btn").click(function (e) {
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
      console.log("UOBA" + JSON.stringify(data));
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
          }
          location.reload(true);
        },
        error: function (err) {
          alert("Erro Desconhecido! " + JSON.stringify(err));
        },
      });
  });
});
  

 