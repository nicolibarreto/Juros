/** Calcula juros simples de 2,5% por dia de atraso.
 * A data de vencimento deve estar no formato AAAA-MM-DD.
 * O dia do vencimento não conta como atraso.
 */
function calcularJuros(valor, dataVencimento, hoje = new Date()) {
  if (typeof valor !== 'number' || !Number.isFinite(valor) || valor < 0) {
    throw new Error('Informe um valor numérico maior ou igual a zero.');
  }

  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dataVencimento);
  if (!partes) {
    throw new Error('Informe o vencimento no formato AAAA-MM-DD.');
  }
  const [, ano, mes, dia] = partes.map(Number);
  const vencimento = new Date(0);
  vencimento.setUTCFullYear(ano, mes - 1, dia);
  vencimento.setUTCHours(0, 0, 0, 0);
  if (vencimento.getUTCFullYear() !== ano ||
      vencimento.getUTCMonth() !== mes - 1 || vencimento.getUTCDate() !== dia) {
    throw new Error('A data de vencimento é inválida.');
  }
  if (!(hoje instanceof Date) || Number.isNaN(hoje.getTime())) {
    throw new Error('A data de hoje é inválida.');
  }

  // Compara dias do calendário local, sem interferência do horário de verão.
  const diaAtual = new Date(0);
  diaAtual.setUTCFullYear(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  diaAtual.setUTCHours(0, 0, 0, 0);
  const diasAtraso = Math.max(0, Math.round((diaAtual - vencimento) / 86400000));
  const juros = Math.round(valor * 0.025 * diasAtraso * 100) / 100;
  const valorTotal = Math.round((valor + juros) * 100) / 100;

  return { valorOriginal: valor, diasAtraso, juros, valorTotal };
}

// No terminal: node juros.js 100 2026-10-01
if (typeof module !== 'undefined') {
  module.exports = { calcularJuros };
  if (require.main === module) {
    try {
      const [valor, vencimento] = process.argv.slice(2);
      if (!valor || !vencimento) {
        throw new Error('Uso: node juros.js <valor> <AAAA-MM-DD>');
      }
      const resultado = calcularJuros(Number(valor.replace(',', '.')), vencimento);
      const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      console.log(`Dias de atraso: ${resultado.diasAtraso}`);
      console.log(`Juros: ${moeda.format(resultado.juros)}`);
      console.log(`Valor total: ${moeda.format(resultado.valorTotal)}`);
    } catch (erro) {
      console.error(erro.message);
      process.exitCode = 1;
    }
  }
}
