import { products } from "@/data/products";

export async function POST(req: Request) {
  const body = await req.json();

  const message = body.message || "";
  const language = body.language || "中文";
  const productName = body.product || "LG Water Purifier";

  const selectedProduct = products[productName as keyof typeof products];

  const productFeatures = selectedProduct
    ? selectedProduct.features.join("、")
    : "";

  const productLine =
    language === "English"
      ? `\n\nProduct highlight: ${productName} comes with ${productFeatures}.`
      : language === "Bahasa Melayu"
      ? `\n\nKelebihan produk: ${productName} mempunyai ${productFeatures}.`
      : `\n\n产品卖点：${productName} 具备 ${productFeatures}。`;

  const replies: Record<string, Record<string, string>> = {
    "太贵了": {
      中文:
        "我明白您的顾虑 😊 这个价格是因为包含品质、保修和售后服务。请问您的预算大概是多少？我可以帮您找最适合的方案。",
      English:
        "I understand your concern 😊 The price reflects the product quality, warranty, and after-sales service. May I know your budget so I can recommend the best option?",
      "Bahasa Melayu":
        "Saya faham kebimbangan anda 😊 Harga ini termasuk kualiti produk, jaminan dan servis selepas jualan. Boleh saya tahu bajet anda supaya saya boleh cadangkan pilihan yang sesuai?",
    },

    "有折扣吗": {
      中文:
        "我帮您看一下可以做到什么优惠 😊 不过除了价格，我们也会确保售后和服务到位，这样买了比较安心。",
      English:
        "Let me check what discount I can offer 😊 Besides the price, we also make sure the service and after-sales support are reliable.",
      "Bahasa Melayu":
        "Saya semak dulu diskaun yang boleh diberikan 😊 Selain harga, kami juga pastikan servis dan sokongan selepas jualan adalah baik.",
    },

    "别人卖更便宜": {
      中文:
        "我理解 😊 有些地方价格可能会不一样，不过我们比较注重品质、保修和售后服务。很多客户选择我们，是因为买了之后更安心。",
      English:
        "I understand 😊 Some places may offer different prices, but we focus on product quality, warranty, and after-sales support. Many customers choose us because they feel more secure after purchase.",
      "Bahasa Melayu":
        "Saya faham 😊 Harga mungkin berbeza di tempat lain, tetapi kami lebih fokus pada kualiti produk, jaminan dan servis selepas jualan. Ramai pelanggan pilih kami sebab lebih yakin selepas membeli.",
    },

    "别的牌子卖更便宜": {
      中文:
        "每个品牌定位不同 😊 我们的优势在于品质稳定、售后服务完善以及长期使用体验。选择适合自己的产品比单纯比较价格更重要。",
      English:
        "Every brand has a different positioning 😊 Our strength is stable quality, good after-sales service, and long-term user experience. Choosing the right product is more important than only comparing price.",
      "Bahasa Melayu":
        "Setiap jenama ada kedudukan yang berbeza 😊 Kelebihan kami ialah kualiti yang stabil, servis selepas jualan yang baik dan pengalaman penggunaan jangka panjang.",
    },

    "没有预算": {
      中文:
        "我理解 😊 预算确实是重要考量。您方便告诉我大概预算范围吗？我可以帮您推荐更适合的方案。",
      English:
        "I understand 😊 Budget is definitely important. May I know your estimated budget? I can recommend a more suitable option for you.",
      "Bahasa Melayu":
        "Saya faham 😊 Bajet memang penting. Boleh saya tahu anggaran bajet anda? Saya boleh cadangkan pilihan yang lebih sesuai.",
    },

    "最后多少钱": {
      中文:
        "我帮您计算最优惠价格 😊 请问您需要的型号和数量是什么呢？我可以提供完整报价给您。",
      English:
        "Let me calculate the best price for you 😊 May I know the model and quantity you need? I can provide a full quotation.",
      "Bahasa Melayu":
        "Saya bantu kira harga terbaik untuk anda 😊 Boleh saya tahu model dan kuantiti yang diperlukan? Saya boleh beri quotation penuh.",
    },

    "我先看看": {
      中文:
        "当然可以 😊 购买前多了解是好事。如果您对产品功能或价格有任何疑问，欢迎随时联系我。",
      English:
        "Sure 😊 It is good to understand more before buying. If you have any questions about the product features or price, feel free to contact me anytime.",
      "Bahasa Melayu":
        "Boleh 😊 Bagus juga kalau semak dulu sebelum membeli. Jika ada soalan tentang fungsi produk atau harga, boleh hubungi saya bila-bila masa.",
    },

    "我再考虑": {
      中文:
        "没问题 😊 这是重要决定，慢慢考虑也很正常。如果需要更多资料或报价，我随时可以提供给您参考。",
      English:
        "No problem 😊 It is an important decision, so take your time. If you need more details or a quotation, I can send it to you anytime.",
      "Bahasa Melayu":
        "Tiada masalah 😊 Ini keputusan penting, jadi boleh fikir dulu. Jika perlukan maklumat lanjut atau quotation, saya boleh berikan bila-bila masa.",
    },

    "下个月再买": {
      中文:
        "没问题 😊 您可以先考虑看看。到时如果有最新优惠或促销活动，我也可以第一时间通知您。",
      English:
        "No problem 😊 You can consider first. If there is any new promotion next month, I can update you immediately.",
      "Bahasa Melayu":
        "Tiada masalah 😊 Anda boleh fikir dulu. Jika ada promosi terbaru bulan depan, saya boleh maklumkan kepada anda segera.",
    },

    "我跟老婆商量": {
      中文:
        "当然没问题 😊 购买前和家人讨论是很正常的。如果您需要产品资料、报价或付款方式，我都可以整理给您参考。",
      English:
        "Of course 😊 It is normal to discuss with your family before buying. I can prepare the product details, quotation, and payment options for your reference.",
      "Bahasa Melayu":
        "Boleh 😊 Memang biasa berbincang dengan keluarga sebelum membeli. Saya boleh sediakan maklumat produk, quotation dan pilihan bayaran untuk rujukan anda.",
    },

    "我跟老公商量": {
      中文:
        "没问题 😊 您可以先和家人商量。如果有任何疑问，我随时可以协助您，也可以先帮您保留优惠资讯。",
      English:
        "No problem 😊 You can discuss with your family first. If you have any questions, I am happy to assist and can also keep the promotion details for you.",
      "Bahasa Melayu":
        "Tiada masalah 😊 Anda boleh berbincang dengan keluarga dulu. Jika ada soalan, saya sedia membantu dan boleh simpan maklumat promosi untuk anda.",
    },

    "我跟家人商量": {
      中文:
        "可以的 😊 毕竟是重要的购买决定。如果需要进一步了解产品功能、保修或付款方式，我很乐意为您说明。",
      English:
        "Sure 😊 It is an important purchase decision. If you need more details about the product features, warranty, or payment options, I will be happy to explain.",
      "Bahasa Melayu":
        "Boleh 😊 Ini keputusan pembelian yang penting. Jika perlukan maklumat lanjut tentang fungsi produk, jaminan atau cara bayaran, saya boleh terangkan.",
    },

    "有现货吗": {
      中文:
        "目前有现货 😊 如果您确定需要，我可以先帮您保留，以免缺货影响安排。",
      English:
        "Yes, currently we have stock 😊 If you are interested, I can reserve it for you first to avoid it being sold out.",
      "Bahasa Melayu":
        "Ya, stok masih ada 😊 Jika anda berminat, saya boleh reserve dulu supaya tidak kehabisan stok.",
    },

    "什么时候送货": {
      中文:
        "一般情况下会根据地区安排送货 😊 您方便提供地区吗？我可以帮您确认最快送达时间。",
      English:
        "Delivery time depends on your area 😊 May I know your location? I can help check the earliest delivery time for you.",
      "Bahasa Melayu":
        "Masa penghantaran bergantung pada kawasan anda 😊 Boleh saya tahu lokasi anda? Saya boleh semak masa penghantaran paling awal.",
    },

    "包安装吗": {
      中文:
        "视产品而定 😊 部分产品包含安装服务。如果告诉我产品型号，我可以帮您确认详细安排。",
      English:
        "It depends on the product 😊 Some products include installation service. If you tell me the model, I can help confirm the details.",
      "Bahasa Melayu":
        "Bergantung pada produk 😊 Sesetengah produk termasuk servis pemasangan. Jika anda beritahu model, saya boleh semak untuk anda.",
    },

    "可以试用吗": {
      中文:
        "部分产品可以到门市体验 😊 您方便告诉我感兴趣的型号吗？我帮您确认是否有展示机。",
      English:
        "Some products can be tested in-store 😊 May I know which model you are interested in? I can check if there is a display unit.",
      "Bahasa Melayu":
        "Sesetengah produk boleh dicuba di kedai 😊 Boleh saya tahu model yang anda berminat? Saya boleh semak jika ada unit display.",
    },

    "有什么赠品": {
      中文:
        "目前会根据活动提供不同赠品 😊 我可以帮您查看最新促销方案和可获得的赠品内容。",
      English:
        "Free gifts depend on the current promotion 😊 I can help check the latest promo package and available gifts for you.",
      "Bahasa Melayu":
        "Hadiah percuma bergantung pada promosi semasa 😊 Saya boleh semak pakej promosi dan hadiah yang tersedia untuk anda.",
    },

    "有保修吗": {
      中文:
        "有的 😊 产品附带官方保修服务，让您使用更安心。具体保修年限会根据产品型号有所不同，我可以帮您确认。",
      English:
        "Yes 😊 The product comes with official warranty, so you can use it with peace of mind. The warranty period depends on the model, and I can help you confirm it.",
      "Bahasa Melayu":
        "Ya 😊 Produk ini datang dengan jaminan rasmi, jadi anda boleh guna dengan lebih yakin. Tempoh jaminan bergantung pada model, saya boleh bantu semak.",
    },

    "可以分期吗": {
      中文:
        "可以 😊 目前支持分期付款。您方便告诉我使用哪家银行信用卡吗？我可以帮您查询适合的分期期数。",
      English:
        "Yes 😊 Instalment payment is available. May I know which bank credit card you are using? I can help check the available instalment plans.",
      "Bahasa Melayu":
        "Boleh 😊 Bayaran ansuran tersedia. Boleh saya tahu kad kredit bank mana yang anda gunakan? Saya boleh semak pelan ansuran yang sesuai.",
    },

    "供几年": {
      中文:
        "可以根据银行或分期方案安排 😊 常见有 6、12、24 或 36 个月。您想了解哪一种方案呢？",
      English:
        "It depends on the bank or instalment plan 😊 Common options include 6, 12, 24, or 36 months. Which plan would you like to know more about?",
      "Bahasa Melayu":
        "Ia bergantung pada bank atau pelan ansuran 😊 Pilihan biasa termasuk 6, 12, 24 atau 36 bulan. Anda ingin tahu pelan yang mana?",
    },

    "需要什么document吗": {
      中文:
        "视付款方式而定 😊 如果是分期付款，通常需要身份证及相关银行资料。我可以根据您的情况详细说明需要准备什么。",
      English:
        "It depends on the payment method 😊 For instalment, usually IC and related bank details are needed. I can explain what documents are required based on your situation.",
      "Bahasa Melayu":
        "Bergantung pada cara bayaran 😊 Untuk ansuran, biasanya perlukan IC dan maklumat bank berkaitan. Saya boleh terangkan dokumen yang diperlukan mengikut situasi anda.",
    },

    "如果我不想再继续供会怎样": {
      中文:
        "分期属于银行或金融机构的付款协议 😊 如果中途停止付款，可能会影响信用记录或产生额外费用。建议您下单前先了解完整条款，我也可以先帮您说明清楚。",
      English:
        "Instalment is a payment agreement with the bank or finance provider 😊 If payment is stopped halfway, it may affect your credit record or involve extra charges. I recommend understanding the full terms before proceeding.",
      "Bahasa Melayu":
        "Ansuran ialah perjanjian bayaran dengan bank atau pihak kewangan 😊 Jika berhenti bayar di tengah jalan, ia mungkin menjejaskan rekod kredit atau melibatkan caj tambahan. Saya cadangkan fahamkan terma dulu sebelum teruskan.",
    },

    "我要下单": {
      中文:
        "太好了 😊 感谢您的支持。我现在帮您安排订单，请问方便提供您的姓名、联络号码和送货地址吗？",
      English:
        "Great 😊 Thank you for your support. I will help arrange the order now. May I have your name, contact number, and delivery address?",
      "Bahasa Melayu":
        "Bagus 😊 Terima kasih atas sokongan anda. Saya akan bantu uruskan pesanan sekarang. Boleh saya dapatkan nama, nombor telefon dan alamat penghantaran?",
    },

    "客户3天没回复": {
      中文:
        "Hi 😊，想跟进一下您之前咨询的产品。如果还有任何问题，我很乐意协助您。目前还有优惠活动，欢迎随时联系我。",
      English:
        "Hi 😊 Just following up on the product you asked about earlier. If you have any questions, I will be happy to assist. There is still an ongoing promotion, feel free to contact me anytime.",
      "Bahasa Melayu":
        "Hi 😊 Saya cuma nak follow up tentang produk yang anda tanya sebelum ini. Jika ada sebarang soalan, saya sedia membantu. Promosi masih berjalan, boleh hubungi saya bila-bila masa.",
    },
  };

  const matchedKey = Object.keys(replies).find((key) => message.includes(key));

  const baseReply =
    matchedKey && replies[matchedKey][language]
      ? replies[matchedKey][language]
      : language === "English"
      ? "Thank you for your enquiry 😊 May I know whether you are more concerned about the price, product features, or after-sales service?"
      : language === "Bahasa Melayu"
      ? "Terima kasih atas pertanyaan anda 😊 Boleh saya tahu anda lebih mementingkan harga, fungsi produk atau servis selepas jualan?"
      : "谢谢您的询问 😊 我可以帮您详细解释。请问您比较在意价格、功能，还是售后服务？";

  const finalReply = `${baseReply}${productLine}`;

  return Response.json({ reply: finalReply });
}