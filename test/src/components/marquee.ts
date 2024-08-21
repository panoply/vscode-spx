import { Controller } from '@hotwired/stimulus';
import { LiteralUnion } from 'type-fest';

export class Marquee extends Controller<HTMLElement> {

  static values = {
    direction: {
      type: String,
      default: 'forwards'
    },
    duplicates: {
      type: Number,
      default: 1
    },
    gap: {
      type: String,
      default: '0px'
    },
    speed: {
      type: Number,
      default: 5000
    },
    paused: {
      type: Boolean,
      default: false
    }

  };

  connect (): void {

    this.animate();
  }

  animate () {

    this.element.style.setProperty('--direction', this.directionValue);
    this.element.style.setProperty('--speed', `${this.speedValue}ms`);
    this.element.style.setProperty('--gap', `${this.gapValue}`);
  }

  pause () {
    this.element.classList.add('paused');
    this.pauseValue = true;
  }

  resume () {
    this.element.classList.remove('paused');
    this.pauseValue = false;
  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Stimulus: Speed of animation in `ms`
   */
  directionValue: LiteralUnion<'left' | 'right' | 'top' |'bottom', string>;
  /**
   * Stimulus: Count of marquee be duplicated to show an effect of continuous flow
   */
  duplicates: number;
  /**
   * Stimulus: The gap spacing
   */
  gapValue: string;
  /**
   * Stimulus: Whether or not marquee is paused
   */
  pauseValue: boolean;
  /**
   * Stimulus: Speed of animation in `ms`
   */
  speedValue: number;

}
