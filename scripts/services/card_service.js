// Essa interface será responsável por oferecer a estrutura do que será buscado dos cards na base de dados, de modo que a UI não precise ter acesso direto a estes dados:
export class CardService {
  constructor(cards) {
    this.cards = cards;
  }

  // Retorna todos os cards:
  getAll() {
    return [...this.cards];
  }

  // Busca um card pelo seu nome:
  getByName(name) {
    return (
      this.cards.find(
        (card) => card.nome.toLowerCase() === name.toLowerCase(),
      ) || null
    );
  }

  // Busca um card pelo índice:
  getByIndex(index) {
    return this.cards[index] || null;
  }

  // Retorna somente os dados necessários para exibição
  getDisplayData(card) {
    if (!card) return null;

    return {
      nome: card.nome,
      descricao: card.descricao,
      atk: card.atk,
      def: card.def,
      atributo: card.atributo,
      tipo: card.tipo,
    };
  }

  // Filtros:
  getByAttribute(attribute) {
    return this.cards.filter((card) => card.atributo === attribute);
  }

  getByType(type) {
    return this.cards.filter((card) => card.tipo === type);
  }

  getCount() {
    return this.cards.length;
  }
}
