<template>
<div>
  <h2 class="text-center"><NuxtLink to="/child-page">Parent/Child Page Example</NuxtLink></h2>
  <p class="text-center">All child pages will appear here on the parent page</p>
  <!--
    normally we could use the ContextualTransition component here, but as an
    example we are using it on the child-pages defineMeta macro
  -->
  <div class="contextual-transition-container">
    <NuxtPage />
  </div>
</div>
</template>