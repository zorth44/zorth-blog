---
title: 从外层走近 TCP/IP
description: 从操作系统的视角理解 TCP/IP 协议栈——它是如何分层、如何驻留内存、又如何被应用程序调用的。
pubDate: 2026-05-07
tags: [计算机网络, TCP/IP, 学习笔记]
draft: false
---

一直以来TCP/IP的巨著就是那三本厚厚的协议书，以至于我不知道从何下手，这次尝试从最外层接近他们。首先是我一直知道的，TCP/IP是一个协议，是一堆规则，所以，在实际的环境下，这些规则是怎么落地的呢？

操作系统的内核中，会有TCP/IP协议的实现：

```
Your App (e.g. Chrome)
        ↓
   OS Network Stack  ← TCP/IP rules are built in here
        ↓
   Network Driver
        ↓
   Physical Hardware (Wi-Fi card, Ethernet)
```

这里出现了一个名词 Stack ，在程序员的语境里，Stack是一种数据结构，是一个堆栈，不是一个可以独立运行的个体。但是在网络的世界里，他代表一种组织架构。

```
┌─────────────────────────┐
│  Application Layer      │  ← Your app (Chrome, etc.)
├─────────────────────────┤
│  Transport Layer        │  ← TCP (reliability - 可靠性)
├─────────────────────────┤
│  Internet Layer         │  ← IP (addressing & routing)
├─────────────────────────┤
│  Network Access Layer   │  ← Wi-Fi / Ethernet driver
└─────────────────────────┘
```

如你所见，这里的Stack指的是TCP、IP之间像堆栈一样分层堆叠的架构。

如果仔细观察，你会发现上面的分层案例中少了一个老朋友，UDP。

```
┌─────────────────────────┐
│  Application Layer      │  ← Your app (Chrome, etc.)
├─────────────────────────┤
│  Transport Layer        │  ← TCP  and  UDP  (both here!)
├─────────────────────────┤
│  Internet Layer         │  ← IP (addressing & routing)
├─────────────────────────┤
│  Network Access Layer   │  ← Wi-Fi / Ethernet driver
└─────────────────────────┘
```

老朋友UDP和TCP都住在传输层，我们每次会根据需要，选择他们其中的一种进行传输工作。

当然，这里少不了对TCP和UDP的区别做一下重温，TCP是有序可靠的传输，UDP是无序，不可靠的传输。总结下来就是：

> The stack diagram shows **layers**, not individual protocols. TCP and UDP are both **choices within the Transport Layer** — the stack supports both, and your application picks whichever one fits its needs. 🎯

回归正题，了解了他们Stack的含义之后，摆在面前的是另外一个问题，在实际的操作系统中，他们是以什么样的形式存在呢？

我这里想到了一个形式，SDK。他们是有很多相似之处的，他们确实是一段代码，提供一个功能，在程序需要使用到的时候，可以调用他们。他们又确实有限制，他们只能和他们的上一层或者下一层进行交互。

还有一点很重要的就是，他们在操作系统启动之后，就一直驻留在内存中随取随用了。

```
Your App
  │
  │  calls a socket API  (like an SDK call)
  ▼
OS Kernel (Network Stack)
  │
  ├── TCP Layer → breaks data into packets
  ├── IP Layer  → adds addresses
  └── Driver    → sends via hardware
```

一句话总结就是：

> The network stack is **always loaded in memory** as part of the OS — it doesn't start fresh each time. When your app needs the network, it simply **makes a system call**, like pressing a button that triggers all the layers instantly. 🚀
