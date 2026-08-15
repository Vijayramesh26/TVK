<template>
  <v-container fluid class="results-container pa-0">
    <!-- Premium Hero Section -->
    <section class="results-hero position-relative d-flex align-center justify-center text-center text-white">
      <div class="results-hero-bg absolute-inset" :style="{ '--bg-img': `url(${resultsBg})` }"></div>
      <div class="hero-overlay absolute-inset"></div>
      
      <v-container class="position-relative z-10 py-16">
        <v-chip color="#D4AF37" variant="elevated" class="mb-6 font-weight-black px-6 py-2 elevation-8 text-uppercase">
          {{ t('election.title') }} 2026
        </v-chip>
        <h1 class="display-promo font-weight-black mb-4 glow-text">{{ t('election.results') }}</h1>
        <p class="text-h6 opacity-90 max-width-800 mx-auto font-weight-regular font-italic">
          {{ t('election.subtitle') }}
        </p>

        <!-- Overall Summary Cards -->
        <v-row class="mt-12">
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline color-gold font-weight-bold mb-2">{{ isTamil ? 'த.வெ.க வென்ற இடங்கள்' : 'TVK Seats Won' }}</div>
              <div class="stat-value text-h3 font-weight-black">{{ totalWon }} <span class="text-h5 text-grey-darken-1">/ 234</span></div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline color-gold font-weight-bold mb-2">{{ isTamil ? 'மொத்த தொகுதிகள்' : 'Total Constituencies' }}</div>
              <div class="stat-value text-h3 font-weight-black">234</div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline color-gold font-weight-bold mb-2">{{ isTamil ? 'கட்சிகள்' : 'Total Parties Won' }}</div>
              <div class="stat-value text-h3 font-weight-black">{{ partyLegend.length }}</div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl highlight-gold h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline text-white font-weight-bold mb-2">{{ t('election.turnout') }}</div>
              <div class="stat-value text-h3 font-weight-black">85.15<span class="text-h5">%</span></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="py-12">
      <!-- Search & Filters -->
      <v-row align="center" class="mb-10">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            :label="t('election.searchPlaceholder')"
            variant="solo"
            class="rounded-pill elevation-4 elevation-hover transition-3ms"
            bg-color="white"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
           <v-chip-group v-model="selectedCategory" selected-class="bg-maroon text-white" mandatory>
             <v-chip value="ALL" class="font-weight-black">{{ t('election.all') }}</v-chip>
             <v-chip value="WON" class="font-weight-black color-green">{{ t('election.statusWon') }}</v-chip>
             <v-chip value="LOST" class="font-weight-black">{{ t('election.statusLost') }}</v-chip>
             <v-chip value="GEN" class="font-weight-black">{{ t('candidates.categories.GEN') }}</v-chip>
             <v-chip value="SC" class="font-weight-black">{{ t('candidates.categories.SC') }}</v-chip>
             <v-chip value="ST" class="font-weight-black">{{ t('candidates.categories.ST') }}</v-chip>
           </v-chip-group>
        </v-col>
      </v-row>

      <!-- Map Section -->
      <v-row class="mb-10">
        <v-col cols="12">
          <v-card class="glass-card rounded-xl elevation-4 pa-6">
            <h2 class="text-h4 font-weight-black color-maroon mb-2 text-center text-uppercase glow-text">
              {{ isTamil ? 'உங்கள் தொகுதியைத் தேடுங்கள்' : 'Know Your Constituency' }}
            </h2>
            <p class="text-center text-grey-darken-1 mb-6">
              {{ isTamil ? 'உங்கள் தொகுதி அல்லது மாவட்டத்தைத் தேடி விவரங்களைப் பெறுங்கள்.' : 'Search for your constituency or district to see deep-dive details.' }}
            </p>

            <v-row justify="center" class="mb-8">
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="mapSearch"
                  :label="isTamil ? 'தொகுதியைத் தேடுங்கள் (எ.கா: பெரம்பூர்)...' : 'Search Constituency (e.g., Perambur)...'"
                  variant="outlined"
                  color="#800000"
                  prepend-inner-icon="mdi-map-search-outline"
                  class="rounded-xl"
                  hide-details
                  @keyup.enter="searchAndZoom"
                >
                  <template v-slot:append-inner>
                    <v-btn color="#800000" class="text-white" rounded @click="searchAndZoom">
                      {{ isTamil ? 'தேடு' : 'Search' }}
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <div id="mapContainer" class="map-container relative">
              <!-- Zoom Reset Button -->
              <v-btn
                v-if="isZoomed"
                icon="mdi-map-reset"
                color="#800000"
                class="map-reset-btn elevation-8"
                @click="resetZoom"
              ></v-btn>
            </div>

            <!-- Party Legend -->
            <div class="map-legend mt-6">
              <div class="text-caption font-weight-black text-uppercase color-maroon mb-3 text-center" style="letter-spacing: 2px">
                {{ isTamil ? 'கட்சி வண்ணங்கள்' : 'Party Colors' }}
              </div>
              <div class="legend-grid">
                <div v-for="p in partyLegend" :key="p.party" class="legend-item">
                  <span class="legend-dot" :style="{background: p.color}"></span>
                  <span class="legend-label">{{ p.party }}</span>
                  <span class="legend-count">({{ p.count }})</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Results Grid -->
      <div v-for="(districtStats, districtName) in groupedStats" :key="districtName" class="mb-16">
        <div class="d-flex align-center mb-8 district-header">
          <div class="header-line flex-grow-1"></div>
          <h2 class="text-h4 font-weight-black color-maroon px-6 text-uppercase">
            {{ translateDistrict(districtName) }}
          </h2>
          <div class="header-line flex-grow-1"></div>
        </div>

        <v-row>
          <v-col 
            v-for="stat in districtStats" 
            :key="stat.id"
            cols="12" 
            sm="6" 
            md="4" 
            lg="4"
            class="pa-4"
          >
            <v-card class="result-card rounded-xl elevation-4 h-100 overflow-hidden glass-card" :class="{'border-gold-glow': stat.status === 'WON' || stat.status === 'LEADING'}">
              <!-- Top Accent -->
              <div class="card-accent-bar" :class="stat.type.toLowerCase()"></div>
              
              <v-card-text class="pa-6">
                <!-- Header: ID & Category -->
                <div class="d-flex justify-space-between align-center mb-4">
                  <div class="d-flex align-center">
                    <v-chip
                      v-if="stat.status === 'WON'"
                      size="small"
                      color="success"
                      variant="elevated"
                      class="font-weight-black mr-2 text-uppercase glow-green"
                    >
                      {{ t('election.statusWon') }}
                    </v-chip>
                    <v-chip
                      v-else-if="stat.status === 'LOST'"
                      size="small"
                      color="grey-darken-1"
                      variant="elevated"
                      class="font-weight-black mr-2 text-white text-uppercase"
                    >
                      {{ t('election.statusLost') }}
                    </v-chip>
                  <v-chip size="x-small" color="#555" variant="flat" class="font-weight-black text-white px-3">
                      #{{ stat.id }}
                    </v-chip>
                  </div>
                  <span class="text-caption font-weight-black color-gold text-uppercase tracking-wider">
                    {{ translateCategory(stat.type) }}
                  </span>
                </div>

                <!-- Constituency Name -->
                <h3 class="constituency-title text-h5 font-weight-black color-maroon mb-1">
                  {{ translateConstituency(stat.name) }}
                </h3>
                <div class="text-caption text-grey-darken-1 mb-6 d-flex align-center">
                  <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon>
                  {{ translateDistrict(stat.district) }}
                </div>

                <!-- Candidate Info (Merged) -->
                <div class="candidate-mini-profile pa-4 rounded-xl mb-6 bg-maroon-light" :class="{'bg-success-light': stat.status === 'WON'}">
                   <div class="text-tiny font-weight-black color-gold text-uppercase mb-1 opacity-70">{{ t('candidates.role') }}</div>
                   <div class="d-flex align-center">
                      <v-avatar size="40" color="white" class="mr-3 elevation-2 border-gold-thin">
                        <span class="text-h6 font-weight-black color-maroon">{{ getCandidateInitial(stat.name) }}</span>
                      </v-avatar>
                      <div>
                        <div class="text-subtitle-1 font-weight-black color-maroon lh-1 mb-1">
                          {{ getCandidateName(stat.name) }}
                        </div>
                        <div class="text-tiny color-gold font-weight-bold opacity-80">
                          {{ getCandidateDegree(stat.name) }}
                        </div>
                      </div>
                   </div>
                </div>

                <!-- Stats Section -->
                <div class="stats-grid mb-2">
                  <div class="stat-item">
                    <div class="stat-label text-tiny font-weight-black opacity-60">{{ t('election.votesSecured') }}</div>
                    <div class="stat-val font-weight-black color-maroon">{{ formatNumber(stat.votesSecured) }}</div>
                  </div>
                  <div class="stat-item text-right">
                    <div class="stat-label text-tiny font-weight-black opacity-60">{{ t('election.margin') }}</div>
                    <div class="stat-val font-weight-black" :class="{'text-success': stat.status === 'WON'}">
                      <v-icon v-if="stat.status === 'WON'" size="14" class="mr-1">mdi-arrow-up-bold</v-icon>
                      {{ formatNumber(stat.margin) }}
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column mb-2 px-3 py-2 rounded bg-grey-lighten-4" :style="{'border-left': `4px solid ${stat.liveColor || '#ccc'}`}">
                  <div class="d-flex justify-space-between align-center">
                    <span class="text-tiny font-weight-bold opacity-70" :class="stat.liveParty === 'TVK' ? 'color-green' : 'text-error'">
                      {{ stat.liveParty === 'TVK' ? (isTamil ? 'த.வெ.க வெற்றி' : 'TVK WON') : (isTamil ? 'எதிர்க்கட்சி வெற்றி' : 'OPPONENT WON') }}
                    </span>
                    <v-chip size="small" class="font-weight-black color-white" :color="stat.liveColor || '#555'">{{ stat.liveParty || stat.opponentParty || 'AWAITING' }}</v-chip>
                  </div>
                  <div class="text-caption font-weight-black mt-1 color-maroon" v-if="stat.liveParty && stat.liveParty !== 'TVK'">
                    {{ stat.liveCandidate }}
                  </div>
                </div>

                <!-- Turnout Progress -->
                <div class="turnout-container mt-4">
                  <div class="d-flex justify-space-between align-end mb-2">
                    <span class="text-tiny font-weight-black text-uppercase opacity-60">{{ t('candidates.turnout') }}</span>
                    <span class="text-h6 font-weight-black color-maroon">{{ stat.turnout }}%</span>
                  </div>
                  <v-progress-linear
                    v-model="stat.turnout"
                    color="#D4AF37"
                    height="12"
                    rounded
                    class="turnout-bar elevation-1"
                  >
                  </v-progress-linear>
                </div>
              </v-card-text>
              
              <!-- Bottom Status Bar -->
              <div class="card-status-footer py-2 px-6 d-flex align-center justify-space-between bg-white border-top">
                <span class="text-tiny font-weight-black color-gold d-flex align-center">
                  <v-icon size="12" class="mr-1">mdi-check-circle-outline</v-icon>
                  {{ t('election.officialData') }}
                </span>
                <v-icon size="16" color="#800000">mdi-chevron-right</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import * as d3 from 'd3';
import { votingData } from '../../data/votingData';
import { candidatesData } from '../../data/candidates';
import { constituencyTranslations } from '../../data/constituencyTranslations';
import { TN_MAP_DATA } from '../../data/mapData';
import resultsBg from "../../assets/voteForWhistle.jpg";
import { apiService } from '../../services/api';

export default {
  name: "Results",
  inject: ['t', 'currentLang'],
  data: () => ({
    resultsBg,
    votingStats: JSON.parse(JSON.stringify(votingData)),
    candidates: candidatesData,
    search: "",
    mapSearch: "",
    isZoomed: false,
    selectedCategory: "ALL",
    partyLegend: []
  }),
  computed: {
    isTamil() {
      return this.currentLang() === 'ta';
    },
    constituencyMap() {
      const map = { ...constituencyTranslations };
      this.candidates.forEach(c => {
        if (c.constituencyEn && !map[c.constituencyEn]) {
          map[c.constituencyEn] = c.constituency;
        }
      });
      return map;
    },
    districtMap() {
      const map = {};
      this.candidates.forEach(c => {
        if (c.districtEn) map[c.districtEn] = c.district;
      });
      return map;
    },
    filteredStats() {
      let stats = this.votingStats;
      
      if (this.selectedCategory !== 'ALL') {
        if (this.selectedCategory === 'WON' || this.selectedCategory === 'LOST') {
           stats = stats.filter(s => s.status === this.selectedCategory);
        } else {
           stats = stats.filter(s => s.type === this.selectedCategory);
        }
      }
      
      if (this.search) {
        const q = this.search.toLowerCase();
        stats = stats.filter(s => 
          s.name.toLowerCase().includes(q) || 
          s.district.toLowerCase().includes(q) ||
          (this.constituencyMap[s.name] && this.constituencyMap[s.name].toLowerCase().includes(q))
        );
      }
      
      return stats;
    },
    groupedStats() {
      const groups = {};
      this.filteredStats.forEach(s => {
        if (!groups[s.district]) groups[s.district] = [];
        groups[s.district].push(s);
      });
      return groups;
    },
    totalWon() {
      return this.votingStats.filter(s => s.status === 'WON').length;
    },
    totalVotesPolled() {
      const total = this.votingStats.reduce((sum, stat) => {
        return sum + (stat.electors * (stat.turnout / 100));
      }, 0);
      return Math.round(total);
    },
    tvkVotesPolled() {
      const total = this.votingStats.reduce((sum, stat) => {
        return sum + (stat.votesSecured || 0);
      }, 0);
      return Math.round(total);
    }
  },
  mounted() {
    this.fetchBackendVoting();
    this.fetchLiveResults();
  },
  methods: {
    async fetchBackendVoting() {
      const backendVoting = await apiService.getVotingData();
      if (backendVoting && backendVoting.length > 0) {
        this.votingStats = backendVoting.map((bItem, idx) => ({
          ...this.votingStats[idx % this.votingStats.length],
          ...bItem,
        }));
      }
    },
    async fetchLiveResults() {
      try {
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://results.eci.gov.in/ResultAcGenMay2026/election-json-S22-live.json'));
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        const liveData = data.S22.chartData;

        // Fetch detailed vote counts for ALL parties from ECI
        const partyPages = [
          '3679', // TVK
          '582',  // DMK
          '75',   // ADMK
          '742',  // INC
          '1272', // PMK
          '772',  // IUML
          '544',  // CPI
          '1847', // VCK
          '547',  // CPI(M)
          '369',  // BJP
          '581',  // DMDK
          '2866', // AMMKMNKZ
        ];
        let allVoteMap = {};
        const parsePartyPage = async (partyId) => {
          try {
            const r = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://results.eci.gov.in/ResultAcGenMay2026/partywisewinresult-${partyId}S22.htm`));
            if (!r.ok) return;
            const html = await r.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const rows = doc.querySelectorAll('table.table tbody tr, table tr');
            rows.forEach(row => {
              const tds = row.querySelectorAll('td');
              if (tds.length >= 5) {
                const constText = tds[1]?.textContent?.trim() || '';
                const acMatch = constText.match(/\((\d+)\)/);
                if (acMatch) {
                  const acNo = parseInt(acMatch[1]);
                  const totalVotes = parseInt(tds[3]?.textContent?.trim()?.replace(/,/g, '')) || 0;
                  const margin = parseInt(tds[4]?.textContent?.trim()?.replace(/,/g, '')) || 0;
                  allVoteMap[acNo] = { totalVotes, margin };
                }
              }
            });
          } catch(e) { /* silently skip */ }
        };
        await Promise.all(partyPages.map(id => parsePartyPage(id)));

        // Update our votingStats with liveData + real vote counts
        this.votingStats = this.votingStats.map(stat => {
           const liveRecord = liveData.find(l => parseInt(l[2]) === stat.id);
           if (liveRecord) {
              const party = liveRecord[0];
              const candName = liveRecord[3];
              const voteData = allVoteMap[stat.id];
              return {
                 ...stat,
                 status: party === 'TVK' ? 'WON' : 'LOST',
                 liveParty: party,
                 liveCandidate: candName,
                 liveColor: liveRecord[4] || (party === 'TVK' ? '#800000' : '#ccc'),
                 ...(voteData ? { votesSecured: voteData.totalVotes, margin: voteData.margin } : {})
              };
           }
           return stat;
        });

        // Build party legend from live data
        const partyMap = {};
        liveData.forEach(item => {
          const party = item[0];
          const color = party === 'TVK' ? '#800000' : (item[4] || '#ccc');
          if (!partyMap[party]) partyMap[party] = { party, color, count: 0 };
          partyMap[party].count++;
        });
        this.partyLegend = Object.values(partyMap).sort((a, b) => b.count - a.count);

        this.renderMap(liveData);
      } catch(e) {
        console.error("Failed to fetch live results", e);
        this.renderMap([]); // Render empty map as fallback
      }
    },
    renderMap(liveData) {
      this.currentLiveData = liveData; // Store for redraws
      const container = d3.select('#mapContainer');
      container.html(''); 
      
      this.svg = container.append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('viewBox', `0 0 500 600`)
          .attr('preserveAspectRatio', 'xMidYMid meet');

      this.g = this.svg.append('g'); // Group for paths to allow zooming

      d3.selectAll('.map-tooltip').remove();
      const tooltip = d3.select('body').append('div')
          .attr('class', 'map-tooltip')
          .style('position', 'fixed')
          .style('display', 'none')
          .style('background', 'rgba(45, 10, 10, 0.95)')
          .style('backdrop-filter', 'blur(8px)')
          .style('border', '1px solid #D4AF37')
          .style('padding', '1.25rem')
          .style('border-radius', '12px')
          .style('pointer-events', 'none')
          .style('font-size', '0.85rem')
          .style('z-index', '99999')
          .style('box-shadow', '0 20px 25px -5px rgba(0,0,0,0.5)')
          .style('color', 'white')
          .style('min-width', '200px')
          .style('max-width', '280px');
          
      this.projection = d3.geoMercator().fitSize([500, 600], TN_MAP_DATA);
      this.path = d3.geoPath().projection(this.projection);

      this.g.selectAll('.map-path')
          .data(TN_MAP_DATA.features)
          .enter()
          .append('path')
          .attr('class', 'map-path')
          .attr('d', this.path)
          .attr('fill', d => {
              const acNo = d.properties.AC_NO;
              const result = liveData.find(item => parseInt(item[2]) === acNo);
              if (result) {
                  return result[0] === 'TVK' ? '#800000' : (result[4] || '#cbd5e1');
              }
              return '#e2e8f0';
          })
          .attr('stroke', '#ffffff')
          .attr('stroke-width', '0.5px')
          .attr('vector-effect', 'non-scaling-stroke')
          .on('mouseover', (event, d) => {
              const acNo = parseInt(d.properties.AC_NO);
              const result = liveData.find(item => parseInt(item[2]) === acNo);
              const name = this.translateConstituency(d.properties.AC_NAME);
              
              const distNameRaw = d.properties.DIST_NAME || '';
              const formattedDist = distNameRaw.charAt(0).toUpperCase() + distNameRaw.slice(1).toLowerCase();
              const translatedDist = this.translateDistrict(formattedDist);
              
              let partyName = result ? result[0] : (this.isTamil ? 'தரவுக்காக காத்திருக்கிறது' : 'Awaiting Data');
              if (partyName === 'TVK' && this.isTamil) {
                  partyName = 'த.வெ.க';
              }
              let candName = result ? result[3] : '-';
              let winnerLabel = this.isTamil ? 'வெற்றியாளர்' : 'WINNER';
              let constLabel = this.isTamil ? 'தொகுதி' : 'Constituency';
              let distLabel = this.isTamil ? 'மாவட்டம்' : 'District';
              
              tooltip.style('display', 'block')
                  .html(`
                      <div style="font-weight: 800; color: #D4AF37; font-size: 1rem; margin-bottom: 0.25rem">${name}</div>
                      <div style="font-size: 0.8rem; color: #a0aec0; margin-bottom: 0.5rem">${translatedDist} ${distLabel}</div>
                      <div style="font-size: 0.75rem; color: #a0aec0; opacity: 0.8">${constLabel} #${acNo}</div>
                      <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1)">
                          <div style="font-size: 0.75rem; color: #a0aec0; letter-spacing: 0.05em;">${winnerLabel}</div>
                          <div style="font-weight: 700; margin-top: 0.25rem; color: #fff;">${candName}</div>
                          <div style="font-weight: 900; font-size: 1.1rem; color: ${result && result[0] === 'TVK' ? '#D4AF37' : '#fff'}; margin-top: 0.25rem">
                              ${partyName}
                          </div>
                      </div>
                  `);
          })
          .on('mousemove', (event) => {
              const tooltipNode = tooltip.node();
              const w = tooltipNode.offsetWidth || 220;
              const h = tooltipNode.offsetHeight || 120;
              
              let leftPos = event.clientX + 20;
              let topPos = event.clientY - 20;

              // Prevent horizontal overflow
              if (leftPos + w + 20 > window.innerWidth) {
                  leftPos = event.clientX - w - 20;
              }
              // Prevent vertical overflow
              if (topPos + h + 20 > window.innerHeight) {
                  topPos = event.clientY - h - 20;
              }
              
              tooltip.style('left', leftPos + 'px').style('top', topPos + 'px');
          })
          .on('mouseout', () => tooltip.style('display', 'none'))
          .on('click', (event, d) => {
            this.mapSearch = d.properties.AC_NAME;
            this.searchAndZoom();
          });
    },
    searchAndZoom() {
      if (!this.mapSearch) return;
      
      const query = this.mapSearch.toLowerCase();
      const feature = TN_MAP_DATA.features.find(f => 
        f.properties.AC_NAME.toLowerCase().includes(query) ||
        (this.constituencyMap[f.properties.AC_NAME] && this.constituencyMap[f.properties.AC_NAME].toLowerCase().includes(query))
      );

      if (feature) {
        const [[x0, y0], [x1, y1]] = this.path.bounds(feature);
        this.svg.transition().duration(750).call(
          d3.zoom().on("zoom", (event) => {
            this.g.attr("transform", event.transform);
          }).transform,
          d3.zoomIdentity
            .translate(250, 300)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / 500, (y1 - y0) / 600)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
        this.isZoomed = true;
      }
    },
    resetZoom() {
      this.svg.transition().duration(750).call(
        d3.zoom().on("zoom", (event) => {
          this.g.attr("transform", event.transform);
        }).transform,
        d3.zoomIdentity
      );
      this.isZoomed = false;
      this.mapSearch = "";
    },
    translateDistrict(dist) {
      const translated = this.t('districts.' + dist);
      if (translated && translated !== 'districts.' + dist) return translated;
      return this.isTamil && this.districtMap[dist] ? this.districtMap[dist] : dist;
    },
    translateConstituency(name) {
      if (!name) return '';
      if (!this.isTamil) return name;
      
      // Try exact match first
      if (this.constituencyMap[name]) return this.constituencyMap[name];
      
      // Clean name: remove (SC), (ST) and common truncations
      let cleanName = name.split('(')[0].trim();
      if (this.constituencyMap[cleanName]) return this.constituencyMap[cleanName];
      
      // Handle known truncations from mapData
      if (cleanName === 'Chepauk-Thiruvalliken') cleanName = 'Chepauk-Thiruvallikeni';
      if (cleanName === 'Dr.Radhakrishnan Naga') cleanName = 'Dr. Radhakrishnan Nagar';
      if (cleanName === 'Kilvaithinankuppam') cleanName = 'Kilvaithinankuppam';
      
      return this.constituencyMap[cleanName] || name;
    },
    translateCategory(cat) {
       return this.t(`candidates.categories.${cat}`);
    },
    formatNumber(num) {
      return num ? num.toLocaleString() : '0';
    },
    formatLargeNumber(num) {
      const crSuffix = this.isTamil ? ' கோடி' : ' Cr';
      const lSuffix = this.isTamil ? ' லட்சம்' : ' L';
      
      if (num >= 10000000) {
        return (num / 10000000).toFixed(2) + crSuffix;
      } else if (num >= 100000) {
        return (num / 100000).toFixed(2) + lSuffix;
      }
      return num ? num.toLocaleString() : '0';
    },
    getCandidate(constituencyEn) {
      return this.candidates.find(c => c.constituency === constituencyEn);
    },
    getCandidateName(constituencyEn) {
      const c = this.getCandidate(constituencyEn);
      if (!c) return 'Candidate Name';
      return this.isTamil ? c.name : c.nameEn;
    },
    getCandidateDegree(constituencyEn) {
      const c = this.getCandidate(constituencyEn);
      return c ? c.degree : '';
    },
    getCandidateInitial(constituencyEn) {
      const c = this.getCandidate(constituencyEn);
      if (!c) return '?';
      const name = c.nameEn || '';
      return name.charAt(0);
    }
  }
}
</script>

<style scoped>
.results-container {
  min-height: 100vh;
  background: #fcfcfc;
  overflow-x: hidden;
}

.results-hero {
  min-height: 500px;
  background-color: #800000;
  overflow: hidden;
}

.results-hero-bg {
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.8;
}

.hero-overlay {
  background: linear-gradient(135deg, rgba(128, 0, 0, 0.85) 0%, rgba(128, 0, 0, 0.95) 100%);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.highlight-gold {
  background: rgba(212, 175, 55, 0.25) !important;
  border: 1px solid rgba(212, 175, 55, 0.5) !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.15) !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.glass-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(128, 0, 0, 0.15) !important;
  border-color: rgba(212, 175, 55, 0.5) !important;
}

.card-accent-bar {
  height: 6px;
  width: 100%;
}
.card-accent-bar.gen { background: linear-gradient(90deg, #800000, #a00000); }
.card-accent-bar.sc { background: linear-gradient(90deg, #D4AF37, #f1c40f); }
.card-accent-bar.st { background: linear-gradient(90deg, #555, #888); }

.bg-maroon-light {
  background: rgba(128, 0, 0, 0.03);
  border: 1px solid rgba(128, 0, 0, 0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-item {
  padding: 8px 0;
}

.stat-val {
  font-size: 1.1rem;
}

.color-gold { color: #D4AF37; }
.color-maroon { color: #800000; }
.bg-maroon { background-color: #800000 !important; }

.district-header .header-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(128, 0, 0, 0.3), transparent);
}

.turnout-bar {
  background: rgba(0,0,0,0.05) !important;
}

.glow-text {
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
}

.text-tiny {
  font-size: 0.65rem;
  letter-spacing: 1px;
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

@media (max-width: 600px) {
  .display-promo { font-size: 2.5rem !important; }
}

.border-gold-glow {
  border: 2px solid #D4AF37 !important;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.3) !important;
}
.glow-green {
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5) !important;
}
.glow-gold {
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5) !important;
}
.bg-success-light {
  background-color: rgba(76, 175, 80, 0.05) !important;
  border-color: rgba(76, 175, 80, 0.2) !important;
}
.text-success {
  color: #4CAF50 !important;
}
.color-green {
  color: #4CAF50 !important;
}

/* Map Styles */
.map-container {
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  position: relative;
}

.map-reset-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
}

.relative {
  position: relative;
}

:deep(.map-path) {
  cursor: pointer;
}

:deep(.map-path:hover) {
  opacity: 0.85;
}

.map-legend {
  padding: 1rem 0;
}

.legend-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  display: inline-block;
  border: 1px solid rgba(0,0,0,0.15);
}

.legend-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #333;
}

.legend-count {
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
}

@media (max-width: 768px) {
  .map-container {
    height: 350px;
  }
}
</style>
