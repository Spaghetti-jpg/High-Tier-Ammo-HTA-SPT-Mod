# High-Level Ammo Trader Mod

Use any ammo, not just the available ammo


## [About](#about)

This mod was created due to several requests. It adds high-level ammo to the trader's inventory that you can't buy or are blocked by quests you don't want to do.

To keep things balanced, I've set the ammo availability at trader loyalty level 4. If the ammo is quest-locked, it’s gonna cost way more than if you just did the quest, so it’s better to complete the quests.

This mod covers almost all the ammo in the game, though some are turned off by default and won't show up with traders. You can tweak that yourself in the `config.json` file.

About the ammo prices. I tried to keep the prices balanced, but since a lot of the ammo in the game can't be bought or sold on the flea market or from traders, I had no good reference for pricing. So, I figured 7.62x51mm M993 for $26, 7.62x51mm M61 for $21, and 5.45x39mm PPBS gs “Igolnik” for 2150 rubles is fair enough.

If you are not happy with the prices or ammo availability of a trader, you can always change them in the config files (I tried to make everything customizable).

## List of ammo affected by the mod

- .300 Blackout AP
- .300 Blackout M62 Tracer
- .338 Lapua Magnum FMJ
- .338 Lapua Magnum AP
- .366 TKM AP-M
- .45 ACP AP
- .45 ACP RIP
- 12/70 AP-20 armor-piercing slug
- 23x75mm Zvezda flashbang round
- 40x46mm M406 (HE) grenade
- 4.6x30mm AP SX
- 4.6x30mm FMJ SX
- 5.45x39mm 7N40
- 5.45x39mm BP gs
- 5.45x39mm BS gs
- 5.45x39mm PPBS gs "Igolnik"
- 5.56x45mm M855A1
- 5.56x45mm M995
- 5.56x45mm SSA AP
- 5.7x28mm R37.F
- 5.7x28mm SS197SR
- 7.62x39mm BP gzh
- 7.62x39mm MAI AP
- 7.62x51mm M61
- 7.62x51mm M993
- 7.62x54mm R BS gs
- 7.62x54mm R BT gzh
- 7.62x54mm R PS gzh
- 7.62x54мм R SP BT
- 9x19mm PBP gzh
- 9x21mm 7N42 Zubilo
- 9x39mm SP-6 gs
- 9x39mm BP gs


## [Installation](#installation)

1. Drag the `user` folder from the zip archive into the SPT installation folder.

## [How to configure](#how-to-configure)

After installing the mod, open the `config.json` file and select the ammo you need. Then change the value of the ammo you need to `true` or `false`.

## [FAQ (Very important)](#faq-very-important)

This is a list of answers to possible questions about editing the mod.

### 1. **Question:** Which config files can be edited?

   **Answer:** All of them. Just be careful and follow JSON syntax.

### 2. **Question:** There are too many logs in the server terminal, can I disable them all?

   **Answer:** Yes. Open `config.json` in the mod folder and change `"enableLogging": true` to `"enableLogging": false`.

### 3. **Question:** I don’t want to see logs about skipped ammo in the server terminal, how do I disable them?

   **Answer:** Open `config.json` in the mod folder and change `"logSkippedAmmo": true` to `"logSkippedAmmo": false`.

### 4. **Question:** I want all the ammo to be available at trader loyalty level 1 instead of 3-4, can I do that?

   **Answer:** Yes. Open `config.json` in the mod folder and change `"overrideLoyaltyLevel": false` to `"overrideLoyaltyLevel": true`.

### 5. **Question:** How do I change the quantity of ammo available per restock?

   **Answer:** You need to open the `ammo_traders` folder at `mod/config/ammo_traders`, open the config for the trader you want, find the ID of the ammo you want to change (use [SPT Database](https://db.sp-tarkov.com/search), you need the `_id` string), then find this ID in the config and change `"buy_restriction_max"` to the quantity you want.

### 6. **Question:** How do I change the prices of the ammo?

   **Answer:** Same as above, but you need to change the `"price"`.

### 7. **Question:** How do I add my own ammo to a trader?

   **Answer:** First, check if they haven’t already been added by my mod by reading `config.json`. If your desired ammo isn't listed in the config, add it to `config.json` with its full name, for example, `".300 Blackout M62 Tracer": true`. You can find the full name of the ammo using the website [SPT Database](https://db.sp-tarkov.com/search/57a0e5022459774d1673f889). Find the ammo you want and at the bottom look for `Locale`, you need the `Name` string, for example, for SP-6 ammo it's `"9x39mm SP-6 gs"`.

   Next, open the config for the trader you want, for example, `ammo_jaeger.json` in the `ammo_traders` folder, and create your ammo following this template:

```json
     {
         "ammo_id": "ID from db.sp-tarkov.com",
         "buy_restriction_max": Number of available ammo to purchase per restock,
         "price": Price,
         "loyalty_level": Trader loyalty level (default is 3 or 4)
     }
```
### 8. **Question:** Can I edit JSON files using Notepad?
   **Answer:** Yes, but only if you are familiar with JSON syntax. You can use a website like jsonlint.com to check syntax errors.

### 9. **Question:** How do I create my own `ammo_trader.json`?
   **Answer:** Open `traders_id.json` in the config folder and copy the name of the trader you want. This config lists only the old traders (No Ref). Then create your own `ammo_trader.json` in the config/ammo_traders folder, for example, `ammo_therapist.json`, and write:

```json
     {
         "Therapist": [
           {
             "ammo_id": "",
             "buy_restriction_max": 0,
             "price": 0,
             "loyalty_level": 0
           },
           {
             "ammo_id": "",
             "buy_restriction_max": 0,
             "price": 0,
             "loyalty_level": 0
           },
           {
             "ammo_id": "",
             "buy_restriction_max": 0,
             "price": 0,
             "loyalty_level": 0
           }
         ]
       }
```
  Then add the necessary ammo entries.

### 10. Question: Can I add custom ammo to a trader?

**Answer:** More likely yes than no. If my mod loads after the trader mod, then yes, but you'll need to find its ID and add it to the `traders_id.json` file.

### 11. Question: Can I change the currency that Peacekeeper sells mod-added ammo for?

**Answer:** Yes. Open `traders_id.json`, find the trader you need, and change their `"currency"` to the ID of the desired currency. Don't forget to adjust the prices of ammo in `ammo_traders.json` to something more realistic.

- Rubles: `5449016a4bdc2d6f028b456f`
- Dollars: `5696686a4bdc2da3298b456a`
- Euros: `569668774bdc2da2298b4568`

### 12. Question: Does the mod work with custom ammo?

**Answer:** Most likely yes, if you know the IDs of these ammo types and my mod loads after them.

### 13. Question: Is the mod compatible with the Realism mod?

**Answer:** I don't know, I don't use the Realism mod. You can try it out or ask in the Realism mod comments.

### 14. Question: Can I request to add a specific ammo type to the mod?

**Answer:** Yes, of course.

### 15. Question: How can I thank you? Maybe PayPal?

**Answer:** Just write that you like the mod and say thank you. That's the best reward for me.

### Vanilla `config.json`

```json
{
  "enableLogging": true,
  "logSkippedAmmo": false,
  "overrideLoyaltyLevel": false,

  ".300 Blackout AP": false,
  ".300 Blackout M62 Tracer": true,

  ".338 Lapua Magnum FMJ": true,
  ".338 Lapua Magnum AP": false,

  ".366 TKM AP-M": false,

  ".45 ACP AP": true,
  ".45 ACP RIP": true,

  "12/70 AP-20 armor-piercing slug": false,

  "23x75mm Zvezda flashbang round": true,

  "40x46mm M406 (HE) grenade": false,

  "4.6x30mm AP SX": true,
  "4.6x30mm FMJ SX": true,

  "5.45x39mm 7N40": true,
  "5.45x39mm BP gs": true,
  "5.45x39mm BS gs": false,
  "5.45x39mm PPBS gs \"Igolnik\"": false,

  "5.56x45mm M855A1": true,
  "5.56x45mm M995": false,
  "5.56x45mm SSA AP": false,

  "5.7x28mm R37.F": true,
  "5.7x28mm SS197SR": true,

  "7.62x39mm BP gzh": true,
  "7.62x39mm MAI AP": false,

  "7.62x51mm M61": true,
  "7.62x51mm M993": false,

  "7.62x54mm R BS gs": true,
  "7.62x54mm R BT gzh": true,
  "7.62x54mm R PS gzh": true,
  "7.62x54mm R SNB gzh": false,
  "7.62x54мм R SP BT": true,

  "9x19mm PBP gzh": true,

  "9x21mm 7N42 Zubilo": true,

  "9x39mm SP-6 gs": true,
  "9x39mm BP gs": false
}

