<template>
  <v-container fluid class="pa-0 grievance-dashboard-page">
    <!-- Premium Header Banner -->
    <div class="banner-wrapper position-relative overflow-hidden bg-gradient-maroon text-white py-14 px-6 text-center">
      <div class="position-absolute top-0 end-0 opacity-10 pointer-events-none pa-10">
        <v-icon size="250" color="white">mdi-shield-check</v-icon>
      </div>
      <v-container class="position-relative z-index-1 max-w-1200">
        <v-chip color="amber-lighten-1" variant="elevated" class="mb-4 font-weight-bold text-maroon px-5 py-2 text-uppercase text-caption">
          <v-icon left size="18" class="mr-1">mdi-gavel</v-icon>
          {{ isTamil ? 'நேரடி மக்கள் கண்காணிப்பு' : 'Live Citizen Oversight' }}
        </v-chip>
        <h1 class="text-h3 text-md-h2 font-weight-black mb-3 text-gold text-shadow">
          {{ t("grievanceDashboard.title") || (isTamil ? "முதலமைச்சர் தளபதியின் நேரடி மக்கள் குறைதீர்வு & கண்காணிப்பு மையம்" : "Chief Minister Thalapathy's Live Grievance Tracking Dashboard") }}
        </h1>
        <p class="text-h6 text-md-h5 font-weight-regular opacity-90 max-w-800 mx-auto">
          {{ t("grievanceDashboard.subtitle") || (isTamil ? "பொதுமக்கள் அளித்த புகார்களின் தற்போதைய தீர்வு நிலை மற்றும் அரசு அதிகாரிகளின் நேரடி நடவடிக்கைகளை இங்கே உடனுக்குடன் அறிந்துகொள்ளலாம்." : "Track real-time status of citizen grievances and inspect direct remedial actions taken by responsible IAS and departmental officers.") }}
        </p>
      </v-container>
    </div>

    <v-container class="py-10 max-w-1400">
      <!-- Top KPI Summary Cards -->
      <v-row class="mb-8">
        <v-col cols="6" sm="6" md="3">
          <v-card class="kpi-card pa-4 pa-md-6 text-center rounded-xl bg-gradient-gold text-maroon elevation-4 border-gold">
            <v-icon size="40" class="mb-1 opacity-80">mdi-file-document-multiple</v-icon>
            <div class="text-h4 text-md-h3 font-weight-black mb-1">{{ totalCount }}</div>
            <div class="text-caption text-md-subtitle-1 font-weight-bold text-uppercase line-clamp-1">{{ isTamil ? 'மொத்தப் புகார்கள்' : 'Total Submissions' }}</div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="6" md="3">
          <v-card class="kpi-card pa-4 pa-md-6 text-center rounded-xl bg-gradient-green text-white elevation-4 border-green">
            <v-icon size="40" class="mb-1 opacity-80">mdi-check-decagram</v-icon>
            <div class="text-h4 text-md-h3 font-weight-black mb-1">{{ resolvedCount }}</div>
            <div class="text-caption text-md-subtitle-1 font-weight-bold text-uppercase line-clamp-1">{{ t("grievanceDashboard.statusResolved") || (isTamil ? 'தீர்க்கப்பட்டது' : 'Resolved') }}</div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="6" md="3">
          <v-card class="kpi-card pa-4 pa-md-6 text-center rounded-xl bg-gradient-orange text-white elevation-4 border-orange">
            <v-icon size="40" class="mb-1 opacity-80">mdi-progress-wrench</v-icon>
            <div class="text-h4 text-md-h3 font-weight-black mb-1">{{ inProgressCount }}</div>
            <div class="text-caption text-md-subtitle-1 font-weight-bold text-uppercase line-clamp-1">{{ t("grievanceDashboard.statusInProgress") || (isTamil ? 'நடவடிக்கையில்' : 'In Progress') }}</div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="6" md="3">
          <v-card class="kpi-card pa-4 pa-md-6 text-center rounded-xl bg-gradient-red text-white elevation-4 border-red">
            <v-icon size="40" class="mb-1 opacity-80">mdi-alert-circle-outline</v-icon>
            <div class="text-h4 text-md-h3 font-weight-black mb-1">{{ pendingCount }}</div>
            <div class="text-caption text-md-subtitle-1 font-weight-bold text-uppercase line-clamp-1">{{ t("grievanceDashboard.statusPending") || (isTamil ? 'பரிசீலனையில்' : 'Pending Action') }}</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Premium Navigation Tabs -->
      <v-card class="rounded-xl elevation-6 border-gold mb-10 overflow-hidden">
        <v-tabs v-model="activeTab" bg-color="#800000" color="#D4AF37" grow height="auto" class="py-2" show-arrows slider-color="#D4AF37">
          <v-tab value="new" class="text-subtitle-1 text-md-h6 font-weight-bold py-3 px-3 text-wrap">
            <v-icon left size="22" class="mr-1 mr-md-2">mdi-file-document-edit</v-icon>
            {{ t("grievanceDashboard.tabNew") || (isTamil ? 'புதிய புகார் பதிவு' : 'File New Grievance') }}
          </v-tab>
          <v-tab value="tracking" class="text-subtitle-1 text-md-h6 font-weight-bold py-3 px-3 text-wrap">
            <v-icon left size="22" class="mr-1 mr-md-2">mdi-crosshairs-gps</v-icon>
            {{ t("grievanceDashboard.tabTracking") || (isTamil ? 'நேரடி புகார் கண்காணிப்பு' : 'Citizen Live Tracking') }}
          </v-tab>
          <v-tab value="dashboard" class="text-subtitle-1 text-md-h6 font-weight-bold py-3 px-3 text-wrap">
            <v-icon left size="22" class="mr-1 mr-md-2">mdi-view-dashboard</v-icon>
            {{ t("grievanceDashboard.tabDashboard") || (isTamil ? 'அனைத்து புகார்கள் & தீர்வுகள்' : 'Public Grievance Feed') }}
          </v-tab>
        </v-tabs>

        <v-card-text class="pa-6 pa-md-10 bg-grey-lighten-4 text-grey-darken-4">
          <v-window v-model="activeTab">
            <!-- TAB 3: File New Grievance -->
            <v-window-item value="new">
              <v-card class="pa-8 rounded-xl elevation-4 bg-white max-w-1000 mx-auto border-maroon">
                <div class="text-center mb-8">
                  <v-icon size="64" color="#800000" class="mb-3">mdi-file-document-edit-outline</v-icon>
                  <h3 class="text-h4 font-weight-black text-maroon mb-2">
                    {{ t("grievanceDashboard.tabNew") || (isTamil ? 'புதிய புகார் பதிவு' : 'File New Grievance') }}
                  </h3>
                  <p class="text-subtitle-1 text-grey-darken-2 max-w-700 mx-auto">
                    {{ t("grievanceDashboard.formDesc") || (isTamil ? 'உங்கள் பகுதியில் உள்ள குறைகளை அல்லது அரசு சேவை தொடர்பான புகார்களை உடனடியாகப் பதிவு செய்யுங்கள்.' : 'Register grievances regarding public utilities or administrative services for immediate official intervention.') }}
                  </p>
                  <div class="title-divider mx-auto bg-gold mb-6 mt-4" style="height: 4px; width: 80px; border-radius: 2px;"></div>
                </div>

                <v-form ref="newGrievanceForm" v-model="validNewGrievance" @submit.prevent="submitNewGrievance">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="newGrievance.name"
                        :label="t('voice.formName') || (isTamil ? 'உங்கள் முழு பெயர்' : 'Full Name')"
                        prepend-inner-icon="mdi-account"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="newGrievance.phone"
                        :label="t('voice.formPhone') || (isTamil ? 'தொலைபேசி எண்' : 'Mobile Number')"
                        prepend-inner-icon="mdi-phone"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required', v => /^\d{10}$/.test(v) || 'Enter valid 10-digit number']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="newGrievance.district"
                        :items="formDistrictOptions"
                        item-title="title"
                        item-value="value"
                        :label="t('voice.formDist') || (isTamil ? 'மாவட்டம்' : 'District')"
                        prepend-inner-icon="mdi-map-marker"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                        @update:model-value="onDistrictChange"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="newGrievance.constituency"
                        :items="formConstituencyOptions"
                        item-title="title"
                        item-value="value"
                        :label="t('voice.formConstituency') || (isTamil ? 'சட்டமன்றத் தொகுதி' : 'Assembly Constituency')"
                        prepend-inner-icon="mdi-bank"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                        :disabled="!newGrievance.district"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="newGrievance.partNo"
                        :label="t('voice.formPartNo') || (isTamil ? 'பாகம் எண் (Part No)' : 'Part Number (Part No)')"
                        prepend-inner-icon="mdi-numeric"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="newGrievance.streetName"
                        :label="t('voice.formStreet') || (isTamil ? 'தெரு / பகுதி பெயர்' : 'Street / Area Name')"
                        prepend-inner-icon="mdi-road-variant"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="newGrievance.category"
                        :items="complaintCategories"
                        :label="t('voice.formCategory') || (isTamil ? 'வகை / துறை' : 'Category / Department')"
                        prepend-inner-icon="mdi-alert-octagon"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="newGrievance.priority"
                        :items="priorityLevels"
                        :label="t('voice.formPriority') || (isTamil ? 'முக்கியத்துவம்' : 'Priority Level')"
                        prepend-inner-icon="mdi-flag-triangle"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="newGrievance.description"
                        :label="t('voice.formDesc') || (isTamil ? 'விவரம் / செய்தி' : 'Detailed Description / Message')"
                        prepend-inner-icon="mdi-message-alert"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        rows="5"
                        :rules="[v => !!v || 'Required', v => v.length >= 20 || 'Minimum 20 characters required']"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="newGrievance.attachment"
                        :label="t('voice.formAttach') || (isTamil ? 'புகைப்படம் / ஆவணம் இணைக்கவும்' : 'Attach Photograph / Document')"
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera-plus"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        show-size
                      ></v-file-input>
                    </v-col>
                  </v-row>

                  <div class="text-center mt-8">
                    <v-btn
                      type="submit"
                      color="#800000"
                      size="x-large"
                      class="rounded-pill px-12 py-4 font-weight-bold text-white elevation-4 text-h6"
                      :loading="submittingNew"
                    >
                      <v-icon start icon="mdi-shield-check" size="large"></v-icon>
                      {{ t("grievanceDashboard.formSubmit") || (isTamil ? 'புகாரைப் பதிவு செய்' : 'Submit Grievance') }}
                    </v-btn>
                  </div>
                </v-form>
              </v-card>
            </v-window-item>

            <!-- TAB 1: Citizen Live Tracking -->
            <v-window-item value="tracking">
              <v-card class="pa-8 text-center rounded-xl elevation-2 bg-white max-w-800 mx-auto border-maroon">
                <v-icon size="64" color="#800000" class="mb-4">mdi-badge-account-alert</v-icon>
                <h3 class="text-h5 font-weight-bold mb-2 text-maroon">
                  {{ t("grievanceDashboard.trackingIdLabel") || (isTamil ? 'உங்கள் புகார் கண்காணிப்பு எண் (Tracking ID)' : 'Enter Grievance Tracking ID') }}
                </h3>
                <p class="text-subtitle-1 text-grey-darken-1 mb-6 max-w-600 mx-auto">
                  {{ isTamil ? 'நீங்கள் பதிவு செய்த போது வழங்கப்பட்ட TVK-2026-GR-XXXX எண்ணை உள்ளிட்டு தற்போதைய தீர்வு நிலையை அறியலாம்.' : 'Enter the TVK-2026-GR-XXXX tracking code provided during submission to instantly track your official resolution progress.' }}
                </p>

                <v-form @submit.prevent="searchTrackingId" class="d-flex flex-column flex-sm-row align-center max-w-600 mx-auto gap-4 mb-6">
                  <v-text-field
                    v-model="trackingQuery"
                    :label="isTamil ? 'உதாரணம்: TVK-2026-GR-90412' : 'Example: TVK-2026-GR-90412'"
                    variant="outlined"
                    color="#800000"
                    bg-color="white"
                    hide-details
                    class="w-100 font-weight-bold text-uppercase tracking-input"
                    prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                  <v-btn type="submit" color="#800000" size="x-large" elevation="4" class="text-white px-8 font-weight-black rounded-lg w-100 w-sm-auto" :loading="loading">
                    <v-icon left size="20" class="mr-1">mdi-eye</v-icon>
                    {{ t("grievanceDashboard.btnTrack") || (isTamil ? 'புகார் நிலைமை தேடு' : 'Search Status') }}
                  </v-btn>
                </v-form>

                <div v-if="searched && !trackedItem" class="pa-6 rounded-lg bg-red-lighten-5 text-red-darken-3 border-red mt-4">
                  <v-icon size="36" class="mb-2">mdi-alert-circle</v-icon>
                  <div class="text-h6 font-weight-bold">{{ isTamil ? 'புகார் எண் காணப்படவில்லை!' : 'Tracking ID Not Found!' }}</div>
                  <div class="text-subtitle-2">{{ isTamil ? 'சரியான எண்ணை (TVK-2026-GR-XXXX) உள்ளிட்டு மீண்டும் முயற்சிக்கவும்.' : 'Please ensure the tracking ID is typed correctly and try again.' }}</div>
                </div>

                <!-- Tracked Item Detail Timeline Card -->
                <v-expand-transition>
                  <div v-if="trackedItem" class="text-left mt-8">
                    <v-divider class="mb-8 border-gold"></v-divider>
                    <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center mb-6 pa-6 bg-maroon-lighten-5 rounded-xl border-maroon">
                      <div>
                        <v-chip color="#800000" class="text-white font-weight-bold text-caption mb-2">TRACKING ID: {{ trackedItem.id }}</v-chip>
                        <h4 class="text-h4 font-weight-black text-maroon mb-1">{{ trackedItem.desc }}</h4>
                        <div class="text-subtitle-1 text-grey-darken-2 font-weight-medium">
                          <v-icon size="18" class="mr-1 text-gold">mdi-account-circle</v-icon> {{ trackedItem.name }} |
                          <v-icon size="18" class="mx-1 text-gold">mdi-map-marker</v-icon> {{ getDistrictName(trackedItem.district) }}, {{ getConstituencyName(trackedItem.constituency) }}
                        </div>
                      </div>
                      <div class="mt-4 mt-md-0 text-md-right">
                        <v-chip :color="getStatusColor(trackedItem.status)" size="large" class="font-weight-black text-uppercase px-6 py-3 elevation-2 text-white">
                          <v-icon left size="22" class="mr-1">{{ getStatusIcon(trackedItem.status) }}</v-icon>
                          {{ getStatusText(trackedItem.status) }}
                        </v-chip>
                      </div>
                    </div>

                    <v-timeline side="end" align="start" class="tracking-timeline">
                      <v-timeline-item dot-color="#800000" icon="mdi-file-send" fill-dot size="large">
                        <v-card class="elevation-3 pa-5 rounded-lg border-maroon bg-white">
                          <v-card-title class="text-h6 font-weight-bold text-maroon pa-0 mb-1">1. {{ isTamil ? 'புகார் பதிவு செய்யப்பட்டது' : 'Grievance Successfully Registered' }}</v-card-title>
                          <v-card-subtitle class="pa-0 text-caption text-grey-darken-1 mb-2">
                            <v-icon size="14" class="mr-1">mdi-calendar-clock</v-icon> {{ formatDate(trackedItem.timestamp) }}
                          </v-card-subtitle>
                          <v-card-text class="pa-0 text-body-1 font-weight-medium text-grey-darken-3">
                            <v-icon size="16" class="mr-1 text-gold">mdi-tag</v-icon> {{ trackedItem.category }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>

                      <v-timeline-item dot-color="#D4AF37" icon="mdi-account-tie-hat" fill-dot size="large">
                        <v-card class="elevation-3 pa-5 rounded-lg border-gold bg-white">
                          <v-card-title class="text-h6 font-weight-bold text-gold pa-0 mb-1">2. {{ t("grievanceDashboard.officerAssigned") || (isTamil ? 'நியமிக்கப்பட்ட அதிகாரி / துறை' : 'Assigned Nodal Officer') }}</v-card-title>
                          <v-card-subtitle class="pa-0 text-caption text-grey-darken-1 mb-2">
                            <v-icon size="14" class="mr-1">mdi-office-building</v-icon> {{ isTamil ? 'அரசு துறை ஒருங்கிணைப்பு' : 'Departmental Coordination' }}
                          </v-card-subtitle>
                          <v-card-text class="pa-0 text-body-1 font-weight-bold text-maroon">
                            {{ trackedItem.assignedOfficer || (isTamil ? 'மாவட்ட உதவி ஆட்சியர் / துறை தலைவர்' : 'District Assistant Collector / Nodal Officer') }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>

                      <v-timeline-item :dot-color="getStatusColor(trackedItem.status)" :icon="getStatusIcon(trackedItem.status)" fill-dot size="large">
                        <v-card :class="['elevation-3 pa-5 rounded-lg border-l-8 bg-white', `border-l-${getStatusColor(trackedItem.status)}`]">
                          <v-card-title :class="['text-h6 font-weight-bold pa-0 mb-1', `text-${getStatusColor(trackedItem.status)}`]">
                            3. {{ t("grievanceDashboard.officialResponse") || (isTamil ? 'அதிகாரப்பூர்வ நடவடிக்கை / தீர்வு விவரம்' : 'Official Action / Resolution Note') }}
                          </v-card-title>
                          <v-card-subtitle class="pa-0 text-caption text-grey-darken-1 mb-3">
                            <v-chip size="small" :color="getStatusColor(trackedItem.status)" class="text-white font-weight-bold mt-1">{{ getStatusText(trackedItem.status) }}</v-chip>
                          </v-card-subtitle>
                          <v-card-text class="pa-4 bg-grey-lighten-4 rounded text-body-1 font-weight-medium text-grey-darken-4 border-l-4 border-maroon">
                            {{ trackedItem.responseMsg || (isTamil ? 'துரித நடவடிக்கை எடுக்கப்பட்டு வருகிறது.' : 'Preliminary departmental inquiry is currently underway.') }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>

                    <div class="text-center mt-6">
                      <v-btn color="#800000" variant="outlined" size="large" class="font-weight-black" @click="openUpdateModal(trackedItem)">
                        <v-icon left size="18" class="mr-1">mdi-pencil</v-icon>
                        {{ t("grievanceDashboard.btnUpdateStatus") || (isTamil ? 'அதிகாரி நடவடிக்கை / நிலைமை மாற்றம்' : 'Officer Action / Update Status') }}
                      </v-btn>
                    </div>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-window-item>

            <!-- TAB 2: Public Grievance Feed -->
            <v-window-item value="dashboard">
              <!-- Action Bar: Export & Reset -->
              <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-center gap-4 mb-6 pa-4 bg-maroon-lighten-5 rounded-xl border-maroon">
                <div class="d-flex align-center">
                  <v-icon size="32" color="#800000" class="mr-3">mdi-shield-account-outline</v-icon>
                  <div>
                    <h3 class="text-h6 text-sm-h5 font-weight-black text-maroon mb-0">
                      {{ t("grievanceDashboard.feedTitle") || (isTamil ? 'அனைத்து மக்கள் புகார்கள் & தீர்வுகள்' : 'Live Citizen Grievances Feed') }}
                    </h3>
                    <div class="text-caption text-grey-darken-2">{{ isTamil ? 'அரசு அதிகாரிகளின் நேரடி நடவடிக்கைகள் மற்றும் கண்காணிப்புப் பதிவு.' : 'Real-time monitoring log and departmental action tracking.' }}</div>
                  </div>
                </div>
                <div class="d-flex flex-wrap gap-2 align-self-start align-self-sm-center">
                  <v-btn color="#2e7d32" variant="flat" size="small" class="text-white font-weight-black rounded-lg elevation-2 px-4 py-2 flex-grow-1 flex-sm-grow-0" @click="exportToExcel">
                    <v-icon left size="18" class="mr-1">mdi-file-excel</v-icon>
                    {{ isTamil ? 'எக்செல் பதிவிறக்கம்' : 'Download Excel' }}
                  </v-btn>
                  <v-btn color="#c62828" variant="outlined" size="small" class="font-weight-black rounded-lg px-4 py-2 flex-grow-1 flex-sm-grow-0 bg-white" @click="resetGrievancesData">
                    <v-icon left size="18" class="mr-1">mdi-refresh</v-icon>
                    {{ isTamil ? 'பழைய புகார்களை அழி' : 'Clear / Reset DB' }}
                  </v-btn>
                </div>
              </div>

              <!-- Search & Filters Bar -->
              <v-card class="pa-4 pa-md-6 rounded-xl elevation-2 bg-white mb-8 border-maroon">
                <v-row class="align-center">
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="searchQuery"
                      :placeholder="t('grievanceDashboard.searchPlaceholder') || (isTamil ? 'புகார் எண் (TVK-2026-GR-XXXX) அல்லது பெயர் மூலம் தேடுக...' : 'Search by Tracking ID or Citizen Name...')"
                      variant="outlined"
                      color="#800000"
                      bg-color="white"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      class="font-weight-medium"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      v-model="selectedDistrict"
                      :items="districtOptions"
                      item-title="title"
                      item-value="value"
                      :label="t('grievanceDashboard.filterDistrict') || (isTamil ? 'மாவட்டம் வாரியாக' : 'Filter by District')"
                      variant="outlined"
                      color="#800000"
                      bg-color="white"
                      hide-details
                      prepend-inner-icon="mdi-map-marker"
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" class="d-flex flex-column gap-1">
                    <div class="text-caption font-weight-bold text-uppercase text-grey-darken-1 mb-1">
                      {{ t("grievanceDashboard.filterStatus") || (isTamil ? 'நிலை வாரியாக:' : 'Filter by Status:') }}
                    </div>
                    <v-btn-toggle v-model="selectedStatus" color="#800000" mandatory class="elevation-1 rounded-lg overflow-x-auto w-100 flex-nowrap d-flex">
                      <v-btn value="all" size="small" class="font-weight-black px-2 flex-grow-1">{{ t("grievanceDashboard.statusAll") || (isTamil ? 'அனைத்தும்' : 'All') }}</v-btn>
                      <v-btn value="Resolved" size="small" class="font-weight-black text-green px-2 flex-grow-1">{{ t("grievanceDashboard.statusResolved") || (isTamil ? 'தீர்க்கப்பட்டது' : 'Resolved') }}</v-btn>
                      <v-btn value="In Progress" size="small" class="font-weight-black text-orange px-2 flex-grow-1">{{ t("grievanceDashboard.statusInProgress") || (isTamil ? 'நடவடிக்கையில்' : 'In Progress') }}</v-btn>
                      <v-btn value="Pending" size="small" class="font-weight-black text-red px-2 flex-grow-1">{{ t("grievanceDashboard.statusPending") || (isTamil ? 'பரிசீலனையில்' : 'Pending') }}</v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-card>

              <div v-if="loading" class="py-16 text-center">
                <v-progress-circular indeterminate size="80" width="8" color="#D4AF37"></v-progress-circular>
                <div class="mt-4 text-h6 font-weight-bold text-maroon">{{ isTamil ? 'புகார் தரவுகள் ஏற்றப்படுகிறது...' : 'Loading live grievances feed...' }}</div>
              </div>

              <!-- Grievance Cards Grid -->
              <v-row v-else>
                <v-col cols="12" md="6" lg="4" v-for="item in filteredGrievances" :key="item.id">
                  <v-card class="grievance-feed-card h-100 d-flex flex-column rounded-xl elevation-4 border-maroon overflow-hidden bg-white hover-card">
                    <!-- Card Top Header Banner -->
                    <div class="pa-4 bg-maroon-lighten-5 d-flex justify-space-between align-center border-b border-maroon">
                      <v-chip color="#800000" variant="elevated" class="text-white font-weight-black text-caption px-3">
                        <v-icon left size="14" class="mr-1">mdi-identifier</v-icon> {{ item.id }}
                      </v-chip>
                      <v-chip :color="getStatusColor(item.status)" variant="elevated" class="text-white font-weight-black text-caption px-4 text-uppercase">
                        <v-icon left size="14" class="mr-1">{{ getStatusIcon(item.status) }}</v-icon> {{ getStatusText(item.status) }}
                      </v-chip>
                    </div>

                    <!-- Card Main Content -->
                    <v-card-text class="pa-6 flex-grow-1 d-flex flex-column justify-space-between">
                      <div>
                        <div class="d-flex align-center text-caption text-gold font-weight-black mb-2 text-uppercase">
                          <v-icon size="16" class="mr-1">mdi-tag</v-icon> {{ item.category }}
                        </div>
                        <h4 class="text-h6 font-weight-bold text-grey-darken-4 mb-3 line-clamp-3">"{{ item.desc }}"</h4>
                        <div class="d-flex align-center text-subtitle-2 text-grey-darken-2 mb-4 bg-grey-lighten-4 pa-3 rounded">
                          <v-icon size="18" color="#800000" class="mr-2">mdi-account-circle</v-icon>
                          <span class="font-weight-bold mr-1">{{ item.name }}</span> |
                          <v-icon size="16" color="#D4AF37" class="mx-2">mdi-map-marker</v-icon>
                          <span>{{ getDistrictName(item.district) }}, {{ getConstituencyName(item.constituency) }}</span>
                        </div>
                        <div class="text-caption text-grey-darken-1 mb-4 d-flex align-center">
                          <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon> {{ formatDate(item.timestamp) }}
                        </div>
                      </div>

                      <!-- Assigned Officer & Resolution Box -->
                      <div class="mt-4 pt-4 border-t border-grey-lighten-2">
                        <div class="text-caption font-weight-bold text-uppercase text-maroon mb-1 d-flex align-center">
                          <v-icon size="16" class="mr-1">mdi-account-tie-outline</v-icon> {{ t("grievanceDashboard.officerAssigned") || (isTamil ? 'நியமிக்கப்பட்ட அதிகாரி:' : 'Assigned Officer:') }}
                        </div>
                        <div class="text-subtitle-2 font-weight-black text-grey-darken-4 mb-3 pl-2 border-l-2 border-gold">
                          {{ item.assignedOfficer || (isTamil ? 'மாவட்ட உதவி ஆட்சியர்' : 'District Nodal Officer') }}
                        </div>

                        <div class="text-caption font-weight-bold text-uppercase text-grey-darken-2 mb-1 d-flex align-center">
                          <v-icon size="16" class="mr-1">mdi-comment-check-outline</v-icon> {{ t("grievanceDashboard.officialResponse") || (isTamil ? 'அரசு நடவடிக்கை:' : 'Official Action:') }}
                        </div>
                        <div class="pa-3 bg-blue-grey-lighten-5 rounded text-caption font-weight-bold text-grey-darken-4 line-clamp-3 border-l-4 border-maroon">
                          {{ item.responseMsg || (isTamil ? 'பரிசீலனையில் உள்ளது.' : 'Under preliminary verification.') }}
                        </div>
                      </div>
                    </v-card-text>

                    <!-- Card Footer Admin Action Button -->
                    <v-card-actions class="pa-4 pt-0 bg-grey-lighten-5 border-t border-grey-lighten-3 justify-end">
                      <v-btn color="#800000" variant="text" size="small" class="font-weight-bold" @click="openUpdateModal(item)">
                        <v-icon left size="16" class="mr-1">mdi-pencil-box-multiple</v-icon>
                        {{ t("grievanceDashboard.btnUpdateStatus") || (isTamil ? 'அதிகாரி நிலைமை மாற்றம்' : 'Officer Update Status') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="12" v-if="filteredGrievances.length === 0" class="py-16 text-center">
                  <v-icon size="80" color="grey-lighten-1">mdi-folder-alert-outline</v-icon>
                  <div class="text-h5 font-weight-bold text-grey-darken-1 mt-4">{{ isTamil ? 'தேடலுக்குப் பொருத்தமான புகார்கள் எதுவும் கிடைக்கவில்லை.' : 'No matching grievances found for the selected filter criteria.' }}</div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- New Grievance Success Dialog -->
    <v-dialog v-model="successDialog" max-width="550" persistent>
      <v-card class="rounded-xl overflow-hidden border-gold text-center pa-8">
        <div class="success-icon-wrapper mb-6 bg-green-lighten-5 rounded-circle d-inline-flex pa-6 mx-auto border-green">
          <v-icon size="72" color="green-darken-3">mdi-check-decagram</v-icon>
        </div>
        <h3 class="text-h4 font-weight-black text-maroon mb-2">
          {{ t("voice.successTitle") || (isTamil ? 'வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!' : 'Successfully Submitted!') }}
        </h3>
        <p class="text-body-1 text-grey-darken-2 mb-6">
          {{ t("voice.successComplaint") || (isTamil ? 'உங்கள் புகார் வெற்றிகரமாகப் பதிவு செய்யப்பட்டு, சம்பந்தப்பட்ட அதிகாரியின் நேரடிப் பார்வைக்கு அனுப்பப்பட்டது.' : 'Your grievance has been successfully registered and assigned to the respective nodal officer.') }}
        </p>

        <div class="pa-6 bg-amber-lighten-5 rounded-xl border-gold mb-8 elevation-2">
          <div class="text-caption font-weight-bold text-maroon text-uppercase mb-1">
            {{ t("voice.trackingId") || (isTamil ? 'உங்கள் கண்காணிப்பு எண்:' : 'Your Tracking Reference ID:') }}
          </div>
          <div class="text-h3 font-weight-black color-maroon my-2 py-3 bg-white rounded border-maroon">
            {{ newlyCreatedId }}
          </div>
          <div class="text-caption text-grey-darken-2 mt-2 font-weight-medium">
            {{ isTamil ? 'இந்த எண்ணை குறித்து வைத்துக்கொள்ளவும். இதன் மூலம் நேரடி தீர்வு நிலையை அறியலாம்.' : 'Please save this tracking code to check your live resolution status.' }}
          </div>
        </div>

        <div class="d-flex flex-column flex-sm-row justify-center gap-4">
          <v-btn color="grey-darken-2" variant="outlined" size="x-large" class="rounded-pill px-8 font-weight-bold" @click="successDialog = false">
            {{ t("voice.btnClose") || (isTamil ? 'மூடு' : 'Close') }}
          </v-btn>
          <v-btn color="#800000" size="x-large" class="rounded-pill px-8 font-weight-black text-white elevation-4" @click="trackNewlyCreated">
            <v-icon left class="mr-1">mdi-crosshairs-gps</v-icon> {{ t("voice.btnTrack") || (isTamil ? 'நேரடி நிலை தேடு' : 'Track Status') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Admin Status Update Modal Dialog -->
    <v-dialog v-model="updateModal" max-width="650" persistent>
      <v-card class="rounded-xl overflow-hidden border-gold elevation-24">
        <v-toolbar bg-color="#800000" color="#D4AF37" class="pa-2">
          <v-toolbar-title class="text-h6 font-weight-black text-gold">
            <v-icon left size="24" class="mr-2">mdi-shield-edit-outline</v-icon>
            {{ t("grievanceDashboard.modalTitle") || (isTamil ? 'புகார் தீர்வு நிலைமை மாற்றம்' : 'Update Grievance Resolution Status') }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="updateModal = false" color="white"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>

        <v-card-text class="pa-8 bg-white">
          <div v-if="selectedItem" class="mb-6 pa-4 bg-maroon-lighten-5 rounded-lg border-maroon">
            <div class="text-caption font-weight-bold text-maroon">TRACKING ID: {{ selectedItem.id }}</div>
            <div class="text-h6 font-weight-bold text-grey-darken-4 mb-1">"{{ selectedItem.desc }}"</div>
            <div class="text-subtitle-2 text-grey-darken-2">
              <v-icon size="16" class="mr-1">mdi-account-circle</v-icon> {{ selectedItem.name }} ({{ getDistrictName(selectedItem.district) }})
            </div>
          </div>

          <v-form ref="updateForm" v-model="validUpdate" @submit.prevent="saveStatusUpdate">
            <v-select
              v-model="modalForm.status"
              :items="['Pending', 'In Progress', 'Resolved']"
              :label="t('grievanceDashboard.modalStatusLabel') || (isTamil ? 'புதிய நிலைமை' : 'New Resolution Status')"
              variant="outlined"
              color="#800000"
              class="mb-6 font-weight-bold"
              required
            ></v-select>

            <v-text-field
              v-model="modalForm.assignedOfficer"
              :label="t('grievanceDashboard.officerAssigned') || (isTamil ? 'நியமிக்கப்பட்ட அதிகாரி / பொறுப்பாளர்' : 'Assigned Nodal Officer')"
              variant="outlined"
              color="#800000"
              class="mb-6"
              required
            ></v-text-field>

            <v-textarea
              v-model="modalForm.responseMsg"
              :label="t('grievanceDashboard.modalResponseLabel') || (isTamil ? 'அரசு நடவடிக்கை / தீர்வு விளக்கம்' : 'Official Action / Resolution Note')"
              variant="outlined"
              color="#800000"
              rows="4"
              class="mb-6"
              required
            ></v-textarea>

            <div class="d-flex justify-end gap-4 mt-6">
              <v-btn variant="outlined" color="grey-darken-2" size="large" @click="updateModal = false" class="font-weight-bold px-6">
                {{ t("grievanceDashboard.btnCancel") || (isTamil ? 'ரத்து செய்' : 'Cancel') }}
              </v-btn>
              <v-btn type="submit" color="#800000" size="large" elevation="4" class="text-white font-weight-black px-8" :loading="savingUpdate">
                <v-icon left size="20" class="mr-1">mdi-content-save-check</v-icon>
                {{ t("grievanceDashboard.btnSave") || (isTamil ? 'மாற்றத்தைச் சேமி' : 'Save Action Note') }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="green-darken-3" elevation="12" location="top" timeout="4000">
      <div class="d-flex align-center font-weight-bold text-white text-h6">
        <v-icon left size="28" class="mr-3">mdi-check-circle</v-icon>
        {{ snackbarMsg }}
      </div>
    </v-snackbar>
  </v-container>
</template>

<script>
import { apiService } from "../../services/api";
import { candidatesData } from "../../data/candidates";
import { constituenciesMap } from "../../data/constituencies";

export default {
  name: "GrievanceDashboard",
  inject: ["t", "currentLang"],
  data: () => ({
    activeTab: "new",
    loading: false,
    grievancesList: [],
    searchQuery: "",
    selectedDistrict: null,
    selectedStatus: "all",
    trackingQuery: "",
    trackedItem: null,
    searched: false,
    updateModal: false,
    selectedItem: null,
    validUpdate: false,
    savingUpdate: false,
    validNewGrievance: false,
    submittingNew: false,
    successDialog: false,
    newlyCreatedId: "",
    newGrievance: {
      name: "",
      phone: "",
      district: "",
      constituency: "",
      partNo: "",
      streetName: "",
      category: null,
      priority: null,
      description: "",
      attachment: null,
    },
    modalForm: {
      status: "Pending",
      assignedOfficer: "",
      responseMsg: "",
    },
    snackbar: false,
    snackbarMsg: "",
  }),
  computed: {
    complaintCategories() {
      const items = this.t("voice.categoriesComplaint");
      return Array.isArray(items) ? items : [
        "Roads & Public Transport",
        "Electricity & Streetlights",
        "Drinking Water & Sanitation",
        "Anti-Corruption / Vigilance",
        "Women & Child Safety",
        "Youth Welfare & Employment",
        "Other Grievances"
      ];
    },
    priorityLevels() {
      const items = this.t("voice.priorities");
      return Array.isArray(items) ? items : ["Normal", "High Priority", "Urgent / Immediate"];
    },
    isTamil() {
      return this.currentLang() === "ta";
    },
    totalCount() {
      return this.grievancesList.length;
    },
    resolvedCount() {
      return this.grievancesList.filter(g => g.status === "Resolved").length;
    },
    inProgressCount() {
      return this.grievancesList.filter(g => g.status === "In Progress").length;
    },
    pendingCount() {
      return this.grievancesList.filter(g => g.status === "Pending" || !g.status).length;
    },
    districtOptions() {
      const districts = [...new Set(this.grievancesList.map(g => g.district).filter(Boolean))].sort();
      const distMap = this.t("districts") || {};
      return districts.map(d => ({
        title: this.isTamil ? (distMap[d] || d) : d,
        value: d
      })).sort((a, b) => a.title.localeCompare(b.title));
    },
    formDistrictOptions() {
      const distMap = this.t("districts") || {};
      const uniqueDistricts = [...new Set(candidatesData.map(c => c.district).filter(Boolean))];
      return uniqueDistricts.map(d => {
        const taName = distMap[d] || d;
        return {
          title: this.isTamil ? taName : d,
          value: d,
          key: d
        };
      }).sort((a, b) => a.title.localeCompare(b.title));
    },
    formConstituencyOptions() {
      let filtered = candidatesData;
      const currentDist = this.newGrievance ? this.newGrievance.district : null;
      if (currentDist) {
        filtered = candidatesData.filter(c => c.district === currentDist);
      }
      return filtered.map(c => {
        const taConst = constituenciesMap[c.constituency] || c.constituency;
        const dispName = this.isTamil ? taConst : c.constituency;
        return {
          title: dispName,
          value: c.constituency,
          key: c.constituency
        };
      }).sort((a, b) => a.title.localeCompare(b.title));
    },
    filteredGrievances() {
      return this.grievancesList.filter(item => {
        const query = (this.searchQuery || "").toLowerCase().trim();
        const matchesQuery = !query || 
          (item.id || "").toLowerCase().includes(query) || 
          (item.name || "").toLowerCase().includes(query) || 
          (item.desc || "").toLowerCase().includes(query);

        const matchesDistrict = !this.selectedDistrict || item.district === this.selectedDistrict;
        const matchesStatus = this.selectedStatus === "all" || item.status === this.selectedStatus;

        return matchesQuery && matchesDistrict && matchesStatus;
      });
    },
  },
  methods: {
    getDistrictName(distKey) {
      if (!distKey) return "";
      const distMap = this.t("districts") || {};
      return this.isTamil ? (distMap[distKey] || distKey) : distKey;
    },
    getConstituencyName(constKey) {
      if (!constKey) return "";
      const taConst = constituenciesMap[constKey];
      return this.isTamil ? (taConst || constKey) : constKey;
    },
    onDistrictChange() {
      if (this.newGrievance) {
        this.newGrievance.constituency = "";
      }
    },
    async submitNewGrievance() {
      const { valid } = await this.$refs.newGrievanceForm.validate();
      if (!valid) return;
      this.submittingNew = true;

      const payload = {
        name: this.newGrievance.name,
        phone: this.newGrievance.phone,
        district: this.newGrievance.district,
        constituency: this.newGrievance.constituency,
        partNo: this.newGrievance.partNo,
        streetName: this.newGrievance.streetName,
        category: this.newGrievance.category,
        priority: this.newGrievance.priority,
        desc: this.newGrievance.description,
        isPublic: true,
      };

      const res = await apiService.submitGrievance(payload);
      this.submittingNew = false;

      if (res && res.success) {
        this.newlyCreatedId = res.trackingId;
        await this.fetchGrievances();
        this.successDialog = true;
        this.$refs.newGrievanceForm.reset();
      }
    },
    trackNewlyCreated() {
      this.successDialog = false;
      this.activeTab = "tracking";
      this.trackingQuery = this.newlyCreatedId;
      this.searchTrackingId();
    },
    async fetchGrievances() {
      this.loading = true;
      const res = await apiService.getGrievances();
      if (res && res.success && res.data) {
        this.grievancesList = res.data;
      }
      this.loading = false;
    },
    searchTrackingId() {
      if (!this.trackingQuery || !this.trackingQuery.trim()) return;
      this.searched = true;
      const query = this.trackingQuery.trim().toUpperCase();
      this.trackedItem = this.grievancesList.find(g => g.id.toUpperCase() === query) || null;
    },
    getStatusColor(status) {
      if (status === "Resolved") return "green";
      if (status === "In Progress") return "amber-darken-3";
      return "red";
    },
    getStatusIcon(status) {
      if (status === "Resolved") return "mdi-check-decagram";
      if (status === "In Progress") return "mdi-progress-clock";
      return "mdi-alert-circle-outline";
    },
    getStatusText(status) {
      if (status === "Resolved") return this.t("grievanceDashboard.statusResolved") || (this.isTamil ? "தீர்க்கப்பட்டது" : "Resolved");
      if (status === "In Progress") return this.t("grievanceDashboard.statusInProgress") || (this.isTamil ? "நடவடிக்கையில்" : "In Progress");
      return this.t("grievanceDashboard.statusPending") || (this.isTamil ? "பரிசீலனையில்" : "Pending Action");
    },
    formatDate(isoString) {
      if (!isoString) return this.isTamil ? "சமீபத்தில்" : "Recently";
      const date = new Date(isoString);
      return date.toLocaleDateString(this.isTamil ? "ta-IN" : "en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    openUpdateModal(item) {
      this.selectedItem = item;
      this.modalForm.status = item.status || "Pending";
      this.modalForm.assignedOfficer = item.assignedOfficer || "";
      this.modalForm.responseMsg = item.responseMsg || "";
      this.updateModal = true;
    },
    async saveStatusUpdate() {
      if (!this.selectedItem) return;
      this.savingUpdate = true;
      const res = await apiService.updateGrievanceStatus({
        id: this.selectedItem.id,
        status: this.modalForm.status,
        assignedOfficer: this.modalForm.assignedOfficer,
        responseMsg: this.modalForm.responseMsg,
      });

      if (res && res.success && res.data) {
        const found = this.grievancesList.find(g => g.id === this.selectedItem.id);
        if (found) {
          found.status = res.data.status;
          found.assignedOfficer = res.data.assignedOfficer;
          found.responseMsg = res.data.responseMsg;
        }
        if (this.trackedItem && this.trackedItem.id === this.selectedItem.id) {
          this.trackedItem.status = res.data.status;
          this.trackedItem.assignedOfficer = res.data.assignedOfficer;
          this.trackedItem.responseMsg = res.data.responseMsg;
        }
        this.snackbarMsg = this.t("grievanceDashboard.successMsg") || (this.isTamil ? "புகார் நிலைமை வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது!" : "Grievance status updated successfully!");
        this.snackbar = true;
        this.updateModal = false;
      }
      this.savingUpdate = false;
    },
    exportToExcel() {
      const headers = ["Tracking ID", "Citizen Name", "Phone", "District", "Constituency", "Category", "Description", "Status", "Assigned Officer", "Response Note", "Submitted Date"];
      const rows = this.filteredGrievances.map(g => [
        `"${g.id || ''}"`,
        `"${(g.name || '').replace(/"/g, '""')}"`,
        `"${g.phone || ''}"`,
        `"${this.getDistrictName(g.district)}"`,
        `"${this.getConstituencyName(g.constituency)}"`,
        `"${(g.category || '').replace(/"/g, '""')}"`,
        `"${(g.desc || '').replace(/"/g, '""')}"`,
        `"${g.status || 'Pending'}"`,
        `"${(g.assignedOfficer || '').replace(/"/g, '""')}"`,
        `"${(g.responseMsg || '').replace(/"/g, '""')}"`,
        `"${this.formatDate(g.timestamp)}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `TVK_Grievances_Export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.snackbarMsg = this.isTamil ? "புகார் பட்டியல் வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!" : "Grievances exported to CSV successfully!";
      this.snackbar = true;
    },
    async resetGrievancesData() {
      if (!confirm(this.isTamil ? "அனைத்து புகார்களையும் அழித்து ஆரம்ப நிலைக்கு மாற்ற விரும்புகிறீர்களா?" : "Are you sure you want to clear and reset all grievances to the default pre-seeded records?")) {
        return;
      }
      this.loading = true;
      const res = await apiService.resetGrievances();
      if (res && res.success && res.data) {
        this.grievancesList = res.data;
        this.snackbarMsg = this.isTamil ? "அனைத்து புகார்களும் ஆரம்ப நிலைக்கு மாற்றப்பட்டது!" : "All grievances reset successfully!";
        this.snackbar = true;
      }
      this.loading = false;
    },
  },
  async created() {
    await this.fetchGrievances();
  },
};
</script>

<style scoped>
.grievance-dashboard-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
.bg-gradient-maroon {
  background: linear-gradient(135deg, #800000 0%, #4a0000 100%);
}
.bg-gradient-gold {
  background: linear-gradient(135deg, #FFDF73 0%, #D4AF37 100%);
}
.bg-gradient-green {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
}
.bg-gradient-orange {
  background: linear-gradient(135deg, #ef6c00 0%, #e65100 100%);
}
.bg-gradient-red {
  background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%);
}
.text-gold {
  color: #D4AF37 !important;
}
.text-maroon {
  color: #800000 !important;
}
.border-gold {
  border: 1px solid rgba(212, 175, 55, 0.4) !important;
}
.border-maroon {
  border: 1px solid rgba(128, 0, 0, 0.2) !important;
}
.border-green {
  border: 1px solid rgba(46, 125, 50, 0.4) !important;
}
.border-orange {
  border: 1px solid rgba(239, 108, 0, 0.4) !important;
}
.border-red {
  border: 1px solid rgba(198, 40, 40, 0.4) !important;
}
.border-l-8 {
  border-left-width: 8px !important;
  border-left-style: solid !important;
}
.border-l-green {
  border-left-color: #2e7d32 !important;
}
.border-l-amber-darken-3 {
  border-left-color: #ff8f00 !important;
}
.border-l-red {
  border-left-color: #c62828 !important;
}
.text-shadow {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}
.max-w-1400 {
  max-width: 1400px;
  margin: 0 auto;
}
.max-w-1200 {
  max-width: 1200px;
  margin: 0 auto;
}
.max-w-800 {
  max-width: 800px;
  margin: 0 auto;
}
.max-w-600 {
  max-width: 600px;
  margin: 0 auto;
}
.gap-4 {
  gap: 16px;
}
.gap-2 {
  gap: 8px;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hover-card {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(128, 0, 0, 0.15) !important;
}
</style>
