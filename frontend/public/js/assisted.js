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
});

function encodeImgToBase64() {
  var selectedfile = document.getElementById("photo").files;
  if (selectedfile.length > 0) {
    var imageFile = selectedfile[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      var newImage = document.createElement("img");
      newImage.src = srcData;
      document.getElementById("txt").value = newImage.outerHTML;
    };
    fileReader.readAsDataURL(imageFile);
  }
}

$(document).ready(function () {
  window.localStorage.removeItem("assistedId");
  $("#form").submit(function(e) {
    e.preventDefault();
    var hasBenefits = document.querySelector("input[name=hasBenefits]").checked
      ? true
      : false;
    var active = document.querySelector("input[name=active]").checked
      ? true
      : false;
    var photo = $("#txt").val();
    
    var data = {
      name: $("#name").val(),
      email: $("#email").val(),
      birthday: $("#birthday").val(),
      gender: $("#gender").val(),
      identification: $("#identification").val(),
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
      scholarity: $("#scholarity").val(),
      naturalness: $("#naturalness").val(),
      nationality: $("#nationality").val(),
      occupation: $("#occupation").val(),
      nationalIdentity: $("#nationalIdentity").val(),
      additionalInformation: $("#additionalInformation").val(),
      photo: photo,
      hasBenefits: hasBenefits,
      active: active,
      socialIdentificationNumber: $("#socialIdentificationNumber").val(),
    };

    $.ajax({
      url: baseUrlApi + "/assisted",
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
        switch (err.status) {
          case 304:
            alert("Sem Altera????o!!");
            break;
          case 400:
            alert("Estrutura de requisi????o inv??lida!!");
            break;
          case 401:
            alert("Usu??rio n??o possui permiss??o para esta a????o!");
            break;
          case 500:
            alert(
              "O servidor encontrou uma situa????o com a qual n??o sabe lidar"
            );
            break;
          default:
            alert("Erro Desconhecido" + err.status);
        }
      },
    });
  });
});
