> In the 2.0 update of Project MMO, the mod's code has been refactored. Although the core mechanics are retained, the implementation details and configuration methods have changed significantly. This tutorial will include my personal experience and modifications based on the translated Wiki to help you better use and configure the mod.

## File Structure
> Note: The file structure of a Minecraft instance should be: Launcher folder/.minecraft/version/game version folder/ or Launcher folder/.minecraft/. This applies only to common launchers. If you use a different launcher, feel free to add a note in the comments.

> The mod version used in this tutorial is pmmo-1.20.1-1.3.22.

Changes to the file structure are the most intuitive for players.
In version 2.0, the configuration that was originally located in the config/pmmo/ folder has been changed to data packs and server configuration files.
Some basic global configurations and client configurations are stored in config/pmmo-common.toml and config/pmmo-client.toml.
The rest are stored in Serverconfig or need to be defined using data packs.

### Structure Overview
.minecraft/<br>
├── configs/<br>
│   ├── pmmo-client.toml Controls display related to skills, experience acquisition, tooltips, and vein mining.<br>
│   └── pmmo-common.toml For debugging purposes, this configuration file is usually not needed.<br>
└── saves/<br>
    └── world/ Your save name, usually you can store the configuration files here in defaultconfigs/<br>
        └── serverconfig/<br>
            ├── pmmo-AntiCheese.toml **Settings related to anti-cheating**<br>
            **with fishing anti-cheat disabled by default.**<br>
            ├── pmmo-AutoValues.toml **Automatically assigns usage requirements and experience values to items based on their properties**<br>
            **and the configuration in this file**<br>
            **can be overridden by additional configurations such as data packs.**<br>
            ├── pmmo-Globals.toml **Currently used for shorthand NBT Paths in data packs**<br>
            **constants currently have no implemented functionality.**<br>
            ├── pmmo-Perks.toml **Controls the benefits players receive when leveling up and the attribute growth associated with levels**<br>
            **fireworks can be disabled here.**<br>
            ├── pmmo-Skills.toml **Defines the maximum level of skills and their display icons.**<br>
            └── pmmo-server.toml **All core configurations of the mod are stored here**<br>
            **including but not limited to global experience acquisition rates, experience required for leveling up, methods of experience acquisition**<br>
            **and various requirement toggles.**<br>
