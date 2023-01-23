---
category: help
layout: help
mirrorid: elasticstack
---

# Elasticsearch 镜像安装帮助

[Elasticsearch](https://www.elastic.co/cn/what-is/elasticsearch) 是位于 Elastic Stack 核心的分布式搜索和分析引擎。

请参考[elasticsearch 官方安装教程](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html)。

以 Debian/Ubuntu 安装 7.x 为例，举例如下：

```shell
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://{{ site.hostname }}/elasticstack/7.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
sudo apt-get update && sudo apt-get install elasticsearch
```
