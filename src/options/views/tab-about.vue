<template>
  <div class="tab-about mb-2c">
    <h1 class="mt-0 mr-1c">
      <span v-text="name"></span>
      <small v-text="`v${version}`"></small>
    </h1>
    <p v-text="i18n('extDescription')"></p>
    <div>
      <a href="https://liberty-bear.github.io/donate/" target="_blank" rel="noopener noreferrer" v-text="i18n('labelDonate')"></a><span class="text-red"> &hearts;</span>
    </div>
    <div>
      <label v-text="i18n('labelRelated')"></label>
      <ul>
        <li><a href="https://liberty-bear.github.io" target="_blank" rel="noopener noreferrer" v-text="i18n('labelHomepage')"></a></li>
        <li><a href="https://github.com/liberty-bear/libertybear/issues" target="_blank" rel="noopener noreferrer" v-text="i18n('labelFeedback')"></a></li>
        <li><a href="https://liberty-bear.github.io/privacy/" target="_blank" rel="noopener noreferrer" v-text="i18n('labelPrivacyPolicy')"></a></li>
      </ul>
    </div>
    <div>
      <label v-text="i18n('labelCurrentLang')"></label>
      <span class="current" v-text="language"></span> |
      <a href="https://liberty-bear.github.io/localization/" target="_blank" rel="noopener noreferrer" v-text="i18n('labelHelpTranslate')"></a>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    const manifest = browser.runtime.getManifest();
    return {
      name: manifest.name,
      version: manifest.version,
      language: browser.i18n.getUILanguage(),
    };
  },
};
</script>

<style>
  .current {
    color: green;
    @media (prefers-color-scheme: dark) {
      color: greenyellow;
    }
  }
</style>
