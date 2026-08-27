const botoes = document.querySelectorAll(".produto-card button");

const descricoes = {
	MORANGO: `
		<ul>
			<li>500 g de morangos maduros</li>
			<li>Suco de meio limão siciliano</li>
			<li>2 a 4 colheres de sopa de xilitol</li>
			<li>1 colher de chá de chia</li>
			<li>2 colheres de água</li>
		</ul>
	`,

	MANGABA: `
		<ul>
			<li>2 xícaras de polpa de mangaba</li>
			<li>2 a 3 colheres de xilitol</li>
			<li>3 a 4 colheres de eritritol</li>
			<li>1 colher de sopa de raspas de coco natural</li>
			<li>Rende 1 a 2 porções de geleia</li>
		</ul>
	`,

	MARACUJÁ: `
		<ul>
			<li>Polpa de 3 maracujás</li>
			<li>1 colher de extrato de baunilha</li>
			<li>Xilitol</li>
			<li>1 colher de chia</li>
		</ul>
	`
};


/* =====================================
   ABRIR / FECHAR DESCRIÇÃO
===================================== */

function alternarDescricao(botao) {

	const card = botao.closest(".produto-card");

	if (!card) {
		return;
	}

	const sabor = botao.textContent.trim();
	const descricaoExistente = card.querySelector(".descricao");

	/* FECHAR */
	if (descricaoExistente) {

		descricaoExistente.remove();

		card.classList.remove("mostrar-descricao");

		botao.style.backgroundColor = "#2E7D32";

		return;
	}


	/* ABRIR */

	const descricao = document.createElement("div");

	descricao.className = "descricao";

	descricao.innerHTML = descricoes[sabor];

	card.appendChild(descricao);

	card.classList.add("mostrar-descricao");

	botao.style.backgroundColor = "#1a411c";
}


/* =====================================
   COMPUTADOR
===================================== */

botoes.forEach(function(botao) {

	let timer = null;


	/* Mouse fica sobre o botão */

	botao.addEventListener("mouseenter", function() {

		timer = setTimeout(function() {

			/* Só abre automaticamente se estiver fechada */
			const card = botao.closest(".produto-card");

			if (card && !card.querySelector(".descricao")) {
				alternarDescricao(botao);
			}

		}, 2000);

	});


	/* Mouse saiu */

	botao.addEventListener("mouseleave", function() {

		clearTimeout(timer);

	});


	/* Clique */

	botao.addEventListener("click", function() {

		clearTimeout(timer);

		alternarDescricao(botao);

	});

});


/* =====================================
   CELULAR
===================================== */

botoes.forEach(function(botao) {

	let timer = null;


	botao.addEventListener("touchstart", function() {

		timer = setTimeout(function() {

			const card = botao.closest(".produto-card");

			if (card && !card.querySelector(".descricao")) {
				alternarDescricao(botao);
			}

		}, 2000);

	});


	botao.addEventListener("touchend", function() {

		clearTimeout(timer);

	});


	botao.addEventListener("touchcancel", function() {

		clearTimeout(timer);

	});

});


/* =====================================
   CARD ATIVO NO CELULAR
===================================== */

const scrollProdutos = document.querySelector(".produtos-scroll");
const produtos = document.querySelectorAll(".produto-item");

if (scrollProdutos && produtos.length > 0) {

	const observer = new IntersectionObserver(function(entries) {

		entries.forEach(function(entry) {

			if (entry.isIntersecting) {

				produtos.forEach(function(produto) {
					produto.classList.remove("active");
				});

				entry.target.classList.add("active");
			}

		});

	}, {
		root: scrollProdutos,
		threshold: 0.6
	});


	produtos.forEach(function(produto) {
		observer.observe(produto);
	});


	produtos[0].classList.add("active");
}
/* ========================================
   TELA DE CARREGAMENTO
======================================== */

window.addEventListener("load", function() {

	const loadingScreen = document.getElementById("loading-screen");

	if (!loadingScreen) {
		return;
	}

	/*
	 * Pequeno tempo mínimo para o carregamento
	 * não desaparecer instantaneamente.
	 */

	setTimeout(function() {

		loadingScreen.classList.add("loading-finalizado");

	}, 1200);

});