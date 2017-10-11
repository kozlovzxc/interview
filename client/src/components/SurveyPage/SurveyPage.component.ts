import Vue from 'vue';
import Component from 'vue-class-component';

declare var videojs: any;

@Component({
})
export default class SurveyPage extends Vue {
  player: any = null;
  step: number = 1;

  mounted() {
    this.player = videojs('myVideo', {
      controls: true,
      fluid: true,
      plugins: {
          record: {
              audio: true,
              video: true,
              maxLength: 15,
              debug: true,
          },
      },
    });
    this.player.on('deviceError', () => {
      console.log('device error:', this.player.deviceErrorCode);
    });
    this.player.on('error', (error: Error) => {
      console.log('error:', error);
    });
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });
    this.player.on('finishRecord', () => {
      console.log('finished recording: ', this.player.recordedData);
    });
  }

  destroyed() {
    this.player.record().destroy();
  }

  download() {
    const blob = new Blob([this.player.recordedData.video], {type: 'video/webm'});
    const filename = 'Video.webm';
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
  }

  nextQuestion() {
    this.player.record().reset();
    if (this.step++ > 2) {
      this.step = 1;
    }
  }

}
