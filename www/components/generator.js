/**
 * Esse arquivo JS inclui as funçoes necessarias para a geracao de itens de design diretamente do banco de dados
 * de forma geral, esse arquivo possui as funções que geram os cards de cada aniversário.
 * 
 * Aqui também existem as constantes de campos
 * Elas referenciam os campos do JSON no LocalStorage da aplicação
 */

const F_NOME   = "aniversariante";
const F_DATA   = "dt";
const F_LEMB   = "lembrete";
const DISPOSE  = "ani-cards";
const NOTIFIC  = "not-cards";

var cache = [];

function loadCache(){
    cache = JSON.parse(localStorage.getItem("mainCache"));
}

function dumpCache(){
    localStorage.setItem("mainCache", JSON.stringify(cache));
}

function addAniversario(nome, da, dl){
    var row = {
        "aniversariante": nome,
        "dt": da,
        "lembrete": dl
    };
    cache.push(row);
    console.log(cache);
    dumpCache();
}

function delAniversario(index){
    cache[index] = null;
    dumpCache();
}

function updAniversario(nome, ani, lem, index){
    cache[index]["aniversariante"] = nome;
    cache[index]["dt"] = ani;
    cache[index]["lembrete"] = lem;
    dumpCache();
}

function checkLembretes(){
    var lembretes = [];
    cache.forEach((item, index) => {
        if(item != null){
            var obj = new Date(item["lembrete"]);
            console.log((obj.getDate()+ 1) + "/" + (obj.getMonth() + 1));
            var tod = new Date();
            if((obj.getDate()+1) == tod.getDate() && (obj.getMonth()+1) == (tod.getMonth()+1)) lembretes.push(item);
        }
    });
    console.log(lembretes);
    if(lembretes.length == 0){
        var h1 = document.createElement("h1");
        h1.innerText = "Sem aniversarios hoje ";
        h1.innerHTML += "&#128557";
        $("#not-cards").append(h1);
    }
    else{
        $("#not-cards").empty();
        lembretes.forEach((item, index) => { 
            genCard(item, NOTIFIC, cache.indexOf(item)); 
        });
    }
    $("#md-not").modal("show");
}

function parseCache(){
    loadCache();
    $("#" + DISPOSE).empty();
    cache.forEach((item, index) => {
        if(item != null) genCard(item, DISPOSE, index);
    });
}

function dateFormat(date){
    var obj = new Date(date);
    var ret = (obj.getDate() + 1) + "/" + (obj.getMonth() + 1);
    return ret;
}

function genCard(data, dispose, ind){
    var container = document.createElement("div");
    var content = document.createElement("div");
    var header = document.createElement("div");
    var title = document.createElement("h3");
    var subtitle = document.createElement("h4");
    var footer = document.createElement("div");
    var btDel = document.createElement("button");
    var btAlt = document.createElement("button");

    container.classList.add("card");
    container.classList.add("nat-card");

    content.classList.add("card-content");

    header.classList.add("card-header");
    title.innerHTML = "Aniversário de &#127881: " + data["aniversariante"];
    title.classList.add("card-title");
    subtitle.innerHTML = "Data &#127874: " + dateFormat(data["dt"]);
    subtitle.classList.add("card-subtitle");
    header.appendChild(title);
    header.appendChild(subtitle);

    btDel.innerText = "Deletar";
    btDel.classList.add("btn");
    btDel.classList.add("btn-danger");
    btDel.classList.add("bt-del");
    btDel.setAttribute("data-id", ind);
    
    btAlt.innerText = "Alterar";
    btAlt.classList.add("btn");
    btAlt.classList.add("btn-danger");
    btAlt.classList.add("bt-alt");
    btAlt.setAttribute("data-id", ind);

    footer.classList.add("card-footer");
    footer.appendChild(btAlt);
    footer.appendChild(btDel);

    content.appendChild(header);
    content.appendChild(footer);
    container.appendChild(content);
    document.getElementById(dispose).appendChild(container);
}