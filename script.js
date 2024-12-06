// جلب أسعار العملات
async function fetchExchangeRates() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        return data.rates;
    } catch (error) {
        alert("Error fetching exchange rates.");
        return {};
    }
}

// قائمة العملات وأسماؤها (بـ 28 لغة)
const currencyNames = {
    "USD": {
        ar: "الدولار الأمريكي", en: "US Dollar", fr: "Dollar Américain",
        es: "Dólar Estadounidense", de: "US-Dollar", it: "Dollaro Statunitense",
        pt: "Dólar Americano", ru: "Доллар США", zh: "美元", ja: "米ドル",
        hi: "अमेरिकी डॉलर", ko: "미국 달러", nl: "Amerikaanse Dollar", sv: "Amerikansk Dollar",
        no: "Amerikansk Dollar", da: "Amerikansk Dollar", fi: "Yhdysvaltain Dollari",
        tr: "Amerikan Doları", pl: "Dolar Amerykański", id: "Dolar Amerika",
        th: "ดอลลาร์สหรัฐ", vi: "Đô la Mỹ", ms: "Dolar Amerika", cs: "Americký Dolar",
        sk: "Americký Dolár", el: "Δολάριο ΗΠΑ", he: "דולר אמריקאי",
    },
    "EUR": {
        ar: "اليورو", en: "Euro", fr: "Euro", es: "Euro", de: "Euro",
        it: "Euro", pt: "Euro", ru: "Евро", zh: "欧元", ja: "ユーロ",
        hi: "यूरो", ko: "유로", nl: "Euro", sv: "Euro", no: "Euro",
        da: "Euro", fi: "Euro", tr: "Euro", pl: "Euro", id: "Euro",
        th: "ยูโร", vi: "Euro", ms: "Euro", cs: "Euro", sk: "Euro",
        el: "Ευρώ", he: "אירו",
    },
    "GBP": {
        ar: "الجنيه الإسترليني", en: "British Pound", fr: "Livre Sterling",
        es: "Libra Esterlina", de: "Britisches Pfund", it: "Sterlina Britannica",
        pt: "Libra Esterlina", ru: "Британский фунт", zh: "英镑", ja: "英国ポンド",
        hi: "ब्रिटिश पाउंड", ko: "영국 파운드", nl: "Britse Pond", sv: "Brittiskt Pund",
        no: "Britisk Pund", da: "Britisk Pund", fi: "Englannin Punta", tr: "İngiliz Sterlini",
        pl: "Funt Brytyjski", id: "Pound Inggris", th: "ปอนด์อังกฤษ", vi: "Bảng Anh",
        ms: "Pound British", cs: "Britská Libra", sk: "Britská Libra", el: "Λίρα Στερλίνα",
        he: "פאונד בריטי",
    },
    // أضف باقي العملات بنفس التنسيق
};

// النصوص بـ 28 لغة
const translations = {
    ar: {
        pageTitle: "محول العملات",
        languageLabel: "اللغة:",
        appTitle: "محول العملات",
        amountLabel: ":المبلغ",
        fromCurrencyLabel: ":من",
        toCurrencyLabel: ":إلى",
        convertButton: "تحويل",
        resultText: ":النتيجة",
    },
    en: {
        pageTitle: "Currency Converter",
        languageLabel: "Language:",
        appTitle: "Currency Converter",
        amountLabel: "Amount:",
        fromCurrencyLabel: "From:",
        toCurrencyLabel: "To:",
        convertButton: "Convert",
        resultText: "Result:",
    },
    fr: {
        pageTitle: "Convertisseur de Devises",
        languageLabel: "Langue :",
        appTitle: "Convertisseur de Devises",
        amountLabel: "Montant :",
        fromCurrencyLabel: "De :",
        toCurrencyLabel: "À :",
        convertButton: "Convertir",
        resultText: "Résultat :",
    },
    // أضف باقي اللغات هنا
};

// تعبئة القوائم
async function populateCurrencyOptions() {
    const rates = await fetchExchangeRates();
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const language = document.getElementById("languageSelector").value;

    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";

    Object.keys(rates).forEach(currency => {
        const name = currencyNames[currency]?.[language] || currency;

        const optionFrom = new Option(name, currency);
        const optionTo = new Option(name, currency);
        fromCurrency.add(optionFrom);
        toCurrency.add(optionTo);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
}

// تحويل العملات
async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const language = document.getElementById("languageSelector").value;

    if (!amount || amount <= 0) {
        alert(translations[language].amountLabel + " is required.");
        return;
    }

    const rates = await fetchExchangeRates();
    const converted = (amount * rates[toCurrency]) / rates[fromCurrency];
    const resultText = document.getElementById("resultText");
    resultText.textContent = `${translations[language].resultText} ${converted.toFixed(2)} ${currencyNames[toCurrency][language]}`;
}

// تغيير اللغة
function changeLanguage() {
    const language = document.getElementById("languageSelector").value;
    const elements = {
        pageTitle: document.getElementById("pageTitle"),
        languageLabel: document.getElementById("languageLabel"),
        appTitle: document.getElementById("appTitle"),
        amountLabel: document.getElementById("amountLabel"),
        fromCurrencyLabel: document.getElementById("fromCurrencyLabel"),
        toCurrencyLabel: document.getElementById("toCurrencyLabel"),
        convertButton: document.getElementById("convertButton"),
        resultText: document.getElementById("resultText"),
    };

    Object.keys(elements).forEach(key => {
        elements[key].textContent = translations[language][key];
    });

    populateCurrencyOptions();
}

// تحميل البيانات عند التشغيل
populateCurrencyOptions();
changeLanguage();
