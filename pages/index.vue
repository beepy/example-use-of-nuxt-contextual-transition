<template>
  <div class="post-index">
    <h2 class="text-center">Full Page Transitioning</h2>
    <ul>
      <li v-for="post in posts">
        <NuxtLink :to="`/posts/${post.slug}`">
          <!--
            reminder: important to have an img tag that will be the correct size
            even before the image has loaded; see css below
          -->
          <img
            :src="post.thumbnail"
            v-shared-element="{ id: post.slug, role: 'img', type: 'post-full'}"
            class="thumbnail"
          />
          <p>
            <span
              class="inline-block"
              v-shared-element="{
                id: post.slug,
                role: 'title',
                type: 'post-full'
            }">
              {{ post.title }}
            </span>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { definePageMeta } from "~/.nuxt/imports";
import content from "@/data/content";

const posts = computed(() => content)

// definePageMeta({
//   pageTransition: useContextualTransition(),
// });
</script>

<style lang="css">
.post-index ul, .post-index li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-index ul {
  display: flex;
  flex-wrap: wrap;
  flex-wrap: wrap;
  justify-items: space-around;
  justify-content: center;
  gap: 1.5rem;
}

.post-index ul > * {
  max-width: 256px;
}

.post-index ul a {
  display: block;
  padding: 1ch;
}

.post-index ul a svg {
  width: 100%;
}

.post-index img {
  width: 100%;
  display: block;
  background-color: rgba(128, 128, 128, 0.5);
}

.post-index img.thumbnail {
  aspect-ratio: 1 / 1;
}
</style>