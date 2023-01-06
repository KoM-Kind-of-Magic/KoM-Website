<template>
  <div v-if="card.scryfallId" id="cardPage">
    <div class="cardInfosContainer">
      <img
        class="cardImg"
        :alt=card.name
        :src="`https://api.scryfall.com/cards/${card.scryfallId}?format=image&version=border_crop`"
      />
      <div class="cardInfos">
        <div class="cardName">{{card.name}}</div>
        <div class="cardSlider">
          Slider
        </div>
        <div class="cardMainContainer">
          <div class="cardMainBadges">
            <div class="badge">Price (MKM)</div>
            <div class="badge">{{card.number}}/{{card.set.totalSetSize}}</div>
            <div class="badge">
              <i
                :class="
                `cardExtIcon
                ss
                ss-${card.set.keyruneCode.toLowerCase()}`"
              >
              </i>
            </div>
          </div>
          <div class="cardTextContainer">
            <div class="cardText cardExtName">Extention : {{card.set.name}}</div>
            <div class="cardText cardRarity">
              Rarity : {{card.rarity[0].toUpperCase() + card.rarity.slice(1)}}
            </div>
            <div class="cardText cardLegalities">
              Legalities :
              <el-tooltip v-for="(item) in card.legalities"
                placement="top"
                :key="item.uuid"
                effect="light"
              >
                <template #content>{{item.status}}</template>
                <el-tag
                  class="legalityTag"
                  :type="item.type"
                  effect="light"
                >
                  {{item.format[0].toUpperCase() + item.format.slice(1)}}
                </el-tag>
              </el-tooltip>
            </div>
            <div class="cardText cardArtist">Artist : {{ card.artist }}</div>
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
          console.log(res);
          this.card = res.data.data;

          // Add an attribute for the tag type to choose
          this.card.legalities.forEach((elem) => {
            if (elem.status === 'Legal') {
              // eslint-disable-next-line
              elem.type = 'success';
            } else if (elem.status === 'Restricted') {
              // eslint-disable-next-line
              elem.type = 'warning';
            } else {
              // eslint-disable-next-line
              elem.type = 'error';
            }
            // this.relatedVersions
          });
        })
        .then(() => {
          const setCodeList = this.card.printings.split(',');

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
          console.log(res.data.data);
          this.relatedVersions = res.data.data;
        });
    },
    getCardRulings(uuid) {
      axios.get(
        `${process.env.VUE_APP_API_URL}/rulings/${uuid}`,
      )
        .then((res) => {
          console.log(res);
          this.cardRulings = res.data.data;
        });
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
  border-radius: 10px;
}
.cardInfos {
  display: flex;
  flex-direction: column;
  align-content: center;

  background: $light-glass-background;
  width: inherit;
  text-align: center;
}

.cardName {

}

.cardMainContainer,
.cardName,
.cardSlider {
  margin: 10px;
  padding: 15px 0;
  border-radius: 10px;
  background: $medium-glass-background;
}
.cardMainBadges {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
}
.badge {
  flex: 1;
  height: 50px;
  background: $strong-glass-background;

  vertical-align: middle;
  line-height: 50px;
  border-radius: 20px;
  margin: 0 15px;
}
.badge:nth-child(2) {
  margin: 0;
}
.badge:nth-child(3) {
  display: flex;
}

.cardExtIcon {
  margin: auto;
  font-size: 30px;
  color: black;
}

.cardTextContainer {
  display: flex;
  flex-direction: column;

  padding: 15px 15px 0 15px;
  gap: 15px;
}
.cardText {
  text-align: left;
}

.cardLegalities {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
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
</style>
