import readline from 'readline';

class Context {
  constructor(date) {
    this.date = date;
    this.expression = "";
  }
}

class IAbstractExpression {
  evaluate(context) {}
}

class ExpressaoDia extends IAbstractExpression {
  evaluate(context) {
    context.expression = context.expression.replace("DD", context.date.getDate());
  }
}

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

class Separador extends IAbstractExpression {
  evaluate(context) {
    context.expression = context.expression.replace(" ", "-");
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const expression = await new Promise((resolve) => {
    rl.question("Selecione a expressão a usar: MM-DD-YYYY ou YYYY-MM-DD ou DD-MM-YYYY: ", (expr) => resolve(expr));
  });

  const date = new Date();
  const context = new Context(date);
  context.expression = expression.toUpperCase();

  const formatParts = context.expression.split('-');

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

  console.log(`Data na expressão escolhida: ${context.expression}`);
  rl.close();
}

main();
