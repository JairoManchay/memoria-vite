# Memoria - Juego de Memoria Inmobiliaria

Juego de memoria desarrollado con React + Vite + TypeScript + Tailwind CSS.

## Características del Proyecto

- **Stack**: React 19 + Vite 6 + TypeScript + Tailwind CSS v4
- **Gestión de estado**: Zustand
- **Responsivo**: Diseño adaptativo para diferentes tamaños de pantalla
- **Dos niveles**: Nivel 1 y Nivel 2 con diferenciación visual
- **Sistema de juego**: 
  - 24 cards (12 pares)
  - 6 pares con imagen + 6 pares con icono
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

## Estructura del proyecto

```
src/
├── assets/images/    # Imágenes del proyecto
├── components/      # Componentes de React
│   ├── Card/
│   ├── Controls/
│   ├── GameBoard/
│   ├── Header/
│   ├── Modal/
│   ├── Timer/
│   └── AttemptsCounter/
├── store/           # Estado con Zustand
├── types/           # Tipos TypeScript
├── App.tsx          # Componente principal
├── main.tsx         # Punto de entrada
└── index.css        # Estilos globales
```

## Imágenes

Colocar las imágenes en la carpeta `public/images/`

## Reglas del juego

- Nivel 1: 12 pares (6 con imagen + 6 con icono)
- Nivel 2: Mismo contenido con filtro diferenciado
- Tiempo: 80 segundos
- Intentos: 30

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
- ✅ Los componentes deben ser pequeños y reutilizables

### Zustand (Gestión de Estado)
- ✅ Estado global en `src/store/useGameStore.ts`
- ✅ Tipar el estado con interfaces
- ✅ Usar actions para modificar el estado

### Tailwind CSS
- ✅ Clases utilitarias para estilos
- ✅ Diseño responsivo con breakpoints (`sm:`, `md:`, `lg:`)
- ✅ Evitar estilos inline, usar clases de Tailwind

### Estructura de Archivos
- ✅ Un componente por archivo
- ✅ Nombrar archivos en PascalCase (ej: `GameBoard.tsx`)
- ✅ Exports nombrados para tipos
- ✅ Imports relativos para archivos locales (`../../types`)

### Imágenes
- ✅ Imágenes en carpeta `public/` para acceso público
- ✅ Usar rutas relativas desde `public/`

### Git
- ✅ Commits descriptivos
- ✅ No hacer commit de `node_modules/`
- ✅ No hacer commit de archivos sensibles (`.env`)

### Generales
- ✅ Código limpio y legible
- ✅ Evitar código comentado innecesario
- ✅ Mantener el código DRY (Don't Repeat Yourself)
- ✅ Verificar que el proyecto compile antes de hacer commit
