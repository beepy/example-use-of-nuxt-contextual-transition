<template>
  <div>
    <div v-if="post">
      <h2 style="text-align: center; margin-top: 0;">
        <span
          class="inline-block"
          v-shared-element="{
            role: 'title',
            id: 'child-page-' + post.slug
          }"
        >{{ post.title }}</span>
      </h2>

      <FakeImage
        v-shared-element="{
          role: 'img',
          id: 'child-page-' + post.slug
        }"
        :width="1600"
        :height="900"
        :color="post.color"
      />
      <!--
      <div data-transition-role="title" :data-transition-id="post.slug" data-transition-scale="none">
        <h2>{{ post.title }}</h2>
      </div>
    -->
      <div v-html="post.content" />
    </div>
    <div v-else>
      <p>Not found</p>
    </div>
    <NuxtLink to="/child-page">Parent/Child Page Index</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import content from "@/data/content";

const route = useRoute();
const post = computed(() => content.find((p) => p.slug === route.params.slug));

// we didn't have to define the page transition here; this is just an example
// we could have used the component on the parent page, instead
definePageMeta({
  pageTransition: useContextualTransition(),
})
</script>