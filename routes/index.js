var express = require('express');
var router = express.Router();
var fs = require("fs");
var produtosBD = fs.readFileSync("public/data/produtos.json");
var produtos = JSON.parse(produtosBD);
produtos = produtos.produtos;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', {produtos: produtos});
});

router.get('/produto/:id', function(req, res) {
	var idProduto = req.params.id;
	var produtoRender = null;
	produtos.forEach(function(produto) {
		if(produto.id === idProduto)
			produtoRender = produto;
	});
  res.render('pages/produto', {produto: produtoRender, produtos: produtos});
});

router.get('/carrinho', function(req, res) {
  res.render('pages/carrinho');
});

module.exports = router;
