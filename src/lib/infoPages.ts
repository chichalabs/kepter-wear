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
        h: t("Доставка", "Жеткізу", "Delivery"),
        body: [
          t(
            "Доставляем по всему Казахстану. Способы и сроки: [способ доставки, например Казпочта / курьерская служба], [срок, например 2-7 рабочих дней].",
            "Қазақстан бойынша жеткіземіз. Тәсілдері мен мерзімдері: [жеткізу тәсілі, мысалы Қазпошта / курьерлік қызмет], [мерзімі, мысалы 2-7 жұмыс күні].",
            "We deliver across Kazakhstan. Methods and timing: [delivery method, e.g. Kazpost / courier service], [timing, e.g. 2-7 business days]."
          ),
          t(
            "Стоимость доставки: [сумма или «бесплатно от N тенге»]. Точную стоимость и срок подтвердим после оформления заказа.",
            "Жеткізу құны: [сома немесе «N теңгеден бастап тегін»]. Нақты құны мен мерзімін тапсырыс рәсімделгеннен кейін растаймыз.",
            "Delivery cost: [amount or “free over N tenge”]. We confirm the exact cost and timing after the order is placed."
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
        body: [
          t(
            "Вы можете обменять или вернуть товар надлежащего качества в течение 14 дней с момента получения, если вещь не носилась, сохранены её товарный вид и ярлыки.",
            "Тауар киілмеген, тауарлық түрі мен жапсырмалары сақталған болса, сапалы тауарды алған күннен бастап 14 күн ішінде айырбастауға немесе қайтаруға болады.",
            "You can exchange or return an item of proper quality within 14 days of receiving it, provided it is unworn and keeps its original condition and tags."
          ),
          t(
            "Чтобы оформить возврат, напишите на hello@kepterwear.kz, укажите номер заказа и причину. Мы ответим с инструкцией по отправке.",
            "Қайтаруды рәсімдеу үшін hello@kepterwear.kz поштасына тапсырыс нөмірі мен себебін көрсетіп жазыңыз. Біз жіберу нұсқаулығымен жауап береміз.",
            "To arrange a return, email hello@kepterwear.kz with your order number and reason. We will reply with shipping instructions."
          ),
          t(
            "Деньги возвращаются на карту, с которой был оплачен заказ, в течение [N] рабочих дней после того, как мы получим товар. Расходы на обратную пересылку: [за счёт покупателя / за наш счёт].",
            "Ақша тауар бізге жеткеннен кейін [N] жұмыс күні ішінде тапсырыс төленген картаға қайтарылады. Кері жіберу шығындары: [сатып алушы есебінен / біздің есебімізден].",
            "Refunds go back to the card used for payment within [N] business days after we receive the item. Return shipping costs: [paid by the buyer / covered by us]."
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
