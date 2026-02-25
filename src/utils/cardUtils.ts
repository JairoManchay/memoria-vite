import { Card } from '../types';
import { Property, allProperties } from '../data/properties';

// Variable global para guardar las propiedades usadas en el nivel 1
// Esto evita que se repitan en el nivel 2
let level1UsedProperties: Property[] = [];

/**
 * Función para barajar un array
 * Usa el algoritmo Fisher-Yates
 * Ejemplo: [1,2,3] -> [3,1,2]
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
/**
 * Crea una carta a partir de una propiedad
 */
export function createCard(property: Property, id: number, isSingle: boolean): Card {
  return {
    id: id,
    name: property.name,
    icon: property.icon || '',
    image: property.image,
    isFlipped: false,
    isMatched: false,
    isSingle: isSingle
  };
}

/**
 * Genera las 24 cartas para un nivel específico
 * 
 * Cómo funciona:
 * 1. Obtiene las propiedades disponibles (todas para nivel 1, sin repetidas para nivel 2)
 * 2. Baraja y toma 6 para hacer pares (12 cartas)
 * 3. Baraja y toma 12 para individuales (12 cartas)
 * 4. Combina todas y baraja de nuevo
 * 5. Crea los objetos de carta
 * 
 * @param level - 1 o 2
 * @returns array de 24 cartas
 */
export function generateCardsForLevel(level: number): Card[] {
  const shuffled = shuffleArray(allProperties);

  let selected: Property[] = [];

  if (level === 1) {
    // 🔹 Nivel 1 → tomar 12 aleatorias
    selected = shuffled.slice(0, 12);

    // Guardarlas para excluir en nivel 2
    level1UsedProperties = selected;
  } else {
    // 🔹 Nivel 2 → excluir las usadas en nivel 1
    const remaining = allProperties.filter(
      prop => !level1UsedProperties.includes(prop)
    );

    // Aquí deberían quedar 11
    selected = [...remaining];

    // Agregar FERIA como propiedad extra
    const feria: Property = {
      name: "Feria",
      image: "./logoFeria.jpeg",
    };

    selected.push(feria);
  }

  // 🔥 Duplicar todas para hacer pares
  const duplicated = [...selected, ...selected];

  // 🔥 Mezclar
  const finalCards = shuffleArray(duplicated);

  // 🔥 Crear cartas con IDs únicos
  return finalCards.map((prop, index) =>
    createCard(prop, index, false)
  );
}

/**
 * Verifica si dos cartas son iguales (tienen el mismo nombre)
 */
export function areCardsMatching(card1: Card, card2: Card): boolean {
  return card1.name === card2.name;
}

/**
 * Voltea una carta específica
 */
export function flipCard(cards: Card[], cardId: number): Card[] {
  return cards.map(card => {
    if (card.id === cardId) {
      return { ...card, isFlipped: true };
    }
    return card;
  });
}

/**
 * Desvuelve una carta (la voltea de vuelta)
 */
export function unflipCard(cards: Card[], cardId: number): Card[] {
  return cards.map(card => {
    if (card.id === cardId) {
      return { ...card, isFlipped: false };
    }
    return card;
  });
}

/**
 * Marca dos cartas como encontradas (matched)
 */
export function matchCards(cards: Card[], cardId1: number, cardId2: number): Card[] {
  return cards.map(card => {
    if (card.id === cardId1 || card.id === cardId2) {
      return { ...card, isMatched: true };
    }
    return card;
  });
}