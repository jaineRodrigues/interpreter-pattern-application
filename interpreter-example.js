// Contexto - O contexto contém a lista de livros e a expressão de consulta.
class Context {
    constructor(books, query) {
        this.books = books;
        this.query = query;
    }

    // Método para iniciar a busca
    search() {
        // Cria um objeto QueryParser para analisar a consulta
        const parser = new QueryParser(this.query);
        // Chama o método parse do QueryParser para buscar os livros correspondentes
        return parser.parse(this.books);
    }
}

// AbstractExpression - Interface para as expressões
class AbstractExpression {
    // Método interpret para avaliar a expressão em um livro
    interpret(book) {}
}

// TerminalExpression - Expressão terminal que representa um livro específico.
class TerminalExpression extends AbstractExpression {
    constructor(property, value) {
        super();
        this.property = property;
        this.value = value;
    }

    // Avalia se a propriedade do livro é igual ao valor fornecido
    interpret(book) {
        return book[this.property] === this.value;
    }
}

// NonterminalExpression - Expressão não-terminal que combina duas expressões com um operador.
class NonterminalExpression extends AbstractExpression {
    constructor(expression1, expression2, operator) {
        super();
        this.expression1 = expression1;
        this.expression2 = expression2;
        this.operator = operator;
    }

    // Avalia as duas expressões combinadas com base no operador (AND ou OR)
    interpret(book) {
        if (this.operator === "AND") {
            return this.expression1.interpret(book) && this.expression2.interpret(book);
        } else if (this.operator === "OR") {
            return this.expression1.interpret(book) || this.expression2.interpret(book);
        }
        return false;
    }
}

// QueryParser - Responsável por criar a árvore de expressões com base na consulta do usuário.
class QueryParser {
    constructor(query) {
        this.query = query;
    }

    // Método para analisar a consulta e buscar livros correspondentes
    parse(books) {
        const tokens = this.query.split(" ");
        const expressionStack = [];
        let operator = null;

        // Analisa a consulta token por token
        tokens.forEach((token) => {
            if (token === "AND" || token === "OR") {
                // Se o token for um operador, armazena o operador
                operator = token;
            } else {
                // Se o token for uma propriedade:valor, cria uma expressão Terminal
                const [property, value] = token.split(":");
                const expression = new TerminalExpression(property, value);
                if (operator) {
                    // Se houver um operador pendente, combina as expressões anteriores
                    const expression2 = expressionStack.pop();
                    const expression1 = expressionStack.pop();
                    expressionStack.push(new NonterminalExpression(expression1, expression2, operator));
                    operator = null;
                }
                // Empilha a expressão atual
                expressionStack.push(expression);
            }
        });

        // Após analisar a consulta, a árvore de expressões é construída
        if (expressionStack.length === 1) {
            // Se houver apenas uma expressão na pilha, avalia a consulta
            return books.filter((book) => expressionStack[0].interpret(book));
        } else {
            // Caso contrário, retorna um array vazio
            return [];
        }
    }
}

// Exemplo de uso
// Dados de exemplo
const books = [
    { title: "The Hobbit", author: "Tolkien", genre: "Fantasy" },
    { title: "The Lord of the Rings", author: "Tolkien", genre: "Fantasy" },
    { title: "Harry Potter", author: "Rowling", genre: "Fantasy" }
];

// Função para buscar livros com base na consulta (não faz parte do padrão Interpreter)
function searchBooks(books, query) {
    const [property, value] = query.split(":");
    return books.filter((book) => book[property] === value);
}

// Exemplo de uso da consulta com a função
const query = "author:Tolkien" || "genre:Fantasy";
const results = searchBooks(books, query);

console.log(results);
