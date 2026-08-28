/* =========================================================
   DESCRIÇÕES DOS PRODUTOS
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
   ELEMENTOS
========================================================= */

const botoes = document.querySelectorAll(
	".produto-card button"
);

const produtos = document.querySelectorAll(
	".produto-item"
);

const scrollProdutos = document.querySelector(
	".produtos-scroll"
);


/* =========================================================
   TEMPO PARA FECHAR AUTOMATICAMENTE
========================================================= */

const TEMPO_FECHAR = 5000;


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


	/* =====================================================
	   FECHAR
	===================================================== */

	if (descricaoExistente) {

		descricaoExistente.remove();

		card.classList.remove(
			"mostrar-descricao"
		);

		botao.style.backgroundColor =
			"#2E7D32";

		return;
	}


	/* =====================================================
	   ABRIR
	===================================================== */

	const descricao =
		document.createElement("div");

	descricao.className = "descricao";


	if (descricoes[sabor]) {

		descricao.innerHTML =
			descricoes[sabor];

	} else {

		descricao.innerHTML =
			"<p>Descrição indisponível.</p>";

	}


	card.appendChild(descricao);

	card.classList.add(
		"mostrar-descricao"
	);

	botao.style.backgroundColor =
		"#1a411c";


	/* =====================================================
	   FECHAR AUTOMATICAMENTE
	===================================================== */

	setTimeout(function () {

		if (
			descricao &&
			descricao.parentNode === card
		) {

			descricao.remove();

			card.classList.remove(
				"mostrar-descricao"
			);

			botao.style.backgroundColor =
				"#2E7D32";
		}

	}, TEMPO_FECHAR);

}


/* =========================================================
   COMPUTADOR
========================================================= */

botoes.forEach(function (botao) {

	let timerMouse = null;


	/* =====================================================
	   MOUSE ENTROU NO BOTÃO
	===================================================== */

	botao.addEventListener(
		"mouseenter",
		function () {

			clearTimeout(timerMouse);


			timerMouse = setTimeout(
				function () {

					const card =
						botao.closest(
							".produto-card"
						);


					if (
						card &&
						!card.querySelector(
							".descricao"
						)
					) {

						alternarDescricao(
							botao
						);

					}

				},
				700
			);

		}
	);


	/* =====================================================
	   MOUSE SAIU
	===================================================== */

	botao.addEventListener(
		"mouseleave",
		function () {

			clearTimeout(timerMouse);

		}
	);


	/* =====================================================
	   CLIQUE
	===================================================== */

	botao.addEventListener(
		"click",
		function () {

			clearTimeout(timerMouse);

			alternarDescricao(
				botao
			);

		}
	);

});


/* =========================================================
   CELULAR
========================================================= */

botoes.forEach(function (botao) {

	let toqueInicial = false;


	botao.addEventListener(
		"touchstart",
		function () {

			toqueInicial = true;

		},
		{
			passive: true
		}
	);


	botao.addEventListener(
		"touchend",
		function () {

			if (!toqueInicial) {
				return;
			}

			toqueInicial = false;

			alternarDescricao(
				botao
			);

		},
		{
			passive: true
		}
	);


	botao.addEventListener(
		"touchcancel",
		function () {

			toqueInicial = false;

		},
		{
			passive: true
		}
	);

});


/* =========================================================
   CARD ATIVO NO CELULAR
========================================================= */

if (
	scrollProdutos &&
	produtos.length > 0
) {

	const observer =
		new IntersectionObserver(
			function (entries) {

				entries.forEach(
					function (entry) {

						if (
							entry.isIntersecting
						) {

							produtos.forEach(
								function (produto) {

									produto.classList.remove(
										"active"
									);

								}
							);


							entry.target.classList.add(
								"active"
							);

						}

					}
				);

			},
			{
				root: scrollProdutos,

				threshold: 0.6
			}
		);


	produtos.forEach(
		function (produto) {

			observer.observe(
				produto
			);

		}
	);


	produtos[0].classList.add(
		"active"
	);

}


/* =========================================================
   TELA DE CARREGAMENTO
========================================================= */

window.addEventListener(
	"load",
	function () {

		const loadingScreen =
			document.getElementById(
				"loading-screen"
			);


		if (!loadingScreen) {
			return;
		}


		/*
		 * O CSS já faz o desaparecimento.
		 * Aqui apenas garantimos que o loading
		 * não permaneça ativo.
		 */

		setTimeout(
			function () {

				loadingScreen.style.opacity =
					"0";

				loadingScreen.style.visibility =
					"hidden";

				loadingScreen.style.pointerEvents =
					"none";

			},
			2000
		);

	}
);