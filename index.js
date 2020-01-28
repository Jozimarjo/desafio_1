const express = require('express');
const app = express();
cont = 0;
const projetos = [
    { id: "1", title: 'Novo projeto 1', tasks: [] },
    { id: "2", title: 'Novo projeto 2', tasks: [] },
    { id: "3", title: 'Novo projeto 3', tasks: [] }
];

app.use(express.json());

function checkIdExist(req, res, next) {
    console.log('cheCk id');
    const { id } = req.params;
    if (projetos[id - 1]) next()
    return res.status(400).json({ error: `Nenhum projeto cadastrado com id: ${id}` })
}


app.use((req, res, next) => {
    cont++;
    console.log('Total de Requisições: ', cont)
    next();
});

app.post('/projects', (req, res) => {
    this.projeto = req.body;
    projetos.push(this.projeto);
    return res.json(projetos)
});

app.get('/projects', (req, res) => {
    return res.json(projetos);
});

app.put('/projects/:id', (req, res) => {
    const { title } = req.body;
    const { id } = req.params
    projetos[id - 1].title = title
    return res.json(projetos[id - 1])
})

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params
    console.log('id: ', id - 1)
    projetos.splice(id - 1, 1)
    return res.json(projetos)
})

app.post('/projects/:id/tasks', checkIdExist, (req, res) => {
    console.log('Post --')
    const { id } = req.params
    const { title } = req.body;
    console.log('Post -- ', title, id)

    projetos[id - 1].tasks.push(title);

    return res.json(projetos)
});



app.listen(3000, () => console.log('Servidor na porta 3000'))