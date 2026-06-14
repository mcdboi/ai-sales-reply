"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("中文");
  const [product, setProduct] = useState("LG Water Purifier");

  const products = [
    "LG Water Purifier",
    "LG Air Purifier",
    "LG Washer",
    "LG Dryer",
    "LG Fridge",
    "LG Monitor",
    "LG TV",
    "LG Stage 301",
    "LG Vacuum",
    "LG Dehumidifier",
  ];

  const quickButtons = [
    "太贵了",
    "有折扣吗",
    "别人卖更便宜",
    "别的牌子卖更便宜",
    "没有预算",
    "最后多少钱",
    "我先看看",
    "我再考虑",
    "下个月再买",
    "我跟老婆商量",
    "我跟老公商量",
    "我跟家人商量",
    "有现货吗",
    "什么时候送货",
    "包安装吗",
    "可以试用吗",
    "有什么赠品",
    "有保修吗",
    "可以分期吗",
    "供几年",
    "需要什么document吗",
    "如果我不想再继续供会怎样",
    "我要下单",
    "客户3天没回复",
  ];

  const buttonStyle = {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "8px",
    marginBottom: "8px",
  };

  const selectStyle = {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "16px",
    width: "100%",
    border: "1px solid #ccc",
  };

  const generateReply = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ message: input, language, product }),
    });

    const data = await res.json();
    setOutput(data.reply);
  };

  const copyReply = async () => {
    await navigator.clipboard.writeText(output);
    alert("已复制回复！");
  };

  return (
    <div
      style={{
        maxWidth: "950px",
        margin: "40px auto",
        padding: "25px",
        fontFamily: "Arial",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        background: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AI Product Sales Assistant 🚀</h1>

      <p style={{ textAlign: "center", color: "#666" }}>
        中文 / English / Bahasa Melayu 销售回复助手
      </p>

      <h3>选择语言：</h3>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={selectStyle}
      >
        <option value="中文">中文</option>
        <option value="English">English</option>
        <option value="Bahasa Melayu">Bahasa Melayu</option>
      </select>

      <h3>选择产品：</h3>

      <select
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={selectStyle}
      >
        {products.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h3>选择客户情况：</h3>

      <div>
        {quickButtons.map((text) => (
          <button key={text} style={buttonStyle} onClick={() => setInput(text)}>
            {text}
          </button>
        ))}
      </div>

      <textarea
        style={{
          width: "100%",
          height: 130,
          padding: 12,
          borderRadius: 10,
          border: "1px solid #ccc",
          fontSize: 16,
          marginTop: 10,
        }}
        placeholder="客户说什么？例如：太贵了"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div style={{ marginTop: 12 }}>
        <button style={buttonStyle} onClick={generateReply}>
          Generate Reply
        </button>

        <button
          style={{
            ...buttonStyle,
            background: "#16a34a",
          }}
          onClick={copyReply}
        >
          Copy Reply
        </button>
      </div>

      <h3>销售回复：</h3>

      <div
        style={{
          background: "#f5f5f5",
          padding: "18px",
          borderRadius: "12px",
          minHeight: "80px",
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
        }}
      >
        {output || "生成后的回复会显示在这里。"}
      </div>
    </div>
  );
}