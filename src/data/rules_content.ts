export interface RuleContent {
    id: number;
    content: string;
}

export const RULES_CONTENT: RuleContent[] = [
    {
        id: 1,
        content: `Ushbu qoidalar O'zbekiston Respublikasi hududida yo'l harakatining yagona tartibini belgilaydi.
        
Asosiy tushunchalar:
- Yo'l: transport vositalari va piyodalar harakatlanishi uchun mo'ljallangan yer uchastkasi.
- Haydovchi: transport vositasini boshqarib borayotgan shaxs.
- Piyoda: yo'lda transport vositasidan tashqarida bo'lgan va ish bilan band bo'lmagan shaxs.
- Transport vositasi: odamlarni, yuklarni tashishga yoki maxsus ishlarni bajarishga mo'ljallangan qurilma.
- Chorraha: yo'llarning bir sathda kesishadigan, tutashadigan yoki ayriladigan joyi.
- Asosiy yo'l: tuproqli yo'lga nisbatan qattiq qoplamali (asfalt, beton va h.k.) yo'l yoki kesishayotgan yo'lga nisbatan asosiy yo'l belgisi o'rnatilgan yo'l.
- Yo'l berish: transport vositasi haydovchisi imtiyozga ega bo'lgan boshqa harakat qatnashchilarining harakat yo'nalishi yoki tezligini o'zgartirishga majbur etmasligi.
- To'xtash: transport vositasining harakatini 10 daqiqagacha bo'lgan muddatga to'xtatish (odam tushirish/chiqarish, yuk ortish/tushirish).
- To'xtab turish: transport vositasining harakatini 10 daqiqadan ko'proq muddatga to'xtatish.`
    },
    {
        id: 2,
        content: `Haydovchi quyidagilarga majbur:
        
1. Yonida haydovchilik guvohnomasi, ro'yxatdan o'tganlik guvohnomasi (texpasport), sug'urta polisi (agar talab etilsa) va boshqa kerakli hujjatlarni olib yurishi.
2. Transport vositasining texnik sozligini tekshirishi (ayniqsa tormoz, rul, chiroqlar, shinalar).
3. Yo'l harakati xavfsizligi xizmati xodimi talabiga binoan to'xtashi va hujjatlarni tekshirish uchun taqdim etishi.
4. Spirtli ichimlik, giyohvand moddalar ta'sirida yoki charchoq holatida transport vositasini boshqarmasligi.
5. Xavfsizlik kamarini taqishi va yo'lovchilarni ham taqtirishi.
6. Harakatlanish vaqtida telefondan foydalanmasligi (qo'lni band qiladigan holatda).`
    },
    {
        id: 3,
        content: `Piyodalar majburiyatlari:
        
- Piyodalar trotuarlardan, piyodalar yo'lkasidan, ular bo'lmaganda esa yo'l yoqasidan yurishlari kerak.
- Yo'lning qatnov qismini piyodalar o'tish joylaridan, ular bo'lmaganda esa chorrahalarda trotuar yoki yo'l yoqasi chizig'i bo'ylab kesib o'tishlari kerak.
- Tartibga solinmagan o'tish joylarida yaqinlashib kelayotgan transport vositalarigacha bo'lgan masofani chamalab, o'tish xavfsizligiga ishonch hosil qilgandan keyingina yo'lga chiqishlari mumkin.
- Sutkaning qorong'i vaqtida yo'lning qatnov qismida harakatlanayotganda nur qaytaruvchi elementlari bo'lgan kiyimlarda bo'lish tavsiya etiladi.`
    },
    {
        id: 4,
        content: `Yo'lovchilar majburiyatlari:
        
- Transport vositasiga faqat u to'liq to'xtagandan so'ng, trotuar yoki yo'l yoqasi tomonidan chiqish va tushish.
- Harakatlanish vaqtida haydovchini chalg'itmaslik.
- Xavfsizlik kamarlarini taqib olish (agar transport vositasi ular bilan jihozlangan bo'lsa).
- Moto shlem kiyish (mototsikl va mopedlarda).`
    },
    {
        id: 5,
        content: `Svetofor ishoralari:
        
- Yashil: harakatlanishga ruxsat beradi.
- Yashil miltillovchi: ruxsat muddati tugayotganini bildiradi.
- Sariq: harakatlanishni taqiqlaydi (to'xtash chizig'idan o'tib ketganlar bundan mustasno) va ishoralar almashishidan ogohlantiradi.
- Qizil: harakatlanishni taqiqlaydi.
- Qizil va sariq birgalikda: harakatlanish taqiqlanadi va tez orada yashil yonishini bildiradi.

Tartibga soluvchining ishoralari svetofor ishoralaridan va yo'l belgilaridan ustunlik qiladi.`
    },
    {
        id: 6,
        content: `Maxsus signal (ko'k yoki ko'k-qizil yaltiroq chiroq va maxsus tovush) yoqilgan transport vositalari yo'l harakati qoidalarining ayrim talablaridan chetga chiqishlari mumkin.
        
Boshqa haydovchilar bunday transport vositalariga yo'l berishlari shart (to'siqsiz o'tib ketishini ta'minlash uchun bo'sh joy qoldirish yoki to'xtash).`
    },
    {
        id: 7,
        content: `Favqulodda to'xtash belgisi (qizil uchburchak) quyidagi hollarda o'rnatilishi shart:
        
- Yo'l-transport hodisasi ro'y berganda.
- To'xtash taqiqlangan joyda majburiy to'xtaganda.
- Aholini punktlarida transport vositasidan kamida 15 metr, aholi punktlaridan tashqarida esa kamida 30 metr masofada o'rnatiladi.`
    },
    {
        id: 8,
        content: `Manyovr qilish (burilish, qayrilib olish, qatorni o'zgartirish):
        
- Manyovr boshlashdan oldin haydovchi tegishli tomonga burilish chirog'ini yoqishi kerak.
- Manyovr xavfsiz ekanligiga va boshqalarga xalaqit bermasligiga ishonch hosil qilish kerak.
- Qatorni o'zgartirganda, o'zgarayotgan qatordagi transportga yo'l berish kerak.`
    },
    {
        id: 9,
        content: `Yo'lning qatnov qismida joylashish:
        
- O'ng tomonda harakatlanish tartibi amal qiladi.
- Aholi punktlaridan tashqarida imkon qadar o'ng chetki qatorda harakatlanish kerak.
- Tramvay izlari bo'lgan yo'llarda, agar belgilar taqiqlamasa, chapga burilish yoki qayrilib olish uchun tramvay izlariga chiqish mumkin (agar bu tramvayga xalaqit bermasa).`
    },
    {
        id: 10,
        content: `Harakat tezligi:
        
- Aholi punktlarida: 60 km/soatdan oshmasligi kerak (ba'zi joylarda 70 edi, yangi qoidalarga ko'ra ko'p joylarda 60). Maktablar oldida 30 km/soatgacha pasaytirilishi mumkin.
- Aholi punktlaridan tashqarida:
  - Yengil avtomobillar uchun: 100 km/soatgacha.
  - Avtomagistrallarda: 110 km/soatgacha.
- Turar-joy zonalarida: 20 km/soatdan oshmasligi kerak.`
    },
    {
        id: 11,
        content: `Quvib o'tish:
        
- Quvib o'tish faqat chap tomondan amalga oshiriladi.
- Quvib o'tishni boshlashdan oldin qarama-qarshi yo'l bo'sh ekanligiga ishonch hosil qilish kerak.
- Chorrahalarda (asosiy yo'ldan tashqari), temir yo'l kesishmalarida, piyodalar o'tish joylarida, tunnellarda quvib o'tish taqiqlanadi.`
    },
    {
        id: 12,
        content: `To'xtash va to'xtab turish:
        
- Yo'lning o'ng tomonida, yo'l yoqasida to'xtashga ruxsat etiladi.
- Trottuarlarda to'xtash taqiqlanadi (agar maxsus belgi bo'lmasa).
- Temir yo'l kesishmalarida, tunnellarda, ko'priklarda va ularning ostida to'xtash taqiqlanadi.
- Piyodalar o'tish joyiga 5 metrdan kam masofa qolganda to'xtash taqiqlanadi.`
    },
    {
        id: 13,
        content: `Chorrahalardan o'tish:
        
- Tartibga solinmagan chorrahalarda o'ng qo'l qoidasi amal qiladi (o'ng tomondan kelayotgan transportga yo'l berish).
- Asosiy yo'ldagi haydovchi ikkinchi darajali yo'ldagiga nisbatan imtiyozga ega.
- Chapga burilayotganda qarama-qarshi yo'nalishdan to'g'riga yoki o'ngga harakatlanayotgan transportga yo'l berish kerak.`
    },
    {
        id: 14,
        content: `Piyodalar o'tish joylari:
        
- Tartibga solinmagan piyodalar o'tish joyiga yaqinlashganda, haydovchi tezlikni pasaytirishi va piyodalarni o'tkazib yuborishi shart.
- Agar oldindagi transport vositasi piyodalar o'tish joyi oldida to'xtagan bo'lsa, boshqa haydovchilar ham to'xtashi kerak.`
    },
    {
        id: 15,
        content: `Temir yo'l kesishmalari:
        
- Poyezd (lokomotiv) yaqinlashayotganda kesishmaga chiqish taqiqlanadi.
- Shlagbaum yopiq yoki yopilayotgan holatda, svetoforning qizil chirog'i yonganda kesishmaga kirish taqiqlanadi.
- Kesishma oldida to'xtaganda, eng yaqin relsdan kamida 10 metr masofada to'xtash kerak.`
    },
    {
        id: 16,
        content: `Avtomagistrallar (5.1 belgisi bilan belgilangan):
        
- Piyodalar, velosipedlar, mopedlar, traktorlar va tezligi 40 km/soatdan kam bo'lgan transport vositalari harakati taqiqlanadi.
- Orqaga yurish taqiqlanadi.
- O'quv mashqlari o'tkazish taqiqlanadi.`
    },
    {
        id: 17,
        content: `Turar-joy dahalari (5.38 belgisi):
        
- Piyodalar trotuarda ham, qatnov qismida ham yurish huquqiga ega.
- Maksimal tezlik 20 km/soat.
- Turar-joy dahasidan chiqayotganda barcha boshqa harakat qatnashchilariga yo'l berish kerak.`
    },
    {
        id: 18,
        content: `Yo'nalishli transport vositalari:
        
- Aholi punktlarida bekatdan chiqayotgan avtobus yoki trolleybusga boshqa haydovchilar yo'l berishi kerak.
- Avtobuslar uchun maxsus ajratilgan yo'lakda boshqa transport vositalari harakatlanishi taqiqlanadi.`
    },
    {
        id: 19,
        content: `Tashqi yoritish asboblaidan foydalanish:
        
- Sutkaning qorong'i vaqtida va ko'rish yetarli bo'lmagan sharoitda uzoqni yoki yaqinni yorituvchi chiroqlar yoqilishi shart.
- Aholi punktlarida yo'l yoritilgan bo'lsa, faqat yaqinni yorituvchi chiroqlar yoqiladi.
- Qarama-qarshi kelayotgan transportga 150 metrdan kam masofa qolganda uzoqni yorituvchi chiroq yaqinni yorituvchi chiroqqa o'tkazilishi kerak.`
    },
    {
        id: 20,
        content: `Shatakka olish (buxsir):
        
- Shatakka olish qattiq yoki egiluvchan ulagich yordamida, yoki qisman yuklash usuli bilan amalga oshiriladi.
- Egiluvchan ulagich uzunligi 4-6 metr, qattiq ulagich 4 metrdan oshmasligi kerak.
- Yaxmalak (sirpanchiq) yo'lda egiluvchan ulagichda shatakka olish taqiqlanadi.`
    },
    {
        id: 21,
        content: `O'quv mashqlari:
        
- Boshqarishni o'rgatish faqat maxsus jihozlangan avtomobillarda va instruktor bilan amalga oshirilishi kerak.
- O'rganuvchi 16 yoshga to'lgan bo'lishi kerak.`
    },
    {
        id: 22,
        content: `Odam tashish:
        
- Odamlar faqat transport vositasining o'rindiqlarida tashilishi kerak.
- Yuk avtomobili bortidan yuqorida, tirkamada (vagon-uychadan tashqari) odam tashish taqiqlanadi.
- Mototsiklning orqa o'rindig'ida bolalarni tashish uchun maxsus moslama bo'lishi kerak yoki 12 yoshga to'lmagan bolalarni tashish taqiqlanadi.`
    },
    {
        id: 23,
        content: `Yuk tashish:
        
- Yuk transport vositasining barqarorligini buzmasligi, haydovchining ko'rish maydonini to'sib qo'ymasligi, tashqi yoritish asboblarini va davlat raqamini yopib qo'ymasligi kerak.
- Yukning o'lchamlari transport vositasidan 1 metrdan ortiq chiqib tursa, u maxsus belgi bilan belgilanishi kerak.`
    },
    {
        id: 24,
        content: `Velosiped va mopedlar:
        
- Yo'lning o'ng chetidan bir qator bo'lib harakatlanishi kerak.
- Velosipedchilar piyodalar o'tish joyidan velosipeddan tushib, uni yetaklab o'tishlari shart.
- Rulni ushlamasdan boshqarish taqiqlanadi.`
    },
    {
        id: 25,
        content: `Traktor va o'zyurar mashinalar:
        
- Asfalt va sement-beton qoplamali yo'llarda gusenitsali traktorlar harakati taqiqlanadi (agar yo'lga zarar yetkazsa).`
    },
    {
        id: 26,
        content: `Uyushgan holda piyoda yurish:
        
- Faqat yo'lning o'ng tomonida, harakat yo'nalishi bo'yicha, kolonna bo'lib (to'rt kishidan ortiq bo'lmagan qatorlarda) yurishga ruxsat etiladi.`
    },
    {
        id: 27,
        content: `Transport vositalarini foydalanishga chiqarish:
        
- Transport vositasi texnik ko'rikdan o'tgan bo'lishi kerak.
- oynalarni tusi o'zgartirilgan (tonirovka) bo'lsa, ruxsatnoma bo'lishi kerak.`
    },
    {
        id: 28,
        content: `Taniqlik belgilari:
        
- '!' (Boshlovchi haydovchi) - staji 2 yildan kam bo'lgan haydovchilar uchun (sariq kvadrat, qora undov).
- 'Bolalar' - bolalarni tashiyotgan avtobuslarda.
- 'Shinalar tishli' (Shipi) - qishki shinalar o'rnatilganda.`
    },
    {
        id: 29,
        content: `Foydalanish taqiqlangan nosozliklar (Transport vositalaridan foydalanishni taqiqlovchi shartlar):
        
1. Tormoz tizimi:
   - Ishchi tormoz tizimi samarasiz bo'lsa.
   - Germetiklik buzilgan bo'lsa.

2. Rul boshqaruvi:
   - Rulning salt yurishi (lyuft) belgilangan me'yordan oshsa (yengil avtomobillar uchun 10 daraja).
   - Rul boshqaruvi detallari shikastlangan bo'lsa.

3. Tashqi yoritish asboblari:
   - Chiroqlar soni, turi, rangi, joylashuvi va ishlash rejimi transport vositasi konstruksiyasi talablariga mos kelmasa.
   - Faralar ifloslangan yoki noto'g'ri sozlangan bo'lsa.
   - Old tomonda qizil rangli yorug'lik qaytaruvchi moslama ishlatilsa.

4. Oyna tozalagichlar:
   - Ishlamasa.

5. G'ildiraklar va shinalar:
   - Shinalar protektori qoldiq balandligi me'yordan kam bo'lsa (yengil avtomobillar uchun 1.6 mm).
   - Shinalarda yoriqlar, shishlar bo'lsa.
   - Bitta o'qda har xil turdagi shinalar o'rnatilgan bo'lsa.

6. Dvigatel:
   - Ishlatilgan gazlardagi zararli moddalar miqdori me'yordan ortiq bo'lsa.
   - Yonilg'i tizimidan suyuqlik oqayotgan bo'lsa.

7. Boshqa elementlar:
   - Ovozli signal ishlamasa.
   - Oynalar (old oynada) haydovchining ko'rishiga xalaqit beradigan narsalar o'rnatilgan bo'lsa.
   - Xavfsizlik kamarlari nosoz yoki yo'q bo'lsa.`
    }
];
