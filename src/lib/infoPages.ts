import type { LocalizedText } from "@/types";

/**
 * Static info / legal pages rendered at /[locale]/info/[slug].
 *
 * Text in [square brackets] is a placeholder the shop owner must replace
 * with real data (requisites, delivery prices, measurements) before launch.
 * Grep for "[" in this file to find everything that still needs filling in.
 */

export interface InfoSection {
  h?: LocalizedText;
  body?: LocalizedText[];
  table?: { head: LocalizedText[]; rows: string[][] };
}

export interface InfoPage {
  slug: string;
  title: LocalizedText;
  sections: InfoSection[];
}

const t = (ru: string, kk: string, en: string): LocalizedText => ({ ru, kk, en });

export const infoPages: InfoPage[] = [
  {
    slug: "delivery",
    title: t("Доставка и оплата", "Жеткізу және төлем", "Delivery & Payment"),
    sections: [
      {
        h: t("Оплата", "Төлем", "Payment"),
        body: [
          t(
            "Заказ оплачивается онлайн банковской картой Visa или Mastercard через платёжный сервис Robokassa. После нажатия «Перейти к оплате» вы попадаете на защищённую страницу Robokassa; данные карты видит только платёжный сервис, мы их не получаем и не храним.",
            "Тапсырыс Robokassa төлем сервисі арқылы Visa немесе Mastercard банк картасымен онлайн төленеді. «Төлемге өту» батырмасын басқаннан кейін сіз Robokassa қорғалған бетіне өтесіз; карта деректерін тек төлем сервисі көреді, біз оларды алмаймыз және сақтамаймыз.",
            "Orders are paid online with a Visa or Mastercard bank card via the Robokassa payment service. After clicking “Proceed to payment” you are taken to Robokassa's secure page; card details are seen only by the payment service and never reach or get stored by us."
          ),
          t(
            "Все цены на сайте указаны в тенге (KZT). Чек приходит на email, указанный при оформлении заказа.",
            "Сайттағы барлық бағалар теңгемен (KZT) көрсетілген. Чек тапсырыс кезінде көрсетілген email-ге келеді.",
            "All prices on the site are in tenge (KZT). The receipt is sent to the email you provide at checkout."
          ),
        ],
      },
      {
        h: t("Доставка по Алматы", "Алматы бойынша жеткізу", "Delivery in Almaty"),
        body: [
          t(
            "По Алматы доставляем курьером день в день: заказ, оплаченный сегодня, привозим до 22:00. Стоимость по тарифу курьерской службы, сообщим при подтверждении заказа.",
            "Алматы бойынша курьермен сол күні жеткіземіз: бүгін төленген тапсырысты 22:00-ге дейін алып барамыз. Құны курьерлік қызмет тарифі бойынша, тапсырысты растаған кезде хабарлаймыз.",
            "In Almaty we deliver by courier the same day: an order paid today arrives by 22:00. The cost follows the courier service tariff and is confirmed with your order."
          ),
        ],
      },
      {
        h: t(
          "Доставка по Казахстану",
          "Қазақстан бойынша жеткізу",
          "Delivery across Kazakhstan"
        ),
        body: [
          t(
            "По остальному Казахстану отправляем Казпочтой до отделения, почтомата или адреса. Сроки Казпочты: между городами 3-6 рабочих дней наземной доставкой, авиадоставка от 1 дня; в отдалённые населённые пункты дольше. После отправки пришлём трек-номер для отслеживания на post.kz.",
            "Қазақстанның басқа өңірлеріне Қазпошта арқылы бөлімшеге, почтоматқа немесе мекенжайға жібереміз. Қазпошта мерзімдері: қалалар арасында жердегі жеткізумен 3-6 жұмыс күні, әуе жеткізуі 1 күннен басталады; шалғай елді мекендерге ұзағырақ. Жібергеннен кейін post.kz сайтында қадағалау үшін трек-нөмір жібереміз.",
            "To the rest of Kazakhstan we ship via Kazpost to a post office, parcel locker or address. Kazpost timing: 3-6 business days between cities by ground, air delivery from 1 day; remote settlements take longer. After dispatch we send a tracking number for post.kz."
          ),
          t(
            "Стоимость доставки — по тарифам Казпочты: зависит от веса посылки, города и способа получения. Ориентировочную сумму можно посчитать в калькуляторе на post.kz, точную сообщим при подтверждении заказа.",
            "Жеткізу құны — Қазпошта тарифтері бойынша: сәлемдеменің салмағына, қалаға және алу тәсіліне байланысты. Болжалды соманы post.kz сайтындағы калькулятормен есептеуге болады, нақтысын тапсырысты растаған кезде хабарлаймыз.",
            "Delivery cost follows Kazpost tariffs: it depends on parcel weight, city and pickup method. You can estimate it with the calculator on post.kz; we confirm the exact amount with your order."
          ),
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: t("Возврат и обмен", "Қайтару және айырбастау", "Returns & Exchange"),
    sections: [
      {
        h: t("Обмен и возврат", "Айырбастау және қайтару", "Exchange & return"),
        body: [
          t(
            "Если вещь не подошла по размеру, фасону или расцветке, вы можете обменять или вернуть её в течение 14 дней с момента получения (ст. 14 и 25 Закона РК «О защите прав потребителей»). Вещь должна быть не ношена, без следов стирки, с сохранённым товарным видом и ярлыками.",
            "Зат өлшемі, пішіні немесе түсі бойынша сай келмесе, оны алған күннен бастап 14 күн ішінде айырбастауға немесе қайтаруға болады (ҚР «Тұтынушылардың құқықтарын қорғау туралы» Заңының 14 және 25-баптары). Зат киілмеген, жуылмаған, тауарлық түрі мен жапсырмалары сақталған болуы керек.",
            "If the size, cut or color did not suit you, you can exchange or return the item within 14 days of receiving it (articles 14 and 25 of the Consumer Rights Protection Law of Kazakhstan). The item must be unworn, unwashed, with its original condition and tags intact."
          ),
          t(
            "Как оформить: напишите на hello@kepterwear.kz с номером заказа и причиной возврата. Мы ответим с инструкцией по отправке. Обратная пересылка при возврате товара надлежащего качества оплачивается покупателем; по Алматы вещь может забрать наш курьер.",
            "Рәсімдеу тәртібі: hello@kepterwear.kz поштасына тапсырыс нөмірі мен қайтару себебін жазыңыз. Біз жіберу нұсқаулығымен жауап береміз. Сапалы тауарды қайтарғанда кері жіберуді сатып алушы төлейді; Алматы бойынша затты біздің курьер алып кете алады.",
            "How it works: email hello@kepterwear.kz with your order number and the reason. We reply with shipping instructions. For returns of items of proper quality, return shipping is paid by the buyer; in Almaty our courier can pick the item up."
          ),
          t(
            "Деньги возвращаются на карту, с которой был оплачен заказ, в течение 3 рабочих дней после того, как мы получим и проверим вещь.",
            "Ақша затты алып, тексергеннен кейін 3 жұмыс күні ішінде тапсырыс төленген картаға қайтарылады.",
            "Refunds go back to the card used for payment within 3 business days after we receive and check the item."
          ),
        ],
      },
      {
        h: t("Брак", "Ақау", "Defects"),
        body: [
          t(
            "Если пришла вещь с браком или не тот товар, напишите нам с фото в течение 14 дней. Обмен или полный возврат, включая стоимость пересылки в обе стороны, за наш счёт.",
            "Ақаулы немесе басқа тауар келсе, 14 күн ішінде фотосымен бізге жазыңыз. Айырбастау немесе толық қайтару, екі бағыттағы жіберу құнын қоса, біздің есебімізден.",
            "If the item arrived defective or wrong, email us with photos within 14 days. Exchange or full refund, including shipping both ways, is on us."
          ),
        ],
      },
    ],
  },
  {
    slug: "sizes",
    title: t("Размеры и уход", "Өлшемдер және күтім", "Sizing & Care"),
    sections: [
      {
        h: t("Таблица размеров", "Өлшемдер кестесі", "Size chart"),
        body: [
          t(
            "Все футболки — оверсайз. Если хотите более свободную посадку, берите на размер больше. Замеры в сантиметрах: [проверьте и замените на реальные замеры].",
            "Барлық футболкалар — оверсайз. Еркіндеу отыруын қаласаңыз, бір өлшем үлкенін алыңыз. Өлшемдер сантиметрмен: [нақты өлшемдермен ауыстырыңыз].",
            "All tees are oversized. Size up if you prefer an even looser fit. Measurements in centimeters: [verify and replace with real measurements]."
          ),
        ],
        table: {
          head: [
            t("Размер", "Өлшем", "Size"),
            t("Ширина груди", "Кеуде ені", "Chest width"),
            t("Длина", "Ұзындығы", "Length"),
            t("Рукав", "Жеңі", "Sleeve"),
          ],
          rows: [
            ["S", "[58]", "[70]", "[22]"],
            ["M", "[60]", "[72]", "[23]"],
            ["L", "[62]", "[74]", "[24]"],
            ["XL", "[64]", "[76]", "[25]"],
            ["XXL", "[66]", "[78]", "[26]"],
          ],
        },
      },
      {
        h: t("Уход", "Күтім", "Care"),
        body: [
          t(
            "Стирайте наизнанку при 30°C, отдельно от контрастных цветов. Не используйте отбеливатель и сушильную машину. Не гладьте по принту.",
            "30°C температурада ішін сыртына аударып, контраст түстерден бөлек жуыңыз. Ағартқыш пен кептіргіш машинаны қолданбаңыз. Принт үстінен үтіктемеңіз.",
            "Wash inside out at 30°C, separately from contrasting colors. No bleach, no tumble drying. Do not iron directly on the print."
          ),
        ],
      },
    ],
  },
  {
    slug: "about",
    title: t("О бренде", "Бренд туралы", "About"),
    sections: [
      {
        body: [
          t(
            "Kepter — стритвир-бренд из Алматы. Оверсайз футболки из плотного хлопка с принтами, в которых городская культура встречается с локальными кодами: баурсаки, кесе, скейт и граффити.",
            "Kepter — Алматыдан шыққан стритвир бренді. Қала мәдениеті жергілікті кодтармен тоғысатын принттері бар тығыз мақтадан жасалған оверсайз футболкалар: баурсақ, кесе, скейт және граффити.",
            "Kepter is a streetwear brand from Almaty. Heavyweight oversized cotton tees with prints where city culture meets local codes: bauyrsaqs, kese bowls, skateboarding and graffiti."
          ),
          t(
            "Следите за дропами в Instagram: @kepter_wear.",
            "Дроптарды Instagram-да қадағалаңыз: @kepter_wear.",
            "Follow the drops on Instagram: @kepter_wear."
          ),
        ],
      },
    ],
  },
  {
    slug: "offer",
    title: t("Публичная оферта", "Жария оферта", "Public Offer"),
    sections: [
      {
        h: t("1. Общие положения", "1. Жалпы ережелер", "1. General"),
        body: [
          t(
            "Настоящий документ является публичной офертой [ИП / ТОО «наименование»], БИН/ИИН [номер], далее «Продавец», и определяет условия продажи товаров через сайт [адрес сайта], далее «Магазин».",
            "Осы құжат [ЖК / «атауы» ЖШС], БСН/ЖСН [нөмірі], бұдан әрі «Сатушы», жария офертасы болып табылады және [сайт мекенжайы] сайты, бұдан әрі «Дүкен», арқылы тауар сатудың шарттарын айқындайды.",
            "This document is a public offer by [IE / LLP “name”], BIN/IIN [number], hereinafter the “Seller”, and sets the terms of selling goods via [site address], hereinafter the “Store”."
          ),
          t(
            "Оформление заказа в Магазине означает полное согласие покупателя с условиями настоящей оферты.",
            "Дүкенде тапсырыс рәсімдеу сатып алушының осы оферта шарттарымен толық келісуін білдіреді.",
            "Placing an order in the Store constitutes the buyer's full acceptance of this offer."
          ),
        ],
      },
      {
        h: t("2. Заказ и оплата", "2. Тапсырыс және төлем", "2. Order & payment"),
        body: [
          t(
            "Покупатель выбирает товары в каталоге, указывает размер и количество, заполняет форму с контактными данными и адресом и оплачивает заказ банковской картой через сервис Robokassa. Цены указаны в тенге. Договор считается заключённым с момента подтверждения оплаты.",
            "Сатып алушы каталогтан тауарларды таңдап, өлшемі мен санын көрсетеді, байланыс деректері мен мекенжайы бар форманы толтырады және тапсырысты Robokassa сервисі арқылы банк картасымен төлейді. Бағалар теңгемен көрсетілген. Шарт төлем расталған сәттен бастап жасалды деп есептеледі.",
            "The buyer selects goods in the catalog, chooses size and quantity, fills in the contact and address form, and pays by bank card via Robokassa. Prices are in tenge. The contract is concluded once the payment is confirmed."
          ),
        ],
      },
      {
        h: t("3. Доставка", "3. Жеткізу", "3. Delivery"),
        body: [
          t(
            "Доставка осуществляется по Казахстану способами и в сроки, указанные на странице «Доставка и оплата». Право собственности на товар переходит к покупателю в момент передачи товара.",
            "Жеткізу Қазақстан бойынша «Жеткізу және төлем» бетінде көрсетілген тәсілдермен және мерзімдерде жүзеге асырылады. Тауарға меншік құқығы тауар табысталған сәтте сатып алушыға өтеді.",
            "Delivery is made across Kazakhstan by the methods and within the timing listed on the “Delivery & Payment” page. Ownership passes to the buyer upon handover of the goods."
          ),
        ],
      },
      {
        h: t("4. Возврат", "4. Қайтару", "4. Returns"),
        body: [
          t(
            "Возврат и обмен товара осуществляются в соответствии с Законом РК «О защите прав потребителей» и условиями страницы «Возврат и обмен».",
            "Тауарды қайтару және айырбастау ҚР «Тұтынушылардың құқықтарын қорғау туралы» Заңына және «Қайтару және айырбастау» бетінің шарттарына сәйкес жүзеге асырылады.",
            "Returns and exchanges follow the Consumer Rights Protection Law of the Republic of Kazakhstan and the terms on the “Returns & Exchange” page."
          ),
        ],
      },
      {
        h: t("5. Реквизиты продавца", "5. Сатушы деректемелері", "5. Seller details"),
        body: [
          t(
            "[ИП / ТОО «наименование»], БИН/ИИН [номер], адрес: [юридический адрес], телефон: [номер], email: hello@kepterwear.kz.",
            "[ЖК / «атауы» ЖШС], БСН/ЖСН [нөмірі], мекенжайы: [заңды мекенжай], телефон: [нөмірі], email: hello@kepterwear.kz.",
            "[IE / LLP “name”], BIN/IIN [number], address: [registered address], phone: [number], email: hello@kepterwear.kz."
          ),
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: t(
      "Политика конфиденциальности",
      "Құпиялылық саясаты",
      "Privacy Policy"
    ),
    sections: [
      {
        body: [
          t(
            "При оформлении заказа мы собираем: имя, телефон, email, город, адрес доставки и комментарий к заказу. Эти данные нужны только для обработки и доставки заказа.",
            "Тапсырыс рәсімдеу кезінде біз мыналарды жинаймыз: аты-жөні, телефон, email, қала, жеткізу мекенжайы және тапсырысқа түсініктеме. Бұл деректер тек тапсырысты өңдеу мен жеткізу үшін қажет.",
            "At checkout we collect: name, phone, email, city, delivery address and an order comment. This data is used solely to process and deliver your order."
          ),
          t(
            "Данные хранятся на защищённых серверах и не передаются третьим лицам, за исключением платёжного сервиса Robokassa (обработка платежа) и службы доставки (доставка заказа). Данные банковской карты мы не получаем и не храним.",
            "Деректер қорғалған серверлерде сақталады және Robokassa төлем сервисі (төлемді өңдеу) мен жеткізу қызметінен (тапсырысты жеткізу) басқа үшінші тұлғаларға берілмейді. Банк картасының деректерін біз алмаймыз және сақтамаймыз.",
            "Data is stored on secure servers and is not shared with third parties except the Robokassa payment service (payment processing) and the delivery service (order delivery). We never receive or store bank card details."
          ),
          t(
            "Корзина хранится локально в вашем браузере. Для запроса на удаление ваших данных напишите на hello@kepterwear.kz.",
            "Себет сіздің браузеріңізде жергілікті сақталады. Деректеріңізді жою сұрауы үшін hello@kepterwear.kz поштасына жазыңыз.",
            "Your cart is stored locally in your browser. To request deletion of your data, email hello@kepterwear.kz."
          ),
        ],
      },
    ],
  },
];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((p) => p.slug === slug);
}
