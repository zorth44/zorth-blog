---
title: Maven 离线迁移踩坑记录
description: 记录将 Maven 项目迁移到内网离线环境时遇到的两个典型问题：内置插件版本差异和 _remote.repositories 导致离线模式失败，以及完整的迁移最佳实践。
pubDate: 2026-05-09
tags: [Java, Maven, 工程实践]
draft: false
---

## 坑1：同版本 Maven，内置插件版本不同

**现象**：外网和内网 Maven 版本号相同（如都是 3.9.9），但内网报插件找不到或依赖缺失。

**原因**：Maven 内置插件版本硬编码在安装包的 `lib/maven-model-builder-x.x.x.jar` 里的 `default-bindings.xml`，不同发行渠道（Homebrew / apt / yum）打包时内嵌的版本不同。例如：

- macOS Homebrew Maven 3.9.9 默认 `maven-resources-plugin:3.3.1`
- Linux apt Maven 3.9.9 默认 `maven-resources-plugin:3.4.0`

**解决**：在 `pom.xml` 的 `pluginManagement` 里显式锁定所有用到的插件版本，不依赖 Maven 默认值：

```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.3.1</version>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

## 坑2：_remote.repositories 导致离线模式失败

**现象**：jar 文件明明存在于本地仓库，`mvn -o` 离线模式仍然报错：

```
cached from a remote repository ID that is unavailable in current build context
Cannot access xxx in offline mode and the artifact has not been downloaded from it before
```

**原因**：每个 jar 旁边有一个 `_remote.repositories` 文件，记录了该 jar 原来是从哪个仓库 ID 下载的（如 `central`）。迁移到新环境后，仓库 ID 变成了 `maven-zorth-group-all`，两者不匹配，Maven 认为需要重新验证，离线模式下无法验证就报错。

**解决**：删除所有 `_remote.repositories` 文件：

```bash
find /data/code/repo -name "_remote.repositories" -delete
```

然后正常离线运行：

```bash
mvn -o clean compile
```

---

## 最佳实践：完整离线迁移步骤

1. 在外网机器上执行一次完整构建，确保所有依赖和插件都已下载到本地仓库
2. 删除 `.lastUpdated` 文件（失败缓存标记）：

    ```bash
    find /path/to/repo -name "*.lastUpdated" -delete
    ```

3. 打包整个本地仓库复制到内网：

    ```bash
    tar -czf maven-repo.tar.gz -C /Users/zorth/Code/repository maven
    ```

4. 内网解压到对应路径，删除 `_remote.repositories`：

    ```bash
    find /data/code/repo -name "_remote.repositories" -delete
    ```

5. 在 `pom.xml` 里用 `pluginManagement` 锁定所有插件版本
6. 用 `-o` 离线模式运行：

    ```bash
    mvn -o clean compile
    ```
