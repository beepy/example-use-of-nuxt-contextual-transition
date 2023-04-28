<template>
  <div>
    <h2><NuxtLink to="/modal">Modal Example</NuxtLink></h2>
    <p>
      A complex example of modals. The user can open/close the modal as well as
      navigate to previous and next modals. There are three separate transtition
      containers: the Contextual Transition for opening and closing the modal
      (using Shared Element Transitions), the fade for the modal container
      and its contents for opening/closing the modal, and the Relative Slide
      transition for moving forward or backward with the modal.
    </p>
    <p v-if="route.params.slug">Slug: {{ route.params.slug }}</p>
    <p v-else><em>No slug</em></p>
    <div class="modal-test">
      <ContextualTransition
        v-for="s in slugs"
        style="flex-basis: 160px;"
        :key="s"
        :allow-motion="allowMotion"
        :allow-overflow="true"
      >
        <!--
          this link is shown if the element is NOT shown in the modal
        -->
        <NuxtLink 
          v-if="s !== route.params.slug"
          :to="`/modal/${s}`"
          style="display: block;"
        >
          <FakeImage
            :width="160"
            :height="160"
            :color="s"
            class="block"
            style="border: 4px solid transparent"
            v-shared-element="{
              id: s, role: 'img'
          }" />
        </NuxtLink>
        <!--
          this div is shown if the element IS shown in the modal. Note the
          teleport directive; this exposes the div's contents to the containing
          ContextalTransition component -- even though we're not actually
          teleporting anything here.
        -->
        <div v-else v-shared-element-teleport="'[data-modal]'">
          <FakeImage
                    :width="160"
                    :height="160"
                    :color="s"
                    class="block"
                    style="border: 4px solid var(--text-main)"
                    />
        </div>
      </ContextualTransition>
    </div>
    <Teleport to="body">
      <!--
        This is just a "dumb" CSS transition, that happens to use the CSS that's
        included as part of ContextualTransition module. It's used for hiding
        and showing the modal, BUT also to keep the modal's contents "alive"
        while it's being closed, so the OTHER ContextualTransition above can
        find its inner elements for the Shared Element Transition stuff.
      -->
      <Transition name="contextual-transition">
        <div
          v-if="route.params.slug"
          class="modal"
          data-modal=""
          style="--contextual-transition-duration: 222ms;"
          @click="closeModal"
        >
          <!--
            This transition is just for sliding the modal itself left and right
            when the user clicks next/previous.
          -->
          <ContextualTransition group="modalup" :duration="222">
            <div :key="slug" v-relative-slide="{ value: slugIndex, type: 'modal' }">
              <NuxtPage />
            </div>
          </ContextualTransition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import FakeImage from "../components/FakeImage.vue";
import { ContextualTransition } from "vue-contextual-transition";

const slugs = ['gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange'];
const route = useRoute();
const router = useRouter();

const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug);
const slugIndex = computed(() => slugs.indexOf(slug.value))
const allowMotion = ref(true);

function closeModal() { router.push('/modal') }

onBeforeRouteUpdate((to, from) => {

  if (to.params.slug && from.params.slug) {
    // if we have a slug, then we are moving "laterally" and we DON'T want the
    // shared element transition. So we disallow motion transition for the
    // ContextualTransition component that's handling that part of the
    // transition. Otherwise, the boxes would animate in/out as we went to
    // previous and next (and in inconsistent ways).
    allowMotion.value = false;
  } else {
    allowMotion.value = true;
  }
})

</script>

<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  padding-top: min(150px, 20vh);
}

.modal a.reset.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
  line-height: 1;
  text-align: right;
  margin-top: -0.5em;
  padding-bottom: 0.5em;
}

.modal a.reset.close:hover,
.modal a.reset.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-test {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

</style>