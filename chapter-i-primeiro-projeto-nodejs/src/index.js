const express = require('express');
const { v4: uuidv4 } = require('uuid');  // v4 gera numero randomico

const app = express();
app.use(express.json());

const customers = [];

//Middlwere
function verifyIfExistsAccount(request, response, next) {
    const { cpf } = request.headers;
    const customer = customers.find((custumer) => custumer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: 'Customer not found' });
    }
    request.customer = customer;
    return next();
}

function getBalance(statemant) {
    const balance = statemant.reduce((acc, operation) => {
        if (operation.type === "credit") {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

/**
 * cpf - string
 * name - string
 * id - uuid
 * statemant []
 */
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customersAlredyExists = customers.some((customer) => customer.cpf === cpf);
    if (customersAlredyExists) {
        return response.status(400).json({ error: 'Customer already exists' })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statemant: []
    });

    return response.status(201).send();
});


app.get('/statemant/', verifyIfExistsAccount, (request, response) => {
    const { customer } = request;

    return response.json(customer.statemant);
});

app.post('/deposit', verifyIfExistsAccount, (request, response) => {
    const { description, amount } = request.body;
    const { customer } = request;

    const statemantOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };

    customer.statemant.push(statemantOperation);
    return response.status(201).send();
})

app.post('/withdraw', verifyIfExistsAccount, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;
    const balance = getBalance(customer.statemant);

    if (balance < amount) {
        return response.status(400).json({ error: "Insufficient funds!" })
    }

    const statemantOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    };

    customer.statemant.push(statemantOperation);
    return response.status(201).send();
})

app.get('/statemant/date', verifyIfExistsAccount, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statemant = customer.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString())
    return response.json(statemant);
});

app.put('/account', verifyIfExistsAccount, (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

app.get('/account', verifyIfExistsAccount, (request, response) => {
    const { customer } = request;
    return response.json(customer);
})

app.delete('/account', verifyIfExistsAccount, (request, response) => {
    const { customer } = request;

    customers.splice(customer, 1);
    return response.status(200).json(customers);
})

app.get("/balance", verifyIfExistsAccount, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statemant);
    return response.json(balance);
})

app.listen(3333);
