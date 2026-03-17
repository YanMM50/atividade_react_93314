const express = require('express')
const cors = require('cors')
const {Sequelize, DataTypes} = require('sequelize')

// Configuração da conexão com o banco de dados - MySQL.
const sequelize = new Sequelize('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})    

const Cliente = sequelize.define('Cliente',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone:{
        type: DataTypes.STRING
    }

})

//Configuração do servidor express.
const app = express()
app.use(cors()) // permite o front-end acessar a API
app.use(express.json()) // permite o servidor entender JSON

const port = 3001

// definição de rotas (endpoints).
app.get('/clientes', async(req, res) => {
    const todosOsClientes = await Cliente.findAll()
    res.json(todosOsClientes)
})

app.post('/clientes', async(req, res) =>{
    try{
        const{nome,email,telefone} = req.body
        const novoCliente = await Cliente.create({nome, email, telefone})
        res.status(201).json({
            
        })

    }
})