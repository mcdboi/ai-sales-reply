"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

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

  const generateReply = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ message: input }),
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
        maxWidth: "850px",
        margin: "40px auto",
        padding: "25px",
        fontFamily: "Arial",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        background: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AI Sales Reply Pro 🚀</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        免费版销售 WhatsApp 回复助手
      </p>

      <h3>选择客户情况：</h3>

      <div>
        <button style={buttonStyle} onClick={() => setInput("太贵了")}>
          太贵了
        </button>
        <button style={buttonStyle} onClick={() => setInput("我考虑一下")}>
          考虑一下
        </button>
        <button style={buttonStyle} onClick={() => setInput("有折扣吗")}>
          有折扣吗
        </button>
        <button style={buttonStyle} onClick={() => setInput("还有现货吗")}>
          有现货吗
        </button>
        <button style={buttonStyle} onClick={() => setInput("客户3天没回复")}>
          客户3天没回复
        </button>
        <button style={buttonStyle} onClick={() => setInput("别人卖更便宜")}>
          别人更便宜
        </button>
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

      <h3>AI 回复：</h3>

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