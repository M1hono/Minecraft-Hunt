// packmode: Dev
// ServerEvents.tags('worldgen/biome', event => {
//     // /**地形 */
//     // //平原
//     // const plains = event.get('forge:is_plains').getObjectIds().filter(
//     //     biome => !isMountain(biome) && !isPlateau(biome)
//     // )
//     // const mediumTemperaturePlains = plains.filter(biome => !isHotOverworld(biome) && !isColdOverworld(biome));
//     // const lowTemperaturePlains = plains.filter(biome => isColdOverworld(biome) || isSnowy(biome));
//     // const highTemperaturePlains = plains.filter(biome => isHotOverworld(biome));

//     // const highHumidityPlains = plains.filter(biome => isWetOverworld(biome));
//     // const lowHumidityPlains = plains.filter(biome => isDryOverworld(biome));
//     // const mediumPlains = plains.filter(biome => !isDryOverworld(biome) && !isWetOverworld(biome));
//     // const rarePlains = plains.filter(biome => isRare(biome));


//     // const snowy = event.get('forge:is_snowy').getObjectIds();
//     // const sandy = event.get('forge:is_sandy').getObjectIds();
//     // const plateau = event.get('forge:is_plateau').getObjectIds();
//     // const mountain = event.get('forge:is_mountain').getObjectIds();
//     // const peak = event.get('forge:is_peak').getObjectIds();

//     /**Overworld 地理类型 */
//     const surface = event.get('minecraft:is_overworld').getObjectIds().filter(biome => !event.get('minecraft:is_ocean').getObjectIds().contains(biome) && !event.get('minecraft:is_river').getObjectIds().contains(biome) && !event.get('forge:is_cave').getObjectIds().contains(biome) && !event.get('forge:is_underground').getObjectIds().contains(biome))
//     const underground = event.get('forge:is_cave').getObjectIds().concat(event.get('forge:is_underground').getObjectIds())
//     const river = event.get('minecraft:is_river').getObjectIds();
//     const ocean = event.get('minecraft:is_ocean').getObjectIds();
//     //地表
//     event.add('region:overworld/surface', surface);
//     //地下
//     event.add('region:overworld/underground', underground);
//     //河流
//     event.add('region:overworld/river', river);
//     //海洋
//     event.add('region:overworld/ocean', ocean);
//     function isLand(biome) {
//         return event.get('region:overworld/surface').getObjectIds().contains(biome);
//     }
//     function isUnderground(biome) {
//         return event.get('region:overworld/underground').getObjectIds().contains(biome);
//     }
//     function isRiver(biome) {
//         return event.get('region:overworld/river').getObjectIds().contains(biome);
//     }
//     function isOcean(biome) {
//         return event.get('region:overworld/ocean').getObjectIds().contains(biome);
//     }

//     /**大陆温度带 */
//     const landTemperatureHigh = surface.filter(biome => isHotOverworld(biome));
//     const landTemperatureLow = surface.filter(biome => isColdOverworld(biome));
//     const landTemperatureMedium = surface.filter(biome => !isHotOverworld(biome) && !isColdOverworld(biome));
//     //高温带
//     event.add('region:overworld/surface/temperature/high', landTemperatureHigh);
//     //中温带
//     event.add('region:overworld/surface/temperature/medium', landTemperatureMedium);
//     //低温带
//     event.add('region:overworld/surface/temperature/low', landTemperatureLow);
//     function isTemperatureHigh(biome) {
//         return event.get('region:overworld/surface/temperature/high').getObjectIds().contains(biome);
//     }
//     function isTemperatureMedium(biome) {
//         return event.get('region:overworld/surface/temperature/medium').getObjectIds().contains(biome);
//     }
//     function isTemperatureLow(biome) {
//         return event.get('region:overworld/surface/temperature/low').getObjectIds().contains(biome);
//     }

//     /**大陆湿度带 */
//     const landHumidityHigh = surface.filter(biome => isWetOverworld(biome));
//     const landHumidityLow = surface.filter(biome => isDryOverworld(biome));
//     const landHumidityMedium = surface.filter(biome => !isWetOverworld(biome) && !isDryOverworld(biome));
//     //陆地湿润带
//     event.add('region:overworld/surface/humidity/high', landHumidityHigh);
//     //陆地干旱带
//     event.add('region:overworld/surface/humidity/medium', landHumidityMedium);
//     //陆地适宜带
//     event.add('region:overworld/surface/humidity/low', landHumidityLow);
//     function isHumidityHigh(biome) {
//         return event.get('region:overworld/surface/humidity/high').getObjectIds().contains(biome);
//     }
//     function isHumidityMedium(biome) {
//         return event.get('region:overworld/surface/humidity/medium').getObjectIds().contains(biome);
//     }
//     function isHumidityLow(biome) {
//         return event.get('region:overworld/surface/humidity/low').getObjectIds().contains(biome);
//     }
//     /**大陆植被带 */
//     const landVegetationHigh = surface.filter(biome => isDenseOverworld(biome));
//     const landVegetationLow = surface.filter(biome => isSparseOverworld(biome));
//     const landVegetationMedium = surface.filter(biome => !isDenseOverworld(biome) && !isSparseOverworld(biome));
//     //茂密带
//     event.add('region:overworld/surface/vegetation/high', landVegetationHigh);
//     //稀疏带
//     event.add('region:overworld/surface/vegetation/low', landVegetationLow);
//     //中等带
//     event.add('region:overworld/surface/vegetation/medium', landVegetationMedium);
//     function isVegetationHigh(biome) {
//         return event.get('region:overworld/surface/vegetation/high').getObjectIds().contains(biome);
//     }
//     function isVegetationLow(biome) {
//         return event.get('region:overworld/surface/vegetation/low').getObjectIds().contains(biome);
//     }
//     function isVegetationMedium(biome) {
//         return event.get('region:overworld/surface/vegetation/medium').getObjectIds().contains(biome);
//     }
//     /**大陆海拔 */
//     const elevation = undefined;
//     //高海拔
//     const elevationHigh = [
//         'minecraft:stony_peaks',//石峰
//         'wythers:tibesti_mountains', //提贝斯蒂山脉
//         'wythers:desert_pinnacles',//沙漠尖峰

//         'wythers:tropical_volcano',//热带火山
//         'wythers:volcanic_crater',//火山口
//         'wythers:volcano',//火山

//         'wythers:tepui',//平顶山
//         'wythers:thermal_taiga_crags',//温热针叶林峭壁
//     ]
//     //低海拔
//     const elevationLow = [
//         'minecraft:mangrove_swamp',//红树林沼泽
//         'wythers:desert_lakes',//沙漠湖泊
//         'mud_pools',//泥浆池 
//         'wythers:pantanal',//潘塔纳尔湿地
//         'wythers:salt_lakes_pink', //玫瑰盐湖 
//         'wythers:salt_lakes_turquoise', //绿松石盐湖 
//         'wythers:salt_lakes_white',//素白盐湖 

//         'wythers:jungle_island',//丛林岛屿
//         'wythers:tropical_beach',//热带海滩

//         'minecraft:desert',//沙漠
//         'wythers:desert_beach',//沙漠沙滩
//         'wythers:desert_island',//沙漠岛屿
//         'wythers:guelta',//峡间绿洲
//         'wythers:jacaranda_savanna',//蓝花楹大草原
//         'wythers:red_desert',//红色沙漠
//         'wythers:savanna_basaltic_incursions',//玄武岩侵蚀热带草原,

//         'minecraft:eroded_badlands',//被侵蚀的荒地
//         'wythers:kwongan_heath',//奥石南荒原
//         'wythers:scrubland',//灌丛地
//         'wythers:scrub_forest',//灌丛森林
//         'wythers:wooded_desert',//繁茂沙漠

//         'wythers:ancient_oak_swamp',//远古橡树林沼泽
//         'wythers:flooded_jungle',//泛洪丛林
//         'wythers:flooded_rainforest',//泛洪雨林
//         'wythers:flooded_temperate_rainforest',//泛洪温带雨林

//         'minecraft:swamp',//沼泽
//         'minecraft:beach',//沙滩
//         'wythers:ancient_mossy_swamp',//远古覆苔沼泽
//         'wythers:autumnal_swamp',//秋季沼泽
//         'wythers:bamboo_jungle_swamp',//竹林沼泽
//         'wythers:bamboo_swamp',//竹生沼泽
//         'wythers:bayou',//湖沼
//         'wythers:berry_bog',//浆果泥沼
//         'wythers:birch_swamp',//桦树林沼泽
//         'wythers:dripleaf_swamp',//垂滴叶沼泽
//         'wythers:fen',//洼沼
//         'wythers:flowering_pantanal',//繁花潘塔纳尔湿地
//         'wythers:marsh',//草沼
//         'wythers:mediterranean_island_thermal_springs',//地中海温泉岛屿
//         'wythers:old_growth_taiga_swamp',//原始针叶林沼泽
//         'wythers:phantasmal_swamp',//幻象沼泽
//         'wythers:tangled_forest',//缠根森林
//         'wythers:thermal_taiga',//温热针叶林
//         'wythers:waterlily_swamp',//睡莲沼泽

//         "wythers:humid_tropical_grassland",//湿热草地
//         "minecraft:old_growth_spruce_taiga",//原始针叶林
//         "minecraft:dark_forest",//黑森林
//         "minecraft:old_growth_birch_forest",//原始桦木森林
//         "wythers:ancient_copper_beech_forest",//远古铜紫山毛榉森林
//         "wythers:ancient_emerald_beech_forest",//远古翡绿山毛榉森林
//         "wythers:ancient_golden_beech_forest",//远古金黄山毛榉森林
//         "wythers:ancient_moss_forest",//远古覆苔森林
//         "wythers:deep_dark_forest",//深暗森林
//         "wythers:eucalyptus_deanei_forest",//迪思桉木森林
//         "wythers:eucalyptus_jungle",//桉木热带雨林
//         "wythers:eucalyptus_jungle_canyon",//桉木热带雨林峡谷
//         "wythers:forbidden_forest",//禁忌森林
//         "wythers:phantasmal_forest",//幻象森林
//         "wythers:wistman_woods",//威丝曼森林

//     ]
//     for (const biome of surface) {
//         let biomeStr = biome.toString();

//         //高海拔 风袭 山峰
//         if (biomeStr.includes('wind') || biomeStr.includes('mountain') || biomeStr.includes('peak') || biomeStr.includes('volcano') || biomeStr.includes('volcanic') || biomeStr.includes('grove') || biomeStr.includes('eroded_badlands') || biomeStr.includes('crags') || biomeStr.includes('ice_cap') || biomeStr.includes('tepui') || biomeStr.includes('glacial_cliffs')) {
//             event.add('region:overworld/surface/elevation/high', biome);
//         }
//         //中海拔 山麓过渡地带 高地
//         else if (biomeStr.includes('hill') || biomeStr.includes('meadow') || biomeStr.includes('plateau') || biomeStr.includes('highland') || biomeStr.includes('slopes') || biomeStr.includes('wooded_badlands') || biomeStr.includes('ayers_rock') || biomeStr.includes('tundra') || biomeStr.includes('kwongan_heath') || biomeStr.includes('sparse_eucalyptus_woodland')) {
//             event.add('region:overworld/surface/elevation/medium', biome);
//         }
//         //低海拔 平原 湿地 沙漠 森林
//         else if (biomeStr.includes('forest') || biomeStr.includes('plains') || biomeStr.includes('swamp') || biomeStr.includes('bayou') || biomeStr.includes('lake') || biomeStr.includes('beach') || biomeStr.includes('taiga') || biomeStr.includes('canyon') || biomeStr.includes('island') || biomeStr.includes('desert') || biomeStr.includes('shore') || biomeStr.includes('jungle') || biomeStr.includes('pantanal') || biomeStr.includes('mushroom_fields') || biomeStr.includes('savanna') || biomeStr.includes('bog') || biomeStr.includes('fen') || biomeStr.includes('mud_pools') || biomeStr.includes('ice_spikes') || biomeStr.includes('calcite_coast') || biomeStr.includes('chaparral') || biomeStr.includes('grassland') || biomeStr.includes('marsh') || biomeStr.includes('outback') || biomeStr.includes('pine_barrens') || biomeStr.includes('sand_dunes') || biomeStr.includes('scrubland') || biomeStr.includes('spring_flower_fields') || biomeStr.includes('wistman_woods') || biomeStr.includes('badlands') || biomeStr.includes('eucalyptus') || biomeStr.includes('guelta') || biomeStr.includes('harvest_fields')) {
//             event.add('region:overworld/surface/elevation/low', biome);
//         }
//         //未知
//         else {
//             event.add('region:overworld/surface/elevation/unknow', biome);
//         }
//     }
//     function isElevationHigh(biome) {
//         return event.get('region:overworld/surface/elevation/high').getObjectIds().contains(biome);
//     }
//     function isElevationMedium(biome) {
//         return event.get('region:overworld/surface/elevation/medium').getObjectIds().contains(biome);
//     }
//     function isElevationLow(biome) {
//         return event.get('region:overworld/surface/elevation/low').getObjectIds().contains(biome);
//     }
//     const unknow = event.get('region:overworld/surface/elevation/unknow').getObjectIds().map(
//         biome => biome = `\n${biome}`
//     )
//     // console.info(`${unknow}`);

//     // for (const biome of elevationHigh) {
//     //     event.add('region:overworld/surface/elevation/high', biome);
//     // }
//     // for (const biome of elevationLow) {
//     //     event.add('region:overworld/surface/elevation/low', biome);
//     // }
//     // for (const biome of surface) {
//     //     let isElevationHigh = event.get('region:overworld/surface/elevation/high').getObjectIds().contains(biome);
//     //     let isElevationLow = event.get('region:overworld/surface/elevation/low').getObjectIds().contains(biome);
//     //     if (!isElevationHigh && !isElevationLow) {
//     //         event.add('region:overworld/surface/elevation/medium', biome);
//     //     }
//     // }

//     /**混合: 温度 湿度 植被*/
//     //高温
//     event.add('region:overworld/surface/temperature/high/humidity/high/vegetation/high', surface.filter(biome => isTemperatureHigh(biome) && isHumidityHigh(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/high/vegetation/medium', surface.filter(biome => isTemperatureHigh(biome) && isHumidityHigh(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/high/vegetation/low', surface.filter(biome => isTemperatureHigh(biome) && isHumidityHigh(biome) && isVegetationLow(biome)))

//     event.add('region:overworld/surface/temperature/high/humidity/medium/vegetation/high', surface.filter(biome => isTemperatureHigh(biome) && isHumidityMedium(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/medium/vegetation/medium', surface.filter(biome => isTemperatureHigh(biome) && isHumidityMedium(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/medium/vegetation/low', surface.filter(biome => isTemperatureHigh(biome) && isHumidityMedium(biome) && isVegetationLow(biome)))

//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/high', surface.filter(biome => isTemperatureHigh(biome) && isHumidityLow(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/medium', surface.filter(biome => isTemperatureHigh(biome) && isHumidityLow(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/low', surface.filter(biome => isTemperatureHigh(biome) && isHumidityLow(biome) && isVegetationLow(biome)))
//     //算海拔
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/high/elevation/high', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/high').getObjectIds().filter(biome => isElevationHigh(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/high/elevation/medium', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/high').getObjectIds().filter(biome => isElevationMedium(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/high/elevation/low', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/high').getObjectIds().filter(biome => isElevationLow(biome)))

//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/medium/elevation/high', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/medium').getObjectIds().filter(biome => isElevationHigh(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/medium/elevation/medium', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/medium').getObjectIds().filter(biome => isElevationMedium(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/medium/elevation/low', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/medium').getObjectIds().filter(biome => isElevationLow(biome)))

//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/low/elevation/high', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/low').getObjectIds().filter(biome => isElevationHigh(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/low/elevation/medium', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/low').getObjectIds().filter(biome => isElevationMedium(biome)))
//     event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/low/elevation/low', event.get('region:overworld/surface/temperature/high/humidity/high/vegetation/low').getObjectIds().filter(biome => isElevationLow(biome)))



//     //中温
//     event.add('region:overworld/surface/temperature/medium/humidity/high/vegetation/high', surface.filter(biome => isTemperatureMedium(biome) && isHumidityHigh(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/medium/humidity/high/vegetation/medium', surface.filter(biome => isTemperatureMedium(biome) && isHumidityHigh(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/medium/humidity/high/vegetation/low', surface.filter(biome => isTemperatureMedium(biome) && isHumidityHigh(biome) && isVegetationLow(biome)))

//     event.add('region:overworld/surface/temperature/medium/humidity/medium/vegetation/high', surface.filter(biome => isTemperatureMedium(biome) && isHumidityMedium(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/medium/humidity/medium/vegetation/medium', surface.filter(biome => isTemperatureMedium(biome) && isHumidityMedium(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/medium/humidity/medium/vegetation/low', surface.filter(biome => isTemperatureMedium(biome) && isHumidityMedium(biome) && isVegetationLow(biome)))

//     event.add('region:overworld/surface/temperature/medium/humidity/low/vegetation/high', surface.filter(biome => isTemperatureMedium(biome) && isHumidityLow(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/medium/humidity/low/vegetation/medium', surface.filter(biome => isTemperatureMedium(biome) && isHumidityLow(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/medium/humidity/low/vegetation/low', surface.filter(biome => isTemperatureMedium(biome) && isHumidityLow(biome) && isVegetationLow(biome)))

//     //低温
//     event.add('region:overworld/surface/temperature/low/humidity/high/vegetation/high', surface.filter(biome => isTemperatureLow(biome) && isHumidityHigh(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/low/humidity/high/vegetation/medium', surface.filter(biome => isTemperatureLow(biome) && isHumidityHigh(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/low/humidity/high/vegetation/low', surface.filter(biome => isTemperatureLow(biome) && isHumidityHigh(biome) && isVegetationLow(biome)))

//     event.add('region:overworld/surface/temperature/low/humidity/medium/vegetation/high', surface.filter(biome => isTemperatureLow(biome) && isHumidityMedium(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/low/humidity/medium/vegetation/medium', surface.filter(biome => isTemperatureLow(biome) && isHumidityMedium(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/low/humidity/medium/vegetation/low', surface.filter(biome => isTemperatureLow(biome) && isHumidityMedium(biome) && isVegetationLow(biome)))

//     event.add('region:overworld/surface/temperature/low/humidity/low/vegetation/high', surface.filter(biome => isTemperatureLow(biome) && isHumidityLow(biome) && isVegetationHigh(biome)))
//     event.add('region:overworld/surface/temperature/low/humidity/low/vegetation/medium', surface.filter(biome => isTemperatureLow(biome) && isHumidityLow(biome) && isVegetationMedium(biome)))
//     event.add('region:overworld/surface/temperature/low/humidity/low/vegetation/low', surface.filter(biome => isTemperatureLow(biome) && isHumidityLow(biome) && isVegetationLow(biome)))
//     // //输出
//     // console.info(`中温地区: ${event.get('region:overworld/surface/temperature/medium/humidity/medium/vegetation/medium').getObjectIds().map(biome => biome = '\n' + `"${biome}"` + ',//' + biome.toLanguageKey('biome'))}`);

//     //热带森林河
//     event.add('minecraft:is_river', 'wythers:tropical_forest_river')
//     // /**平原类型 */
//     // event.add('region:overworld/surface/plains', plains);
//     // event.add('region:overworld/surface/plains/temperature/high', highTemperaturePlains);
//     // event.add('region:overworld/surface/plains/temperature/medium', mediumTemperaturePlains);
//     // event.add('region:overworld/surface/plains/temperature/low', lowTemperaturePlains);
//     // event.add('region:overworld/surface/plains/humidity/high', highHumidityPlains);
//     // event.add('region:overworld/surface/plains/humidity/medium', mediumPlains);
//     // event.add('region:overworld/surface/plains/humidity/low', lowHumidityPlains);
//     // event.add('region:overworld/surface/plains/rare', rarePlains);


//     // function isRiver(biome) {
//     //     return event.get('minecraft:is_river').getObjectIds().contains(biome);
//     // }

//     // function isOcean(biome) {
//     //     return event.get('minecraft:is_ocean').getObjectIds().contains(biome);
//     // }

//     // /**地势 */
//     // //平原
//     // function isPlains(biome) {
//     //     return event.get('forge:is_plains').getObjectIds().contains(biome);
//     // }
//     // //山坡
//     // function isPlateau(biome) {
//     //     return event.get('forge:is_plateau').getObjectIds().contains(biome);
//     // }
//     // //山脉
//     // function isMountain(biome) {
//     //     return event.get('forge:is_mountain').getObjectIds().contains(biome);
//     // }
//     // //山峰
//     // function isPeak(biome) {
//     //     return event.get('forge:is_peak').getObjectIds().contains(biome);
//     // }
//     // //覆雪
//     // function isSnowy(biome) {
//     //     return event.get('forge:is_snowy').getObjectIds().contains(biome);
//     // }
//     // //覆沙
//     // function isSandy(biome) {
//     //     return event.get('forge:is_sandy').getObjectIds().contains(biome);
//     // }

//     /**温度 */
//     //生物群系是主世界中的炎热地带吗
//     function isHotOverworld(biome) {
//         return event.get('forge:is_hot/overworld').getObjectIds().contains(biome);
//     }
//     //生物群系是主世界中的寒冷地带吗
//     function isColdOverworld(biome) {
//         return event.get('forge:is_cold/overworld').getObjectIds().contains(biome);
//     }

//     /**湿度 */
//     //生物群系是主世界中的干旱地带吗
//     function isDryOverworld(biome) {
//         return event.get('forge:is_dry/overworld').getObjectIds().contains(biome);
//     }
//     //生物群系是主世界中的湿润地带吗
//     function isWetOverworld(biome) {
//         return event.get('forge:is_wet/overworld').getObjectIds().contains(biome);
//     }

//     /**植被 */
//     //生物群系是主世界中的植被茂密地带吗
//     function isDenseOverworld(biome) {
//         return event.get('forge:is_dense/overworld').getObjectIds().contains(biome);
//     }
//     //生物群系是主世界中的植被稀疏地带吗
//     function isSparseOverworld(biome) {
//         return event.get('forge:is_sparse/overworld').getObjectIds().contains(biome);
//     }

//     //是稀有的
//     function isRare(biome) {
//         return event.get('forge:is_rare').getObjectIds().contains(biome);
//     }

//     // //遍历地表生物群系进行分类
//     // for (const biome of surface) {
//     //     //温度计算
//     //     let temHigh = isTemperatureHigh(biome);
//     //     let temMedium = isTemperatureMedium(biome);
//     //     let temLow = isTemperatureLow(biome);
//     //     //湿度计算
//     //     let humHigh = isHumidityHigh(biome);
//     //     let humMedium = isHumidityMedium(biome);
//     //     let humLow = isHumidityLow(biome);
//     //     //植被计算
//     //     let vegHigh = isVegetationHigh(biome);
//     //     let vegMedium = isVegetationMedium(biome);
//     //     let vegLow = isVegetationLow(biome);
//     //     //海拔计算
//     //     let eleHigh = isElevationHigh(biome);
//     //     let eleMedium = isElevationMedium(biome);
//     //     let eleLow = isElevationLow(biome);
        
//     //     if(temHigh && humHigh && vegHigh){
//     //         event.add('region:jungle', biome);
//     //     }
//     // }

// //     let t = event.get('soyorin:temperate').objectIds
// //     let tf = event.get('soyorin:temperate/forest').objectIds
// //     let tp = event.get('soyorin:temperate/plains').objectIds
// // let arr = [];
// //     for(const b of t){
// //         if(!tf.contains(b) && !tp.contains(b)){
// //             arr.push(b);
// //         }
// //     }
// //     console.info(`测试: ${arr.map(e => e = '\n' + `"${e}"` )}`)

//     console.info(`地表: ${event.get('region:overworld/surface').objectIds.map(biome => biome = '\n' + `"${biome}"`)}`)
//     console.info(`地下: ${event.get('region:overworld/underground').objectIds.map(biome => biome = '\n' + `"${biome}"`)}`)
//     console.info(`河流: ${event.get('region:overworld/river').objectIds.map(biome => biome = '\n' + `"${biome}"`)}`)
//     console.info(`海洋: ${event.get('region:overworld/ocean').objectIds.map(biome => biome = '\n' + `"${biome}"`)}`)

//     // for (const biome of surface){
//     //     let b = biome.toString();
//     //     //热带草原
//     //     if(b.includes('jungle')){
//     //         event.add('soyorin:jungle', biome);
//     //     }else if(b.includes('savanna')){
//     //         event.add('soyorin:savanna', biome);
//     //     }
//     // }
// })
