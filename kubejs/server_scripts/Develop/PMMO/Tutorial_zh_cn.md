> 在Project MMO的2.0更新中，该模组对代码进行了重构，重构后的模组虽保留了核心机制但实现的细节与配置的方式都大有不同，该模组将在Wiki的翻译基础上加入我本人的体验与魔改经验，来帮助大家更好地使用与配置该模组。

## 文件结构
> 注: 我的世界实例的文件结构应为: 启动器所在文件夹/.minecraft/version/游戏版本文件夹/或启动器所在文件夹/.minecraft/，该情况仅限于常见的启动器，如有其他启动器有不同的情况欢迎在评论中补充。

> 本教程所使用模组版本为pmmo-1.20.1-1.3.22。

文件结构的改动是对于玩家来说最直观的。
在2.0版本中，原本位于config/pmmo/文件夹中的配置被更改为了数据包与服务端配置文件；
其中一些较为基础的全局配置与客户端配置存储于config/pmmo-common.toml与config/pmmo-client.toml中。
其余的部分则存储于Serverconfig或需要使用数据包来定义。

### 结构概览
.minecraft/
├── configs/

│   ├── pmmo-client.toml 控制技能、经验获取、工具提示与连锁挖矿相关的显示。

│   └── pmmo-common.toml 调试用，通常该配置文件无需被使用。

└── saves/

    └── world/ 你的存档名，通常你可以将此处的配置文件存于defaultconfigs/

        └── serverconfig/

            ├── pmmo-AntiCheese.toml 反作弊相关设置，默认加入了未开启的钓鱼反作弊。

            ├── pmmo-AutoValues.toml 通过物品、方块和实体的属性与该文件的配置，可以自动为物品赋值使用需求与经验值获取，会被额外的配置如数据包覆盖。

            ├── pmmo-Globals.toml 当前用于简写数据包中NBT的Path，constants当前未实现任何功能。

            ├── pmmo-Perks.toml 控制玩家在提升等级时获取的收益以及等级为玩家带来的属性上的成长，可在此处禁用烟花火箭。

            ├── pmmo-Skills.toml 定义技能的最高等级与其显示的图标。
            
            └── pmmo-server.toml 所有该模组的核心配置都存放于此处，包括但不限于全局的经验获取速率、升级所需经验、经验获取的方式以及各种需求的开关。