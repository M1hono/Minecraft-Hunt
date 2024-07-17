//反射PatchouliAPI
const $PatchouliAPI = Java.loadClass('vazkii.patchouli.api.PatchouliAPI');
//反射可以创建java字符的类
const $Character = Java.loadClass('java.lang.Character');
//多方块所需要方块
//使用global变量方便游戏里面调试修改，以下同理
global.Test_MultiBlock = {
    G: Block.getBlock('minecraft:obsidian'),
    O: Block.getBlock('minecraft:sculk_shrieker')
}
//创建结构,注意字符0是必须的，0是中心方块的标识符
global.Test_MultiBlock_Machine = () =>
    $PatchouliAPI.get().makeMultiblock(
        [
            ["   ", "   ", "   "],
            ["   ", " 0 ", "   "],
            ["ggg", "ggg", "ggg"],
        ],
        new $Character('g'),
        global.Test_MultiBlock.G,
        new $Character('0'),
        global.Test_MultiBlock.O
    )
//这里在后面方便传入server_scripts或其他
global.MULTIBLOCK = {
    ClayAltar: global.ClayAltar,
    Test_MultiBlock_Machine: global.Test_MultiBlock_Machine
}
//在游戏初始化时注册其结构
StartupEvents.postInit((event) => {
    $PatchouliAPI.get().registerMultiblock(
        //传入一个注册名和结构
        ResourceLocation("kubejs:test_multiblock_machine"),
        global.Test_MultiBlock_Machine()
    );
})
/**
 * @example
 * 
 * /**
 * param {Internal.Level} level //传入世界
 * param {Internal.BlockPos$MutableBlockPos} pos //传入结构相应方块
 * returns {Boolean} //放回是否满足结构的布尔值
 * global.MULTIBLOCK.Test_MultiBlock_Machine().validate(level, pos)  == null
 * BlockEvents.rightClicked('minecraft:beacon', (event) => {
    const { item, level, block } = event
    const { pos } = block
    if(item != "minecraft:stick" || level.isClientSide()) {
        return
    }
    let rotation1 = global.MULTIBLOCK.ClayAltar().validat(level, pos)
    if(rotation1 === null){
        return
    }
    block.up.popItem("clay_ball")
})
 */