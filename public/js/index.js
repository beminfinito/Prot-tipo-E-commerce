var carrinho;

var irParaCarrinho = function() {
	window.location = '/carrinho?carrinho='+JSON.stringify(carrinho);
}

var getProdutos = function(callback) {
	$.ajax({
	    type: "GET",
	    url: "/data/produtos.json",
	    success: function (data) {
	        callback(data.produtos);
	    },
	});
};

var gravarCarrinho = function() {
	localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

var buscarCarrinho = function() {
	carrinho = localStorage.getItem('carrinho');

	if(carrinho == null || carrinho == undefined) {
		carrinho = {produtos: []};
		localStorage.setItem('carrinho', JSON.stringify(carrinho));
	}
	else {
		carrinho = JSON.parse(localStorage.getItem('carrinho'));
	}
};

var consultarPreco = function(id, produtos) {
	for(i = 0; i < produtos.length; i++) {
		if(produtos[i].id == id)
			return produtos[i].preco;
	}
};

var atualizarValorCarrinho = function() {
	getProdutos(function(produtos) {
		var valor = carrinho.produtos.reduce(function(total, produto) {
			return total + consultarPreco(produto.id, produtos)*produto.quantidade;
		}, 0);
		var int = parseInt(valor);
		var decimal = (valor-int)*100;
		decimal = String(decimal.toFixed(0));
		if (decimal.length == 1)
			decimal = '0' + decimal;
		$("#catalogTotalBasketInfo").html(int+',');
		$("#catalogTotalBasketInfoDecimal").html(decimal);
	});
};

var adicionarProdutoCarrinho = function(id, quantidade = $("#produto"+id).val()) {
	var novo = true;
	var produtosCarrinho = carrinho.produtos;
	for(i = 0; i < produtosCarrinho.length; i++) {
		if(id === produtosCarrinho[i].id) {
			produtosCarrinho[i].quantidade = Number(produtosCarrinho[i].quantidade)+Number(quantidade);
			novo = false;
		}
	}
	if(novo) {
		var novoProduto = {};
		novoProduto.id = id;
		novoProduto.quantidade = quantidade;
		carrinho.produtos.push(novoProduto); 
	}
	atualizarValorCarrinho();
	gravarCarrinho();
};

$(document).ready(function() {
	buscarCarrinho();
	atualizarValorCarrinho();
});