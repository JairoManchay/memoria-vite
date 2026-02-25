import { Card } from '../types';
import { Property, allProperties } from '../data/properties';
import { PAIRS_PER_LEVEL } from '../constants/game';

// Variable global para guardar las propiedades usadas en el nivel 1
// Esto evita que se repitan en el nivel 2
let level1UsedProperties: number[] = [];

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
 * Obtiene las propiedades disponibles para un nivel
 * Nivel 1: usa todas las propiedades
 * Nivel 2: excluye las propiedades usadas en nivel 1
 */
export function getPropertiesForLevel(level: number): Property[] {
  if (level === 1) {
    return allProperties;
  } else {
    // En nivel 2, filtra las propiedades que ya se usaron en nivel 1
    const newArray = [...allProperties, { name: 'Inmobiliaria 23', image: './logoFeria.jpeg' }]
    return newArray.filter((_, index) => !level1UsedProperties.includes(index));
  }
}

/**
 * Guarda los índices de las propiedades del nivel 1
 * Se usa para no repetirlas en el nivel 2
 */
export function saveLevel1Properties(pairs: Property[]): void {
  level1UsedProperties = pairs.map(p => allProperties.indexOf(p));
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
  // Paso 1: Obtener propiedades disponibles
  const availableProperties = getPropertiesForLevel(level);
  
  // Paso 2: Barajar propiedades
  const shuffled = shuffleArray(availableProperties);
  
  // Paso 3: Tomar las primeras 6 para hacer pares (12 cartas)
  const pairs = shuffled.slice(0, PAIRS_PER_LEVEL);
  
  // Paso 4: Guardar las propiedades del nivel 1 para no repetir en nivel 2
  if (level === 1) {
    saveLevel1Properties(pairs);
  }
  
  // Paso 5: Tomar 12 para individuales (del índice 6 al 18)
  const singles = shuffled.slice(PAIRS_PER_LEVEL, PAIRS_PER_LEVEL + 12);
  
  // Paso 6: Duplicar los pares para tener 12 cartas de pares
  const pairCards = [...pairs, ...pairs];
  
  // Paso 7: Combinar pares + individuales
  const allCards = [...pairCards, ...singles];
  
  // Paso 8: Barajar todas las cartas
  const finalCards = shuffleArray(allCards);
  
  // Paso 9: Crear objetos de carta con IDs únicos
  const result: Card[] = [];
  for (let i = 0; i < finalCards.length; i++) {
    const prop = finalCards[i];
    const isSingle = i >= 12; // Las primeras 12 son pares, las demás son individuales
    result.push(createCard(prop, i, isSingle));
  }
  
  return result;
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
