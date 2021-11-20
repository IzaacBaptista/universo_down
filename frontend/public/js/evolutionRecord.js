
var baseUrlApi = "http://localhost:3000/api/v1";
  
$(document).ready(function () {
    //height
    $("#height").mask("9.99");
 
    window.localStorage.removeItem("assistedId");
    $("#save-btn").click(function (e) {
      e.preventDefault();
      var assistedId = localStorage.getItem("assistedId");
      var date = document.getElementById("date");
      var status = $("#status :selected").val();
      var weight = document.getElementById("weight");
      var height = document.getElementById("height");
      var report = document.getElementById("report");

      var data = {
        assistedId: assistedId,
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
            location.reload(true);
          }
        },
        error: function (err) {
          location.reload(true);
          switch (err.status) {
            case 304:
              alert("Sem Alteração!!");
              break;
            case 400:
              alert("Estrutura de requisição inválida!!");
              break;
            case 401:
              alert("Usuário não possui permissão para esta ação!");
              break;
            case 500:
              alert(
                "O servidor encontrou uma situação com a qual não sabe lidar"
              );
              break;
            default:
              alert("Erro Desconhecido" + err.status);
          }
        },
      });
  });
});
  