export async function POST(req: Request) {
  const body = await req.json();
  const message = body.message || "";

  let reply = "";

  if (message.includes("没有预算")) {
    reply =
      "我理解 😊 预算确实是重要考量。您方便告诉我大概预算范围吗？我可以帮您推荐更适合的方案。";
  } else if (message.includes("下个月再买")) {
    reply =
      "没问题 😊 您可以先考虑看看。到时如果有最新优惠或促销活动，我也可以第一时间通知您。";
  } else if (message.includes("我先看看")) {
    reply =
      "当然可以 😊 购买前多了解是好事。如果您对产品功能或价格有任何疑问，欢迎随时联系我。";
  } else if (message.includes("我再考虑")) {
    reply =
      "没问题 😊 这是重要决定，慢慢考虑也很正常。如果需要更多资料或报价，我随时可以提供给您参考。";
  } else if (message.includes("我跟老婆商量")) {
    reply =
      "当然没问题 😊 购买前和家人讨论是很正常的。如果您需要产品资料、报价或付款方式，我都可以整理给您参考。";
  } else if (message.includes("我跟老公商量")) {
    reply =
      "没问题 😊 您可以先和家人商量。如果有任何疑问，我随时可以协助您，也可以先帮您保留优惠资讯。";
  } else if (message.includes("我跟家人商量")) {
    reply =
      "可以的 😊 毕竟是重要的购买决定。如果需要进一步了解产品功能、保修或付款方式，我很乐意为您说明。";
  } else if (
    message.includes("别人卖更便宜") ||
    message.includes("别的牌子卖更便宜")
  ) {
    reply =
      "我理解 😊 有些地方价格或品牌定位可能会不一样。不过除了价格，我们也很重视品质、保修和售后服务。很多客户选择我们，是因为买了之后更安心。";
  } else if (message.includes("可以分期吗")) {
    reply =
      "可以 😊 目前支持分期付款。您方便告诉我使用哪家银行信用卡吗？我可以帮您查询适合的分期期数。";
  } else if (message.includes("有保修吗") || message.includes("保修")) {
    reply =
      "有的 😊 产品附带官方保修服务，让您使用更安心。具体保修年限会根据产品型号有所不同，我可以帮您确认。";
  } else if (message.includes("供几年")) {
    reply =
      "可以根据银行或分期方案安排 😊 常见有 6、12、24 或 36 个月。您想了解哪一种方案呢？";
  } else if (message.includes("我要下单")) {
    reply =
      "太好了 😊 感谢您的支持。我现在帮您安排订单，请问方便提供您的姓名、联络号码和送货地址吗？";
  } else if (
    message.toLowerCase().includes("document") ||
    message.includes("需要什么文件") ||
    message.includes("需要什么资料")
  ) {
    reply =
      "视付款方式而定 😊 如果是分期付款，通常需要身份证及相关银行资料。我可以根据您的情况详细说明需要准备什么。";
  } else if (
    message.includes("不想再继续供") ||
    message.includes("不想继续供")
  ) {
    reply =
      "分期属于银行或金融机构的付款协议 😊 如果中途停止付款，可能会影响信用记录或产生额外费用。建议您下单前先了解完整条款，我也可以先帮您说明清楚。";
  } else if (message.includes("什么时候送货")) {
    reply =
      "一般情况下会根据地区安排送货 😊 您方便提供地区吗？我可以帮您确认最快送达时间。";
  } else if (message.includes("包安装吗") || message.includes("安装")) {
    reply =
      "视产品而定 😊 部分产品包含安装服务。如果告诉我产品型号，我可以帮您确认详细安排。";
  } else if (message.includes("可以试用吗") || message.includes("试用")) {
    reply =
      "部分产品可以到门市体验 😊 您方便告诉我感兴趣的型号吗？我帮您确认是否有展示机。";
  } else if (message.includes("最后多少钱")) {
    reply =
      "我帮您计算最优惠价格 😊 请问您需要的型号和数量是什么呢？我可以提供完整报价给您。";
  } else if (message.includes("有什么赠品") || message.includes("赠品")) {
    reply =
      "目前会根据活动提供不同赠品 😊 我可以帮您查看最新促销方案和可获得的赠品内容。";
  } else if (
    message.includes("有现货吗") ||
    message.includes("有货") ||
    message.includes("现货") ||
    message.toLowerCase().includes("stock")
  ) {
    reply =
      "目前有现货 😊 如果您确定需要，我可以先帮您保留，以免缺货影响安排。";
  } else if (message.includes("3天没回复")) {
    reply =
      "Hi 😊，想跟进一下您之前咨询的产品。如果还有任何问题，我很乐意协助您。目前还有优惠活动，欢迎随时联系我。";
  } else if (
    message.includes("贵") ||
    message.toLowerCase().includes("expensive")
  ) {
    reply =
      "我明白您的顾虑 😊 这个价格是因为包含品质、保修和售后服务。请问您的预算大概是多少？我可以帮您找最适合的方案。";
  } else if (message.includes("考虑") || message.includes("再看看")) {
    reply =
      "没问题，您可以慢慢考虑 😊 只是提醒您，现在这个优惠可能有限时。如果您有兴趣，我可以先帮您保留。";
  } else if (
    message.includes("便宜") ||
    message.toLowerCase().includes("discount") ||
    message.includes("折扣")
  ) {
    reply =
      "我帮您看一下可以做到什么优惠 😊 不过除了价格，我们也会确保售后和服务到位，这样买了比较安心。";
  } else {
    reply =
      "谢谢您的询问 😊 我可以帮您详细解释。请问您比较在意价格、功能，还是售后服务？";
  }

  return Response.json({ reply });
}