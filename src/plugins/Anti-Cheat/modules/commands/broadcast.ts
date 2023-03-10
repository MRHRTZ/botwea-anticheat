import { world } from "@minecraft/server";
import { Command } from "../../../../lib/Command/Command.js";
import { getRole } from "../../utils.js";

function broadcast(text: string) {
    if (!text) return;
    world.say({
        "rawtext":[
            {"text":`
§2§k===========================
§r§7====== §f[ §c§lBroadcast §f] §7======
§r§o ${text}
§r§2§k===========================
`},
        ]
    });
}

new Command({
  name: "broadcast",
  description: "Broadcast System",
  aliases: ["bc"],
  requires: (player) => ["admin", "moderator"].includes(getRole(player)),
})
  .string('message')
  .executes((ctx, message) => {
    broadcast(message);
  })
