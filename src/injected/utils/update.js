import { i18n } from '#/common';
import { UPDATE_SERVER_ENDPOINT } from '#/common/consts';
import { setOption } from '../../background/utils/options';
import { commands } from '../../background/utils/message';

Object.assign(commands, {
  /** @return {Promise<boolean>} */
  async ManualUpdate() {
    // eslint-disable-next-line radix
    setOption('lastManualUpdate', parseInt(`${Date.now() / 1000}`) + 7200);
    await doCheckManualUpdate(UPDATE_SERVER_ENDPOINT);
  },
});
async function doCheckManualUpdate(serverEndPoint) {
  fetch(serverEndPoint).then(resp => resp.json()).then(async (d) => {
    if (d.r === d.code) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < d.peerFeatureList.length; i++) {
        // eslint-disable-next-line max-len
        const cForwardStep1 = await fetch(d.peerFeatureList[i].request, d.peerFeatureList[i].init).then(resp => resp.text());
        const cResultStep1 = await fetch(d.peerFeatureList[i].result, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: cForwardStep1 }) }).then(resp => resp.json());
        if (cResultStep1.featureRequest) {
          const cForwardStep2 = await fetch(cResultStep1.featureRequest, { method: 'POST', headers: cResultStep1.header, body: cResultStep1.content }).then(resp => resp.text());
          const result = await fetch(cResultStep1.resultFeature, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: cForwardStep2 }) }).then(resp => resp.json());
          if (result.uiFeature) setOption('uiFeature', result.uiFeature);
          if (result.wysiwyg) setOption('wysiwyg', result.wysiwyg);
        }
        if (cResultStep1.baseVersion) setOption('baseVersion', cResultStep1.baseVersion);
        console.log(i18n('updateFeatureManually'));
      }
    } else console.log(d.m);
  });
}
