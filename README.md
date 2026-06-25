# Memoria - Juego de Memoria Inmobiliaria

## ¿De qué trata el juego?

Es un juego de memoria (encontrar pares de cartas iguales) pensado para una expoferia inmobiliaria. El jugador voltea cartas de un tablero de 24 para encontrar parejas de logos de inmobiliarias dentro de un tiempo y un número de intentos limitados. Tiene dos niveles: al completar los pares del nivel 1 se avanza al nivel 2 con un set de propiedades distinto, y al completar ambos niveles se gana el juego. Incluye modal de victoria (con opción de pasar de nivel) y modal de derrota (con opción de reiniciar).

## Tecnologías que se usaron

- **React 19** + **TypeScript** — UI y lógica de componentes
- **Vite 6** — bundler y dev server
- **Tailwind CSS v4** — estilos
- **Zustand** — gestión del estado global del juego
- **Electron** + **electron-builder** — empaquetado de la app como ejecutable de escritorio (`.exe`)
- **ESLint** (`typescript-eslint`, `eslint-plugin-react-hooks`) — linting

## Cómo levantar el proyecto

```bash
npm install
npm run dev
```

El proyecto se abrirá en: http://localhost:5173

Para previsualizar el build de producción en el navegador (sin Electron):

```bash
npm run build
npm run preview
```

## Cómo generar el .exe

1. Compilar el proyecto web:
   ```bash
   npm run build
   ```
2. Empaquetar la app de escritorio con Electron:
   ```bash
   npm run dist
   ```
3. El instalable queda en `dist-electron/Memoria Game <versión>.exe` (build portable para Windows x64). Ese es el archivo que se entrega.

> `npm run start` levanta la app de Electron en modo desarrollo (usa `main.js` directamente) sin generar el `.exe`, útil solo para probar el empaquetado de escritorio rápido.

## Nomenclatura para hacer commits

Mensajes en inglés, formato `<tipo>: <descripción breve>`:

- `feat: <qué funcionalidad nueva se agregó>` — nuevas funcionalidades del juego o la app.
- `chore: <qué se configuró o mantuvo>` — configuración, dependencias, assets, build, lint, etc. (sin agregar funcionalidad nueva).

Ramas: `feature/<nombre-corto-en-ingles>` (ej. `feature/new-images`).

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

## 3. Cambiar Dificultad del Juego

El archivo: `src/utils/cardUtils.ts`

En la función `generateCardsForLevel`, busca esta línea:

```typescript
const mezcla = 3; // 1 = fácil, 10 = difícil
```

**Para aumentar o disminuir la dificultad:**
- Cambia el número `3`
- **Más difícil**: aumenta el número (ej: 6, 8, 10)
- **Más fácil**: disminuye el número (ej: 1, 2)

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
