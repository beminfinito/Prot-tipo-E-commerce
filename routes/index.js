var express = require('express');
var router = express.Router();
var fs = require("fs");
var produtosBD = fs.readFileSync("public/data/produtos.json");
var produtos = JSON.parse(produtosBD);
produtos = produtos.produtos;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {produtos: produtos});
});

router.get('/produto/:id', function(req, res) {
	var idProduto = req.params.id;
	var produtoRender = null;
	produtos.forEach(function(produto) {
		if(produto.id === idProduto)
			produtoRender = produto;
	});
  res.render('produto', {produto: produtoRender, produtos: produtos});
});

router.get('/carrinho', function(req, res) {
  res.render('carrinho');
});

module.exports = router;
