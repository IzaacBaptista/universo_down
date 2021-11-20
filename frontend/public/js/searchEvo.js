var baseUrlApi = "http://localhost:3000/api/v1";

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (const [key, value] of Object.entries(arr)) {
      window.localStorage.removeItem("evolutionRecordId");
      if (value.name.substr(0, val.length).toLowerCase() == val.toLowerCase()) {
        b = document.createElement("DIV");
        b.innerHTML =
          "<strong>" + value.name.substr(0, val.length) + "</strong>";
        b.innerHTML += value.name.substr(val.length);
        b.innerHTML +=
          "<input type='hidden' id='" +
          value.evolutionRecordId +
          "' value='" +
          value.name +
          "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value
          value.evolutionRecordId = this.getElementsByTagName("input")[0].id;
          localStorage.setItem("evolutionRecordId", value.evolutionRecordId);
          console.log("evoID  " + value.evolutionRecordId);
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function arrayOfNames() {
  var arrayNames = [];
  $.ajax({
    url: baseUrlApi + "/evolution-record/assisted",
    type: "GET",
    dataType: "JSON",
    headers: {
      "x-access-token": localStorage.getItem("Authorization"),
    },
    success: function (data) {
      $.each(data, function (index, value) {
        if (
          value.assistedId === data[index].assisted.id &&
          value.status === "pending"
        ) {
          arrayNames.push({
            evolutionRecordId: value.id,
            assistedId: data[index].assisted.id,
            name: data[index].assisted.name,
          });
        }
      });
    },
    error: function (err) {
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
  console.log(arrayNames);

  return arrayNames;
}

autocomplete(document.getElementById("searchEvo"), arrayOfNames());
