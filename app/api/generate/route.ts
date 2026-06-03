export async function POST(req: Request) {
  const body = await req.json();
  const message = body.message || "";

  let reply = "";

  if (message.includes("贵") || message.toLowerCase().includes("expensive")) {
    reply =
      "我明白您的顾虑 😊 这个价格是因为包含品质、保修和售后服务。请问您的预算大概是多少？我可以帮您找最适合的方案。";
  } else if (message.includes("考虑") || message.includes("再看看")) {
    reply =
      "没问题，您可以慢慢考虑 😊 只是提醒您，现在这个优惠可能有限时。如果您有兴趣，我可以先帮您保留。";
  } else if (
    message.includes("便宜") ||
    message.includes("discount") ||
    message.includes("折扣")
  ) {
    reply =
      "我帮您看一下可以做到什么优惠 😊 不过除了价格，我们也会确保售后和服务到位，这样买了比较安心。";
  } else if (
    message.includes("有货") ||
    message.includes("现货") ||
    message.toLowerCase().includes("stock")
  ) {
    reply =
      "目前还有现货 😊 如果您确认要，我可以先帮您保留，避免等下卖完。";
  } else if (message.includes("3天没回复")) {
    reply =
      "Hi 😊，想跟进一下您之前咨询的产品。如果还有任何问题，我很乐意协助您。目前还有优惠活动，欢迎随时联系我。";
  } else if (message.includes("别人卖更便宜")) {
    reply =
      "我理解 😊 有些地方价格可能会不一样，不过我们比较注重品质、保修和售后服务。很多客户选择我们，是因为买了之后更安心。";
  } else {
    reply =
      "谢谢您的询问 😊 我可以帮您详细解释。请问您比较在意价格、功能，还是售后服务？";
  }

  return Response.json({ reply });
}