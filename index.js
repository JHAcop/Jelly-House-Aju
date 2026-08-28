/* =========================================================
   BOTÕES DOS PRODUTOS
========================================================= */

const botoes = document.querySelectorAll(".produto-card button");


/* =========================================================
   DESCRIÇÕES
========================================================= */

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


/* =========================================================
   ABRIR / FECHAR DESCRIÇÃO
========================================================= */

function alternarDescricao(botao) {

	const card = botao.closest(".produto-card");

	if (!card) {
		return;
	}


	const sabor = botao.textContent.trim();

	const descricaoExistente =
		card.querySelector(".descricao");


	/* =====================================
	   FECHAR
	===================================== */

	if (descricaoExistente) {

		descricaoExistente.remove();

		card.classList.remove("mostrar-descricao");

		botao.style.backgroundColor = "#2E7D32";

		return;
	}


	/* =====================================
	   ABRIR
	===================================== */

	const descricao = document.createElement("div");

	descricao.className = "descricao";

	descricao.innerHTML = descricoes[sabor] || "";

	card.appendChild(descricao);

	card.classList.add("mostrar-descricao");

	botao.style.backgroundColor = "#1a411c";


	/* =====================================
	   GARANTE QUE A DESCRIÇÃO FIQUE VISÍVEL
	===================================== */

	requestAnimationFrame(function() {

		descricao.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "nearest"
		});

	});

}


/* =========================================================
   BOTÕES
   COMPUTADOR + CELULAR
========================================================= */

botoes.forEach(function(botao) {

	let timer = null;


	/* =====================================
	   COMPUTADOR
	   Passou o mouse por cima
	===================================== */

	botao.addEventListener("mouseenter", function() {

		timer = setTimeout(function() {

			const card =
				botao.closest(".produto-card");


			if (
				card &&
				!card.querySelector(".descricao")
			) {

				alternarDescricao(botao);

			}

		}, 700);

	});


	/* =====================================
	   MOUSE SAIU
	===================================== */

	botao.addEventListener("mouseleave", function() {

		clearTimeout(timer);

	});


	/* =====================================
	   CLIQUE
	   Funciona no computador e no celular
	===================================== */

	botao.addEventListener("click", function(event) {

		event.preventDefault();

		clearTimeout(timer);

		alternarDescricao(botao);

	});

});


/* =========================================================
   CARD ATIVO NO CELULAR
========================================================= */

const scrollProdutos =
	document.querySelector(".produtos-scroll");

const produtos =
	document.querySelectorAll(".produto-item");


if (scrollProdutos && produtos.length > 0) {

	const observer =
		new IntersectionObserver(function(entries) {

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


/* =========================================================
   SETA DO SCROLL
========================================================= */

const setaScroll =
	document.querySelector(".seta-scroll");


if (setaScroll && scrollProdutos) {

	let setaEscondida = false;


	function esconderSeta() {

		if (setaEscondida) {
			return;
		}

		setaEscondida = true;

		setaScroll.classList.add("escondida");

	}


	/* =====================================
	   COMEÇOU A ARRASTAR
	===================================== */

	scrollProdutos.addEventListener(
		"scroll",
		esconderSeta,
		{ passive: true }
	);


	/* =====================================
	   COMEÇOU O TOQUE
	   Funciona no celular
	===================================== */

	scrollProdutos.addEventListener(
		"touchstart",
		esconderSeta,
		{ passive: true }
	);


	/* =====================================
	   MOUSE COMEÇOU A ARRASTAR
	===================================== */

	scrollProdutos.addEventListener(
		"mousedown",
		esconderSeta
	);

}


/* =========================================================
   TELA DE CARREGAMENTO
========================================================= */

window.addEventListener("load", function() {

	const loadingScreen =
		document.getElementById("loading-screen");


	if (!loadingScreen) {
		return;
	}


	setTimeout(function() {

		loadingScreen.classList.add(
			"loading-finalizado"
		);

	}, 1200);

});