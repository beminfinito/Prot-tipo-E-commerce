var carrinhoVazio = `
	<div id="formBasket">
	    <div class="cart-empty">
	        <h3 class="cart-empty__heading icon icon--cart">Ainda não existem itens em seu carrinho</h3>
	        <a href="/" title="Voltar as compras" class="button button-pill button-pill--green">Voltar as compras</a>
	    </div>
	</div>
	`

var htmlInicio = `
	<div id="formBasket">
        <div class="inputHiddenCheckout">
            <input type="hidden" id="hasMessage" value="false">
            <input type="hidden" id="callFromChangeQuantityProduct" value="false">
        </div>
        <div class="cart-grid">
            <div class="width-limiter">

                <table class="storeTable grid__table" id="basket" summary="Lista de produtos comprados na loja">

                    <thead class="cart-grid__header">
                        <tr class="headerBasket">
                            <th class="prdInfo" colspan="2">
                            Produtos -
                                <label>
                                    <span>Ordenar por:</span>
                                    <select name="sortBasket" class="field field--rounded" id="sortBasket">
                                        <option value="name" selected="selected">Nome</option>
                                        <option value="price">Preço</option>
                                        <option value="offer">Oferta</option>
                                    </select>
                                </label>
                            </th>

                            <th class="prdQty">Quantidade</th>

                            <th class="prdUnitPrice">Preço Unitário</th>

                            <th class="prdTotalPrice">Preço Total</th>

                            <th class="prdSimilar">
                                <label>

                                <span>Produto similar</span>
                                </label>
                            </th>

                            <th class="prdChangeQty prdChangeQtyCheckbox">

                            </th>
                        </tr>
                    </thead>
                    <tbody class="cart-grid__content">`
var htmlMeio = `

                    </tbody>
                </table>

            </div>
        </div>

        <footer class="checkout-footer">
            <div class="width-limiter">

                <div class="checkout-footer__coupon-form form">
                    <div class="form__row form__row--short">
                        <h4 class="checkout-footer__heading inline--middle">Cupom de desconto</h4>
                        <input type="text" placeholder="Adicione um cupom de desconto" class="field field--rounded inline--top" id="basketCoupon" value="">
                        <button type="button" class="button button-pill button-pill--green inline--top" id="addCoupon">OK</button>
                    </div>
                </div>

                <div class="group">

                    <div class="grid__item grid__item--half">
                        <h4 class="checkout-footer__heading">Gostaria de inserir alguma informação no seu pedido?</h4>
                        <div class="checkout-footer__chooser">
                            <input id="field-info" type="checkbox" class="chooser inline--middle">
                            <label for="field-info" class="label inline--middle">Sim, gostaria</label>
                            <div class="form">
                                <textarea placeholder="Digite aqui sua observações..." class="field field--textarea field--rounded inline--bottom" id="basketComment" name="basketComment"></textarea>
                                <div class="controls inline--bottom">
                                    <button type="submit" class="button button-pill button-pill--green updateAllBasket">Gravar</button>
                                    <label for="field-info" class="button button-pill button-pill--gray">Cancelar</label>
                                </div>
                            </div>
                            <input type="hidden" name="cpfCheckout" id="cpfCheckout" value="">
                        </div>
                    </div> 


                    <div class="grid__item grid__item--half to-right">
                        <dl class="checkout-footer__heading-group">
                            <dt class="checkout-footer__subheading inline--bottom">Subtotal da compra:</dt>`

var htmlFim = `

                        </dl>

                    </div>
                </div>


                <div class="checkout-footer__controls"><a href="/" title="Voltar às compras" class="button button-pill button-pill--large button-pill--gray">Voltar às compras</a>
                    <button title="Finalizar compra" class="button button-pill button-pill--large button-pill--green" onclick="finalizarCompra();">Finalizar compra</button>
                </div>
            </div>
        </footer>

        <input type="hidden" name="checkout" id="checkoutBasketForm" value="">

	</div>
	`

var consultarProduto = function(id, produtos) {
	for(j = 0; j < produtos.length; j++) {
		if(produtos[j].id == id)
			return produtos[j];
	}
};

var produtosNoCarrinho = function() {
	getProdutos(function(produtos) {
		var produtosCarrinho = [];
		var valorTotal = 0;
		for(i = 0; i < carrinho.produtos.length; i++) {
			var produto = consultarProduto(carrinho.produtos[i].id, produtos);
			produto.quantidade = carrinho.produtos[i].quantidade;
			produtosCarrinho.push(produto);
			valorTotal += produto.preco*produto.quantidade;
		}

		var tbody = produtosCarrinho.reduce(function(tbody, produtoCarrinho) {
			return tbody+`
	            <tr id="child_216405281">
                    <td class="prdImg">
                        <input type="hidden" name="productList[0].id" value="216405281">
                        <a href="/produto/`+produtoCarrinho.id+`">
                            <img src="#">
                        </a>
                    </td>
                    <td class="prdName">
                        <div class="product-info inline--middle">
                            <h4 class="product-name">`+produtoCarrinho.descricao+`</h4>
                        </div>
                        <a href="/produto/`+produtoCarrinho.id+`" title="Detalhes do produto" class="product-edit icon icon--edit inline--middle tooltip-holder">
                            <div class="tooltip tooltip--right">
                                <p class="tooltip__text">Detalhes do produto</p>
                            </div>
                        </a>
                    </td>

                    <td class="prdQty center qty" id="q_0">

                        <div class="product-qty">
                            <button type="button" class="button button-pill button-pill--circle button-pill--green" onclick="diminuirQuantidade(`+produtoCarrinho.id+`); produtosNoCarrinho();">-</button>
                            <input readonly="readonly" type="text" min="1" max="1000" class="field field--rounded product-qty__field quantityListener" id="produto`+produtoCarrinho.id+`" name="productList[0].quantity" value="`+produtoCarrinho.quantidade+`">
                            <button type="button" class="button button-pill button-pill--circle button-pill--green" onclick="aumentarQuantidade(`+produtoCarrinho.id+`); produtosNoCarrinho();">+</button>
                        </div>

                    </td>

                    <td class="prdUnitPrice">
                        <span class="product-price prdPrices">

                            <strong class="new-price ">
                                <span class="currency">R$</span>`+produtoCarrinho.preco+`
                            </strong>

                        </span>
                    </td>

                    <td class="prdTotalPrice product-price ">
                        <span class="currency">R$</span>`+(produtoCarrinho.preco*produtoCarrinho.quantidade).toFixed(2)+`
                    </td>

                    <td class="prdSimilar center control">
                        <label>
                            <input type="checkbox" class="similarItem" name="productList[0].similar" value="true">
                            <span>Aceito produto similar</span>
                        </label>
                    </td>

                    <td class="center control">
                        <a class="removeListener icon icon--trash" id="remove_216405281" onclick="excluirProdutoCarrinho(`+produtoCarrinho.id+`)"></a>
                    </td>

                </tr>
                `
		}, "");
		var htmlValorTotal = `
	            <dd class="checkout-footer__total inline--bottom sellPrice">R$`+valorTotal.toFixed(2)+`</dd>

	        </dl>


	        <script type="text/javascript">
	            PADdataLayer.push({'transactionTotal': '`+valorTotal+`'});
	            PADdataLayer.push({'transactionId': '12282655'});
	        </script>


	        <dl class="checkout-footer__heading-group">
	            <dt class="checkout-footer__subheading inline--bottom">Preço Total:</dt>


	            <dd class="checkout-footer__total inline--bottom sellPrice">R$`+valorTotal.toFixed(2)+`</dd>`
	
	var html = "";
	if(produtosCarrinho.length > 0)
		html = htmlInicio+tbody+htmlMeio+htmlValorTotal+htmlFim;
	else
		html = carrinhoVazio
	$('#produtos-no-carrinho').html(html);
	});
}	

excluirProdutoCarrinho = function(id) {
	var idx = -1;
	for(i = 0; i < carrinho.produtos.length; i++) {
		if(carrinho.produtos[i].id == id)
			idx = i;
	}
	carrinho.produtos.splice(idx, 1);
	atualizarValorCarrinho();
	produtosNoCarrinho();
	gravarCarrinho();
}

diminuirQuantidade = function(id) {
	var quantidade = $("#produto"+id).val();
	if(quantidade == 1) {
		return
	}
	adicionarProdutoCarrinho(id, -1);
}

aumentarQuantidade = function(id) {
	adicionarProdutoCarrinho(id, 1);
}

limparCarrinho = function() {
	localStorage.clear();
	buscarCarrinho();
	atualizarValorCarrinho();
	produtosNoCarrinho();
}

var finalizarCompra = function() {
	alert('Obrigado por comprar');
	limparCarrinho();
	window.location = '/';
}

$(document).ready(function() {
	produtosNoCarrinho();
});