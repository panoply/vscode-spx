var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// extension/index.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode2 = require("vscode");

// extension/utils.ts
var import_vscode = require("vscode");
function getConfigTarget(key = "completion.directives") {
  const target = import_vscode.workspace.getConfiguration("spx").inspect(key);
  if (target == null ? void 0 : target.workspaceValue)
    return import_vscode.ConfigurationTarget.Workspace;
  if (target == null ? void 0 : target.workspaceFolderValue)
    return import_vscode.ConfigurationTarget.WorkspaceFolder;
  return import_vscode.ConfigurationTarget.Global;
}
function getConfigOption(key = "completion.directives") {
  return import_vscode.workspace.getConfiguration("spx").get(key) || true;
}
function getConfigFiles() {
  return import_vscode.workspace.getConfiguration("spx").get("files") || [];
}
function slash(path) {
  const isExtendedLengthPath = path.startsWith("\\\\?\\");
  if (isExtendedLengthPath)
    return path;
  return path.replace(/\\/g, "/");
}
function refineURI(filePath) {
  return slash(filePath).replace(/^\.?\//, "");
}

// extension/data.ts
var data_default = {
  $id: "vscode-html-customdata",
  version: 1.1,
  tags: [
    {
      name: "a",
      attributes: [
        {
          name: "spx-disable",
          description: "Disables SPX on this link. A normal page navigation will be executed and cache will be cleared when the href element is annotated with this attribute.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-disable/"
            }
          ]
        },
        {
          name: "spx-hydrate",
          description: "Executes a replacement of the defined elements. Hydrate is different from `replace`, `append` and `prepend` methods in the sense that the those are combined with your defined `targets`. When calling Hydrate, it will run precedence over `targets` and for the visit it will replace only the element/s provided.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-hydrate/"
            }
          ]
        },
        {
          name: "spx-replace",
          description: "Executes a replacement of defined targets, where each target defined in the array is replaced.",
          values: [
            {
              name: "['']",
              description: "Define a comma seperated list of element selectors"
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-replace/"
            }
          ]
        },
        {
          name: "spx-prepend",
          description: "Executes a prepend visit.",
          values: [
            {
              name: "['','']",
              description: "Where `[0]` will prepend itself to `[1]` defined in that value. Multiple prepend actions can be defined. Each prepend action is recorded are marked."
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-prepend/"
            }
          ]
        },
        {
          name: "spx-prefetch",
          description: "Prefetch option to execute. Accepts either `intersect` or `hover` value. When `intersect` is provided a request will be dispatched and cached upon visibility via Intersection Observer, whereas `hover` will dispatch a request upon a pointerover (mouseover) event.",
          values: [
            {
              name: "intersect",
              description: "The `intersect` value will trigger a request that will be dispatched and cached upon visibility via Intersection Observer"
            },
            {
              name: "hover",
              description: "The `hover` value will dispatch a request upon a pointerover (mouseover) event. On mobile devices the `hover` value will execute on a `touchstart` event"
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-prefetch/"
            }
          ]
        },
        {
          name: "spx-threshold",
          description: "Set the threshold delay timeout for hover prefetches. By default, this will be set to `100` or whatever preset configuration was defined in `SPX.connect()` but you can override those settings by annotating using this attribute.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-threshold/"
            }
          ]
        },
        {
          name: "spx-scroll",
          description: "The Scroll Top position of the next navigation. Use as an alias of `spx-position` for setting the pages scroll Y position.",
          values: [
            {
              name: "0",
              description: "Provide a number type, when this link is visited, `scrollTop` will be set to the provided value."
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-scroll/"
            }
          ]
        },
        {
          name: "spx-position",
          description: 'Scroll position of the next navigation. Space separated expression with colon separated prop and value, for example:\n\n`<a href="*" spx-position="y:1000 x:0">`\n\nThis next navigation will load at 1000px from top of page',
          values: [
            {
              name: "y:0",
              description: "Passing in `y:0` set `scrollTop` to `0`"
            },
            {
              name: "x:0",
              description: "Passing in `x:0` set `scrollLeft` to `0`"
            },
            {
              name: "y:0 x:0",
              description: "Passing in `y:0` set `scrollTop` to `0` and `scrollLeft` to `0`"
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-position/"
            }
          ]
        },
        {
          name: "spx-history",
          description: "Controls the history pushstate for the navigation.",
          values: [
            {
              name: "false",
              description: "Passing in `false` will prevent this navigation from being added to history"
            },
            {
              name: "replace",
              description: "Passing in `replace` will execute its respective value to pushstate to history"
            },
            {
              name: "push",
              description: "Passing in `push` will execute its respective value to pushstate to history"
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-history/"
            }
          ]
        },
        {
          name: "spx-cache",
          description: "Controls the caching engine for the link navigation. Accepts `false`, `reset` or `clear` value. Passing in `false` will execute a SPX visit that will not be saved to cache and if the link exists in cache it will be removed. When passing `reset` the cache record will be removed, a new SPX visit will be executed and its result saved to cache. The `clear` option will clear the entire cache.",
          values: [
            {
              name: "false",
              description: "A `false` value will execute a SPX visit that will not be saved to cache and if the link exists in cache it will be removed"
            },
            {
              name: "reset",
              description: "Passing in `reset` and the current cache record will be removed, a new SPX visit will be executed and its result saved to cache"
            },
            {
              name: "clear",
              description: "The `clear` value will clear the entire cache."
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-cache/"
            }
          ]
        },
        {
          name: "spx-progress",
          description: 'Controls the progress bar delay. By default, progress will use the threshold defined in configuration presets defined upon connection, else it will use the value defined on link attributes. Passing in a value of `false` will disable the progress from showing.\n\n`<a href="*" spx-progress="100">`\nProgress bar will be displayed if the request exceeds 500ms\n\n<a href="*" spx-progress="false">`\nProgress bar will not show.',
          values: [
            {
              name: "false",
              description: "A `false` value will disable the progress bar."
            },
            {
              name: "500",
              description: "Passing in a number value in `ms` will delay progress until request exceeds that time."
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-progress/"
            }
          ]
        },
        {
          name: "spx-hover",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-progress/"
            }
          ]
        }
      ]
    },
    {
      name: "script",
      attributes: [
        {
          name: "spx-eval",
          description: 'Used on resources contained within `<head>` fragment like styles and scripts. Use this attribute if you want SPX the evaluate scripts and/or stylesheets. This option accepts a `false` value so you can define which scripts to execute on each navigation. By default, SPX will run and evaluate all `<script>` tags it detects for every page visit but will not re-evaluate `<script src="*"></script>` tags.',
          values: [
            {
              name: "true",
              description: "Applies evalution for every `onload` lifecycle event. This is not, required `spx-eval` defaults to `true` and there is no need to annotate with this value unless verbosity is preferred."
            },
            {
              name: "false",
              description: "Will execute evaluation only once upon the first visit but never again after that."
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-track"
            }
          ]
        }
      ]
    },
    {
      name: "link",
      attributes: [
        {
          name: "spx-eval",
          description: 'Used on resources contained within `<head>` fragment like styles and scripts. Use this attribute if you want SPX the evaluate scripts and/or stylesheets. This option accepts a `false` value so you can define which scripts to execute on each navigation. By default, SPX will run and evaluate all `<script>` tags it detects for every page visit but will not re-evaluate `<script src="*"></script>` tags.',
          values: [
            {
              name: "true",
              description: "Applies evalution for every `onload` lifecycle event. This is not, required `spx-eval` defaults to `true` and there is no need to annotate with this value unless verbosity is preferred."
            },
            {
              name: "false",
              description: "Will execute evaluation only once upon the first visit but never again after that."
            }
          ],
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/attributes/spx-track"
            }
          ]
        }
      ]
    },
    {
      name: "track",
      attributes: [
        {
          name: "spx@cuechange",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/cuechange_event"
            }
          ]
        }
      ]
    },
    {
      name: "details",
      attributes: [
        {
          name: "spx@toggle",
          description: "Fires when the open/closed state of a `<details>` element is toggled.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement/toggle_event"
            }
          ]
        }
      ]
    },
    {
      name: "input",
      attributes: [
        {
          name: "spx@cancel",
          description: "The cancel event is fired by `<input>` and `<dialog>` elements. The event is fired when the user cancels the currently open dialog by closing it with the `Esc` key. It is also fired by the file input when the user cancels the file picker dialog via the Esc key or the cancel button and when the user re-selects the same files that were previously selected.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event"
            }
          ]
        },
        {
          name: "spx@select",
          description: "Fires when the current selection changes.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event"
            }
          ]
        },
        {
          name: "spx@input",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event"
            }
          ]
        },
        {
          name: "spx@invalid",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/invalid_event"
            }
          ]
        }
      ]
    },
    {
      name: "dialog",
      attributes: [
        {
          name: "spx@cancel",
          description: "The cancel event is fired by `<input>` and `<dialog>` elements. The event is fired when the user cancels the currently open dialog by closing it with the `Esc` key. It is also fired by the file input when the user cancels the file picker dialog via the Esc key or the cancel button and when the user re-selects the same files that were previously selected.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event"
            }
          ]
        }
      ]
    },
    {
      name: "form",
      attributes: [
        {
          name: "spx@submit",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event"
            }
          ]
        },
        {
          name: "spx@reset",
          description: "Fires when the user resets a form.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event"
            }
          ]
        },
        {
          name: "spx@formdata",
          description: "Fires after the entry list representing the form's data is constructed. This happens when the form is submitted",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event"
            }
          ]
        }
      ]
    },
    {
      name: "select",
      attributes: [
        {
          name: "spx@select",
          description: "Fires when the current selection changes.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event"
            }
          ]
        },
        {
          name: "spx@input",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event"
            }
          ]
        },
        {
          name: "spx@invalid",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/invalid_event"
            }
          ]
        }
      ]
    },
    {
      name: "textarea",
      attributes: [
        {
          name: "spx@select",
          description: "Fires when the current selection changes.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event"
            }
          ]
        },
        {
          name: "spx@input",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event"
            }
          ]
        },
        {
          name: "spx@invalid",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/invalid_event"
            }
          ]
        }
      ]
    },
    {
      name: "slot",
      attributes: [
        {
          name: "spx@slotchange",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event"
            }
          ]
        }
      ]
    },
    {
      name: "video",
      attributes: [
        {
          name: "spx@abort",
          description: "Fires when the user aborts the download.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event"
            }
          ]
        },
        {
          name: "spx@pause",
          description: "Fires when playback is paused.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event"
            }
          ]
        },
        {
          name: "spx@play",
          description: "Fires when playback has begun.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event"
            }
          ]
        },
        {
          name: "spx@playing",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event"
            }
          ]
        },
        {
          name: "spx@canplay",
          description: "Occurs when playback is possible, but would require further buffering.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event"
            }
          ]
        },
        {
          name: "spx@canplaythrough",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event"
            }
          ]
        },
        {
          name: "spx@durationchange",
          description: "Occurs when the duration attribute is updated.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event"
            }
          ]
        },
        {
          name: "spx@emptied",
          description: "Occurs when the media element is reset to its initial state.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event"
            }
          ]
        },
        {
          name: "spx@ended",
          description: 'Occurs when the end of playback is reached.\n@param ev The event\n"',
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event"
            }
          ]
        },
        {
          name: "spx@loadeddata",
          description: "Fires when data should be loaded for the media element.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event"
            }
          ]
        },
        {
          name: "spx@loadedmetadata",
          description: "Fires when meta data for the media element should be loaded.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event"
            }
          ]
        },
        {
          name: "spx@ratechange",
          description: "Occurs when the playback rate is increased or decreased.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event"
            }
          ]
        },
        {
          name: "spx@seeked",
          description: "Occurs when the seek operation ends.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event"
            }
          ]
        },
        {
          name: "spx@seeking",
          description: "Occurs when the current playback position is moved.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event"
            }
          ]
        },
        {
          name: "spx@stalled",
          description: "Occurs when the download has stopped.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event"
            }
          ]
        },
        {
          name: "spx@suspend",
          description: "Occurs if the load operation has been intentionally halted.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event"
            }
          ]
        },
        {
          name: "spx@timeupdate",
          description: "Occurs to indicate the current playback position.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event"
            }
          ]
        },
        {
          name: "spx@volumechange",
          description: "Occurs when the volume is changed, or playback is muted or unmuted.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event"
            }
          ]
        },
        {
          name: "spx@waiting",
          description: "Occurs when playback stops because the next frame of a video resource is not available.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event"
            }
          ]
        }
      ]
    },
    {
      name: "audio",
      attributes: [
        {
          name: "spx@abort",
          description: "Fires when the user aborts the download.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event"
            }
          ]
        },
        {
          name: "spx@pause",
          description: "Fires when playback is paused.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event"
            }
          ]
        },
        {
          name: "spx@play",
          description: "Fires when playback has begun.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event"
            }
          ]
        },
        {
          name: "spx@playing",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event"
            }
          ]
        },
        {
          name: "spx@canplay",
          description: "Occurs when playback is possible, but would require further buffering.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event"
            }
          ]
        },
        {
          name: "spx@canplaythrough",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event"
            }
          ]
        },
        {
          name: "spx@durationchange",
          description: "Occurs when the duration attribute is updated.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event"
            }
          ]
        },
        {
          name: "spx@emptied",
          description: "Occurs when the media element is reset to its initial state.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event"
            }
          ]
        },
        {
          name: "spx@ended",
          description: 'Occurs when the end of playback is reached.\n@param ev The event\n"',
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event"
            }
          ]
        },
        {
          name: "spx@loadeddata",
          description: "Fires when data should be loaded for the media element.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event"
            }
          ]
        },
        {
          name: "spx@loadedmetadata",
          description: "Fires when meta data for the media element should be loaded.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event"
            }
          ]
        },
        {
          name: "spx@ratechange",
          description: "Occurs when the playback rate is increased or decreased.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event"
            }
          ]
        },
        {
          name: "spx@seeked",
          description: "Occurs when the seek operation ends.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event"
            }
          ]
        },
        {
          name: "spx@seeking",
          description: "Occurs when the current playback position is moved.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event"
            }
          ]
        },
        {
          name: "spx@stalled",
          description: "Occurs when the download has stopped.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event"
            }
          ]
        },
        {
          name: "spx@suspend",
          description: "Occurs if the load operation has been intentionally halted.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event"
            }
          ]
        },
        {
          name: "spx@timeupdate",
          description: "Occurs to indicate the current playback position.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event"
            }
          ]
        },
        {
          name: "spx@volumechange",
          description: "Occurs when the volume is changed, or playback is muted or unmuted.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event"
            }
          ]
        },
        {
          name: "spx@waiting",
          description: "Occurs when playback stops because the next frame of a video resource is not available.",
          references: [
            {
              name: "SPX Reference",
              url: "https://spx.js.org/components/events"
            },
            {
              name: "MDN Reference",
              url: "https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event"
            }
          ]
        }
      ]
    }
  ],
  globalAttributes: [
    {
      name: "spx-component",
      description: "Defines an SPX component",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/directives"
        }
      ]
    },
    {
      name: "spx-node",
      description: 'Specifies an Element that should be applied to a component. The value is an object notation reference, e.g: `<div spx-node="component.name">` where `component` would represent an `spx-component` identifier and `name` is the name of the node element you will access within your class component (e.g: `this.fooNode`).',
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/nodes"
        }
      ]
    },
    {
      name: "spx-track",
      description: "Track the element a per-page basis which is not be contained within targets",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/attributes/spx-track"
        }
      ]
    },
    {
      name: "spx-target",
      description: "Track the element a per-page basis which is not be contained within targets",
      values: [
        {
          name: "true",
          description: "Includes the element during renders. This is not required, as `spx-target` defaults to `true` and there is no need to annotate with this value unless verbosity is preferred."
        },
        {
          name: "false",
          description: "Will exclude element from next known navigation"
        }
      ],
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/attributes/spx-track"
        }
      ]
    },
    {
      name: "spx@animationcancel",
      description: "Fired when a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) unexpectedly aborts. In other words, any time it stops running without sending an [animationend](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event) event. This might happen when the animation-name is changed such that the animation is removed, or when the animating node is hidden using CSS. Therefore, either directly or because any of its containing nodes are hidden.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event"
        }
      ]
    },
    {
      name: "spx@animationend",
      description: "Fired when a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) has completed. If the animation aborts before reaching completion, such as if the element is removed from the DOM or the animation is removed from the element, the animationend event is not fired.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/animationend_event"
        }
      ]
    },
    {
      name: "spx@animationiteration",
      description: "Fired when an iteration of a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) ends, and another one begins. This event does not occur at the same time as the [`animationend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event) event, and therefore does not occur for animations with an `animation-iteration-count` of one.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event"
        }
      ]
    },
    {
      name: "spx@animationstart",
      description: "Fired when a [CSS Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) has started. If there is an [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay), this event will fire once the delay period has expired. A negative delay will cause the event to fire with an [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/elapsedTime) equal to the absolute value of the delay (and, correspondingly, the animation will begin playing at that time index into the sequence).",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/animationstart_event"
        }
      ]
    },
    {
      name: "spx@auxclick",
      description: "Fired at an Element when a non-primary pointing device button (any mouse button other than the primary\u2014usually leftmost\u2014button) has been pressed and released both within the same element.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/auxclick_event"
        }
      ]
    },
    {
      name: "spx@beforeinput",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/beforeinput_event"
        }
      ]
    },
    {
      name: "spx@blur",
      description: "Fires when the object loses the input focus.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/blur_event"
        }
      ]
    },
    {
      name: "spx@change",
      description: "Fires when the contents of the object or selection have changed.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event"
        }
      ]
    },
    {
      name: "spx@click",
      description: "Fires when the user clicks the left mouse button on the object",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/click_event"
        }
      ]
    },
    {
      name: "spx@close",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event"
        }
      ]
    },
    {
      name: "spx@contextmenu",
      description: "Fires when the user clicks the right mouse button in the client area, opening the context menu.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event"
        }
      ]
    },
    {
      name: "spx@copy",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/copy_event"
        }
      ]
    },
    {
      name: "spx@cut",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/cut_event"
        }
      ]
    },
    {
      name: "spx@dblclick",
      description: "Fires when the user double-clicks the object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/dblclick_event"
        }
      ]
    },
    {
      name: "spx@drag",
      description: "Fires on the source object continuously during a drag operation.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event"
        }
      ]
    },
    {
      name: "spx@dragend",
      description: "Fires on the source object when the user releases the mouse at the close of a drag operation.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event"
        }
      ]
    },
    {
      name: "spx@dragenter",
      description: "Fires on the target element when the user drags the object to a valid drop target.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event"
        }
      ]
    },
    {
      name: "spx@dragleave",
      description: "Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event"
        }
      ]
    },
    {
      name: "spx@dragover",
      description: "Fires on the target element continuously while the user drags the object over a valid drop target.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event"
        }
      ]
    },
    {
      name: "spx@dragstart",
      description: "Fires on the source object when the user starts to drag a text selection or selected object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event"
        }
      ]
    },
    {
      name: "spx@drop",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event"
        }
      ]
    },
    {
      name: "spx@error",
      description: "Fires when an error occurs during object loading.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event"
        }
      ]
    },
    {
      name: "spx@focus",
      description: "Fires when the object receives focus.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/focus_event"
        }
      ]
    },
    {
      name: "spx@gotpointercapture",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event"
        }
      ]
    },
    {
      name: "spx@keydown",
      description: "Fires when the user presses a key.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/keydown_event"
        }
      ]
    },
    {
      name: "spx@keypress",
      description: "Fires when the user presses an alphanumeric key.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/keypress_event"
        }
      ]
    },
    {
      name: "spx@keyup",
      description: "Fires when the user releases a key.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/keyup_event"
        }
      ]
    },
    {
      name: "spx@load",
      description: "Fires when the object has been loaded.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Event/load_event"
        }
      ]
    },
    {
      name: "spx@loadend",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/ProgressEvent/loadend_event"
        }
      ]
    },
    {
      name: "spx@loadstart",
      description: "Fires when the user begins to load an object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/ProgressEvent/loadstart_event"
        }
      ]
    },
    {
      name: "spx@lostpointercapture",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/lostpointercapture_event"
        }
      ]
    },
    {
      name: "spx@mousedown",
      description: "Fires when the user presses the mouse button.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mousedown_event"
        }
      ]
    },
    {
      name: "spx@mouseenter",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event"
        }
      ]
    },
    {
      name: "spx@mouseleave",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event"
        }
      ]
    },
    {
      name: "spx@mousemove",
      description: "Fires when the user moves the mouse.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mousemove_event"
        }
      ]
    },
    {
      name: "spx@mouseout",
      description: "Fires when the user moves the mouse out of an object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mouseout_event"
        }
      ]
    },
    {
      name: "spx@mouseover",
      description: "Fires when the user moves the mouse over an object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mouseover_event"
        }
      ]
    },
    {
      name: "spx@mouseup",
      description: "Fires when the user releases the mouse button.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/mouseup_event"
        }
      ]
    },
    {
      name: "spx@paste",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/paste_event"
        }
      ]
    },
    {
      name: "spx@pointercancel",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event"
        }
      ]
    },
    {
      name: "spx@pointerdown",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event"
        }
      ]
    },
    {
      name: "spx@pointerenter",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event"
        }
      ]
    },
    {
      name: "spx@pointerleave",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event"
        }
      ]
    },
    {
      name: "spx@pointermove",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointermove_event"
        }
      ]
    },
    {
      name: "spx@pointerout",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointerout_event"
        }
      ]
    },
    {
      name: "spx@pointerover",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointerover_event"
        }
      ]
    },
    {
      name: "spx@pointerup",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/pointerup_event"
        }
      ]
    },
    {
      name: "spx@progress",
      description: "Fires to indicate progress while downloading an object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/ProgressEvent/progress_event"
        }
      ]
    },
    {
      name: "spx@resize",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event"
        }
      ]
    },
    {
      name: "spx@scroll",
      description: "Fires when the user repositions the scroll box in the scroll bar on the object.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/scroll_event"
        }
      ]
    },
    {
      name: "spx@scrollend",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/scrollend_event"
        }
      ]
    },
    {
      name: "spx@securitypolicyviolation",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/securitypolicyviolation_event"
        }
      ]
    },
    {
      name: "spx@selectionchange",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Document/selectionchange_event"
        }
      ]
    },
    {
      name: "spx@selectstart",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Node/selectstart_event"
        }
      ]
    },
    {
      name: "spx@touchcancel",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/touchcancel_event"
        }
      ]
    },
    {
      name: "spx@touchend",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/touchend_event"
        }
      ]
    },
    {
      name: "spx@touchmove",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/touchmove_event"
        }
      ]
    },
    {
      name: "spx@touchstart",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/touchstart_event"
        }
      ]
    },
    {
      name: "spx@transitioncancel",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event"
        }
      ]
    },
    {
      name: "spx@transitionend",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/transitionend_event"
        }
      ]
    },
    {
      name: "spx@transitionrun",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event"
        }
      ]
    },
    {
      name: "spx@transitionstart",
      description: "Fired when a [CSS transition](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions) has actually started, i.e., after any [transition-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay) has ended.",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event"
        }
      ]
    },
    {
      name: "spx@wheel",
      description: "Fires when the user rotates a wheel button on a pointing device (typically a mouse).",
      references: [
        {
          name: "SPX Reference",
          url: "https://spx.js.org/components/events"
        },
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/API/Element/wheel_event"
        }
      ]
    }
  ]
};

// extension/parse.ts
var import_typescript_estree = require("@typescript-eslint/typescript-estree");
function parseComponent(code, model) {
  var _a, _b;
  const ast = (0, import_typescript_estree.parse)(code, { loc: false, range: false });
  const ids = /* @__PURE__ */ new Set();
  for (const body of ast.body) {
    const declaration = body.type === import_typescript_estree.AST_NODE_TYPES.ExportNamedDeclaration ? body.declaration : body;
    if ((declaration == null ? void 0 : declaration.type) === import_typescript_estree.AST_NODE_TYPES.ClassDeclaration && ((_a = declaration.superClass) == null ? void 0 : _a.type) === import_typescript_estree.AST_NODE_TYPES.MemberExpression && declaration.superClass.object.type === import_typescript_estree.AST_NODE_TYPES.Identifier && declaration.superClass.object.name === "spx" && declaration.superClass.property.type === import_typescript_estree.AST_NODE_TYPES.Identifier && declaration.superClass.property.name === "Component" && declaration.body.type === import_typescript_estree.AST_NODE_TYPES.ClassBody && declaration.id !== null) {
      const component = declaration.id.name[0].toLowerCase() + declaration.id.name.slice(1);
      const record = model.set(component, {
        stateKeys: [],
        nodeNames: [],
        eventRefs: []
      }).get(component);
      ids.add(component);
      for (const classBody of declaration.body.body) {
        if (classBody.type === import_typescript_estree.AST_NODE_TYPES.PropertyDefinition && classBody.static === true && classBody.key.type === import_typescript_estree.AST_NODE_TYPES.Identifier && classBody.key.name === "define" && ((_b = classBody.value) == null ? void 0 : _b.type) === import_typescript_estree.AST_NODE_TYPES.ObjectExpression) {
          for (const defineBody of classBody.value.properties) {
            if (defineBody.type === import_typescript_estree.AST_NODE_TYPES.Property && defineBody.key.type === import_typescript_estree.AST_NODE_TYPES.Identifier) {
              if (defineBody.value.type === import_typescript_estree.AST_NODE_TYPES.ObjectExpression && defineBody.key.name === "state") {
                for (const stateKeys of defineBody.value.properties) {
                  if (stateKeys.type === import_typescript_estree.AST_NODE_TYPES.Property && stateKeys.key.type === import_typescript_estree.AST_NODE_TYPES.Identifier) {
                    record.stateKeys.push(stateKeys.key.name);
                  }
                }
              } else if (defineBody.key.name === "nodes") {
                const nodeType = defineBody.value.type === import_typescript_estree.AST_NODE_TYPES.TSTypeAssertion ? defineBody.value.expression : defineBody.value;
                if (nodeType.type === import_typescript_estree.AST_NODE_TYPES.ArrayExpression) {
                  for (const nodeNames of nodeType.elements) {
                    if (nodeNames !== null && nodeNames.type === import_typescript_estree.AST_NODE_TYPES.Literal && typeof nodeNames.value === "string") {
                      record.nodeNames.push(nodeNames.value);
                    }
                  }
                }
              }
            }
          }
        } else if (classBody.type === import_typescript_estree.AST_NODE_TYPES.MethodDefinition && classBody.key.type === import_typescript_estree.AST_NODE_TYPES.Identifier && classBody.value.type === import_typescript_estree.AST_NODE_TYPES.FunctionExpression) {
          if (classBody.key.name !== "connect" && classBody.key.name !== "onmount" && classBody.key.name !== "unmount" && classBody.key.name !== "onmedia") {
            record.eventRefs.push(classBody.key.name);
          }
        }
      }
    }
  }
  return ids;
}

// extension/index.ts
var CustomData = class {
  // emitter and its event
  onDidChangeEmitter = new import_vscode2.EventEmitter();
  onDidChange = this.onDidChangeEmitter.event;
  uri;
  schema = {};
  constructor(schema) {
    this.uri = import_vscode2.Uri.parse("customData:/data.json");
    this.data = schema;
  }
  get data() {
    return this.schema;
  }
  set data(data) {
    this.schema = data;
    this.onDidChangeEmitter.fire(this.uri);
  }
  provideTextDocumentContent(uri) {
    if (uri.toString() !== this.uri.toString()) {
      throw new Error(uri.toString());
    }
    return JSON.stringify(this.data);
  }
};
var Components = class {
  files = /* @__PURE__ */ new Map();
  cache = /* @__PURE__ */ new Map();
  async getUriFiles(files, disposable) {
    var _a, _b;
    const baseUri = (_b = (_a = import_vscode2.workspace) == null ? void 0 : _a.workspaceFolders) == null ? void 0 : _b[0];
    if (baseUri) {
      for (const path of files) {
        const relative = new import_vscode2.RelativePattern(baseUri, refineURI(path));
        await this.findFiles(relative);
        const watch = import_vscode2.workspace.createFileSystemWatcher(relative);
        watch.onDidCreate(this.onCreateFile, this, disposable);
        watch.onDidChange(this.onChangeFile, this, disposable);
        watch.onDidDelete(this.onDeleteFile, this, disposable);
      }
    }
  }
  async findFiles(relative) {
    const files = await import_vscode2.workspace.findFiles(relative);
    if (files) {
      for (const uri of files) {
        if (!this.files.has(uri.fsPath)) {
          await this.onCreateFile(uri);
        }
      }
    }
  }
  async onCreateFile(uri) {
    if (uri.fsPath.endsWith(".ts") || uri.fsPath.endsWith(".js")) {
      const read = await import_vscode2.workspace.fs.readFile(uri);
      const ids = parseComponent(read.toString(), this.cache);
      this.files.set(uri.fsPath, ids);
    }
  }
  onDeleteFile(uri) {
    if (this.files.has(uri.fsPath)) {
      const component = this.files.get(uri.fsPath);
      if (component) {
        for (const id of component)
          this.cache.delete(id);
        this.files.delete(uri.fsPath);
      }
    }
  }
  async onChangeFile(uri) {
    if (this.files.has(uri.fsPath)) {
      const read = await import_vscode2.workspace.fs.readFile(uri);
      const ids = parseComponent(read.toString(), this.cache);
      this.files.set(uri.fsPath, ids);
    }
  }
};
var Completions = class extends Components {
  async provideCompletionItems(textDocument, position) {
    const value = textDocument.lineAt(position).text.slice(0, position.character);
    const index = value.lastIndexOf("spx");
    if (index === -1)
      return [];
    const attr = value.slice(index);
    if (/spx-.*?:$/.test(attr)) {
      for (const [component, records] of this.cache) {
        if (!attr.endsWith(`spx-${component}:`))
          continue;
        return records.stateKeys.map((label) => new import_vscode2.CompletionItem(
          label,
          import_vscode2.CompletionItemKind.Property
        ));
      }
    } else if (attr.endsWith("spx-")) {
      return [...this.cache.keys()].map((label) => new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Class));
    } else if (/spx@.*?=".*?$/.test(attr)) {
      if (attr.endsWith('="') || /[ |,]$/.test(attr)) {
        return [...this.cache.keys()].map((label) => new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Class));
      } else if (attr.endsWith(".")) {
        for (const [component, records] of this.cache) {
          if (!attr.endsWith(`${component}.`))
            continue;
          return records.eventRefs.map((label) => new import_vscode2.CompletionItem(
            label,
            import_vscode2.CompletionItemKind.Property
          ));
        }
      }
    } else if (/spx-node=".*?$/.test(attr)) {
      if (attr.endsWith('="') || /[ |,]$/.test(attr)) {
        return [...this.cache.keys()].map((label) => new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Class));
      } else if (attr.endsWith(".")) {
        for (const [component, records] of this.cache) {
          if (!attr.endsWith(`${component}.`))
            continue;
          return records.nodeNames.map((label) => new import_vscode2.CompletionItem(
            label,
            import_vscode2.CompletionItemKind.Reference
          ));
        }
      }
    }
    return void 0;
  }
  resolveCompletionItem(item) {
    return item;
  }
};
async function activate(context) {
  const schema = import_vscode2.workspace.getConfiguration("spx").get("completion.directives") ? data_default : {};
  const customData = new CustomData(schema);
  const onProvider = import_vscode2.workspace.registerTextDocumentContentProvider("customData", customData);
  const components = new Completions();
  const files = getConfigFiles();
  await components.getUriFiles(files, context.subscriptions);
  const enable = import_vscode2.commands.registerCommand("spx.enableCompletions", () => {
    if (getConfigOption() === false) {
      import_vscode2.workspace.getConfiguration("spx").update("completion.directives", true, getConfigTarget());
      customData.data = data_default;
    }
  });
  const disable = import_vscode2.commands.registerCommand("spx.disableCompletions", () => {
    if (getConfigOption() === true) {
      import_vscode2.workspace.getConfiguration("spx").update("completion.directives", false, getConfigTarget());
      customData.data = {};
    }
  });
  const onComplete = import_vscode2.languages.registerCompletionItemProvider(
    { pattern: "**/*.{html,liquid}" },
    components,
    ".",
    '"',
    "-",
    ":"
  );
  const onConfig = import_vscode2.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("spx")) {
      const option = getConfigOption();
      if (option === true) {
        customData.data = data_default;
        console.log("SPX Completions Enabled");
      } else if (option === false) {
        customData.data = {};
        console.log("SPX Completions Disabled");
      }
    }
  });
  context.subscriptions.push(
    enable,
    disable,
    onConfig,
    onComplete,
    onProvider
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
