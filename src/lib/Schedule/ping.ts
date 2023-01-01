import { system, world, MinecraftDimensionTypes } from "@minecraft/server";

async function getServerTPS(): Promise<number> {
    let startTime = Date.now();
    let ticks = 0;
    return new Promise((resolve) => {
        let s = system.runSchedule(() => {
            if (Date.now() - startTime < 1000) {
                ticks++;
            } else {
                system.clearRunSchedule(s);
                resolve(ticks);
            }
        });
    });
}

new Promise(() => {
    system.runSchedule(() => {
        var ticks = getServerTPS();
        world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(`scoreboard players set * ping ${ticks}`);
    }, 1000);
});