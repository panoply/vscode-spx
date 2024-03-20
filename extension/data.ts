export default {
  $id: 'vscode-html-customdata',
  version: 1.1,
  tags: [
    {
      name: 'a',
      attributes: [
        {
          name: 'spx-disable',
          description: 'Disables SPX on this link. A normal page navigation will be executed and cache will be cleared when the href element is annotated with this attribute.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-disable/'
            }
          ]
        },
        {
          name: 'spx-hydrate',
          description: 'Executes a replacement of the defined elements. Hydrate is different from `replace`, `append` and `prepend` methods in the sense that the those are combined with your defined `targets`. When calling Hydrate, it will run precedence over `targets` and for the visit it will replace only the element/s provided.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-hydrate/'
            }
          ]
        },
        {
          name: 'spx-replace',
          description: 'Executes a replacement of defined targets, where each target defined in the array is replaced.',
          values: [
            {
              name: "['']",
              description: 'Define a comma seperated list of element selectors'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-replace/'
            }
          ]
        },
        {
          name: 'spx-prepend',
          description: 'Executes a prepend visit.',
          values: [
            {
              name: "['','']",
              description: 'Where `[0]` will prepend itself to `[1]` defined in that value. Multiple prepend actions can be defined. Each prepend action is recorded are marked.'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-prepend/'
            }
          ]
        },
        {
          name: 'spx-prefetch',
          description: 'Prefetch option to execute. Accepts either `intersect` or `hover` value. When `intersect` is provided a request will be dispatched and cached upon visibility via Intersection Observer, whereas `hover` will dispatch a request upon a pointerover (mouseover) event.',
          values: [
            {
              name: 'intersect',
              description: 'The `intersect` value will trigger a request that will be dispatched and cached upon visibility via Intersection Observer'
            },
            {
              name: 'hover',
              description: 'The `hover` value will dispatch a request upon a pointerover (mouseover) event. On mobile devices the `hover` value will execute on a `touchstart` event'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-prefetch/'
            }
          ]
        },
        {
          name: 'spx-threshold',
          description: 'Set the threshold delay timeout for hover prefetches. By default, this will be set to `100` or whatever preset configuration was defined in `SPX.connect()` but you can override those settings by annotating using this attribute.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-threshold/'
            }
          ]
        },
        {
          name: 'spx-scroll',
          description: 'The Scroll Top position of the next navigation. Use as an alias of `spx-position` for setting the pages scroll Y position.',
          values: [
            {
              name: '0',
              description: 'Provide a number type, when this link is visited, `scrollTop` will be set to the provided value.'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-scroll/'
            }
          ]
        },
        {
          name: 'spx-position',
          description: 'Scroll position of the next navigation. Space separated expression with colon separated prop and value, for example:\n\n`<a href="*" spx-position="y:1000 x:0">`\n\nThis next navigation will load at 1000px from top of page',
          values: [
            {
              name: 'y:0',
              description: 'Passing in `y:0` set `scrollTop` to `0`'
            },
            {
              name: 'x:0',
              description: 'Passing in `x:0` set `scrollLeft` to `0`'
            },
            {
              name: 'y:0 x:0',
              description: 'Passing in `y:0` set `scrollTop` to `0` and `scrollLeft` to `0`'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-position/'
            }
          ]
        },
        {
          name: 'spx-history',
          description: 'Controls the history pushstate for the navigation.',
          values: [
            {
              name: 'false',
              description: 'Passing in `false` will prevent this navigation from being added to history'
            },
            {
              name: 'replace',
              description: 'Passing in `replace` will execute its respective value to pushstate to history'
            },
            {
              name: 'push',
              description: 'Passing in `push` will execute its respective value to pushstate to history'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-history/'
            }
          ]
        },
        {
          name: 'spx-cache',
          description: 'Controls the caching engine for the link navigation. Accepts `false`, `reset` or `clear` value. Passing in `false` will execute a SPX visit that will not be saved to cache and if the link exists in cache it will be removed. When passing `reset` the cache record will be removed, a new SPX visit will be executed and its result saved to cache. The `clear` option will clear the entire cache.',
          values: [
            {
              name: 'false',
              description: 'A `false` value will execute a SPX visit that will not be saved to cache and if the link exists in cache it will be removed'
            },
            {
              name: 'reset',
              description: 'Passing in `reset` and the current cache record will be removed, a new SPX visit will be executed and its result saved to cache'
            },
            {
              name: 'clear',
              description: 'The `clear` value will clear the entire cache.'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-cache/'
            }
          ]
        },
        {
          name: 'spx-progress',
          description: 'Controls the progress bar delay. By default, progress will use the threshold defined in configuration presets defined upon connection, else it will use the value defined on link attributes. Passing in a value of `false` will disable the progress from showing.\n\n`<a href="*" spx-progress="100">`\nProgress bar will be displayed if the request exceeds 500ms\n\n<a href="*" spx-progress="false">`\nProgress bar will not show.',
          values: [
            {
              name: 'false',
              description: 'A `false` value will disable the progress bar.'
            },
            {
              name: '500',
              description: 'Passing in a number value in `ms` will delay progress until request exceeds that time.'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-progress/'
            }
          ]
        },
        {
          name: 'spx-hover',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-progress/'
            }
          ]
        }
      ]
    },
    {
      name: 'script',
      attributes: [
        {
          name: 'spx-eval',
          description: 'Used on resources contained within `<head>` fragment like styles and scripts. Use this attribute if you want SPX the evaluate scripts and/or stylesheets. This option accepts a `false` value so you can define which scripts to execute on each navigation. By default, SPX will run and evaluate all `<script>` tags it detects for every page visit but will not re-evaluate `<script src="*"></script>` tags.',
          values: [
            {
              name: 'true',
              description: 'Applies evalution for every `onload` lifecycle event. This is not, required `spx-eval` defaults to `true` and there is no need to annotate with this value unless verbosity is preferred.'
            },
            {
              name: 'false',
              description: 'Will execute evaluation only once upon the first visit but never again after that.'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-track'
            }
          ]
        }
      ]
    },
    {
      name: 'link',
      attributes: [
        {
          name: 'spx-eval',
          description: 'Used on resources contained within `<head>` fragment like styles and scripts. Use this attribute if you want SPX the evaluate scripts and/or stylesheets. This option accepts a `false` value so you can define which scripts to execute on each navigation. By default, SPX will run and evaluate all `<script>` tags it detects for every page visit but will not re-evaluate `<script src="*"></script>` tags.',
          values: [
            {
              name: 'true',
              description: 'Applies evalution for every `onload` lifecycle event. This is not, required `spx-eval` defaults to `true` and there is no need to annotate with this value unless verbosity is preferred.'
            },
            {
              name: 'false',
              description: 'Will execute evaluation only once upon the first visit but never again after that.'
            }
          ],
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/attributes/spx-track'
            }
          ]
        }
      ]
    },
    {
      name: 'track',
      attributes: [
        {
          name: 'spx@cuechange',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/cuechange_event'
            }
          ]
        }
      ]
    },
    {
      name: 'details',
      attributes: [
        {
          name: 'spx@toggle',
          description: 'Fires when the open/closed state of a `<details>` element is toggled.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement/toggle_event'
            }
          ]
        }
      ]
    },
    {
      name: 'input',
      attributes: [
        {
          name: 'spx@cancel',
          description: 'The cancel event is fired by `<input>` and `<dialog>` elements. The event is fired when the user cancels the currently open dialog by closing it with the `Esc` key. It is also fired by the file input when the user cancels the file picker dialog via the Esc key or the cancel button and when the user re-selects the same files that were previously selected.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event'
            }
          ]
        },
        {
          name: 'spx@select',
          description: 'Fires when the current selection changes.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event'
            }
          ]
        },
        {
          name: 'spx@input',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event'
            }
          ]
        },
        {
          name: 'spx@invalid',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/invalid_event'
            }
          ]
        }
      ]
    },
    {
      name: 'dialog',
      attributes: [
        {
          name: 'spx@cancel',
          description: 'The cancel event is fired by `<input>` and `<dialog>` elements. The event is fired when the user cancels the currently open dialog by closing it with the `Esc` key. It is also fired by the file input when the user cancels the file picker dialog via the Esc key or the cancel button and when the user re-selects the same files that were previously selected.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event'
            }
          ]
        }
      ]
    },
    {
      name: 'form',
      attributes: [
        {
          name: 'spx@submit',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event'
            }
          ]
        },
        {
          name: 'spx@reset',
          description: 'Fires when the user resets a form.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event'
            }
          ]
        },
        {
          name: 'spx@formdata',
          description: "Fires after the entry list representing the form's data is constructed. This happens when the form is submitted",
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event'
            }
          ]
        }
      ]
    },
    {
      name: 'select',
      attributes: [
        {
          name: 'spx@select',
          description: 'Fires when the current selection changes.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event'
            }
          ]
        },
        {
          name: 'spx@input',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event'
            }
          ]
        },
        {
          name: 'spx@invalid',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/invalid_event'
            }
          ]
        }
      ]
    },
    {
      name: 'textarea',
      attributes: [
        {
          name: 'spx@select',
          description: 'Fires when the current selection changes.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event'
            }
          ]
        },
        {
          name: 'spx@input',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event'
            }
          ]
        },
        {
          name: 'spx@invalid',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/invalid_event'
            }
          ]
        }
      ]
    },
    {
      name: 'slot',
      attributes: [
        {
          name: 'spx@slotchange',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event'
            }
          ]
        }
      ]
    },
    {
      name: 'video',
      attributes: [
        {
          name: 'spx@abort',
          description: 'Fires when the user aborts the download.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event'
            }
          ]
        },
        {
          name: 'spx@pause',
          description: 'Fires when playback is paused.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event'
            }
          ]
        },
        {
          name: 'spx@play',
          description: 'Fires when playback has begun.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event'
            }
          ]
        },
        {
          name: 'spx@playing',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event'
            }
          ]
        },
        {
          name: 'spx@canplay',
          description: 'Occurs when playback is possible, but would require further buffering.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event'
            }
          ]
        },
        {
          name: 'spx@canplaythrough',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event'
            }
          ]
        },
        {
          name: 'spx@durationchange',
          description: 'Occurs when the duration attribute is updated.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event'
            }
          ]
        },
        {
          name: 'spx@emptied',
          description: 'Occurs when the media element is reset to its initial state.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event'
            }
          ]
        },
        {
          name: 'spx@ended',
          description: 'Occurs when the end of playback is reached.\n@param ev The event\n"',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event'
            }
          ]
        },
        {
          name: 'spx@loadeddata',
          description: 'Fires when data should be loaded for the media element.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event'
            }
          ]
        },
        {
          name: 'spx@loadedmetadata',
          description: 'Fires when meta data for the media element should be loaded.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event'
            }
          ]
        },
        {
          name: 'spx@ratechange',
          description: 'Occurs when the playback rate is increased or decreased.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event'
            }
          ]
        },
        {
          name: 'spx@seeked',
          description: 'Occurs when the seek operation ends.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event'
            }
          ]
        },
        {
          name: 'spx@seeking',
          description: 'Occurs when the current playback position is moved.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event'
            }
          ]
        },
        {
          name: 'spx@stalled',
          description: 'Occurs when the download has stopped.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event'
            }
          ]
        },
        {
          name: 'spx@suspend',
          description: 'Occurs if the load operation has been intentionally halted.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event'
            }
          ]
        },
        {
          name: 'spx@timeupdate',
          description: 'Occurs to indicate the current playback position.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event'
            }
          ]
        },
        {
          name: 'spx@volumechange',
          description: 'Occurs when the volume is changed, or playback is muted or unmuted.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event'
            }
          ]
        },
        {
          name: 'spx@waiting',
          description: 'Occurs when playback stops because the next frame of a video resource is not available.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event'
            }
          ]
        }
      ]
    },
    {
      name: 'audio',
      attributes: [
        {
          name: 'spx@abort',
          description: 'Fires when the user aborts the download.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event'
            }
          ]
        },
        {
          name: 'spx@pause',
          description: 'Fires when playback is paused.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event'
            }
          ]
        },
        {
          name: 'spx@play',
          description: 'Fires when playback has begun.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event'
            }
          ]
        },
        {
          name: 'spx@playing',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event'
            }
          ]
        },
        {
          name: 'spx@canplay',
          description: 'Occurs when playback is possible, but would require further buffering.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event'
            }
          ]
        },
        {
          name: 'spx@canplaythrough',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event'
            }
          ]
        },
        {
          name: 'spx@durationchange',
          description: 'Occurs when the duration attribute is updated.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event'
            }
          ]
        },
        {
          name: 'spx@emptied',
          description: 'Occurs when the media element is reset to its initial state.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event'
            }
          ]
        },
        {
          name: 'spx@ended',
          description: 'Occurs when the end of playback is reached.\n@param ev The event\n"',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event'
            }
          ]
        },
        {
          name: 'spx@loadeddata',
          description: 'Fires when data should be loaded for the media element.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event'
            }
          ]
        },
        {
          name: 'spx@loadedmetadata',
          description: 'Fires when meta data for the media element should be loaded.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event'
            }
          ]
        },
        {
          name: 'spx@ratechange',
          description: 'Occurs when the playback rate is increased or decreased.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event'
            }
          ]
        },
        {
          name: 'spx@seeked',
          description: 'Occurs when the seek operation ends.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event'
            }
          ]
        },
        {
          name: 'spx@seeking',
          description: 'Occurs when the current playback position is moved.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event'
            }
          ]
        },
        {
          name: 'spx@stalled',
          description: 'Occurs when the download has stopped.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event'
            }
          ]
        },
        {
          name: 'spx@suspend',
          description: 'Occurs if the load operation has been intentionally halted.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event'
            }
          ]
        },
        {
          name: 'spx@timeupdate',
          description: 'Occurs to indicate the current playback position.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event'
            }
          ]
        },
        {
          name: 'spx@volumechange',
          description: 'Occurs when the volume is changed, or playback is muted or unmuted.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event'
            }
          ]
        },
        {
          name: 'spx@waiting',
          description: 'Occurs when playback stops because the next frame of a video resource is not available.',
          references: [
            {
              name: 'SPX Reference',
              url: 'https://spx.js.org/components/events'
            },
            {
              name: 'MDN Reference',
              url: 'https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event'
            }
          ]
        }
      ]
    }
  ],
  globalAttributes: [
    {
      name: 'spx-component',
      description: 'Defines an SPX component',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/directives'
        }
      ]
    },
    {
      name: 'spx-node',
      description: 'Specifies an Element that should be applied to a component. The value is an object notation reference, e.g: `<div spx-node="component.name">` where `component` would represent an `spx-component` identifier and `name` is the name of the node element you will access within your class component (e.g: `this.fooNode`).',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/nodes'
        }
      ]
    },
    {
      name: 'spx-track',
      description: 'Track the element a per-page basis which is not be contained within targets',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/attributes/spx-track'
        }
      ]
    },
    {
      name: 'spx-target',
      description: 'Track the element a per-page basis which is not be contained within targets',
      values: [
        {
          name: 'true',
          description: 'Includes the element during renders. This is not required, as `spx-target` defaults to `true` and there is no need to annotate with this value unless verbosity is preferred.'
        },
        {
          name: 'false',
          description: 'Will exclude element from next known navigation'
        }
      ],
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/attributes/spx-track'
        }
      ]
    },
    {
      name: 'spx@animationcancel',
      description: 'Fired when a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) unexpectedly aborts. In other words, any time it stops running without sending an [animationend](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event) event. This might happen when the animation-name is changed such that the animation is removed, or when the animating node is hidden using CSS. Therefore, either directly or because any of its containing nodes are hidden.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event'
        }
      ]
    },
    {
      name: 'spx@animationend',
      description: 'Fired when a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) has completed. If the animation aborts before reaching completion, such as if the element is removed from the DOM or the animation is removed from the element, the animationend event is not fired.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/animationend_event'
        }
      ]
    },
    {
      name: 'spx@animationiteration',
      description: 'Fired when an iteration of a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) ends, and another one begins. This event does not occur at the same time as the [`animationend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event) event, and therefore does not occur for animations with an `animation-iteration-count` of one.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event'
        }
      ]
    },
    {
      name: 'spx@animationstart',
      description: 'Fired when a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) has started. If there is an [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay), this event will fire once the delay period has expired. A negative delay will cause the event to fire with an [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/elapsedTime) equal to the absolute value of the delay (and, correspondingly, the animation will begin playing at that time index into the sequence).',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/animationstart_event'
        }
      ]
    },
    {
      name: 'spx@auxclick',
      description: 'Fired at an Element when a non-primary pointing device button (any mouse button other than the primary—usually leftmost—button) has been pressed and released both within the same element.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/auxclick_event'
        }
      ]
    },
    {
      name: 'spx@beforeinput',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/beforeinput_event'
        }
      ]
    },
    {
      name: 'spx@blur',
      description: 'Fires when the object loses the input focus.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/blur_event'
        }
      ]
    },
    {
      name: 'spx@change',
      description: 'Fires when the contents of the object or selection have changed.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event'
        }
      ]
    },
    {
      name: 'spx@click',
      description: 'Fires when the user clicks the left mouse button on the object',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/click_event'
        }
      ]
    },
    {
      name: 'spx@close',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event'
        }
      ]
    },
    {
      name: 'spx@contextmenu',
      description: 'Fires when the user clicks the right mouse button in the client area, opening the context menu.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event'
        }
      ]
    },
    {
      name: 'spx@copy',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/copy_event'
        }
      ]
    },
    {
      name: 'spx@cut',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/cut_event'
        }
      ]
    },
    {
      name: 'spx@dblclick',
      description: 'Fires when the user double-clicks the object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/dblclick_event'
        }
      ]
    },
    {
      name: 'spx@drag',
      description: 'Fires on the source object continuously during a drag operation.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event'
        }
      ]
    },
    {
      name: 'spx@dragend',
      description: 'Fires on the source object when the user releases the mouse at the close of a drag operation.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event'
        }
      ]
    },
    {
      name: 'spx@dragenter',
      description: 'Fires on the target element when the user drags the object to a valid drop target.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event'
        }
      ]
    },
    {
      name: 'spx@dragleave',
      description: 'Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event'
        }
      ]
    },
    {
      name: 'spx@dragover',
      description: 'Fires on the target element continuously while the user drags the object over a valid drop target.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event'
        }
      ]
    },
    {
      name: 'spx@dragstart',
      description: 'Fires on the source object when the user starts to drag a text selection or selected object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event'
        }
      ]
    },
    {
      name: 'spx@drop',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event'
        }
      ]
    },
    {
      name: 'spx@error',
      description: 'Fires when an error occurs during object loading.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event'
        }
      ]
    },
    {
      name: 'spx@focus',
      description: 'Fires when the object receives focus.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/focus_event'
        }
      ]
    },
    {
      name: 'spx@gotpointercapture',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event'
        }
      ]
    },
    {
      name: 'spx@keydown',
      description: 'Fires when the user presses a key.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/keydown_event'
        }
      ]
    },
    {
      name: 'spx@keypress',
      description: 'Fires when the user presses an alphanumeric key.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/keypress_event'
        }
      ]
    },
    {
      name: 'spx@keyup',
      description: 'Fires when the user releases a key.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/keyup_event'
        }
      ]
    },
    {
      name: 'spx@load',
      description: 'Fires when the object has been loaded.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Event/load_event'
        }
      ]
    },
    {
      name: 'spx@loadend',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/ProgressEvent/loadend_event'
        }
      ]
    },
    {
      name: 'spx@loadstart',
      description: 'Fires when the user begins to load an object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/ProgressEvent/loadstart_event'
        }
      ]
    },
    {
      name: 'spx@lostpointercapture',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/lostpointercapture_event'
        }
      ]
    },
    {
      name: 'spx@mousedown',
      description: 'Fires when the user presses the mouse button.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mousedown_event'
        }
      ]
    },
    {
      name: 'spx@mouseenter',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event'
        }
      ]
    },
    {
      name: 'spx@mouseleave',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event'
        }
      ]
    },
    {
      name: 'spx@mousemove',
      description: 'Fires when the user moves the mouse.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mousemove_event'
        }
      ]
    },
    {
      name: 'spx@mouseout',
      description: 'Fires when the user moves the mouse out of an object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mouseout_event'
        }
      ]
    },
    {
      name: 'spx@mouseover',
      description: 'Fires when the user moves the mouse over an object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mouseover_event'
        }
      ]
    },
    {
      name: 'spx@mouseup',
      description: 'Fires when the user releases the mouse button.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/mouseup_event'
        }
      ]
    },
    {
      name: 'spx@paste',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/paste_event'
        }
      ]
    },
    {
      name: 'spx@pointercancel',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event'
        }
      ]
    },
    {
      name: 'spx@pointerdown',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event'
        }
      ]
    },
    {
      name: 'spx@pointerenter',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event'
        }
      ]
    },
    {
      name: 'spx@pointerleave',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event'
        }
      ]
    },
    {
      name: 'spx@pointermove',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointermove_event'
        }
      ]
    },
    {
      name: 'spx@pointerout',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointerout_event'
        }
      ]
    },
    {
      name: 'spx@pointerover',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointerover_event'
        }
      ]
    },
    {
      name: 'spx@pointerup',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/pointerup_event'
        }
      ]
    },
    {
      name: 'spx@progress',
      description: 'Fires to indicate progress while downloading an object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/ProgressEvent/progress_event'
        }
      ]
    },
    {
      name: 'spx@resize',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event'
        }
      ]
    },
    {
      name: 'spx@scroll',
      description: 'Fires when the user repositions the scroll box in the scroll bar on the object.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/scroll_event'
        }
      ]
    },
    {
      name: 'spx@scrollend',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/scrollend_event'
        }
      ]
    },
    {
      name: 'spx@securitypolicyviolation',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/securitypolicyviolation_event'
        }
      ]
    },
    {
      name: 'spx@selectionchange',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Document/selectionchange_event'
        }
      ]
    },
    {
      name: 'spx@selectstart',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Node/selectstart_event'
        }
      ]
    },
    {
      name: 'spx@touchcancel',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/touchcancel_event'
        }
      ]
    },
    {
      name: 'spx@touchend',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/touchend_event'
        }
      ]
    },
    {
      name: 'spx@touchmove',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/touchmove_event'
        }
      ]
    },
    {
      name: 'spx@touchstart',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/touchstart_event'
        }
      ]
    },
    {
      name: 'spx@transitioncancel',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event'
        }
      ]
    },
    {
      name: 'spx@transitionend',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/transitionend_event'
        }
      ]
    },
    {
      name: 'spx@transitionrun',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event'
        }
      ]
    },
    {
      name: 'spx@transitionstart',
      description: 'Fired when a [CSS transition](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions) has actually started, i.e., after any [transition-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) has ended.',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event'
        }
      ]
    },
    {
      name: 'spx@wheel',
      description: 'Fires when the user rotates a wheel button on a pointing device (typically a mouse).',
      references: [
        {
          name: 'SPX Reference',
          url: 'https://spx.js.org/components/events'
        },
        {
          name: 'MDN Reference',
          url: 'https://developer.mozilla.org/docs/Web/API/Element/wheel_event'
        }
      ]
    }
  ]
};
