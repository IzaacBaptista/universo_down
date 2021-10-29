/* Carregar o menu lateral */
$.get("navbar.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
});
 
/* Função Sub Menu */
$(document).on("click", ".side-menu > ul > li", function (e) {
    if ($(this).find(".sub-menu").length > 0) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass("active");
      $(this).find(".sub-menu").stop().slideToggle();
    }
  });

  /* Adicionar Form Familiar */ 
  $(document).ready(function() {
    var max_fields = 5;
    var wrapper = $(".container-familiar");
    var add_button = $(".add_form_field");

    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        
        if (x < max_fields) {
            x++;
            $.get("familiar_adicional.html", function (data) {
              $(wrapper).append(data); 
            });
        } else {
            alert('Limite Máximo de 4 Campos')
        }
    });
    
    /* Remove Form Familiar */
    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('form').remove();
        x--;
    })
});
