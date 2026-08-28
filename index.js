/* =====================================================
   BOTÕES DOS PRODUTOS
===================================================== */

const botoes = document.querySelectorAll(".produto-card button");


/* =====================================================
   DESCRIÇÕES DOS SABORES
===================================================== */

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


/* =====================================================
   ABRIR / FECHAR DESCRIÇÃO
===================================================== */

function alternarDescricao(botao) {

	const card = botao.closest(".produto-card");

	if (!card) {
		return;
	}


	const sabor = botao.textContent.trim();

	const descricaoExistente =
		card.querySelector(".descricao");


	/* =================================================
	   FECHAR DESCRIÇÃO
	================================================= */

	if (descricaoExistente) {

		descricaoExistente.remove();

		card.classList.remove(
			"mostrar-descricao"
		);

		botao.style.backgroundColor =
			"#2E7D32";

		botao.style.transform =
			"scale(1)";

		return;
	}


	/* =================================================
	   ABRIR DESCRIÇÃO
	================================================= */

	const descricao =
		document.createElement("div");


	descricao.className =
		"descricao";


	descricao.innerHTML =
		descricoes[sabor] || "";


	card.appendChild(descricao);


	card.classList.add(
		"mostrar-descricao"
	);


	botao.style.backgroundColor =
		"#1a411c";

	botao.style.transform =
		"scale(1.1)";
}



/* =====================================================
   CONTROLE DOS BOTÕES
===================================================== */

botoes.forEach(function(botao) {

	let timerMouse = null;
	let timerTouch = null;


	/* =================================================
	   COMPUTADOR
	   MOUSE SOBRE O BOTÃO POR 2 SEGUNDOS
	================================================= */

	botao.addEventListener(
		"mouseenter",
		function() {

			clearTimeout(timerMouse);


			timerMouse = setTimeout(
				function() {

					const card =
						botao.closest(
							".produto-card"
						);


					/*
					   Só abre automaticamente
					   se estiver fechado.
					*/

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
				2000
			);

		}
	);


	/* =================================================
	   MOUSE SAIU
	================================================= */

	botao.addEventListener(
		"mouseleave",
		function() {

			clearTimeout(timerMouse);

			timerMouse = null;

		}
	);


	/* =================================================
	   CLIQUE NO COMPUTADOR
	================================================= */

	botao.addEventListener(
		"click",
		function() {

			clearTimeout(timerMouse);

			timerMouse = null;

			alternarDescricao(botao);

		}
	);


	/* =================================================
	   CELULAR
	   SEGURAR POR 2 SEGUNDOS
	================================================= */

	botao.addEventListener(
		"touchstart",
		function() {

			clearTimeout(timerTouch);


			timerTouch = setTimeout(
				function() {

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
				2000
			);

		},
		{
			passive: true
		}
	);


	/* =================================================
	   FIM DO TOQUE
	================================================= */

	botao.addEventListener(
		"touchend",
		function() {

			clearTimeout(timerTouch);

			timerTouch = null;

		}
	);


	/* =================================================
	   TOQUE CANCELADO
	================================================= */

	botao.addEventListener(
		"touchcancel",
		function() {

			clearTimeout(timerTouch);

			timerTouch = null;

		}
	);

});



/* =====================================================
   CARD ATIVO NO CELULAR
===================================================== */

const scrollProdutos =
	document.querySelector(
		".produtos-scroll"
	);


const produtos =
	document.querySelectorAll(
		".produto-item"
	);


if (
	scrollProdutos &&
	produtos.length > 0
) {


	/* =================================================
	   INTERSECTION OBSERVER
	================================================= */

	if (
		typeof IntersectionObserver !==
		"undefined"
	) {


		const observer =
			new IntersectionObserver(

				function(entries) {

					entries.forEach(
						function(entry) {

							if (
								entry.isIntersecting
							) {


								/*
								   Remove o active
								   dos outros cards.
								*/

								produtos.forEach(
									function(produto) {

										produto.classList.remove(
											"active"
										);

									}
								);


								/*
								   Ativa o card
								   que está no centro.
								*/

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


		/* =============================================
		   Observa cada produto
		============================================= */

		produtos.forEach(
			function(produto) {

				observer.observe(
					produto
				);

			}
		);

	}


	/* =================================================
	   PRIMEIRO CARD COMEÇA ATIVO
	================================================= */

	produtos[0].classList.add(
		"active"
	);

}