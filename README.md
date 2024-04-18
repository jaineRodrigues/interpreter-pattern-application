# Padrão de Design Interpreter em JavaScript

Este repositório contém um exemplo de implementação do Padrão de Design Interpreter em JavaScript. O Padrão de Design Interpreter é utilizado para analisar consultas e recuperar dados com base nessas consultas.

## Estrutura do Projeto

- `context.js`: Define a classe `Context`, que age como o contexto para a interpretação das consultas.
- `expression.js`: Contém as classes abstratas `AbstractExpression` e as classes concretas `TerminalExpression` e `NonterminalExpression`, que representam expressões usadas para interpretar as consultas.
- `queryParser.js`: Implementa a classe `QueryParser`, responsável por criar a árvore de expressões com base na consulta do usuário.

## Executando o Exemplo

Para executar o exemplo, certifique-se de ter o Node.js instalado. Em seguida, execute o seguinte comando:

```bash
node example-data.js
```
ou 
```bash
node interpreter-example.js

