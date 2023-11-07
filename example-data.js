import readline from "readline";

// Classe Context: Mantém o contexto da data e da expressão
class Context {
    constructor(date) {
        this.date = date; // Data atual
        this.expression = ""; // Expressão da data a ser formatada
    }
}

// Classe IAbstractExpression: Interface para expressões abstratas.  // Método para avaliar a expressão
class IAbstractExpression {
    evaluate(context) {}
}

// Classe ExpressaoDia: Implementa a expressão para o dia. // Substitui "DD" na expressão pela parte do dia da data
class ExpressaoDia extends IAbstractExpression {
    evaluate(context) {
        context.expression = context.expression.replace("DD", context.date.getDate());
    }
}

// Classe ExpressaoMes: Implementa a expressão para o mês.   // Substitui "MM" na expressão pela parte do mês da data (adicionando +1 porque os meses começam em 0)
class ExpressaoMes extends IAbstractExpression {
    evaluate(context) {
        context.expression = context.expression.replace("MM", context.date.getMonth() + 1);
    }
}

class ExpressaoAno extends IAbstractExpression {
    evaluate(context) {
        context.expression = context.expression.replace("YYYY", context.date.getFullYear());
    }
}

// Classe Separador: Implementa a expressão para substituir espaços por hífens
class Separador extends IAbstractExpression {
    evaluate(context) {
        context.expression = context.expression.replace(" ", "-");
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função principal
async function main() {
    const expression = await new Promise((resolve) => {
        rl.question("Selecione a expressão a usar: MM-DD-YYYY ou YYYY-MM-DD ou DD-MM-YYYY: ", (expr) => resolve(expr));
    });

    // Obtém a data atual
    const date = new Date();

    // Cria um contexto com a data atual e a expressão fornecida pelo usuário
    const context = new Context(date);
    context.expression = expression.toUpperCase();

    // Divide a expressão em partes com base nos hífens
    const formatParts = context.expression.split("-");

    // Cria uma lista de expressões com base nas partes da expressão
    const expressions = [];
    for (const part of formatParts) {
        if (part === "DD") {
            expressions.push(new ExpressaoDia());
        } else if (part === "MM") {
            expressions.push(new ExpressaoMes());
        } else if (part === "YYYY") {
            expressions.push(new ExpressaoAno());
        }
    }

    expressions.push(new Separador());

    for (const expr of expressions) {
        expr.evaluate(context);
    }

    // Exibe a data formatada com base na expressão
    console.log(`Data na expressão escolhida: ${context.expression}`);
    rl.close();
}

// Chama a função principal para iniciar o programa
main();
