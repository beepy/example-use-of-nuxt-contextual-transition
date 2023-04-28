<template>
  <div class="post" v-relative-slide="{ value: postIndex, type: 'post-full' }">
    <div v-if="post">
      <h2 class="mt-0 text-center">
        <span
          class="inline-block"
          v-shared-element="{ id: post.slug, role: 'title', type: 'post-full'}"
        >
          {{ post.title }}
        </span>
      </h2>
      <!--
        reminder: important to have an img tag that will be the correct size
        even before the image has loaded; see css below
      -->
      <img
        :src="`../${post.header}`"
        v-shared-element="{ id: post.slug, role: 'img', type: 'post-full'}"
        class="header"
        :alt="post.title"
      />
      <p>Post content</p>
      <div v-html="post.content" />
      <p v-if="nextPost">
        <NuxtLink :to="{ name: 'posts-slug', params: { slug: nextPost.slug }}">
          Next Post
        </NuxtLink>
      </p>
    </div>
    <div v-else>
      <p>Not found</p>
    </div>
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>

<script lang="ts" setup>

import { computed } from "vue";
import { useRoute } from "vue-router";
import content from "@/data/content";

const route = useRoute();

const postIndex = computed(() => content.findIndex((p) => p.slug === route.params.slug));
const post = computed(() => content[postIndex.value]);
const nextPost = computed(() => postIndex.value < content.length - 1 ? content[postIndex.value + 1] : undefined);

</script>

<style lang="css">
.post img.header {
  width: 100%;
  display: block;
  background-color: rgba(128, 128, 128, 0.5);
  aspect-ratio: 1280 / 720;
}
</style>