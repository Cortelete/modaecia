export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
  availableSizes: string[];
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 1,
    name: "Vestido de Seda Floral",
    description: "Um elegante vestido de seda pura com estampa floral exclusiva, perfeito para ocasiões especiais. Toque suave e caimento impecável.",
    price: "R$ 499,90",
    images: ["/i1i1.png", "/i1i2.png", "/i1i3.png"],
    availableSizes: ["P", "M", "G"],
  },
  {
    id: 2,
    name: "Calça Alfaiataria Lux",
    description: "Calça de corte reto em tecido nobre, ideal para compor looks de trabalho sofisticados ou casuais chiques. Acompanha cinto de couro.",
    price: "R$ 389,90",
    images: ["/i2i1.png", "/i2i2.png", "/i2i3.png"],
    availableSizes: ["36", "38", "40", "42"],
  },
  {
    id: 3,
    name: "Blusa de Cetim 'Essence'",
    description: "Blusa de cetim com gola boba e mangas longas, uma peça versátil e atemporal que adiciona um toque de luxo a qualquer produção.",
    price: "R$ 279,90",
    images: ["/i3i1.png", "/i3i2.png", "/i3i3.png"],
    availableSizes: ["P", "M", "G", "GG"],
  },
  {
    id: 4,
    name: "Saia Midi Plissada",
    description: "Saia midi com plissado delicado e cós alto. Movimento fluido e elegante, perfeita com saltos ou tênis.",
    price: "R$ 329,90",
    images: ["/i4i1.png", "/i4i2.png", "/i4i3.png"],
    availableSizes: ["P", "M", "G"],
  },
  {
    id: 5,
    name: "Macacão 'Elegance'",
    description: "Macacão pantalona de alças finas, uma peça única que alonga a silhueta e garante um visual poderoso e sofisticado.",
    price: "R$ 549,90",
    images: ["/i5i1.png", "/i5i2.png", "/i5i3.png"],
    availableSizes: ["38", "40", "42"],
  },
  {
    id: 6,
    name: "T-shirt de Linho Bordada",
    description: "Uma t-shirt básica e chique, confeccionada em linho puro com bordados manuais discretos. Conforto e estilo no dia a dia.",
    price: "R$ 189,90",
    images: ["/i6i1.png", "/i6i2.png", "/i6i3.png"],
    availableSizes: ["P", "M", "G", "GG"],
  },
  {
    id: 7,
    name: "Blazer 'Power'",
    description: "Blazer estruturado com corte moderno e botões metálicos. Indispensável para um look de impacto.",
    price: "R$ 629,90",
    images: ["/i7i1.png", "/i7i2.png", "/i7i3.png"],
    availableSizes: ["P", "M", "G"],
  },
  {
    id: 8,
    name: "Camisa de Tricoline 'Classic'",
    description: "Camisa de tricoline 100% algodão, com modelagem perfeita que se ajusta ao corpo. Um clássico essencial no guarda-roupa.",
    price: "R$ 299,90",
    images: ["/i8i1.png", "/i8i2.png", "/i8i3.png"],
    availableSizes: ["PP", "P", "M", "G"],
  },
  {
    id: 9,
    name: "Short-saia de Couro Ecológico",
    description: "Peça moderna e versátil, com o conforto do short e a elegância da saia. Perfeito para looks noturnos.",
    price: "R$ 259,90",
    images: ["/i9i1.png", "/i9i2.png", "/i9i3.png"],
    availableSizes: ["36", "38", "40"],
  },
  {
    id: 10,
    name: "Cardigan de Cashmere",
    description: "Cardigan longo em cashmere, extremamente macio e aconchegante. Uma terceira peça luxuosa para os dias mais frios.",
    price: "R$ 799,90",
    images: ["/i10i1.png", "/i10i2.png", "/i10i3.png"],
    availableSizes: ["Único"],
  },
];