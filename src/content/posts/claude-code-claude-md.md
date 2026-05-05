---
title: 如何使用 Claude Code 工具之 CLAUDE.md 机制
description: 从 CLAUDE.md 的运作原理出发，聊聊 Multi-Agent 的本质，以及一套更朴实的 Claude Code 使用姿势。
pubDate: 2026-05-05
tags: [Claude Code, AI 工具, 开发效率]
draft: false
---

## 引言

刚开始使用 Claude Code 的时候，习惯性直接在项目根目录 Claude，然后直接输入需求开干。虽说有文档意识，但只停留在让 Claude 在项目下生成 doc 文件夹，命令他先写文档，review 文档之后再开始开发工作。

在各种社交平台上，看到很多人动辄说开启了 agent，让架构师、测试工程师、开发者等等多个角色同时开干，但是说实话，我在实际开发的时候，还是古朴地一个对话干到底。最多会再开一个 Codex，每次模型输出一个方案的时候，贴给 Codex 的窗口，让他帮我修改一下，然后再贴回 Claude Code。这次趁着假期好好和 Claude 讨论了一下，我之前的开发方式是不是合理，借此机会，好好学习了一下 `CLAUDE.md` 的机制。

## 背景

初识 `CLAUDE.md`，我认为他是一个 Claude Code 的专属记忆，就好像养龙虾一样，作为一个项目的长期记忆留给 Claude Code 去每次读取。但是说实话，我从来没有创建过这个文档，印象中都是 Claude Code 在初始化读完我的项目之后，会去自动生成这个文档。

实际上，Claude Code 并不会自动生成这个专属的文档，他的自动记忆只应用于 Auto Memory 这套体系。Auto Memory 是让 Claude Code 在工作过程中自动积累项目知识的功能——不依赖你手动更新文档，而是由 Claude 在学到有价值的东西时自己写回去。

所以我平时看到的，是一个自动生成的 `.claude` 文件夹。

总结下来，`CLAUDE.md` 是我们手写的 Markdown 文件，给 Claude 提供跨 session 的持久化指令。每次 Claude Code 启动时都会读取它，内容直接注入到 context window 里。

## 使用

回到之前我想说的，很多开发者会说自己使用了 **Multi-Agent** 方式，多个角色协同开发。这次我好好询问了 Claude，他的回答是这样的：

```
Multi-Agent Vibe Coding 的本质，不是 "更多 AI"，而是用角色隔离来控制上下文污染。

为什么要分角色？
一个对话做到后期，上下文越来越长，Claude 容易把早期的需求和后来的修改混在一起，产出开始漂移。
分角色的核心价值是：每个 Agent 只看它该看的东西，Planner 不管具体实现，Coder 不管全局设计，
Reviewer 不管需求合不合理——职责干净，输出就干净。

实际怎么做？
你不需要真的搭什么框架，在 Claude Code 里最简单的实践是：
用不同的 session / conversation 扮演不同角色，每次喂给它专属的 system prompt，比如：

  Planner session：你是架构师，只负责拆解任务和设计接口契约，不写任何实现代码
  Coder session：你是后端开发，严格按照下面的接口设计实现代码，不要改设计
  Reviewer session：你是 code reviewer，检查以下代码是否符合设计文档，列出问题

然后你充当 Orchestrator——把 Planner 的输出喂给 Coder，把 Coder 的输出喂给 Reviewer，最后整合。

什么时候值得用？
你现在做的微服务单个接口开发，单对话足够。Multi-Agent 在这些场景才真正值回成本：
跨多个服务的联动功能、需要同时输出代码 + 文档 + 测试用例、
或者一个功能大到单对话上下文撑不住的时候。
```

所以说，**Multi-Agent**，炫技更多一点，我们日常的开发，只需要一种更加朴实无华的方式。这里涉及到 Claude Code 的一个读取机制，Claude Code 会沿着目录树**从上往下叠加**读取所有 CLAUDE.md：

```
~/.claude/CLAUDE.md          ← 全局（所有项目都生效）
~/projects/CLAUDE.md         ← 项目级
~/projects/src/CLAUDE.md     ← 子目录级（只在这个目录下生效）
```

多个文件的内容会合并，下层的可以覆盖或补充上层的。

所以，我们可以在不同的功能文件夹下来创建 CLAUDE.md 文档，然后通过在这些文件夹下开启 Claude Code 的方式，来实现一个多个角色、协同开发的场景。

以 Java 项目为例：

```
~/.claude/CLAUDE.md                    ← 全局：你的个人偏好、通用规范

~/projects/my-service/
├── CLAUDE.md                          ← 项目级：tech stack、架构约束
├── docs/
│   └── CLAUDE.md                      ← Planner 角色（在 docs/ 里做设计）
├── src/
│   └── CLAUDE.md                      ← Coder 角色（在 src/ 里写代码）
└── src/test/
    └── CLAUDE.md                      ← Tester 角色（只在测试目录生效）
```

按照上面的布局，可以 cd 到三个不同的文件夹下，开启 Claude Code，他们会直接进入角色，帮助我们 Coding。

这里留一份比较简单的 `Planner（设计接口）→ Tester（先写测试）→ Coder（让测试通过）→ Reviewer（审查）` 角色提示词模板：

```
## Role: Planner（架构师）

只负责设计，不写任何实现代码。

每次收到功能需求，输出以下结构：

### 1. API Contract
- Method + Path
- Request DTO（字段、类型、校验注解）
- Response DTO
- 异常情况及 HTTP 状态码

### 2. 测试用例清单（交给 Tester 执行）
- 正常路径用例
- 边界值用例
- 异常路径用例（参数缺失、权限不足等）

### 3. Coder 任务拆解
- [ ] Controller
- [ ] Service + 接口定义
- [ ] Mapper + SQL
- [ ] Redis 操作（如有）

### 4. 风险检查
- 是否影响现有 Feign 接口？
- 是否需要数据库事务？
- 是否影响 JWT 过滤链？

禁止输出任何 Java 代码。

---

## Role: Tester（测试先行）

你在 Coder 之前工作。根据 Planner 输出的接口设计和测试用例清单，
先写测试，此时测试必须是红色（failing）的，因为实现还不存在。

测试规范：
- 使用 JUnit 5 + Mockito
- Controller 层用 @WebMvcTest + MockMvc
- Service 层用 @ExtendWith(MockitoExtension.class)
- 不得访问真实数据库，用 @MockBean 隔离

每个接口必须覆盖：
- [ ] 正常返回 200/201
- [ ] 参数校验失败 400
- [ ] 未授权访问 401
- [ ] 业务异常（如资源不存在）404/409
- [ ] 边界值

写完后告知 Coder：「测试已就绪，当前全部 failing，请开始实现。」
禁止写任何业务实现代码。

---

## Role: Coder（实现者）

你在 Tester 之后工作。目标不是"写功能"，
而是"让 src/test/ 里的测试全部变绿"。

工作流程：
1. 先读 ../../../docs/ 里的设计文档
2. 读 src/test/ 里 Tester 已写好的测试
3. 写最少的代码让测试通过
4. 不得修改测试文件
5. 实现完成后运行 mvn test，确认全绿再交给 Reviewer

编码规范：
- 严格遵守 Planner 定义的 DTO 结构，不得自行增减字段
- Service 层必须定义接口，再写实现类
- SQL 写在 mapper XML 里，不用注解 SQL
- 禁止在实现里 catch 后吞掉异常
```

## 结语

回头看看这段折腾的过程，我其实并没有学会什么"更厉害"的开发方式——更像是把一直在做的事情，说清楚了而已。

Multi-Agent 听起来很唬人，但本质不过是把上下文分干净，让每个"角色"只操心自己该操心的事。而 `CLAUDE.md` 也没什么魔法，就是一份每次启动都会被读进来的指令，写好了它，Claude 才算真正记住了你。

真正有价值的东西往往不在架构有多复杂，而在规范有没有落地。一套写清楚的角色提示词、一个按职责划分的目录结构，比开十个 Agent 窗口更管用。
