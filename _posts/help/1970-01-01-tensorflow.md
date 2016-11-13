---
category: help
layout: help
mirrorid: tensorflow
---

# TensorFlow 镜像使用帮助

TensorFlow 安装方法请参考 <https://www.tensorflow.org/get_started>。将

```bash
export TF_BINARY_URL=https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.11.0rc2-cp27-none-linux_x86_64.whl
```

替换成

```bash
export TF_BINARY_URL=https://mirrors.tuna.tsinghua.edu.cn/tensorflow/linux/cpu/tensorflow-0.11.0rc2-cp27-none-linux_x86_64.whl
```

即可。其他平台同理。
