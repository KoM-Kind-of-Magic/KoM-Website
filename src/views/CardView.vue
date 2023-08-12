<template>
  <div v-if="cardScryfallId" id="cardPage">
    <div class="cardInfosContainer">
      <img
        class="cardImg card-image"
        :alt=card.name
        :src="`https://api.scryfall.com/cards/${cardScryfallId}?format=image&version=border_crop`"
      />
      <div class="cardInfos">
        <div class="primaryInfos">
          <div class="cardName title">
            {{card.name}}
            <span v-if="card.manaCost" class="manaIconContainer" v-html='card.manaCost'></span>
          </div>
          <div class="cardSubTypes subTitle">{{card.type}}</div>
          <div v-if="card.text" class="cardText" v-html="card.text"></div>
          <div class="bottomInfos">
            <div v-if="card.flavorText" class="cardFlavorText" v-html="card.flavorText"></div>

            <div v-if="card.power && card.toughness" class="cardPT title">
              {{card.power}}/{{card.toughness}}
            </div>
            <div v-else-if="card.types === 'Planeswalker'" class="cardPT title">
              <i :class="`ms ms-2x ms-loyalty-start ms-loyalty-${card.loyalty}`"></i>
            </div>
            <div v-else-if="card.types === 'Battle'" class="cardPT title">
              <i :class="`ms ms-defense ms-defense-print ms-defense-${card.defense}`"></i>
            </div>
          </div>
        </div>
        <div class="secondaryInfos">
          <div class="cardSetName title">
            <span>{{cardSetName}} ({{card.set.keyruneCode}})</span>
            <i :class="`setIcon ss ss-${cardIconClass} ss-${card.rarity}`"></i>
          </div>
          <div class="cardRarity subTitle">{{card.rarity}}</div>
          <div class="cardReleaseDate subTitle">{{card.set.releaseDate}}</div>
          <div class="bottomInfos">
            <div class="cardArtist">Artist: {{card.artist}}</div>
            <div class="cardSerialNumber subTitle">#{{card.number}}</div>
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
    <div class="cardTables">
      <div class="cardPrintings">
        <div class="title">Printings</div>
        <div class="versionTable">
          <el-table
            :data="printingsData"
            max-height="350"
            empty-text="No other versions"
            border
            :row-class-name="tableRowClassName"
            @row-click="openCard($event.uuid)">
            <el-table-column
              fixed="left"
              align="center"
              label="Icon"
              width="60"
              :resizable="false">
              <template #default="scope">
                <i
                  :class="
                  `cardExtIcon
                  ss
                  ss-${scope.row.keyruneCode === 'ARCHIE' ?
                  'j20' : scope.row.keyruneCode.toLowerCase()}`"
                >
                </i>
              </template>
            </el-table-column>
            <el-table-column
              prop="code"
              align="center"
              label="Set code"
              width="100"
              :resizable="false"/>
            <el-table-column
              prop="name"
              align="center"
              label="Set name"
              :resizable="false"/>
            <el-table-column
              prop="releaseDate"
              align="center"
              label="Release date"
              width="130"
              :resizable="false"/>
            <el-table-column
              prop="uuid"
              align="center"
              label="UUID"
              width="300"
              :resizable="false"/>
          </el-table>
        </div>
      </div>
      <div class="cardRulings">
        <div class="title">Rulings</div>
        <div class="rulingsTable">
          <el-table
            :data="cardRulings"
            max-height="350"
            empty-text="No rules"
            border
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="date"
              align="center"
              label="Date"
              width="100"
              :resizable="false"/>
            <el-table-column
              prop="text"
              align="left"
              label="Rules"
              :resizable="false"/>
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
      printingsData: [],
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
          this.cardIconClass = this.card.set.keyruneCode === 'ARCHIE' ? 'j20' : this.card.set.keyruneCode.toLocaleLowerCase();

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
              false,
            );
          }
        })
        .then(() => {
          const setCodeList = this.card.printings.split(', ');
          this.getOtherPrintings(setCodeList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getOtherPrintings(setCodeList) {
      axios.all([
        axios.post(
          `${process.env.VUE_APP_API_URL}/sets/codes`,
          {
            codes: setCodeList,
          },
        ),
        axios.post(
          `${process.env.VUE_APP_API_URL}/cards/getPrintings`,
          {
            codes: setCodeList,
            cardName: this.card.name,
          },
        ),
      ])
        .then(axios.spread((data1, data2) => {
          const setsInfos = data1.data.data;
          const cardPrintings = data2.data.data;

          setsInfos.sort((a, b) => {
            const dateA = new Date(a.releaseDate);
            const dateB = new Date(b.releaseDate);
            if (dateB < dateA) {
              return -1;
            }
            return 1;
          });

          const mergedList = [];
          cardPrintings.forEach((printing) => {
            const setCodeKey = setsInfos.find((setInfo) => setInfo.code === printing.setCode);
            if (setCodeKey) {
              const mergedObj = { ...printing, ...setCodeKey };
              mergedList.push(mergedObj);
            }
          });

          // Remove current shown card
          this.printingsData = mergedList.filter((o) => o.uuid !== this.card.uuid);
          console.log(this.card);
        }));
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

      iconMc = iconMc.map((icon) => `<i class='ms ms-${icon.replace('{', '').replace('}', '').replace('/', '').toLowerCase()} ms-cost ${shadowClass}'> </i>`).join('');

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
    tableRowClassName() {
      return 'tableColor';
    },
    openCard(uuid) {
      const redirect = this.$router.resolve({ name: 'cardPage', params: { uuid } });
      window.open(redirect.href, '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>

#cardPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: $text-color;
}

.title {
  font-size: 30px;
  font-weight: bold;
}
.title:after {
  display: none;
}
.subTitle {
  color: rgba($color: #ccc, $alpha: 0.7);
  font-size: 17px;
}
.primaryInfos {
  display: flex;
  flex-direction: column;
  height: 250px;
}
.secondaryInfos {
  display: flex;
  flex-direction: column;
}
.primaryInfos::after,
.secondaryInfos::after {
  content: '';
  width: 840px;
  display: block;
  margin-top: 10px;
  border-bottom: 1px solid $app-background-color;
  transform: translate(-15px);
}
.cardInfosContainer {
  display: flex;
  flex-direction: row;
}
.cardImg {
  width: 410px;
  margin: 0 20px 0 0;
  height: 575px;
}
.cardInfos {
  display: flex;
  flex-direction: column;

  background: #2A2A35;
  border-radius: 10px;
  width: 100%;
  width: 840px;

  padding: 10px 15px;
  box-sizing: border-box;
}
.cardInfos .cardName {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.cardInfos .manaIconContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;

  gap: 5px;
  margin-left: 10px;
}
.cardText {
  text-align: left;
  margin-top: 25px;
  font-size: 17px;
}
.bottomInfos {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex: 1;
}
.cardFlavorText {
  color: rgba($color: #ccc, $alpha: 0.7);
}
.cardPT {
  text-align: right;
  margin-left: auto;
}
.cardPT i {
  margin-left: auto;
}
.cardSetName {
  text-align: left;
}
.setIcon {
  margin-left: 10px;
}
.cardRarity::first-letter {
  text-transform: capitalize;
}
.cardReleaseDate {
  margin-top: 50px;
}
.cardArtist {
  font-size: 18px;
}
.cardSerialNumber {
  margin-left: auto;
}

.cardTables {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  width: 1700px;
}

@media screen and (max-width: 1740px) {
  .cardTables {
    flex-direction: column;
    width: 840px;
  }
}

.cardPrintings,
.cardRulings {
  background: #2A2A35;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.versionTable,
.rulingsTable {
  width: 100%;
  margin-top: 10px;
}
.versionTable > div,
.rulingsTable > div {
  border-radius: 10px;
}
.versionTable .cardExtIcon {
  font-size: 30px;
}

.cardLegalities {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cardLegalities .title {
  margin-bottom: 10px;
  margin-top: 0;
}
.legalitiesBadgeContainer {
  max-width: 700px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}
.legalityTag {
  cursor: pointer;
}
</style>
