export function erroHandler(err) {
    switch (err) {
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
        alert("O servidor encontrou uma situação com a qual não sabe lidar");
        break;
      default:
        alert("Erro Desconhecido: " + err);
    }
  }