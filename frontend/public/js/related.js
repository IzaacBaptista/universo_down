var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  //phone
  $("#phone").mask("(99) 99999-9999");

  //identification
  $("#identification").mask("999.999.999-99");

  //generalRegistration
  $("#generalRegistration").mask("999.999.999-9");

  //zipCode
  $("#zipCode").mask("99999-999");
  //revenue
  $("#revenue").mask("99999,99");
});

$(document).ready(function () {
  window.localStorage.removeItem("assistedId");
  $("#save-btn").click(function (e) {
    e.preventDefault();
    var responsible = document.querySelector("input[name=responsible]").checked
      ? true
      : false;
    var assistedId = localStorage.getItem('assistedId')
    var data = {
      assistedId: assistedId,
      name: $("#name").val(),
      birthday: $("#birthday").val(),
      gender: $("#gender").val(),
      civilStatus: $("#civilStatus").val(),
      identification: $("#identification").val(),
      relationship: $("#relationship").val(),
      generalRegistration: $("#generalRegistration").val(),
      issue: $("#issue").val(),
      issuer: $("#issuer").val(),
      zipCode: $("#zipCode").val(),
      address: $("#address").val(),
      number: $("#number").val(),
      neighborhood: $("#neighborhood").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      phone: $("#phone").val(),
      naturalness: $("#naturalness").val(),
      nationality: $("#nationality").val(),
      scholarity: $("#scholarity").val(),
      revenue: $("#revenue").val(),
      professionalSituation: $("#professionalSituation").val(),
      occupation: $("#occupation").val(),
      nationalIdentity: $("#nationalIdentity").val(),
      responsible: responsible
    };
    console.log(JSON.stringify(data));
    $.ajax({
      url: baseUrlApi + "/related",
      type: "POST",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      cache: false,
      contentType: "application/json",
      dataType: "JSON",
      data: JSON.stringify(data),
      success: function (data) {
        alert("Cadastro Realizado!");
        location.reload(true);
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
