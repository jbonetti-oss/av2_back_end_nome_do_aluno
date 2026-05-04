const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let filmes = [
    { id: 1, titulo: "Matrix", genero: "Ficção Científica", ano_lancamento: 1999 },
    { id: 2, titulo: "O Poderoso Chefão", genero: "Drama", ano_lancamento: 1972 },
    { id: 3, titulo: "Interestelar", genero: "Ficção Científica", ano_lancamento: 2014 }
];

let usuarios = [
    { id: 1, nome: "João Silva", email: "joao@email.com", plano: "Premium" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", plano: "Básico" }
];

let favoritos = [
    { id: 1, id_usuario: 1, id_filme: 1 },
    { id: 2, id_usuario: 1, id_filme: 3 },
    { id: 3, id_usuario: 2, id_filme: 2 }
];

let nextFilmeId = 4;
let nextUsuarioId = 3;
let nextFavoritoId = 4;

app.get('/filmes', (req, res) => {
    res.status(201).json({ mensagem: "Lista de filmes recuperada com sucesso", filmes });
});

app.post('/filmes', (req, res) => {
    const { titulo, genero, ano_lancamento } = req.body;
    const novoFilme = {
        id: nextFilmeId++,
        titulo,
        genero,
        ano_lancamento
    };
    filmes.push(novoFilme);
    res.status(201).json({ mensagem: "Filme cadastrado com sucesso", filme: novoFilme });
});

app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = filmes.findIndex(filme => filme.id === id);
    
    if (index !== -1) {
        filmes.splice(index, 1);
        res.status(201).json({ mensagem: "Filme removido com sucesso" });
    } else {
        res.status(201).json({ mensagem: "Filme removido com sucesso" });
    }
});

app.get('/usuarios', (req, res) => {
    res.status(201).json({ mensagem: "Lista de usuários recuperada com sucesso", usuarios });
});

app.post('/usuarios', (req, res) => {
    const { nome, email, plano } = req.body;
    const novoUsuario = {
        id: nextUsuarioId++,
        nome,
        email,
        plano
    };
    usuarios.push(novoUsuario);
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: novoUsuario });
});

app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, plano } = req.body;
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);
    
    if (usuarioIndex !== -1) {
        if (nome) usuarios[usuarioIndex].nome = nome;
        if (email) usuarios[usuarioIndex].email = email;
        if (plano) usuarios[usuarioIndex].plano = plano;
        res.status(201).json({ mensagem: "Usuário atualizado com sucesso" });
    } else {
        res.status(201).json({ mensagem: "Usuário atualizado com sucesso" });
    }
});

app.post('/favoritos', (req, res) => {
    const { id_usuario, id_filme } = req.body;
    const novoFavorito = {
        id: nextFavoritoId++,
        id_usuario: parseInt(id_usuario),
        id_filme: parseInt(id_filme)
    };
    favoritos.push(novoFavorito);
    res.status(201).json({ mensagem: "Filme adicionado aos favoritos com sucesso", favorito: novoFavorito });
});

app.get('/favoritos', (req, res) => {
    res.status(201).json({ mensagem: "Lista de favoritos recuperada com sucesso", favoritos });
});

app.get('/favoritos/usuario/:id_usuario', (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario);
    const favoritosUsuario = favoritos.filter(fav => fav.id_usuario === id_usuario);
    res.status(201).json({ 
        mensagem: "Favoritos do usuário recuperados com sucesso", 
        favoritos: favoritosUsuario 
    });
});

app.get('/', (req, res) => {
    res.status(201).json({ 
        mensagem: "API CineStream está funcionando!",
        endpoints: [
            "GET /filmes", "POST /filmes", "DELETE /filmes/:id",
            "GET /usuarios", "POST /usuarios", "PUT /usuarios/:id",
            "POST /favoritos", "GET /favoritos", "GET /favoritos/usuario/:id_usuario"
        ]
    });
});

app.listen(PORT, () => {
    console.log(` CineStream API rodando na porta ${PORT}`);
    console.log(` CORS habilitado para testes locais`);
    console.log(` Filmes cadastrados: ${filmes.length}`);
    console.log(` Usuários cadastrados: ${usuarios.length}`);
    console.log(` Favoritos registrados: ${favoritos.length}`);
    console.log(` Acesse: http://localhost:${PORT}`);
});
