const botoes = document.querySelectorAll(".produto-card button");

const descricoes = {
	"MARACUJÁ":[
		"POLPA DE 3 MARACUJÁS",
		"1 COLHER DE EXTRATO DE BAUNILHA",
		"XILITOL",
		"1 COLHER DE CHIA"
	],
	"MORANGO":[
		"500 G DE MORANGOS MADUROS",
		"SUCO DE MEIO LIMÃO SICILIANO",
		"2 A 4 COLHERES DE SOPA DE XILITOL",
		"1 COLHER DE CHÁ DE CHIA",
		"2 COLHERES DE ÁGUA"
	],
	"MANGABA":[
		"2 XÍCARAS DE POLPA DE MANGABA",
		"2 A 3 COLHERES DE XILITOL",
		"3 A 4 COLHERES DE ERITRITOL",
		"1 COLHER DE SOPA DE RASPAS DE COCO NATURAL",
		"RENDE 1 A 2 PORÇÕES DE GELEIA"
	]
};

botoes.forEach(function(botao){

	botao.addEventListener("click",function(){

		const card = botao.closest(".produto-card");
		const sabor = botao.textContent.trim();
		const descricaoAtual = card.querySelector(".descricao");

		if(card.classList.contains("selecionado")){

			card.classList.remove("selecionado");

			if(descricaoAtual){
				descricaoAtual.remove();
			}

			return;
		}

		const descricao = document.createElement("div");

		descricao.className = "descricao";

		const lista = document.createElement("ul");

		if(descricoes[sabor]){

			descricoes[sabor].forEach(function(item){

				const li = document.createElement("li");

				li.textContent = item;

				lista.appendChild(li);

			});

		}

		descricao.appendChild(lista);

		card.appendChild(descricao);

		card.classList.add("selecionado");

	});

});