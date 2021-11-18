var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("userId");
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var userId = localStorage.getItem("userId");
    var specialityId = $("#specialityId :selected").val();
    
    var data = {
      userId: userId,
      specialityId: specialityId,
    };
    console.log(data);
    $.ajax({
      url: baseUrlApi + "/specialities",
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
        alert("Erro Desconhecido!  " + JSON.stringify(err));
      },
    });
  });
});
  $.ajax({
    url: baseUrlApi + "/speciality",
    type: "GET",
    dataType: "JSON",
    headers: {
      "x-access-token": localStorage.getItem("Authorization"),
    },
    success: function (data) {
      // $("#specialityId").empty();
      $.each(data, function (index, value) {
        $("#specialityId").append(
          "<option value='" + value.id + "'>" + value.id + " - " + value.name + "</option>"
        );
      });
    },
  });
