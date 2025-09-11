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
    name: "T shirt, Plus",
    description: "T-shirts estilosas no tamanho Plus Size. Conforto e caimento perfeito. Aproveite a promoção e leve 3 peças!",
    price: "3 por R$100,00",
    images: ["/i1i1.png", "/i1i2.png", "/i1i3.png", "/i1i4.png"],
    availableSizes: ["G1", "G2", "G3"],
  },
  {
    id: 2,
    name: "T shirt P ao G",
    description: "Kit essencial com 5 T-shirts básicas, disponíveis do P ao G. Qualidade e versatilidade para o seu guarda-roupa.",
    price: "Kit 5 unidades por R$100,00",
    images: ["/i2i1.png", "/i2i2.png", "/i2i3.png", "/i2i4.png"],
    availableSizes: ["P", "M", "G"],
  },
  {
    id: 3,
    name: "Kit 5 camisetas masculino",
    description: "Renove seu visual com nosso kit de 5 camisetas masculinas de alta qualidade. Diversas cores para combinar com tudo.",
    price: "Por R$100,00",
    images: ["/i3i1.png", "/i3i2.png", "/i3i3.png", "/i3i4.png"],
    availableSizes: ["P", "M", "G", "GG"],
  },
  {
    id: 4,
    name: "Vestidos tecido Dunna",
    description: "Sinta a leveza do tecido Dunna. Vestidos com caimento impecável, perfeitos para os dias quentes.",
    price: "R$59,90 cada",
    images: ["/i4i1.png", "/i4i2.png", "/i4i3.png", "/i4i4.png"],
    availableSizes: ["P", "M", "G"],
  },
  {
    id: 5,
    name: "Vestidos promo",
    description: "Vestidos lindos com preço imperdível! Tamanho único e estampas variadas para você arrasar.",
    price: "R$39,90",
    images: ["/i5i1.png", "/i5i2.png", "/i5i3.png", "/i5i4.png"],
    availableSizes: ["Único"],
  },
  {
    id: 6,
    name: "Conjunto de renda",
    description: "Lindo conjunto de lingerie em renda, combinando sensualidade e conforto. Disponível do P ao GG.",
    price: "R$39,90",
    images: ["/i6i1.png", "/i6i2.png", "/i6i3.png", "/i6i4.png"],
    availableSizes: ["P", "M", "G", "GG"],
  },
  {
    id: 7,
    name: "Camisetas infantis",
    description: "Alegria e diversão para os pequenos! Camisetas com estampas criativas, disponíveis nos tamanhos 4 a 12.",
    price: "R$29,90",
    images: ["/i7i1.png", "/i7i2.png", "/i7i3.png", "/i7i4.png"],
    availableSizes: ["4", "6", "8", "10", "12"],
  },
  {
    id: 8,
    name: "Camisetas infantis",
    description: "Camisetas confortáveis e estilosas para a garotada. Disponíveis nos tamanhos 3 a 10.",
    price: "R$29,90",
    images: ["/i8i1.png", "/i8i2.png", "/i8i3.png", "/i8i4.png"],
    availableSizes: ["3", "4", "6", "8", "10"],
  },
  {
    id: 9,
    name: "Chinelo nuvem",
    description: "Experimente a sensação de andar nas nuvens! Chinelo super macio e confortável. Disponível do 34 ao 39.",
    price: "R$69,90",
    images: ["/i9i1.png", "/i9i2.png", "/i9i3.png", "/i9i4.png"],
    availableSizes: ["34", "35", "36", "37", "38", "39"],
  },
  {
    id: 10,
    name: "Colônia Kaiak",
    description: "A fragrância clássica da Natura com um super desconto. Uma oportunidade única de adquirir seu perfume favorito.",
    price: "De R$179,90 Por R$139,00",
    images: ["/i10i1.png", "/i10i2.png", "/i10i3.png", "/i10i4.png"],
    availableSizes: ["100ml"],
  },
];
