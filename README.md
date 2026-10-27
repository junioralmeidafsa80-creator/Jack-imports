# Jack Imports — loja virtual inicial

Site responsivo em HTML, CSS e JavaScript puro, com identidade visual preto, vinho escuro e dourado.

## Como abrir
1. Extraia o ZIP.
2. Abra `index.html` em um navegador para testar o layout, os filtros e o carrinho.
3. Para publicar, envie os arquivos para uma hospedagem estática (por exemplo, GitHub Pages, Netlify ou Cloudflare Pages).

## Antes de publicar
- **Troque o número de WhatsApp** em `app.js`, na propriedade `whatsappNumber`, usando formato internacional sem `+`, espaços ou traços. Exemplo de formato: `5575999999999`.
- Troque o catálogo de demonstração em `app.js` por produtos reais, com fotos autorizadas, preços corretos, volumes, descrição, estoque e categorias.
- O carrinho funciona no navegador e monta um pedido para WhatsApp. **Não é um checkout de pagamento real**.
- Para receber PIX/cartão, crie uma conta empresarial no provedor escolhido e integre a API/checkout oficial seguindo a documentação dele. Nunca coloque chaves secretas no JavaScript do navegador; elas devem ficar em um backend seguro.
- Configure frete, área atendida, estoque, política de troca/cancelamento, privacidade/LGPD, termos, identificação da empresa e atendimento.
- A confirmação de idade exibida é apenas inicial; implemente uma verificação apropriada no pedido e na entrega para impedir venda a menores.
- Configure domínio, HTTPS, título/descrição, Search Console e sitemap para ajudar a indexação no Google. Indexação e posicionamento não são garantidos.
- Revise os textos legais com orientação profissional antes de operar.

## Estrutura
- `index.html`: página principal, catálogo, sacola e confirmação de idade.
- `styles.css`: design responsivo.
- `app.js`: produtos de exemplo, filtros, carrinho e geração de pedido para WhatsApp.
- `privacidade.html` e `termos.html`: modelos que precisam ser personalizados.
