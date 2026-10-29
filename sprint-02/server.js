import express from 'express';
const app = express();

const PORT = 3000;

// Sprint 02: Array de objetos e função de consulta
function  criarMensagem(id, usuario, texto) {
  return { id, usuario: usuario.trim(), texto: texto.trim() };
}

const mensagens = [
  criarMensagem(1, 'Alice', 'Olá!'),
  criarMensagem(2, 'Bob', 'Oi, tudo bem?'),
  criarMensagem(3, 'Charlie', 'Bom dia!'),
];

function listarMensagens() {
  return mensagens
};

function quantidadeDeMensagens() {
  return mensagens.length;
}

function buscarMensagemPorId(id) {
  return mensagens.find(mensagem => mensagem.id === id);
}

app.get('/', (req, res) => res.send('Servidor rodando! 🚀'));
app.get('/status', (req, res) => res.json({ status: 'online', sprint: 2, total: quantidadeDeMensagens() }));
app.get('/sobre', (req, res) => res.send('Meu primeiro servidor Node.js com Express e ES Modules.'));

// [SPRINT 02 - NOVO] 6. Consulta, total e busca por ID; erro HTTP 404.
app.get('/mensagens', (req, res) => res.json(listarMensagens()));
app.get('/total-mensagens', (req, res) => res.json( { total: quantidadeDeMensagens}));
app.get('/mensagens/:id', (req, res) => {
    const mensagem = buscarMensagem(Number(req.params.id));
    if (!mensagem)
        return res.status(404).json({ error: 'Mensagem não encontrada' });
    res.json(mensagem);
});

app.listen(PORT, () => console.log(`Servidor http://localhost:${PORT}`));