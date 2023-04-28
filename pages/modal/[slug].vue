<template>
  <div class="modal-content" @click.stop>
    <NuxtLink to="/modal" class="reset close block">&times;</NuxtLink>
      <FakeImage class="block" :width="320" :height="160" :color="route.params.slug"
          v-shared-element="{
            id: route.params.slug, role: 'img'
        }"
      />
    <div style="display: flex; width: 100%; justify-content: space-between;">
      <NuxtLink v-if="previousSlug" :to="`/modal/${previousSlug}`" class="py-12">Previous</NuxtLink>
      <span v-else />
      <NuxtLink v-if="nextSlug" :to="`/modal/${nextSlug}`" class="py-12" style="text-align: right;">Next</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
// import { definePageMeta } from "#imports";
// import { useContextualTransition } from "vue-contextual-transition";
// import content from "@/data/content";

const route = useRoute();
// const post = computed(() => content.find((p) => p.slug === route.params.slug));

// definePageMeta({
//   pageTransition: useContextualTransition({ group: 'modal' }),
// })
// 
const slugs = ['gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange'];

const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug);
const slugIndex = computed(() => slugs.indexOf(slug.value))
const nextSlug = computed(() => slugIndex.value < (slugs.length - 1) ? slugs[slugIndex.value + 1] : undefined)
const previousSlug = computed(() => slugIndex.value > 0 ? slugs[slugIndex.value - 1] : undefined)
</script>

<style>

.modal-content {
  background-color: #fefefe;
  margin: 0 auto;
  padding: 20px 20px 0;
  border: 1px solid #888;
  width: 800px;
  max-width: 80%;
}

</style>