export const updateListagemDeProdutos = (produtos, callback) => {
  const listagemDeProdutos = document.querySelector(".lista-produtos");
  listagemDeProdutos.innerHTML = "";
  produtos.forEach((produto, index) => {
    if (produto.estoque) {
      listagemDeProdutos.innerHTML += `
        <div class="item-produto">
            <img src="${produto.imagemProduto}" alt="">
            <div class="item-conteudo">
                <p><strong>Nome do produto:</strong> ${produto.nome}</p>
                <p class="desc-item"><strong>Descrição do produto:</strong> ${
                  produto.descricao
                }</p>
                <p><strong>Valor do produto:</strong> R$ ${produto.valorFinal.toFixed(
                  2
                )}</p>
                <button data-index="${index}" class="btn-add-to-cart">Adicionar carrinho</button>
            </div>
        </div>`;
    } else {
        listagemDeProdutos.innerHTML += `
        <div class="item-produto">
            <img src="${produto.imagemProduto}" alt="">
            <div class="item-conteudo">
                <p><strong>Nome do produto:</strong> ${produto.nome}</p>
                <p class="desc-item"><strong>Descrição do produto:</strong> ${
                  produto.descricao
                }</p>
                <p><strong>Valor do produto:</strong> R$ ${produto.valorFinal.toFixed(
                  2
                )}</p>
                <button data-index="${index}" disabled>Produto indisponivel</button>
            </div>
        </div>`;
    }
  });

  document.querySelectorAll(".btn-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      callback(index);
    });
  });
};

export const updateListagemPedidos = (pedidos) => {
  pedidos.forEach((pedido, index) => {
    const produtosPedido = pedido.produtos.map((item) => `<div class="pedido-name"><p>${item.produto.nome}</p></div>`).join("")
    gerenciarPedidos.innerHTML += `
        <tr>
            <td>${pedido.numero}</td>
            <td>${produtosPedido}</td>
            <td>R$ ${pedido.total.toFixed(2)}</td>
            <td>
              <span class="titulo-prod"> Status atual: ${pedido.status} </span>
              <select class="select-prod" data-produto="${index}">
                <option hidden>-- selecione status --</option>
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </td>
            <td>${new Date(pedido.data)}</td>
        </tr>`;
  });
};

export const updateListagemMeusPedidos = (pedidos) => {
  pedidos.forEach((pedido, index) => {
    const produtosPedido = pedido.produtos.map((item) => `<div class="pedido-name"><p>${item.produto.nome}</p></div>`).join("")
    meusPedidos.innerHTML += `
        <tr>
            <td>${pedido.numero}</td>
            <td>${produtosPedido}</td>
            <td>R$ ${pedido.total.toFixed(2)}</td>
            <td>Status atual: ${pedido.status}</span></td>
            <td>${new Date(pedido.data)}</td>
        </tr>`;
  });
};

export const updateCarrinho = (carrinho, valorCarrinho) => {
  const listagemCarrinho = document.querySelector(".lista-carrinho");
  listagemCarrinho.innerHTML = "";
  carrinho.forEach((item) => {
    listagemCarrinho.innerHTML += `
        <div class="item-carrinho">
            <img src="${item.produto.imagemProduto}" alt="">
            <p>${item.produto.nome}</p>
            <p>R$ ${item.produto.valorFinal.toFixed(2)}</p>
        </div>`;
  });
  const total = document.getElementById("total");
  total.innerText = valorCarrinho.toFixed(2);
};
