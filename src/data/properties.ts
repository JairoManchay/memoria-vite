export interface Property {
  name: string;
  image?: string;
  icon?: string;
}

export const allProperties: Property[] = [
  { name: '3 Grupo Inmobiliario', image: './images/grupo-inmobiliario-3.png' },
  { name: 'APAG', image: './images/apag.png' },
  { name: 'Beeyond', image: './images/beeyond.png' },
  { name: 'Bengala', image: './images/bengala.png' },
  { name: 'Binda', image: './images/binda.png' },
  { name: 'Cygnus', image: './images/cygnus.png' },
  { name: 'DKasa', image: './images/dkasa.png' },
  { name: 'Evergran', image: './images/evergran.png' },
  { name: 'Eco Habitat', image: './images/eco-habitat.png' },
  { name: 'Granadero', image: './images/granadero.png' },
  { name: 'Grupo MG', image: './images/grupo-mg.png' },
  { name: 'Inizia', image: './images/inizia.png' },
  { name: 'Imagina', image: './images/imagina.png' },
  { name: 'La Venturosa', image: './images/la-venturosa.png' },
  { name: 'Lugano', image: './images/lugano.png' },
  { name: 'Lugarsa', image: './images/lugarsa.png' },
  { name: 'Multiurbe', image: './images/multiurbe.png' },
  { name: 'Madrid', image: './images/madrid.png' },
  { name: 'Mi Vivienda', image: './images/mi-vivienda.png' },
  { name: 'Oled', image: './images/oled.png' },
  { name: 'Prospera', image: './images/prospera.png' },
  { name: 'Royal', image: './images/royal.png' },
  { name: 'San Charbel', image: './images/san-charbel.png' },
  { name: 'TDI', image: './images/tdi.png' },
  { name: 'TER', image: './images/ter.png' },
  { name: 'Vitain', image: './images/vitain.png' },
  { name: 'Vivans', image: './images/vivans.png' },
];

// Carta extra del nivel 2 (logo de la feria)
export const feriaProperty: Property = { name: 'Feria', image: './images/feria.png' };
