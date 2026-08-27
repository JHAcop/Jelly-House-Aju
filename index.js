const botoes = document.querySelectorAll(".produto-card button");

botoes.forEach(function(botao) {
	botao.addEventListener("click", function() {
		const selecionado = botao.style.transform === "scale(1.2)";

		if (selecionado) {
			botao.style.backgroundColor = "#2E7D32";
			botao.style.transform = "scale(1)";
		} else {
			botao.style.backgroundColor = "#1a411c";
			botao.style.transform = "scale(1.2)";
		}
	});
});