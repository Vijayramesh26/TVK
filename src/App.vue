<template>
  <v-app>
    <v-main>
      <PosterCreator />
    </v-main>
  </v-app>
</template>

<script>
import PosterCreator from './components/PosterCreator/Main.vue';

export default {
  name: 'App',
  components: {
    PosterCreator,
  },
};
</script>

<style>
/* Global styles can go here */
#app {
  font-family: 'Inter', sans-serif;
}
</style>
