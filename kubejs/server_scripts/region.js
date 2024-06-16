ServerEvents.tags('worldgen/biome', event => {
    // /**地形 */
    // //平原
    // const plains = event.get('forge:is_plains').getObjectIds().filter(
    //     biome => !isMountain(biome) && !isPlateau(biome)
    // )
    // const mediumTemperaturePlains = plains.filter(biome => !isHotOverworld(biome) && !isColdOverworld(biome));
    // const lowTemperaturePlains = plains.filter(biome => isColdOverworld(biome) || isSnowy(biome));
    // const highTemperaturePlains = plains.filter(biome => isHotOverworld(biome));

    // const highHumidityPlains = plains.filter(biome => isWetOverworld(biome));
    // const lowHumidityPlains = plains.filter(biome => isDryOverworld(biome));
    // const mediumPlains = plains.filter(biome => !isDryOverworld(biome) && !isWetOverworld(biome));
    // const rarePlains = plains.filter(biome => isRare(biome));


    // const snowy = event.get('forge:is_snowy').getObjectIds();
    // const sandy = event.get('forge:is_sandy').getObjectIds();
    // const plateau = event.get('forge:is_plateau').getObjectIds();
    // const mountain = event.get('forge:is_mountain').getObjectIds();
    // const peak = event.get('forge:is_peak').getObjectIds();

    /**Overworld 地理类型 */
    const surface = event.get('minecraft:is_overworld').getObjectIds().filter(biome => !event.get('minecraft:is_ocean').getObjectIds().contains(biome) && !event.get('minecraft:is_river').getObjectIds().contains(biome) && !event.get('forge:is_cave').getObjectIds().contains(biome) && !event.get('forge:is_underground').getObjectIds().contains(biome))
    const underground = event.get('forge:is_cave').getObjectIds().concat(event.get('forge:is_underground').getObjectIds())
    const river = event.get('minecraft:is_river').getObjectIds();
    const ocean = event.get('minecraft:is_ocean').getObjectIds();
    //地表
    event.add('region:overworld/surface', surface);
    //地下
    event.add('region:overworld/underground', underground);
    //河流
    event.add('region:overworld/river', river);
    //海洋
    event.add('region:overworld/ocean', ocean);
    function isLand(biome) {
        return event.get('region:overworld/surface').getObjectIds().contains(biome);
    }
    function isUnderground(biome) {
        return event.get('region:overworld/underground').getObjectIds().contains(biome);
    }
    function isRiver(biome) {
        return event.get('region:overworld/river').getObjectIds().contains(biome);
    }
    function isOcean(biome) {
        return event.get('region:overworld/ocean').getObjectIds().contains(biome);
    }

    /**大陆温度带 */
    const landTemperatureHigh = surface.filter(biome => isHotOverworld(biome));
    const landTemperatureLow = surface.filter(biome => isColdOverworld(biome));
    const landTemperatureMedium = surface.filter(biome => !isHotOverworld(biome) && !isColdOverworld(biome));
    //高温带
    event.add('region:overworld/surface/temperature/high', landTemperatureHigh);
    //中温带
    event.add('region:overworld/surface/temperature/medium', landTemperatureMedium);
    //低温带
    event.add('region:overworld/surface/temperature/low', landTemperatureLow);
    function isTemperatureHigh(biome) {
        return event.get('region:overworld/surface/temperature/high').getObjectIds().contains(biome);
    }
    function isTemperatureMedium(biome) {
        return event.get('region:overworld/surface/temperature/medium').getObjectIds().contains(biome);
    }
    function isTemperatureLow(biome) {
        return event.get('region:overworld/surface/temperature/low').getObjectIds().contains(biome);
    }

    /**大陆湿度带 */
    const landHumidityHigh = surface.filter(biome => isWetOverworld(biome));
    const landHumidityLow = surface.filter(biome => isDryOverworld(biome));
    const landHumidityMedium = surface.filter(biome => !isWetOverworld(biome) && !isDryOverworld(biome));
    //陆地湿润带
    event.add('region:overworld/surface/humidity/high', landHumidityHigh);
    //陆地干旱带
    event.add('region:overworld/surface/humidity/medium', landHumidityMedium);
    //陆地适宜带
    event.add('region:overworld/surface/humidity/low', landHumidityLow);
    function isHumidityHigh(biome) {
        return event.get('region:overworld/surface/humidity/high').getObjectIds().contains(biome);
    }
    function isHumidityMedium(biome) {
        return event.get('region:overworld/surface/humidity/medium').getObjectIds().contains(biome);
    }
    function isHumidityLow(biome) {
        return event.get('region:overworld/surface/humidity/low').getObjectIds().contains(biome);
    }
    /**大陆植被带 */
    const landVegetationHigh = surface.filter(biome => isDenseOverworld(biome));
    const landVegetationLow = surface.filter(biome => isSparseOverworld(biome));
    const landVegetationMedium = surface.filter(biome => !isDenseOverworld(biome) && !isSparseOverworld(biome));
    //茂密带
    event.add('region:overworld/surface/vegetation/high', landVegetationHigh);
    //稀疏带
    event.add('region:overworld/surface/vegetation/low', landVegetationLow);
    //中等带
    event.add('region:overworld/surface/vegetation/medium', landVegetationMedium);
    function isVegetationHigh(biome) {
        return event.get('region:overworld/surface/vegetation/high').getObjectIds().contains(biome);
    }
    function isVegetationLow(biome) {
        return event.get('region:overworld/surface/vegetation/low').getObjectIds().contains(biome);
    }
    function isVegetationMedium(biome) {
        return event.get('region:overworld/surface/vegetation/medium').getObjectIds().contains(biome);
    }
    /**大陆海拔 */
    const elevation = undefined;
    const elevationHigh = [
        'minecraft:stony_peaks',//石峰
        'wythers:tibesti_mountains', //提贝斯蒂山脉
        'wythers:desert_pinnacles',//沙漠尖峰

        'wythers:tropical_volcano',//热带火山
        'wythers:volcanic_crater',//火山口
        'wythers:volcano',//火山
    ]
    const elevationLow = [
        'minecraft:mangrove_swamp',//红树林沼泽
        'wythers:desert_lakes',//沙漠湖泊
        'mud_pools',//泥浆池 
        'wythers:pantanal',//潘塔纳尔湿地
        'wythers:salt_lakes_pink', //玫瑰盐湖 
        'wythers:salt_lakes_turquoise', //绿松石盐湖 
        'wythers:salt_lakes_white',//素白盐湖 

        'wythers:jungle_island',//丛林岛屿
        'wythers:tropical_beach',//热带海滩

        'minecraft:desert',//沙漠
        'wythers:desert_beach',//沙漠沙滩
        'wythers:desert_island',//沙漠岛屿
        'wythers:guelta',//峡间绿洲
        'wythers:jacaranda_savanna',//蓝花楹大草原
        'wythers:red_desert',//红色沙漠
        'wythers:savanna_basaltic_incursions',//玄武岩侵蚀热带草原,

        'minecraft:eroded_badlands',//被侵蚀的荒地
        'wythers:kwongan_heath',//奥石南荒原
        'wythers:scrubland',//灌丛地

    ]
    for (const biome of elevationHigh) {
        event.add('region:overworld/surface/elevation/high', biome);
    }
    for (const biome of elevationLow) {
        event.add('region:overworld/surface/elevation/low', biome);
    }
    for (const biome of surface) {
        let isElevationHigh = event.get('region:overworld/surface/elevation/high').getObjectIds().contains(biome);
        let isElevationLow = event.get('region:overworld/surface/elevation/low').getObjectIds().contains(biome);
        if (!isElevationHigh && !isElevationLow) {
            event.add('region:overworld/surface/elevation/medium', biome);
        }
    }
    function isElevationHigh(biome) {
        return event.get('region:overworld/surface/elevation/high').getObjectIds().contains(biome);
    }
    function isElevationMedium(biome) {
        return event.get('region:overworld/surface/elevation/medium').getObjectIds().contains(biome);
    }
    function isElevationLow(biome) {
        return event.get('region:overworld/surface/elevation/low').getObjectIds().contains(biome);
    }
    /**混合: 温度 湿度 植被*/
    //高温
    event.add('region:overworld/surface/temperature/high/humidity/high/vegetation/high', surface.filter(biome => isTemperatureHigh(biome) && isHumidityHigh(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/high/humidity/high/vegetation/medium', surface.filter(biome => isTemperatureHigh(biome) && isHumidityHigh(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/high/humidity/high/vegetation/low', surface.filter(biome => isTemperatureHigh(biome) && isHumidityHigh(biome) && isVegetationLow(biome)))

    event.add('region:overworld/surface/temperature/high/humidity/medium/vegetation/high', surface.filter(biome => isTemperatureHigh(biome) && isHumidityMedium(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/high/humidity/medium/vegetation/medium', surface.filter(biome => isTemperatureHigh(biome) && isHumidityMedium(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/high/humidity/medium/vegetation/low', surface.filter(biome => isTemperatureHigh(biome) && isHumidityMedium(biome) && isVegetationLow(biome)))

    event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/high', surface.filter(biome => isTemperatureHigh(biome) && isHumidityLow(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/medium', surface.filter(biome => isTemperatureHigh(biome) && isHumidityLow(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/high/humidity/low/vegetation/low', surface.filter(biome => isTemperatureHigh(biome) && isHumidityLow(biome) && isVegetationLow(biome)))

    //中温
    event.add('region:overworld/surface/temperature/medium/humidity/high/vegetation/high', surface.filter(biome => isTemperatureMedium(biome) && isHumidityHigh(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/medium/humidity/high/vegetation/medium', surface.filter(biome => isTemperatureMedium(biome) && isHumidityHigh(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/medium/humidity/high/vegetation/low', surface.filter(biome => isTemperatureMedium(biome) && isHumidityHigh(biome) && isVegetationLow(biome)))

    event.add('region:overworld/surface/temperature/medium/humidity/medium/vegetation/high', surface.filter(biome => isTemperatureMedium(biome) && isHumidityMedium(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/medium/humidity/medium/vegetation/medium', surface.filter(biome => isTemperatureMedium(biome) && isHumidityMedium(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/medium/humidity/medium/vegetation/low', surface.filter(biome => isTemperatureMedium(biome) && isHumidityMedium(biome) && isVegetationLow(biome)))

    event.add('region:overworld/surface/temperature/medium/humidity/low/vegetation/high', surface.filter(biome => isTemperatureMedium(biome) && isHumidityLow(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/medium/humidity/low/vegetation/medium', surface.filter(biome => isTemperatureMedium(biome) && isHumidityLow(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/medium/humidity/low/vegetation/low', surface.filter(biome => isTemperatureMedium(biome) && isHumidityLow(biome) && isVegetationLow(biome)))

    //低温
    event.add('region:overworld/surface/temperature/low/humidity/high/vegetation/high', surface.filter(biome => isTemperatureLow(biome) && isHumidityHigh(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/low/humidity/high/vegetation/medium', surface.filter(biome => isTemperatureLow(biome) && isHumidityHigh(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/low/humidity/high/vegetation/low', surface.filter(biome => isTemperatureLow(biome) && isHumidityHigh(biome) && isVegetationLow(biome)))

    event.add('region:overworld/surface/temperature/low/humidity/medium/vegetation/high', surface.filter(biome => isTemperatureLow(biome) && isHumidityMedium(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/low/humidity/medium/vegetation/medium', surface.filter(biome => isTemperatureLow(biome) && isHumidityMedium(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/low/humidity/medium/vegetation/low', surface.filter(biome => isTemperatureLow(biome) && isHumidityMedium(biome) && isVegetationLow(biome)))

    event.add('region:overworld/surface/temperature/low/humidity/low/vegetation/high', surface.filter(biome => isTemperatureLow(biome) && isHumidityLow(biome) && isVegetationHigh(biome)))
    event.add('region:overworld/surface/temperature/low/humidity/low/vegetation/medium', surface.filter(biome => isTemperatureLow(biome) && isHumidityLow(biome) && isVegetationMedium(biome)))
    event.add('region:overworld/surface/temperature/low/humidity/low/vegetation/low', surface.filter(biome => isTemperatureLow(biome) && isHumidityLow(biome) && isVegetationLow(biome)))

    console.info(`干旱地区: ${event.get('region:overworld/surface/temperature/high/humidity/low/vegetation/low').getObjectIds()}`);

//热带森林河
    event.add('minecraft:is_river', 'wythers:tropical_forest_river')
    // /**平原类型 */
    // event.add('region:overworld/surface/plains', plains);
    // event.add('region:overworld/surface/plains/temperature/high', highTemperaturePlains);
    // event.add('region:overworld/surface/plains/temperature/medium', mediumTemperaturePlains);
    // event.add('region:overworld/surface/plains/temperature/low', lowTemperaturePlains);
    // event.add('region:overworld/surface/plains/humidity/high', highHumidityPlains);
    // event.add('region:overworld/surface/plains/humidity/medium', mediumPlains);
    // event.add('region:overworld/surface/plains/humidity/low', lowHumidityPlains);
    // event.add('region:overworld/surface/plains/rare', rarePlains);


    // function isRiver(biome) {
    //     return event.get('minecraft:is_river').getObjectIds().contains(biome);
    // }

    // function isOcean(biome) {
    //     return event.get('minecraft:is_ocean').getObjectIds().contains(biome);
    // }

    // /**地势 */
    // //平原
    // function isPlains(biome) {
    //     return event.get('forge:is_plains').getObjectIds().contains(biome);
    // }
    // //山坡
    // function isPlateau(biome) {
    //     return event.get('forge:is_plateau').getObjectIds().contains(biome);
    // }
    // //山脉
    // function isMountain(biome) {
    //     return event.get('forge:is_mountain').getObjectIds().contains(biome);
    // }
    // //山峰
    // function isPeak(biome) {
    //     return event.get('forge:is_peak').getObjectIds().contains(biome);
    // }
    // //覆雪
    // function isSnowy(biome) {
    //     return event.get('forge:is_snowy').getObjectIds().contains(biome);
    // }
    // //覆沙
    // function isSandy(biome) {
    //     return event.get('forge:is_sandy').getObjectIds().contains(biome);
    // }

    /**温度 */
    //生物群系是主世界中的炎热地带吗
    function isHotOverworld(biome) {
        return event.get('forge:is_hot/overworld').getObjectIds().contains(biome);
    }
    //生物群系是主世界中的寒冷地带吗
    function isColdOverworld(biome) {
        return event.get('forge:is_cold/overworld').getObjectIds().contains(biome);
    }

    /**湿度 */
    //生物群系是主世界中的干旱地带吗
    function isDryOverworld(biome) {
        return event.get('forge:is_dry/overworld').getObjectIds().contains(biome);
    }
    //生物群系是主世界中的湿润地带吗
    function isWetOverworld(biome) {
        return event.get('forge:is_wet/overworld').getObjectIds().contains(biome);
    }

    /**植被 */
    //生物群系是主世界中的植被茂密地带吗
    function isDenseOverworld(biome) {
        return event.get('forge:is_dense/overworld').getObjectIds().contains(biome);
    }
    //生物群系是主世界中的植被稀疏地带吗
    function isSparseOverworld(biome) {
        return event.get('forge:is_sparse/overworld').getObjectIds().contains(biome);
    }

    //是稀有的
    function isRare(biome) {
        return event.get('forge:is_rare').getObjectIds().contains(biome);
    }
})