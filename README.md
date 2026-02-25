# Memoria - Juego de Memoria Inmobiliaria

Juego de memoria desarrollado con React + Vite + TypeScript + Tailwind CSS.

## Características del Proyecto

- **Stack**: React 19 + Vite 6 + TypeScript + Tailwind CSS v4
- **Gestión de estado**: Zustand
- **Responsivo**: Diseño adaptativo para diferentes tamaños de pantalla
- **Dos niveles**: Nivel 1 y Nivel 2 con diferenciación visual
- **Sistema de juego**: 
  - 24 cartas por nivel (4x6 grid)
  - 6 pares winners + 12 individuales
  - Modal de victoria con opción de siguiente nivel
  - Modal de derrota con reinicio

## Requisitos

- Node.js 18+ 
- npm

## Instalación

```bash
npm install
```

## Levantar el proyecto

```bash
npm run dev
```

El proyecto se abrirá en: http://localhost:5173

## Construir para producción

```bash
npm run build
```

---

# Cómo Modificar el Juego

## 1. Cambiar Imágenes de las Cartas

Las imágenes se definen en el archivo: `src/data/properties.ts`

### Estructura de una propiedad:
```typescript
{ name: 'Nombre que aparece', image: 'ruta/a/la/imagen.png' }
```

### Pasos para agregar/editar imágenes:

1. **Agregar imagen en la carpeta `public/images/`**
   - Formatos recomendados: PNG o JPG
   - Tamaño recomendado: 200x200px aproximadamente

2. **Editar `src/data/properties.ts`**

**Para cambiar una imagen existente:**
```typescript
// Cambiar nombre o imagen
{ name: 'Mi Nueva Imagen', image: './images/mi-imagen.png' }
```

**Para agregar una nueva propiedad:**
```typescript
export const allProperties: Property[] = [
  // ... propiedades existentes ...
  
  // Agregar al final
  { name: 'Nombre de mi propiedad', image: './images/nueva-imagen.png' },
];
```

**Para usar iconos en lugar de imágenes:**
```typescript
{ name: 'Premio', icon: '🏠' }
```

### Ejemplo completo:
```typescript
export const allProperties: Property[] = [
  // Imagen de inmobiliaria
  { name: 'Mi Casa', image: './images/mi-casa.png' },
  { name: 'Edificio Centro', image: './images/edificio.png' },
  
  // Icono (si no hay imagen)
  { name: 'Premio Especial', icon: '🎁' },
  { name: 'Dinero', icon: '💰' },
];
```

## 2. Cambiar Configuración del Juego

El archivo: `src/constants/game.ts`

```typescript
INITIAL_ATTEMPTS = 80    // Intentos (intentos que tiene el jugador)
INITIAL_TIME = 80        // Tiempo en segundos
WINNING_PAIRS = 12       // Pares totales para ganar
PAIRS_PER_LEVEL = 6      // Pares por nivel
CARDS_PER_LEVEL = 24     // Cartas mostradas por nivel
FLIP_DELAY = 1000        // Ms de espera al voltear carta
```

---

# Lógica del Juego

## Configuración

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| INITIAL_ATTEMPTS | 80 | Intentos disponibles |
| INITIAL_TIME | 80 | Segundos del temporizador |
| WINNING_PAIRS | 12 | Pares totales para ganar |
| PAIRS_PER_LEVEL | 6 | Pares por nivel |
| CARDS_PER_LEVEL | 24 | Cartas mostradas por nivel |
| FLIP_DELAY | 1000 | Ms antes de voltear cartas al fallar |

## Estructura del Proyecto

```
src/
├── constants/
│   └── game.ts          # Constantes del juego
├── data/
│   └── properties.ts    # Datos de propiedades (imágenes/iconos)
├── utils/
│   └── cardUtils.ts     # Funciones de utilidad para cartas
├── store/
│   └── useGameStore.ts  # Estado global del juego (Zustand)
├── types/
│   └── index.ts         # Tipos TypeScript
└── components/
    ├── Card/            # Componente de carta individual
    ├── GameBoard/       # Tablero con las 24 cartas
    ├── Timer/           # Temporizador regresivo
    ├── AttemptsCounter/ # Contador de intentos
    ├── Modal/           # Pantallas de victoria/derrota
    ├── Header/          # Encabezado del juego
    └── Controls/        # Controles de pausa/reinicio
```

## Tipos de Cartas

1. **Pares (6 por nivel)**: Cartas que tienen otra igual. El jugador debe encontrar ambas para sumar puntos.
2. **Individuales (12 por nivel)**: Cartas sin par. Al voltear 2, se voltean de vuelta automáticamente.

## Flujo del Juego

```
1. INICIAR JUEGO
   └─> generateCardsForLevel(1) genera 24 cartas
       - 6 pares (12 cartas)
       - 12 individuales

2. VOLTEAR CARTA
   └─> El jugador hace clic en una carta
   └─> Se marca como isFlipped = true

3. VERIFICAR MATCH (cuando hay 2 cartas volteadas)
   ├─> SI son del mismo par:
   │   └─> isMatched = true para ambas
   │   └─> matchedPairs += 2
   │
   └─> SI NO (individual o mixto):
       └─> Se voltean de vuelta después de 1 segundo
       └─> attempts -= 1

4. VERIFICAR ESTADO
   ├─> SI matchedPairs >= 12:
   │   ├─> SI level >= 2: gameStatus = "completed" (GANASTE)
   │   └─> SI level = 1: gameStatus = "won" (SIGUIENTE NIVEL)
   │
   ├─> SI attempts <= 0: gameStatus = "lost" (PERDISTE)
   │
   └─> SI timeLeft <= 0: gameStatus = "lost" (PERDISTE)

5. SIGUIENTE NIVEL
   └─> generateCardsForLevel(2)
   └─> Usa propiedades DISTINTAS al nivel 1

6. REINICIAR
   └─> Vuelve al nivel 1 con nuevas cartas
```

## Estados del Juego

| Estado | Descripción |
|--------|-------------|
| `idle` | Juego no iniciado |
| `playing` | Juego en progreso |
| `paused` | Juego pausado |
| `won` | Nivel completado (pasa al siguiente) |
| `lost` | Sin intentos o tiempo agotado |
| `completed` | Juego completo (ambos niveles) |

## Funciones Principales (src/utils/cardUtils.ts)

```typescript
// Baraja un array (mezcla las cartas)
shuffleArray<T>(array: T[]): T[]

// Obtiene las propiedades disponibles para un nivel
getPropertiesForLevel(level: number): Property[]

// Guarda las propiedades del nivel 1 para no repetir en nivel 2
saveLevel1Properties(pairs: Property[]): void

// Crea una carta a partir de una propiedad
createCard(property: Property, id: number, isSingle: boolean): Card

// Genera las 24 cartas para un nivel
generateCardsForLevel(level: number): Card[]

// Verifica si dos cartas son iguales
areCardsMatching(card1: Card, card2: Card): boolean

// Voltea una carta
flipCard(cards: Card[], cardId: number): Card[]

// Desvuelve una carta (la voltea de vuelta)
unflipCard(cards: Card[], cardId: number): Card[]

// Marca dos cartas como encontradas
matchCards(cards: Card[], cardId1: number, cardId2: number): Card[]
```

---

## Buenas Prácticas de Desarrollo

### TypeScript
- ✅ Usar tipos explícitos para props y funciones
- ✅ Definir interfaces en `src/types/`
- ✅ Evitar `any`, usar `unknown` si es necesario

### React
- ✅ Componentes funcionales con arrow functions o function declaration
- ✅ Props tipadas con TypeScript
- ✅ Usar `useEffect` solo cuando sea necesario (efectos secundarios)
- ✅ Los componentes deben ser pequeños y reutilizables (< 30 líneas)

### Zustand (Gestión de Estado)
- ✅ Estado global en `src/store/useGameStore.ts`
- ✅ Tipar el estado con interfaces
- ✅ Usar actions para modificar el estado
- ✅ Lógica de negocio separada en `src/utils/`

### Tailwind CSS
- ✅ Clases utilitarias para estilos
- ✅ Diseño responsivo con breakpoints (`sm:`, `md:`, `lg:`)
- ✅ Evitar estilos inline, usar clases de Tailwind

### Estructura de Archivos
- ✅ Un componente por archivo
- ✅ Nombrar archivos en PascalCase (ej: `GameBoard.tsx`)
- ✅ Exports nombrados para tipos
- ✅ Imports relativos para archivos locales (`../../types`)
- ✅ Separar datos, constantes y utilidades

### Git
- ✅ Commits descriptivos
- ✅ No hacer commit de `node_modules/`
- ✅ No hacer commit de archivos sensibles (`.env`)

### Generales
- ✅ Código limpio y legible
- ✅ Evitar código comentado innecesario
- ✅ Mantener el código DRY (Don't Repeat Yourself)
- ✅ Verificar que el proyecto compile antes de hacer commit
