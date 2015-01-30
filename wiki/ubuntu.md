Ubuntu 镜像使用帮助
===================

Ubuntu 的软件源配置文件是
`/etc/apt/sources.list`。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用
TUNA 的软件源镜像。

注意：Ubuntu
的版本代号(codename)是直接写在软件源配置文件中的，所以不同的版本所需的配置文件内容不通用。
下面仅贴出了最常用的版本的可用配置文件，其余版本请自行做相应修改（参考[这里](#more)）。

### 14.04 LTS
```
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty main multiverse restricted universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-backports main multiverse restricted universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-proposed main multiverse restricted universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-security main multiverse restricted universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-updates main multiverse restricted universe
deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty main multiverse restricted universe
deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-backports main multiverse restricted universe
deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-proposed main multiverse restricted universe
deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-security main multiverse restricted universe
deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-updates main multiverse restricted universe
```

### more

更多版本的设置，请参看下表中列出的 Ubuntu
版本号和代号的对应关系，将上面的配置中的代号全部替换为相应代号即可。

| 版本号 | 代号 | 完整代号 |
| ------ | ---- | -------- |
| 8.04 LTS | hardy | Hardy Heron |
| 10.04 LTS |	lucid | Lucid Lynx |
| 10.10 | maverick | Maverick Meerkat |
| 11.04 | natty | Natty Narwhal    |
| 11.10 | oneiric | Oneiric Ocelot   |
| 12.04 LTS | precise | Precise Pangolin |
| 12.10 | quantal | Quantal Quetzal |
| 13.04 | raring |  Raring Ringtail  |
| 13.10 | saucy |  Saucy Salamander  |
| 14.04 LTS | trusty | Trusty Tahr  |
| 14.10 | utopic | Utopic Unicorn   |

### 参考

Ubuntu 相关内容参考自 <http://mirror.bjtu.edu.cn/cn/howto.html>
