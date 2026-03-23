const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

// Conexão com MySQL
const sequelize = new Sequelize('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})



// Cliente
const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING
    }
})

// Livro
const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_paginas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

// Funcionário
const Funcionario = sequelize.define('Funcionario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})


const app = express()
app.use(cors())
app.use(express.json())

const port = 3001



app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.findAll()
    res.json(clientes)
})

app.post('/clientes', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body)
        res.status(201).json(cliente)
    } catch (error) {
        res.status(400).json({ erro: "Erro ao criar cliente" })
    }
})

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params

    const [updated] = await Cliente.update(req.body, {
        where: { id }
    })

    if (updated) {
        const clienteAtualizado = await Cliente.findByPk(id)
        return res.json(clienteAtualizado)
    }

    res.status(404).json({ erro: "Cliente não encontrado" })
})

app.delete('/clientes/:id', async (req, res) => {
    const deletado = await Cliente.destroy({
        where: { id: req.params.id }
    })

    if (deletado) {
        return res.json({ message: "Cliente deletado" })
    }

    res.status(404).json({ erro: "Cliente não encontrado" })
})


app.get('/livros', async (req, res) => {
    const livros = await Livro.findAll()
    res.json(livros)
})

app.post('/livros', async (req, res) => {
    try {
        const livro = await Livro.create(req.body)
        res.status(201).json(livro)
    } catch (error) {
        res.status(400).json({ erro: "Erro ao criar livro" })
    }
})

app.put('/livros/:id', async (req, res) => {
    const { id } = req.params

    const [updated] = await Livro.update(req.body, {
        where: { id }
    })

    if (updated) {
        const livroAtualizado = await Livro.findByPk(id)
        return res.json(livroAtualizado)
    }

    res.status(404).json({ erro: "Livro não encontrado" })
})

app.delete('/livros/:id', async (req, res) => {
    const deletado = await Livro.destroy({
        where: { id: req.params.id }
    })

    if (deletado) {
        return res.json({ message: "Livro deletado" })
    }

    res.status(404).json({ erro: "Livro não encontrado" })
})


app.get('/funcionarios', async (req, res) => {
    const funcionarios = await Funcionario.findAll()
    res.json(funcionarios)
})

app.post('/funcionarios', async (req, res) => {
    try {
        const funcionario = await Funcionario.create(req.body)
        res.status(201).json(funcionario)
    } catch (error) {
        res.status(400).json({ erro: "Erro ao criar funcionário" })
    }
})

app.put('/funcionarios/:id', async (req, res) => {
    const { id } = req.params

    const [updated] = await Funcionario.update(req.body, {
        where: { id }
    })

    if (updated) {
        const funcionarioAtualizado = await Funcionario.findByPk(id)
        return res.json(funcionarioAtualizado)
    }

    res.status(404).json({ erro: "Funcionário não encontrado" })
})

app.delete('/funcionarios/:id', async (req, res) => {
    const deletado = await Funcionario.destroy({
        where: { id: req.params.id }
    })

    if (deletado) {
        return res.json({ message: "Funcionário deletado" })
    }

    res.status(404).json({ erro: "Funcionário não encontrado" })
})


sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta: ${port}`)
        console.log('✅ Banco sincronizado')
    })
}).catch((error) => {
    console.error('❌ Erro ao conectar com o banco:', error)
})