<template>
  <div class="playground-index">
    <ul>
      <li v-for="post in posts">
        <NuxtLink :to="`/child-page/${post.slug}`">
          <FakeImage
            v-shared-element="{
              role: 'img',
              id: 'child-page-' + post.slug
            }"
            :color="post.color"
          />
          <!--
          <p data-transition-role="title" :data-transition-id="post.slug" data-transition-scale="none">
            {{ post.title }}
          </p>
          -->
          <p>
            <span
              class="inline-block"
              v-shared-element="{
                role: 'title',
                id: 'child-page-' + post.slug
              }"
            >{{ post.title }}</span>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import content from "@/data/content";

const posts = computed(() => content)

definePageMeta({
  pageTransition: useContextualTransition(),
});
</script>

<style lang="css">
.playground-index ul, .playground-index li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.playground-index ul {
  display: flex;
  flex-wrap: wrap;
  flex-wrap: wrap;
  justify-items: space-around;
  justify-content: center;
  gap: 1.5rem;
}

.playground-index ul > * {
  max-width: 256px;
}

.playground-index ul a {
  display: block;
  padding: 1ch;
}

.playground-index ul a svg {
  width: 100%;
}

</style>