---
category: help
layout: help
mirrorid: hugging-face-models
---

## Hugging Face Model Hub 预训练模型镜像使用帮助

[Hugging Face Transformers](https://github.com/huggingface/transformers) 是自然语言处理领域的重要开源项目，提供了基于通用架构（如 BERT，GPT-2，RoBERTa）的数千个预训练模型，并提供了 PyTorch 和 TensorFlow 的良好互操作性。

我们镜像了 Hugging Face Model Hub，为国内用户下载预训练模型数据提供便利。

### 使用方法

注意：`transformers > 3.1.0` 的版本支持下面的 `mirror` 选项。

只需在 `from_pretrained` 函数调用中添加 `mirror` 选项，如：

```python
AutoModel.from_pretrained('bert-base-uncased', mirror='tuna')
```

目前内置的两个来源为 `tuna` 与 `bfsu`。此外，也可以显式提供镜像地址，如：

```python
AutoModel.from_pretrained('bert-base-uncased', mirror='https://{{ site.hostname }}/hugging-face-models')
```
