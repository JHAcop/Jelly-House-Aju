/* =========================================================
   DESCRIÇÕES
========================================================= */

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


/* =========================================================
   TEMPO PARA FECHAR AUTOMATICAMENTE
========================================================= */

const timersDescricao = new WeakMap();


function cancelarFechamento(card) {

	const timer = timersDescricao.get(card);

	if (timer) {

		clearTimeout(timer);

		timersDescricao.delete(card);

	}

}


function programarFechamento(card, botao) {

	cancelarFechamento(card);

	const timer = setTimeout(function() {

		const descricao = card.querySelector(".descricao");

		if (!descricao) {
			return;
		}

		descricao.remove();

		card.classList.remove("mostrar-descricao");

		botao.style.backgroundColor = "#2E7D32";

		timersDescricao.delete(card);

	}, 5000);

	timersDescricao.set(card, timer);
}


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


	/* ==========================================
	   FECHAR
	========================================== */

	if (descricaoExistente) {

		descricaoExistente.remove();

		card.classList.remove("mostrar-descricao");

		botao.style.backgroundColor = "#2E7D32";

		cancelarFechamento(card);

		return;
	}


	/* ==========================================
	   ABRIR
	========================================== */

	const descricao =
		document.createElement("div");

	descricao.className = "descricao";

	descricao.innerHTML =
		descricoes[sabor] || "";


	card.appendChild(descricao);

	card.classList.add("mostrar-descricao");

	botao.style.backgroundColor = "#1a411c";


	/* Fecha sozinho depois de alguns segundos */

	programarFechamento(card, botao);
}


/* =========================================================
   COMPUTADOR
========================================================= */

botoes.forEach(function(botao) {

	let timerMouse = null;


	/* ==========================================
	   MOUSE ENTROU
	========================================== */

	botao.addEventListener("mouseenter", function() {

		clearTimeout(timerMouse);


		timerMouse = setTimeout(function() {

			const card =
				botao.closest(".produto-card");


			if (
				card &&
				!card.querySelector(".descricao")
			) {

				alternarDescricao(botao);

			}

		}, 500);

	});


	/* ==========================================
	   MOUSE SAIU
	========================================== */

	botao.addEventListener("mouseleave", function() {

		clearTimeout(timerMouse);

	});


	/* ==========================================
	   CLIQUE
	========================================== */

	botao.addEventListener("click", function() {

		clearTimeout(timerMouse);

		alternarDescricao(botao);

	});

});


/* =========================================================
   CELULAR
========================================================= */

botoes.forEach(function(botao) {

	let timerTouch = null;


	/* ==========================================
	   TOQUE
	========================================== */

	botao.addEventListener(
		"touchstart",
		function() {

			clearTimeout(timerTouch);


			timerTouch = setTimeout(function() {

				const card =
					botao.closest(".produto-card");


				if (
					card &&
					!card.querySelector(".descricao")
				) {

					alternarDescricao(botao);

				}

			}, 500);

		},
		{
			passive: true
		}
	);


	/* ==========================================
	   FIM DO TOQUE
	========================================== */

	botao.addEventListener(
		"touchend",
		function() {

			clearTimeout(timerTouch);

		}
	);


	botao.addEventListener(
		"touchcancel",
		function() {

			clearTimeout(timerTouch);

		}
	);

});


/* =========================================================
   CARD ATIVO NO CELULAR
========================================================= */

const scrollProdutos =
	document.querySelector(".produtos-scroll");

const produtos =
	document.querySelectorAll(".produto-item");


if (
	scrollProdutos &&
	produtos.length > 0
) {

	const observer =
		new IntersectionObserver(

			function(entries) {

				entries.forEach(function(entry) {

					if (entry.isIntersecting) {

						produtos.forEach(function(produto) {

							produto.classList.remove("active");

						});


						entry.target.classList.add("active");

					}

				});

			},
			{
				root: scrollProdutos,

				threshold: 0.6
			}
		);


	produtos.forEach(function(produto) {

		observer.observe(produto);

	});


	produtos[0].classList.add("active");

}


/* =========================================================
   SETA DE SCROLL
========================================================= */

const setaScroll =
	document.getElementById("scroll-indicador");


if (scrollProdutos && setaScroll) {

	let scrollComecou = false;


	scrollProdutos.addEventListener(
		"scroll",
		function() {

			if (scrollComecou) {
				return;
			}


			scrollComecou = true;


			/* Esconde a seta */

			setaScroll.classList.add(
				"esconder-seta"
			);

		},
		{
			passive: true
		}
	);

}


/* =========================================================
   TELA DE CARREGAMENTO
========================================================= */

window.addEventListener("load", function() {

	const loadingScreen =
		document.getElementById(
			"loading-screen"
		);


	if (!loadingScreen) {
		return;
	}


	setTimeout(function() {

		loadingScreen.classList.add(
			"loading-finalizado"
		);

	}, 1200);

});
/* =====================================
   ESCONDER SETA AO PRIMEIRO SCROLL
===================================== */

const setaScroll = document.querySelector(".seta-scroll");
const produtosScroll = document.querySelector(".produtos-scroll");

if (setaScroll && produtosScroll) {

	let setaEscondida = false;

	function esconderSeta() {

		if (setaEscondida) {
			return;
		}

		setaEscondida = true;

		setaScroll.classList.add("escondida");
	}


	/* Computador + celular */
	produtosScroll.addEventListener("scroll", esconderSeta, {
		passive: true
	});


	/* Também esconde imediatamente ao começar o toque */
	produtosScroll.addEventListener("touchstart", esconderSeta, {
		passive: true
	});

}