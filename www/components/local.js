var valor = 0 ; 

$(document).on("click", "#salvar",function(){
  var dados = {nome: $("#nome").val(), email: $("email").val(), telefone: $("#tel").val()};
localStorage.setItem(valor, JASON.stringify(dados));
valor ++
});

$(document).on("click", "#buscar",function(){
  var pessoa = JASON.parse(localStorage.getItem($("#identificador").val()))
 $("#nomeBusca").val(pessoa.nome);
 $("#emailBusca").val(pessoa.email);
 $("#telBusca").val(pessoa.telefone);
});

$(document).on("click", "#limpar",function(){
localStorage.clear();
limparCampos();
});
  
  $(document).on("click", "#remover",function(){
localStorage.removerItem($("#identificador").val());
limparCampos();
});