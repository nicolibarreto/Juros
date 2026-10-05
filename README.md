# Calculadora de juros

Programa em JavaScript que calcula juros simples de **2,5% ao dia** sobre um valor, a partir da data de vencimento até a data atual.

## Requisitos

- Node.js instalado.

## Como usar

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/nicolibarreto/Juros.git
cd Juros
```

Execute informando o valor original e a data de vencimento no formato `AAAA-MM-DD`:

```bash
node juros.js 100 2026-10-01
```

O valor pode usar ponto ou vírgula como separador decimal, sem separador de milhares:

```bash
node juros.js 150,50 2026-10-01
```

## Exemplo de resultado

Para um valor de R$ 100,00 com vencimento em 01/10/2026, executado em **05/10/2026**:

```text
Dias de atraso: 4
Juros: R$ 10,00
Valor total: R$ 110,00
```

## Regra de cálculo

```text
Juros = valor original × 0,025 × dias de atraso
Valor total = valor original + juros
```

- Os juros são simples: a taxa incide sobre o valor original.
- O dia do vencimento não conta como atraso.
- São considerados dias corridos, incluindo fins de semana e feriados.
- No vencimento ou antes dele, os juros são zero.
- A data atual segue o calendário e o fuso horário local do computador.
- Os juros e o total são arredondados para duas casas decimais.

## Uso em outro programa JavaScript

```javascript
const { calcularJuros } = require('./juros');

const resultado = calcularJuros(100, '2026-10-01');
console.log(resultado);
// { valorOriginal, diasAtraso, juros, valorTotal }
```

Para calcular até uma data específica, informe um objeto `Date` como terceiro argumento:

```javascript
const resultado = calcularJuros(100, '2026-10-01', new Date(2026, 9, 5));
// Em JavaScript, os meses começam em zero: 9 representa outubro.
```

Valores negativos e datas inválidas geram uma mensagem de erro.
