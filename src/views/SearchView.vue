<template>
  <div @keyup.enter="triggerSearch()">
    <div class="view-header">
      <div class="page-title">Search card</div>
    </div>
    <div class="content">
      <div class="container-top">
        <div class="search-element">
          <div class="left-side">Card name</div>
          <div class="right-side">
            <Input
              @getInputValue="setCardName"
              placeholder="Card's name"
              class="search_input"
              :value="cardName"
              clearable
            />
          </div>
        </div>
        <div class="search-element">
          <div class="left-side">Text</div>
          <div class="right-side">
            <Input
              @getInputValue="(v) => text = v"
              placeholder="Text"
              class="search_input"
              :value="text"
              clearable
            />
          </div>
        </div>
        <div class="search-element">
          <div class="left-side">Type</div>
          <div class="right-side">
            <el-select
              v-model="selectedType"
              multiple
              placeholder="Select a type"
              class="search_input"
              filterable
              clearable
            >
              <el-option
                v-for="(type, index) in types"
                :key="`${type}-${index}`"
                :label="type"
                :value="type"
              />
            </el-select>
          </div>
        </div>
        <div class="search-element">
          <div class="left-side">Rarity</div>
          <div class="right-side">
            <el-select
              v-model="selectedRarity"
              multiple
              placeholder="Select a rarity"
              class="search_input"
              filterable
              clearable
            >
              <el-option
                v-for="(rarity, index) in rarities"
                :key="`${rarity}-${index}`"
                :label="rarity"
                :value="rarity"
              />
            </el-select>
          </div>
        </div>
        <div class="search-element">
          <div class="left-side">Set</div>
          <div class="right-side">
            <el-select
              v-model="selectedSet"
              multiple
              placeholder="Select a set"
              class="search_input"
              filterable
              clearable
            >
              <el-option
                v-for="(set, index) in sets"
                :key="`${set.value}-${index}`"
                :label="`${set.code} - ${set.name}`"
                :value="set.code"
              />
            </el-select>
          </div>
        </div>
        <div class="search-element">
          <div class="left-side">Color</div>
          <div class="right-side">
            <el-select
              v-model="colorMode"
              placeholder="Select a color mode"
              filterable
              default-first-option
            >
              <el-option
                label="Including these colors"
                value="including"
              />
              <el-option
                label="Exactly these colors"
                value="exactly"
              />
              <el-option
                label="Commander colors"
                value="commander"
              />
            </el-select>
            <el-checkbox-group v-model="selectedColor">
              <el-checkbox-button v-for="color in colors" :key="color" :label="color"  size="small">
                <i :class="`ms ms-${color.toLowerCase()} ms-cost ms-shadow`"></i>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="search-element">
          <div class="left-side"></div>
          <div class="right-side">
            <el-checkbox v-model="excludeColorless" label="Exclude colorless" />
          </div>
        </div>
        <Button
          class="updateDeck"
          @click="triggerSearch()"
        >
          Search
        </Button>
      </div>
      <div class="container-bottom">
        <div v-if="cardsSearched.length==0">
          Search a card.
        </div>
        <div class="container-cards" v-else>
          <div
            v-for=" card in cardsSearched"
            :key="`${keyName}-${card.id}`"
            class="card"
          >
            <img
              :src="`https://api.scryfall.com/cards/${card.scryfallId}?format=image`"
              class="image card-image pointer"
              alt="image"
              @click="openCard(card.uuid)"
              @keydown="c"
            />
          </div>
        </div>
      </div>
      <div class="container-pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="totalResults"
          :page-size="resultsPerPage"
          v-model:current-page="page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElCheckbox,
  ElPagination,
} from 'element-plus';

import Input from '@/components/Input.vue';
import Button from '../components/Button.vue';

export default {
  components: {
    Input,
    Button,
    'el-select': ElSelect,
    'el-option': ElOption,
    'el-checkbox-group': ElCheckboxGroup,
    'el-checkbox-button': ElCheckboxButton,
    'el-checkbox': ElCheckbox,
    'el-pagination': ElPagination,
  },
  mounted() {
    this.getSets().then(() => {
      if (this.$route.query && this.$route.query.query) {
        const query = JSON.parse(decodeURIComponent(window.atob(this.$route.query.query)));
        this.resultsPerPage = query.results ? query.results : this.resultsPerPage;
        this.page = query.page ? query.page : this.page;
        this.cardName = query.name ? query.name : this.cardName;
        this.text = query.text ? query.text : this.text;
        this.selectedRarity = query.rarity ? query.rarity : this.selectedRarity;
        this.selectedType = query.type ? query.type : this.selectedType;
        this.selectedSet = query.set ? query.set : this.selectedSet;
        this.selectedColor = query.color ? query.color : this.selectedColor;
        this.colorMode = query.colorMode ? query.colorMode : this.colorMode;
        this.excludeColorless = query.excludeColorless
          ? query.excludeColorless
          : this.excludeColorless;
        this.triggerSearch();
      }
    }).catch((error) => {
      console.error(error);
    });
  },
  watch: {
    page() {
      if (this.refreshNeeded) {
        this.triggerSearch(true);
      }
    },
  },
  data: () => ({
    cardName: '',
    text: '',
    cardsSearched: [],
    totalResults: 0,
    resultsPerPage: 20,
    page: 1,
    keyName: '',
    selectedType: [],
    types: [
      'Creature',
      'Sorcery',
      'Enchantment',
      'Instant',
      'Artifact',
      'Artifact,Creature',
      'Land',
      'Planeswalker',
      'Tribal,Instant',
      'Artifact,Land',
      'Enchantment,Creature',
      'Enchantment,Artifact',
      'Tribal,Sorcery',
      'Tribal,Enchantment',
      'Vanguard',
      'Instant,Creature',
      'Summon',
      'Summon,Wolf',
      'Elemental,Instant',
      'Enchantment,Land',
      'Land,Creature',
      'Conspiracy',
      'Tribal,Artifact',
      'Scheme',
      'Plane',
      'Phenomenon',
      'Summon,Jaguar',
      'Summon,Dragon',
      'Summon,Goblin',
      'Summon,Knights',
      'Hero',
      'Hero,Artifact',
      'Scariest,Creature,You’ll,Ever,See',
      'Eaturecray',
      'Stickers',
      'Artifact,Enchantment',
    ],
    selectedRarity: [],
    rarities: [
      'Common',
      'Uncommon',
      'Rare',
      'Mythic',
    ],
    selectedSet: [],
    sets: [],
    selectedColor: [],
    colors: ['B', 'G', 'R', 'U', 'W', 'C'],
    colorMode: 'including',
    excludeColorless: false,
    refreshNeeded: true,
  }),
  methods: {
    triggerSearch(pageChange = false) {
      const params = {
        results: this.resultsPerPage,
        page: pageChange ? this.page : 1,
        name: this.cardName,
        text: this.text,
        rarity: this.selectedRarity,
        type: this.selectedType,
        set: this.selectedSet,
        color: this.colors.filter((c) => this.selectedColor.includes(c)),
        colorMode: this.colorMode,
        excludeColorless: this.excludeColorless,
      };
      window.history.pushState(
        {},
        null,
        `${this.$route.path}?${new URLSearchParams({ query: window.btoa(encodeURIComponent(JSON.stringify(params))) })}`,
      );
      axios.post(
        `${process.env.VUE_APP_API_URL}/cards/big-search`,
        {
          ...params,
          all: {
            rarity: this.rarities,
            type: this.types,
            set: this.sets.map((s) => s.code),
            color: this.colors,
          },
        },
      )
        .then((response) => {
          this.keyName = `${Date.now()}?${this.cardName}`;
          this.cardsSearched = response.data.data.rows;
          this.totalResults = response.data.data.count.length;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setCardName(val) {
      this.cardName = val;
    },
    openCard(uuid) {
      const routeData = this.$router.resolve({ name: 'cardPage', params: { uuid } });
      window.open(routeData.href, '_blank');
    },
    getSets() {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_URL}/sets/list`)
          .then((response) => {
            this.sets = response.data.data;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .content {
    background: rgba(255, 255, 255, 0.1);
    width: calc(100% - (2 * 12px));
    margin: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .container-top {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .search-element {
      min-width: 60%;
      display: flex;
      margin: auto;
      align-items: center;

      & .left-side {
        flex: 1;
        display: flex;
      }

      & .right-side {
        flex: 3;
        display: flex;
        gap: 12px;

        & .search_input{
          width: 100%
        }

        & .el-select {
          & .select-trigger {
            height: 100%;
            display: flex;
          }
          & .el-select__tags-text {
            color: white;
            text-transform: capitalize;
          }
          & span.el-tag__content {
            color: white;
          }
        }
      }
    }
  }
  .container-bottom {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    justify-content: center;
    align-content: start;

    & .container-cards {
      margin: 0px !important;
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      box-sizing: border-box;
      gap: 12px;
      width: -webkit-fill-available;

      & .card {
        max-width: 100%;
        flex: 0 0 100%;
        display: block;

        @media screen and (max-width: 1920px) {
          max-width: 19%;
          flex: 0 0 19%;
        }

        @media screen and (max-width: 1200px) {
          max-width: 25%;
          flex: 0 0 25%;
        }

        @media screen and (max-width: 992px) {
          max-width: 33.3333333333%;
          flex: 0 0 33.3333333333%;
        }

        @media screen and (max-width: 768px) {
          max-width: 33.3333333333%;
          flex: 0 0 33.3333333333%;
        }

        .pointer {
          cursor: pointer;
        }
      }
    }
  }
  .container-pagination {
    display: flex;
    align-self: center;
  }
</style>
