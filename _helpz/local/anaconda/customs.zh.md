## 第三方源列表

您可以遵循上述配置文件中的格式添加第三方源（推荐），或者通过以下命令添加第三方源：

<tmpl z-lang="bash" z-input="channel">
conda config --set custom_channels.{{channel}} {{endpoint}}/cloud/
</tmpl>
