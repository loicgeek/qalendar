import Vue,{ VNode } from 'vue';
import {eventInterface} from './typings/interfaces/event.interface';
import {configInterface} from './typings/config.interface';

// @ts-ignore
declare class Qalendar extends Vue {
  events: eventInterface[];
  config: configInterface;

  $slots: {
    event: VNode[];
    eventDialog: VNode[];
  };
}

export default Qalendar;
