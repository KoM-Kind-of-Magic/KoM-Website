<template>
  <div v-if="cardScryfallId" id="cardPage">
    <div class="cardInfosContainer">
      <img
        class="cardImg card-image"
        :alt=card.name
        :src="`https://api.scryfall.com/cards/${cardScryfallId}?format=image&version=border_crop`"
      />
      <div class="cardInfos">
        <div class="cardName title">{{card.name}}</div>
        <div class="cardMainContainer">
          <div class="cardMainBadges">
            <div class="badge cardRarity">
              {{card.rarity}}
            </div>
            <div class="badge">{{card.types}}</div>
            <div class="badge">
              <i
                :class="
                `cardExtIcon
                ss
                ss-${cardIconClass}`"
              >
              </i>
            </div>
          </div>
          <div class="cardAttributes">
            <div class="attribute manaCost">
              Mana cost :<div class="manaIconContainer" v-html='card.manaCost'></div>
              — CMC : {{card.manaValue}}
            </div>
            <div v-if="card.power && card.toughness" class="attribute">
              Power / Toughness :
              <strong>{{card.power}}</strong> / <strong>{{card.toughness}}</strong>
            </div>
            <div v-else-if="card.types === 'Planeswalker'" class="attribute loyalty">
              Loyalty :  <i :class="`ms ms-3x ms-loyalty-start ms-loyalty-${card.loyalty}`"></i>
            </div>
            <div v-else class="attribute"></div>
            <div class="attribute">
              Extention Name : {{cardSetName}}
            </div>
            <div class="attribute">
              Artist : {{card.artist}}
            </div>
          </div>
          <div class="cardTextContainer">
            <div class="cardText" v-html="card.text"></div>
            <div class="cardText" v-html="card.flavorText"></div>
          </div>
        </div>
        <div class="cardLegalities">
          <div class="title">Legalities</div>
          <div class="legalitiesBadgeContainer">
            <el-tooltip v-for="(value, key) in card.cardLegalities"
              placement="top"
              :key="key"
              effect="light"
            >
              <template #content>{{value != null ? value : 'Banned'}}</template>
              <el-tag
                class="legalityTag"
                :type="cardLegalityTooltip(value)"
                effect="light"
              >
                {{key.charAt(0).toUpperCase() + key.slice(1)}}
              </el-tag>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="cardSideInfos">
      <div class="cardOtherVersions">
        <div class="otherVersionTitle">
          Alternate versions
        </div>
        <div class="versionTable">
          <el-table :data="relatedVersions" max-height="500" empty-text="No other versions">
            <el-table-column fixed="left" align="center" label="Icon" width="60">
              <template #default="scope">
                <i
                  :class="
                  `cardExtIcon
                  ss
                  ss-${scope.row.keyruneCode.toLowerCase()}`"
                >
                </i>
              </template>
            </el-table-column>
            <el-table-column prop="code" align="center" label="Set code"  width="100"/>
            <el-table-column prop="name" label="Set name" />
          </el-table>
        </div>
      </div>
      <div class="cardRulings">
        <div class="rulingsTitle">
          Card rulings
        </div>
        <div class="rulingsTable">
          <el-table :data="cardRulings" max-height="500" empty-text="No rules">
            <el-table-column prop="date" align="center" label="Date"  width="150"/>
            <el-table-column prop="text" align="left" label="Rules" :fit="true"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import {
  ElTag,
  ElTooltip,
  ElTable,
  ElTableColumn,
} from 'element-plus';

export default {
  name: 'CardPage',
  components: {
    'el-tag': ElTag,
    'el-tooltip': ElTooltip,
    'el-table': ElTable,
    'el-table-column': ElTableColumn,
  },
  data() {
    return {
      card: {},
      relatedVersions: [],
      cardRulings: [],
      cardScryfallId: '',
      cardSetName: '',
      cardIconClass: '',
    };
  },
  mounted() {
    const route = useRoute();

    this.getCardById(route.params.uuid);
    this.getCardRulings(route.params.uuid);
  },
  methods: {
    getCardById(uuid) {
      axios.get(
        `${process.env.VUE_APP_API_URL}/cards/${uuid}`,
      )
        .then((res) => {
          this.card = res.data.data;
          const [tempLegalities] = this.card.cardLegalities;
          this.card.cardLegalities = tempLegalities;

          this.cardScryfallId = this.card.cardIdentifier.scryfallId;
          this.cardSetName = this.card.set.name;
          this.cardIconClass = this.card.set.keyruneCode.toLocaleLowerCase();

          if (this.card.text != null) {
            this.card.text = this.cardTextWashingMachine(
              this.card.text,
            );
          }
          if (this.card.flavorText != null) {
            this.card.flavorText = this.flavorTextWashingMachine(
              this.card.flavorText,
            );
          }
          if (this.card.manaCost != null) {
            this.card.manaCost = this.cardManaCostWashingMachnine(
              this.card.manaCost,
              true,
            );
          }
        })
        .then(() => {
          const setCodeList = this.card.printings.split(', ');

          const index = setCodeList.indexOf(this.card.setCode);
          if (index > -1) { // only splice array when item is found
            setCodeList.splice(index, 1); // 2nd parameter means remove one item only
          }
          this.getCardRelatedSets(setCodeList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCardRelatedSets(setCodeList) {
      axios.post(
        `${process.env.VUE_APP_API_URL}/sets/codes`,
        {
          codes: setCodeList,
        },
      )
        .then((res) => {
          res.data.data.sort((a, b) => {
            const dateA = new Date(a.releaseDate);
            const dateB = new Date(b.releaseDate);
            if (dateB < dateA) {
              return -1;
            }
            return 1;
          });
          this.relatedVersions = res.data.data;
        });
    },
    getCardRulings(uuid) {
      axios.get(
        `${process.env.VUE_APP_API_URL}/rulings/${uuid}`,
      )
        .then((res) => {
          this.cardRulings = res.data.data;
        });
    },
    cardTextWashingMachine(text) {
      let newText = text.replaceAll(/\r|\n/g, '<br/>')
        .replaceAll('{T}', '{TAP}')
        .replaceAll('{Q}', '{UNTAP}');

      const textIcons = newText.match(/\{(.*?)\}/gs);

      if (textIcons != null) {
        textIcons.forEach((textIcon) => {
          const trueIcon = this.cardManaCostWashingMachnine(textIcon);
          newText = newText.replace(textIcon, trueIcon);
        });
      }

      if (this.card.types === 'Planeswalker') {
        const textLoyalty = newText.match(/\[(.*?)\]/gs);

        if (textLoyalty != null) {
          textLoyalty.forEach((tl) => {
            const trueLoyalty = this.loyaltyWashingMachnine(tl);
            newText = newText.replace(tl, trueLoyalty);
          });
        }
      }

      const sagaIcons = newText.match(/I{1,3} —|IV —/gs);
      if (sagaIcons != null) {
        sagaIcons.forEach((si) => {
          const trueSaga = this.sagaWashingMachine(si);
          newText = newText.replace(si, trueSaga);
        });
      }

      return newText;
    },
    flavorTextWashingMachine(text) {
      let newText = text.replaceAll(/\r|\n/g, '<br/>');
      newText = text.replaceAll('*', '<strong>');
      newText = `<em>${newText}</em>`;

      return newText;
    },
    cardManaCostWashingMachnine(mc, shadow = false) {
      let iconMc = mc.match(/\{(.*?)\}/gs);
      const shadowClass = shadow ? 'ms-shadow' : '';

      iconMc = iconMc.map((icon) => `<i class='ms ms-${icon.replace('{', '').replace('}', '').replace('/', '').toLowerCase()} ms-cost ${shadowClass}'> </i> `).join('');

      return iconMc;
    },
    loyaltyWashingMachnine(lc) {
      let iconLc = lc.match(/\[(.*?)\]/gs);
      let loyaltyClass = '';

      if (iconLc[0].includes('+')) {
        loyaltyClass = 'ms-loyalty-up';
      } else if (iconLc[0].includes('−')) {
        loyaltyClass = 'ms-loyalty-down';
      } else {
        loyaltyClass = 'ms-loyalty-zero';
      }

      iconLc = iconLc.map((icon) => `
        <i class='ms ms-2x ${loyaltyClass} loyalty ms-loyalty-${icon.replace('[', '').replace(']', '').replace('−', '').replace('+', '')
  .toLowerCase()} '> </i>`).join('');

      return iconLc;
    },
    sagaWashingMachine(sc) {
      const iconSaga = sc.match(/.+?(?= —)/gs);
      return `<i class='ms ms-saga ms-saga-${this.romanToInt(iconSaga[0])} ms-2x'></i> -`;
    },
    cardLegalityTooltip(input) {
      let res = '';
      if (input === 'Legal') {
        res = 'success';
      } else if (input === 'Restricted') {
        res = 'warning';
      } else {
        res = 'error';
      }

      return res;
    },
    romanToInt(s) {
      const romanHash = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
      };

      let accumulator = 0;
      for (let i = 0; i < s.length; i += 1) {
        if (s[i] === 'I' && s[i + 1] === 'V') {
          accumulator += 4;
          i += 1;
        } else if (s[i] === 'I' && s[i + 1] === 'X') {
          accumulator += 9;
          i += 1;
        } else if (s[i] === 'X' && s[i + 1] === 'L') {
          accumulator += 40;
          i += 1;
        } else if (s[i] === 'X' && s[i + 1] === 'C') {
          accumulator += 90;
          i += 1;
        } else if (s[i] === 'C' && s[i + 1] === 'D') {
          accumulator += 400;
          i += 1;
        } else if (s[i] === 'C' && s[i + 1] === 'M') {
          accumulator += 900;
          i += 1;
        } else {
          accumulator += romanHash[s[i]];
        }
      }
      return accumulator;
    },
  },
};
</script>

<style lang="scss" scoped>
#cardPage {
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: $text-color;
  margin: 50px 0 0 0;
  padding: 0 10%;
}

.cardInfosContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.cardImg {
  width: 350px;
  margin: 0 20px 0 0;
  max-height: 500px;
}
.cardInfos {
  display: flex;
  flex-direction: column;
  align-content: center;

  background: $light-glass-background;
  width: inherit;
  text-align: center;

  border-radius: 10px;
}

.cardName {
  font-size: 20px;
}

.cardMainContainer {
  margin: 10px;
  flex: 1;
  padding: 15px 0;
  border-radius: 5px;
  background: transparent;
  display: flex;
  flex-direction: column;

}
.cardMainBadges {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
}
.badge {
  flex: 1;
  height: 25px;

  vertical-align: middle;
  line-height: 25px;
  max-width: 200px;
  margin: 0 15px;
}
.badge:nth-child(2) {
  margin: 0;
}

.badge::after {
  content: '';
  width: 50px;
  height: 3px;
  display: block;
  margin: 5px auto;

  background: $strong-glass-background;
}

.badge.cardRarity::first-letter {
  text-transform: capitalize;
}

.cardExtIcon {
  margin: auto;
  font-size: 30px;
  color: black;
}

.cardTextContainer {
  display: flex;
  flex-direction: column;

  margin: auto auto 0 auto;
  width: 80%;
  padding: 15px 15px 0 15px;
  gap: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
}
.cardText {
  text-align: left;
}

.cardLegalities {
  margin: auto 0 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cardLegalities .title {
  margin-bottom: 10px;
  margin-top: 0;
}
.legalitiesBadgeContainer {
  max-width: 500px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}
.legalityTag {
  cursor: pointer;
}

.cardSideInfos {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 20px;
  width: 100%;
}
.cardOtherVersions {
  width: 350px;
}
.cardRulings {
  flex: 1;
}

.otherVersionTitle,
.rulingsTitle {
  text-align: center;
  margin-bottom: 5px;
}

.versionTable,
.rulingsTable {
  background: #141414;
}
.versionTable .cardExtIcon {
  color: #a3a6ad;
}

.cardAttributes {
  text-align: left;
  margin: 20px auto;
  line-height: 24px;
  width: 80%;
}
.cardAttributes .attribute.manaCost {
  display: flex;
  flex-direction: row;
}
.manaIconContainer {
  margin: 0 5px;
}
</style>
