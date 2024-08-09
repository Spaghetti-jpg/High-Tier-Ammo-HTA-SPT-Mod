import { DependencyContainer } from "tsyringe";
import { IPostAkiLoadMod } from "@spt/models/external/IPostAkiLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

import * as fs from "fs";
import * as path from "path";

import * as tradersConfig from "../config/traders_id.json";
import * as config from "../config/config.json";

class ModLoader implements IPostAkiLoadMod {
    private container: DependencyContainer;

    public IPostAkiLoadMod(container: DependencyContainer): void {
        this.container = container;
        const logger = this.container.resolve<ILogger>("WinstonLogger");
        if (config.enableLogging) {
            logger.info("Mod: High Tier Ammo (HTA) 1.0.1 loaded");
        }
    }

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const dbServer = container.resolve<DatabaseServer>("DatabaseServer");
        const dbTables = dbServer.getTables();
        const enData = dbTables.locales.global.en;
        const checkAmmoIdExists = (ammoId: string): boolean => {
            return !!enData[`${ammoId} Name`];
        };

        const tradersAmmoConfig: { [key: string]: any[] } = {};
        const configDir = path.resolve(__dirname, "../config/ammo_traders");

        fs.readdirSync(configDir).forEach((file) => {
            if (file.endsWith(".json")) {
                const configFilePath = path.resolve(configDir, file);
                const configFile = require(configFilePath);

                for (const [key, value] of Object.entries(configFile)) {
                    tradersAmmoConfig[key] = value;
                }
            }
        });

        const messages: { text: string, color: LogTextColor }[] = [];

        for (const [traderKey, ammoList] of Object.entries(tradersAmmoConfig)) {
            const traderConfig = tradersConfig[traderKey];
            if (!traderConfig) {
                messages.push({ text: `Trader configuration not found for ${traderKey}.`, color: LogTextColor.RED });
                continue;
            }

            if (!ammoList || ammoList.length === 0) {
                messages.push({ text: `No ammo configuration found for trader ${traderKey}.`, color: LogTextColor.RED });
                continue;
            }

            ammoList.forEach((ammo) => {
                if (!ammo.ammo_id || ammo.ammo_id === "0" || ammo.buy_restriction_max <= 0 || ammo.price <= 0 || ammo.loyalty_level <= 0) {
                    return;
                }

                const ammoExists = checkAmmoIdExists(ammo.ammo_id);

                if (!ammoExists) {
                    return;
                }

                const ammoName = enData[`${ammo.ammo_id} Name`];

                // Check if the ammoName exists in config
                if (!(ammoName in config)) {
                    return;
                }

                // Check if the ammo should be added based on config
                if (config[ammoName] === false) {
                    if (config.logSkippedAmmo) {
                        messages.push({ text: `Ammo ${ammoName} for trader ${traderKey} is disabled. Skipping.`, color: LogTextColor.YELLOW });
                    }
                    return;
                }

                const newAmmoItem = {
                    "_id": ammo.ammo_id,
                    "_tpl": ammo.ammo_id,
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": 9999999,
                        "BuyRestrictionMax": ammo.buy_restriction_max,
                        "BuyRestrictionCurrent": 0
                    }
                };

                const traderItems = dbTables.traders[traderConfig.id].assort.items;
                const traderBarterScheme = dbTables.traders[traderConfig.id].assort.barter_scheme;
                const traderLoyalLevelItems = dbTables.traders[traderConfig.id].assort.loyal_level_items;

                traderItems.push(newAmmoItem);

                traderBarterScheme[ammo.ammo_id] = [
                    [
                        {
                            "count": ammo.price,
                            "_tpl": traderConfig.currency
                        }
                    ]
                ];

                // Check if overrideLoyaltyLevel is true, set loyalty_level to 1
                traderLoyalLevelItems[ammo.ammo_id] = config.overrideLoyaltyLevel ? 1 : ammo.loyalty_level;

                messages.push({ text: `Ammo ${ammoName} added to trader ${traderKey}.`, color: LogTextColor.GREEN });
            });
        }

        setTimeout(() => {
            if (config.enableLogging) {
                logger.logWithColor("", LogTextColor.GREEN);
                messages.forEach((message) => {
                    logger.logWithColor(message.text, message.color);
                });
            }
        }, 1000);
    }
}

export = { mod: new ModLoader() };
