export interface Sign {
    id: string;
    category: string;
    code: string;
    name_uz: string;
    name_key?: string;
    image_url: string;
}

// Helper to generate Wikimedia Commons URLs for original SVG signs (rendered as PNG)
const getSignUrl = (code: string) => `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Uzbekistan_road_sign_${code}.svg&width=300`;

// Markings might differ, trying generic standard markings
const getMarkingUrl = (code: string) => `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Road_marking_${code}.svg&width=300`;

export const SIGNS_DATA: Sign[] = [
    // --- Warning Signs (Ogohlantiruvchi) ---
    { id: '1.1', category: 'warning', code: '1.1', name_uz: "Shlagbaumli temir yo'l kesishmasi", image_url: getSignUrl('1.1') },
    { id: '1.2', category: 'warning', code: '1.2', name_uz: "Shlagbaumsiz temir yo'l kesishmasi", image_url: getSignUrl('1.2') },
    { id: '1.3.1', category: 'warning', code: '1.3.1', name_uz: "Bir izli temir yo'l", image_url: getSignUrl('1.3.1') },
    { id: '1.5', category: 'warning', code: '1.5', name_uz: "Teng ahamiyatli yo'llar kesishuvi", image_url: getSignUrl('1.5') },
    { id: '1.6', category: 'warning', code: '1.6', name_uz: "Aylanma harakatlanish chorrahasi", image_url: getSignUrl('1.6') },
    { id: '1.8', category: 'warning', code: '1.8', name_uz: "Svetofor bilan tartibga solish", image_url: getSignUrl('1.8') },
    { id: '1.20', category: 'warning', code: '1.20', name_uz: "Piyodalar o'tish joyi", image_url: getSignUrl('1.20') },
    { id: '1.23', category: 'warning', code: '1.23', name_uz: "Bolalar", image_url: getSignUrl('1.23') },

    // --- Priority Signs (Imtiyozli) ---
    { id: '2.1', category: 'priority', code: '2.1', name_uz: "Asosiy yo'l", image_url: getSignUrl('2.1') },
    { id: '2.2', category: 'priority', code: '2.2', name_uz: "Asosiy yo'lning oxiri", image_url: getSignUrl('2.2') },
    { id: '2.4', category: 'priority', code: '2.4', name_uz: "Yo'l bering", image_url: getSignUrl('2.4') },
    { id: '2.5', category: 'priority', code: '2.5', name_uz: "To'xtamasdan harakatlanish taqiqlangan", image_url: getSignUrl('2.5') },
    { id: '2.6', category: 'priority', code: '2.6', name_uz: "Qarama-qarshi harakatlanishning ustunligi", image_url: getSignUrl('2.6') },
    { id: '2.7', category: 'priority', code: '2.7', name_uz: "Qarama-qarshi harakatlanishga nisbatan imtiyoz", image_url: getSignUrl('2.7') },

    // --- Prohibiting Signs (Taqiqlovchi) ---
    { id: '3.1', category: 'prohibiting', code: '3.1', name_uz: "Kirish taqiqlangan", image_url: getSignUrl('3.1') },
    { id: '3.2', category: 'prohibiting', code: '3.2', name_uz: "Harakatlanish taqiqlangan", image_url: getSignUrl('3.2') },
    { id: '3.18.1', category: 'prohibiting', code: '3.18.1', name_uz: "O'ngga burilish taqiqlangan", image_url: getSignUrl('3.18.1') },
    { id: '3.18.2', category: 'prohibiting', code: '3.18.2', name_uz: "Chapga burilish taqiqlangan", image_url: getSignUrl('3.18.2') },
    { id: '3.20', category: 'prohibiting', code: '3.20', name_uz: "Quvib o'tish taqiqlangan", image_url: getSignUrl('3.20') },
    { id: '3.24', category: 'prohibiting', code: '3.24', name_uz: "Yuqori tezlik cheklangan", image_url: getSignUrl('3.24') },
    { id: '3.27', category: 'prohibiting', code: '3.27', name_uz: "To'xtash taqiqlangan", image_url: getSignUrl('3.27') },

    // --- Mandatory Signs (Buyuruvchi) ---
    { id: '4.1.1', category: 'mandatory', code: '4.1.1', name_uz: "Harakat to'g'riga", image_url: getSignUrl('4.1.1') },
    { id: '4.1.2', category: 'mandatory', code: '4.1.2', name_uz: "Harakat o'ngga", image_url: getSignUrl('4.1.2') },
    { id: '4.1.3', category: 'mandatory', code: '4.1.3', name_uz: "Harakat chapga", image_url: getSignUrl('4.1.3') },
    { id: '4.3', category: 'mandatory', code: '4.3', name_uz: "Aylanma harakatlanish", image_url: getSignUrl('4.3') },
    { id: '4.4', category: 'mandatory', code: '4.4', name_uz: "Yengil avtomobillar harakati", image_url: getSignUrl('4.4') },

    // --- Information Signs (Axborot) ---
    { id: '5.1', category: 'information', code: '5.1', name_uz: "Avtomagistral", image_url: getSignUrl('5.1') },
    { id: '5.5', category: 'information', code: '5.5', name_uz: "Bir tomonlama harakatli yo'l", image_url: getSignUrl('5.5') },
    { id: '5.16.1', category: 'information', code: '5.16.1', name_uz: "Piyodalar o'tish joyi", image_url: getSignUrl('5.16.1') },
    { id: '5.19.1', category: 'information', code: '5.19.1', name_uz: "Yer osti piyodalar o'tish joyi", image_url: getSignUrl('5.19.1') },
    { id: '5.20.1', category: 'information', code: '5.20.1', name_uz: "Yer usti piyodalar o'tish joyi", image_url: getSignUrl('5.20.1') },
    { id: '5.21.1', category: 'information', code: '5.21.1', name_uz: "Tupik", image_url: getSignUrl('5.21.1') },

    // --- Service Signs (Servis) ---
    { id: '6.1', category: 'service', code: '6.1', name_uz: "Birinchi tibbiy yordam ko'rsatish joyi", image_url: getSignUrl('6.1') },
    { id: '6.2', category: 'service', code: '6.2', name_uz: "Shifoxona", image_url: getSignUrl('6.2') },
    { id: '6.3', category: 'service', code: '6.3', name_uz: "Yoqilg'i quyish shoxobchasi", image_url: getSignUrl('6.3') },
    { id: '6.4', category: 'service', code: '6.4', name_uz: "Avtomobillarga texnik xizmat ko'rsatish", image_url: getSignUrl('6.4') },
    { id: '6.14', category: 'service', code: '6.14', name_uz: "Politsiya posti", image_url: getSignUrl('6.14') },

    // --- Additional Signs (Qo'shimcha) ---
    { id: '7.1.1', category: 'additional', code: '7.1.1', name_uz: "Obyektgacha masofa", image_url: getSignUrl('7.1.1') },
    { id: '7.2.1', category: 'additional', code: '7.2.1', name_uz: "Ta'sir oralig'i", image_url: getSignUrl('7.2.1') },

    // --- Temporary Signs (Vaqtincha) ---
    // Using Warning signs with yellow background usually. Images might differ.
    // For now reusing warning with 'temporary' category if available, or omitting.

    // --- Road Markings ---
    { id: '1.1', category: 'horizontal_markings', code: '1.1', name_uz: "Yotiq chiziq 1.1 (Siddirg'a)", image_url: getMarkingUrl('1.1') },
    { id: '1.5', category: 'horizontal_markings', code: '1.5', name_uz: "Yotiq chiziq 1.5 (Uzun uzuq chiziq)", image_url: getMarkingUrl('1.5') },
    { id: '1.14.1', category: 'horizontal_markings', code: '1.14.1', name_uz: "Piyodalar o'tish joyi ('Zebra')", image_url: getMarkingUrl('1.14.1') },
    { id: '1.24.1', category: 'horizontal_markings', code: '1.24.1', name_uz: "Ogohlantiruvchi chiziq (Yo'l belgisini takrorlovchi)", image_url: getMarkingUrl('1.24.1') },

    { id: '2.1.1', category: 'vertical_markings', code: '2.1.1', name_uz: "Tik chiziq 2.1.1", image_url: getMarkingUrl('2.1.1') },
    { id: '2.2', category: 'vertical_markings', code: '2.2', name_uz: "Tik chiziq 2.2", image_url: getMarkingUrl('2.2') },
];
