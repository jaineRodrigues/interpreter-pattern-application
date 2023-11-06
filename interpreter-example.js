// Contexto - O contexto contém a lista de livros e a expressão de consulta.
class Context {
    constructor(books, query) {
        this.books = books;
        this.query = query;
    }

    search() {
        const parser = new QueryParser(this.query);
        return parser.parse(this.books);
    }
}

// AbstractExpression - Interface para as expressões
class AbstractExpression {
    interpret(book) {}
}

// TerminalExpression - Expressão terminal que representa um livro específico.
class TerminalExpression extends AbstractExpression {
    constructor(property, value) {
        super();
        this.property = property;
        this.value = value;
    }

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

    parse(books) {
        const tokens = this.query.split(" ");
        const expressionStack = [];
        let operator = null;

        tokens.forEach((token) => {
            if (token === "AND" || token === "OR") {
                operator = token;
            } else {
                const [property, value] = token.split(":");
                const expression = new TerminalExpression(property, value);
                if (operator) {
                    const expression2 = expressionStack.pop();
                    const expression1 = expressionStack.pop();
                    expressionStack.push(new NonterminalExpression(expression1, expression2, operator));
                    operator = null;
                }
                expressionStack.push(expression);
            }
        });

        if (expressionStack.length === 1) {
            return books.filter((book) => expressionStack[0].interpret(book));
        } else {
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

// Função para buscar livros com base na consulta
function searchBooks(books, query) {
    const [property, value] = query.split(":");
    return books.filter((book) => book[property] === value);
}

// Exemplo de uso
const query = "author:Tolkien";
const results = searchBooks(books, query);

console.log(results);