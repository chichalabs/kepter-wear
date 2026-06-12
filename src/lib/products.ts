import type { Product } from "@/types";

/**
 * Static catalog. Single source of truth for prices: the server recomputes
 * order totals from this file and never trusts client-side amounts.
 *
 * To swap in real products: replace `images` paths (drop files into
 * /public/products) and edit names/prices here. Nothing else needs changing.
 */
export const products: Product[] = [
  {
    id: "kepter-classic",
    slug: "kepter-classic",
    name: {
      ru: "Кептер Классик",
      kk: "Кептер Классик",
      en: "Kepter Classic",
    },
    description: {
      ru: "Плотный хлопок, минималистичный силуэт голубя на груди. Та самая первая футболка бренда.",
      kk: "Тығыз мақта, кеудеде кептердің минималистік силуэті. Брендтің ең алғашқы футболкасы.",
      en: "Heavyweight cotton with a minimal pigeon mark on the chest. The shirt the brand started with.",
    },
    price: 9900,
    images: ["/products/kepter-classic-front.svg", "/products/kepter-classic-back.svg"],
    motif: {
      ru: "Кептер — голубь, символ мира и городской свободы",
      kk: "Кептер — бейбітшілік пен қала еркіндігінің символы",
      en: "Kepter is the pigeon, a symbol of peace and street freedom",
    },
  },
  {
    id: "qoshqar",
    slug: "qoshqar",
    name: { ru: "Қошқар", kk: "Қошқар", en: "Qoshqar" },
    description: {
      ru: "Орнамент қошқар мүйіз во всю спину, выполнен одной непрерывной линией.",
      kk: "Арқаны толық алып жатқан қошқар мүйіз өрнегі, бір үздіксіз сызықпен салынған.",
      en: "A full-back qoshqar-muiz ornament drawn in one continuous line.",
    },
    price: 11900,
    images: ["/products/qoshqar-front.svg", "/products/qoshqar-back.svg"],
    motif: {
      ru: "Қошқар мүйіз — «бараний рог», главный орнамент кочевников",
      kk: "Қошқар мүйіз — көшпенділердің басты өрнегі",
      en: "Qoshqar-muiz, the ram's horn, the central nomad ornament",
    },
  },
  {
    id: "tulpar",
    slug: "tulpar",
    name: { ru: "Тұлпар", kk: "Тұлпар", en: "Tulpar" },
    description: {
      ru: "Крылатый конь из эпоса в современной графике. Печать в две краски.",
      kk: "Эпостағы қанатты тұлпар заманауи графикада. Екі бояумен басылған.",
      en: "The winged horse of the epics in modern line art. Two-color print.",
    },
    price: 12900,
    images: ["/products/tulpar-front.svg", "/products/tulpar-back.svg"],
    motif: {
      ru: "Тұлпар — крылатый конь батыров",
      kk: "Тұлпар — батырлардың қанатты аты",
      en: "Tulpar, the winged horse of the batyrs",
    },
  },
  {
    id: "shanyraq",
    slug: "shanyraq",
    name: { ru: "Шаңырақ", kk: "Шаңырақ", en: "Shanyraq" },
    description: {
      ru: "Геометрия шанырака как круговая композиция на груди. Символ дома, который всегда с тобой.",
      kk: "Кеудедегі дөңгелек композиция түріндегі шаңырақ геометриясы. Әрқашан өзіңмен бірге жүретін шаңырақ.",
      en: "The shanyraq's geometry as a circular chest composition. Home you carry with you.",
    },
    price: 11900,
    images: ["/products/shanyraq-front.svg", "/products/shanyraq-back.svg"],
    motif: {
      ru: "Шаңырақ — купол юрты, символ семьи и очага",
      kk: "Шаңырақ — киіз үйдің күмбезі, отбасы мен ошақ символы",
      en: "Shanyraq, the yurt crown, symbol of family and hearth",
    },
  },
  {
    id: "kok-bori",
    slug: "kok-bori",
    name: { ru: "Көк Бөрі", kk: "Көк Бөрі", en: "Kok Bori" },
    description: {
      ru: "Небесный волк тюркских легенд. Крупная печать на спине, малый знак на груди.",
      kk: "Түркі аңыздарындағы көк бөрі. Арқада ірі басылым, кеудеде шағын белгі.",
      en: "The sky wolf of Turkic legend. Large back print, small chest mark.",
    },
    price: 12900,
    images: ["/products/kok-bori-front.svg", "/products/kok-bori-back.svg"],
    motif: {
      ru: "Көк бөрі — небесный волк, прародитель тюрков",
      kk: "Көк бөрі — түркілердің арғы атасы саналатын қасиетті бөрі",
      en: "Kok bori, the celestial wolf, forefather of the Turkic peoples",
    },
  },
  {
    id: "aruana",
    slug: "aruana",
    name: { ru: "Аруана", kk: "Аруана", en: "Aruana" },
    description: {
      ru: "Белая верблюдица в один штрих. Самая тихая и самая упрямая вещь в коллекции.",
      kk: "Бір штрихпен салынған ақ аруана. Топтамадағы ең қарапайым әрі ең өжет зат.",
      en: "The white camel in a single stroke. The quietest, most stubborn piece in the line.",
    },
    price: 10900,
    images: ["/products/aruana-front.svg", "/products/aruana-back.svg"],
    motif: {
      ru: "Аруана — белая верблюдица, знак выносливости",
      kk: "Аруана — төзімділіктің белгісі",
      en: "Aruana, the white she-camel, a mark of endurance",
    },
  },
  {
    id: "dala",
    slug: "dala",
    name: { ru: "Дала", kk: "Дала", en: "Dala" },
    description: {
      ru: "Горизонт степи одной линией через всю грудь. Для тех, кто вырос под этим небом.",
      kk: "Кеудені толық кесіп өтетін бір сызықты дала көкжиегі. Осы аспан астында өскендерге.",
      en: "The steppe horizon as one line across the chest. For those raised under this sky.",
    },
    price: 9900,
    images: ["/products/dala-front.svg", "/products/dala-back.svg"],
    motif: {
      ru: "Дала — Великая степь",
      kk: "Дала — Ұлы дала",
      en: "Dala, the Great Steppe",
    },
  },
  {
    id: "qus-joly",
    slug: "qus-joly",
    name: { ru: "Құс Жолы", kk: "Құс Жолы", en: "Qus Joly" },
    description: {
      ru: "Млечный путь как «птичья дорога» казахской космологии. Точечная печать по всей спине.",
      kk: "Қазақ космологиясындағы Құс жолы. Арқаны толық алып жатқан нүктелі басылым.",
      en: "The Milky Way as the bird road of Kazakh cosmology. Dotted print across the back.",
    },
    price: 13900,
    images: ["/products/qus-joly-front.svg", "/products/qus-joly-back.svg"],
    motif: {
      ru: "Құс жолы — «птичья дорога», Млечный путь",
      kk: "Құс жолы — аспандағы жұлдызды жол",
      en: "Qus joly, the bird road, the Milky Way",
    },
  },
  {
    id: "baiterek",
    slug: "baiterek",
    name: { ru: "Бәйтерек", kk: "Бәйтерек", en: "Baiterek" },
    description: {
      ru: "Древо мира из мифа о Самрук. Вертикальная композиция от подола до ворота.",
      kk: "Самұрық туралы аңыздағы әлем ағашы. Етектен жағаға дейінгі тік композиция.",
      en: "The world tree from the Samruk myth. A vertical composition from hem to collar.",
    },
    price: 13900,
    images: ["/products/baiterek-front.svg", "/products/baiterek-back.svg"],
    motif: {
      ru: "Бәйтерек — мировое древо, на вершине которого Самрук",
      kk: "Бәйтерек — басында Самұрық отыратын әлем ағашы",
      en: "Baiterek, the world tree where the Samruk bird nests",
    },
  },
  {
    id: "koshpendi",
    slug: "koshpendi",
    name: { ru: "Көшпенді", kk: "Көшпенді", en: "Koshpendi" },
    description: {
      ru: "Надпись «көшпенді» жирным гротеском и маршрут кочёвки картой на спине.",
      kk: "Қалың гротескпен жазылған «көшпенді» жазуы және арқада көш маршрутының картасы.",
      en: "The word koshpendi in heavy grotesque type, a migration route mapped on the back.",
    },
    price: 14900,
    images: ["/products/koshpendi-front.svg", "/products/koshpendi-back.svg"],
    motif: {
      ru: "Көшпенді — кочевник",
      kk: "Көшпенді — еркіндіктің екінші аты",
      en: "Koshpendi, the nomad",
    },
  },
];

export function getProduct(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
