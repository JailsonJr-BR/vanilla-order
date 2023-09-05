import { getProdutosFromStorage, saveProdutosToStorage } from "./storage.js";
import {
  updateListagemDeProdutos,
  updateCarrinho,
  updateListagemPedidos,
  updateListagemMeusPedidos,
} from "./ui.js";
import { uuidGenerator } from "./utils.js";


const cadastroProdutos = document.getElementById("cadastroProdutos");
const finalizarPedido = document.getElementById("finalizar");
const gerenciarPedidos = document.getElementById("gerenciarPedidos");
const gerenciarMeusPedidos = document.getElementById("meusPedidos");

let produtos = getProdutosFromStorage();
let produtosForCart = getProdutosFromStorage();

const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const pedidosForSelect = JSON.parse(localStorage.getItem("pedidos")) || [];
const carrinho = [];
let valorCarrinho = 0;

if (cadastroProdutos) {
  cadastroProdutos.addEventListener("submit", (event) => {
    event.preventDefault();

    const produto = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,
      imagemProduto: document.getElementById("imagem").value,
      estoque: parseInt(document.getElementById("estoque").value),
      valorCusto: parseFloat(document.getElementById("valorCusto").value),
      valorFinal: parseFloat(document.getElementById("valorFinal").value),
    };

    produtos.push(produto);
    saveProdutosToStorage(produtos);
  });
}

if(gerenciarMeusPedidos) {
  updateListagemMeusPedidos(pedidos)
}

if (gerenciarPedidos) {
  updateListagemPedidos(pedidos)

  const selectPedido = document.querySelectorAll(".select-prod").forEach((select, index) => {
    select.addEventListener("change", () => {
      const selected = pedidosForSelect[index]
      selected.status = select.value
      localStorage.setItem("pedidos", JSON.stringify(pedidosForSelect));
      document.querySelectorAll('.titulo-prod').forEach((titulo, tituloi) => {
        if(index === tituloi) {
          titulo.textContent = `Status atual: ${select.value}`
        }
      })
    });
  });
}

const adicionaProdutoCarrinho = (i) => {
  const produto = produtos[i];
  const produtoForCart = produtosForCart[i];
  const itemCarrinho = carrinho.find((item) => item.id === i);

  if (itemCarrinho) {
    if (itemCarrinho.quantidade + 1 > produto.estoque) {
      alert("Quantidade excede o estoque disponível!");
      return;
    }
    itemCarrinho.quantidade += 1;
  } else {
    carrinho.push({ id: i, produto, quantidade: 1 });
  }

  produtoForCart.estoque -= 1; 
  valorCarrinho += produto.valorFinal;
  updateCarrinho(carrinho, valorCarrinho);
};

if(finalizarPedido) {
  finalizarPedido.addEventListener("click", () => {
    const pedido = {
      numero: uuidGenerator(),
      produtos: carrinho,
      total: valorCarrinho,
      data: Date.now(),
      status: "Pendente",
    };
  
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    saveProdutosToStorage(produtosForCart);
  });
}

updateListagemDeProdutos(produtos, adicionaProdutoCarrinho);

