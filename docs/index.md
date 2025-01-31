
# Qalendar

Qalendar is an event calendar for Vue 3. It is highly customizable and has multi-language support.

## Getting started

### Installing

```
npm install qalendar
```

### Basic usage

``` vue
<template>
    <Qalendar :events="events" />
</template>

<script>
import {Qalendar} from "qalendar";

export default {
    components: {
        Qalendar,
    },

    data() {
        return {
            events: [
                // ...
                {
                  title: "Advanced algebra",
                  with: "Chandler Bing",
                  time: { start: "2022-05-16 12:05", end: "2022-05-16 13:35" },
                  color: "yellow",
                  isEditable: true,
                  id: "753944708f0f",
                  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
                },
                {
                  title: "Ralph on holiday",
                  with: "Rachel Greene",
                  time: { start: "2022-05-10", end: "2022-05-22"},
                  color: "green",
                  isEditable: true,
                  id: "5602b6f589fc"
                }
                // ...
            ],
        }
    },
}
</script>

<style>
    @import "qalendar/dist/style.css";
</style>
```

<br>

<div style="height: 800px">
    <Qalendar :selected-date="new Date(2022, 4, 16)" :events="seededEventsDemoWeek" />
</div>

### Style

As in the code example above, you need to import the styles for the component. Since Qalendar is aiming to be a responsive multi-purpose component, it avoids use of fixed height and width where possible. Therefore, for most use-cases you would probably want to place it in a wrapper with a fixed `height`, and possibly a `max-width`.

Qalendar takes a `config` prop, which contains all the most crucial options for configuring its behavior. `config` is passed as an object, which could look like this:

### Basic configuration

```js
data() {
    return {
        config: {
            week: {
                // Takes the value 'sunday' or 'monday'
                // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
                startsOn: 'monday',
                // Takes the values 5 or 7.
                nDays: 7,
                // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
                // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
                scrollToHour: 5,
            },
            // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
            // If no locale is set, the preferred browser locale will be used
            locale: 'de-DE',
            style: {
                // When adding a custom font, please also set the fallback(s) yourself
                fontFamily: 'Nunito', sans-serif,
            },
            // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
            // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
            defaultMode: 'day',
            // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
            isSilent: true,
            showCurrentTime: true, // Display a line indicating the current time 
        }
    }
}
```

## Guide

### Props

|      Name       |                                  Type                                   |                  Purpose                  |
|:---------------:|:-----------------------------------------------------------------------:|:-----------------------------------------:|
| `selected-date` |                                  Date                                   |    Define which date to show on render    |
|  `is-loading`   |                                 boolean                                 | Display a loading animation in the header |
|    `events`     | [see section "Calendar event properties"](./#calendar-event-properties) |                                           |
|    `config`     |             [see section "Configuration"](./#configuration)             |                                           |


### Calendar event properties

A calendar event can have the following properties:

|    Property     |                  type / accepted values                  | Required |                                                                |
|:---------------:|:--------------------------------------------------------:|:--------:|:--------------------------------------------------------------:|
|      `id`       |                      string, number                      |   yes    |                                                                |
|     `title`     |                          string                          |   yes    |                                                                |
|     `time`      |                eventTime (see type below)                |   yes    |                                                                |
|     `topic`     |                          string                          |    no    |                                                                |
|  `description`  |                       string/html                        |    no    | HTML content can be anything that can be descendant of a p-tag |
|   `location`    |                          string                          |    no    |                                                                |
|     `with`      |                          string                          |    no    |                                                                |
|     `color`     |            'blue', 'yellow', 'green' or 'red'            |    no    |                                                                |
|  `colorScheme`  |                          string                          |    no    |                       overwrites 'color'                       |
|  `isEditable`   |                         boolean                          |    no    |         Yields icons for editing and deleting an event         |
|  `disableDnD`   | array of strings - accepts values 'month', 'week', 'day' |    no    |    Disable drag & drop for an event in the specified modes     |
| `disableResize` |     array of strings - accepts values 'week', 'day'      |    no    |      Disable resizing for an event in the specified modes      |

#### Event times
```ts
type eventTime = { start: string; end: string };
```
Qalendar can handle 2 types of events:

1. For **timed events**, the required format of `time.start` and `time.end` is `YYYY-MM-DD hh:mm`, for example `2022-06-16 16:00`. These can also span over multiple days, such as `{ start: "2023-01-01 06:55", end: "2023-02-10 07:40"}`

2. For **full day events**, or events spanning multiple days. The required format is `YYYY-MM-DD`, such as `2022-06-16`.

Please note, however, that you cannot mix these two types of time formats for an event.


### Emitted events

Qalendar emits the following events that can be listened to:

|       Event name       |                                  Purpose                                   |
|:----------------------:|:--------------------------------------------------------------------------:|
|  `event-was-clicked`   |                                                                            |
|  `event-was-dragged`   |            emits the updated event, after an event was dragged             |
|  `event-was-resized`   |            emits the updated event, after an event was resized             |
| `interval-was-clicked` |                  [see section on intervals](./#intervals)                  |
|   `day-was-clicked`    |          Emits a the date that a user clicked, e.g. `2022-11-16`           |
|    `updated-period`    |      emits the value with the new period selected in the date picker       |
|     `updated-mode`     | emits the new selected mode and the period, when the user changes the mode |
|      `edit-event`      |         is triggered, when a user clicks the edit-icon of an event         |
|     `delete-event`     |        is triggered, when a user clicks the delete-icon of an event        |

### Drag and drop

Updating events by dragging them across the UI is available in all calendar modes (day, week, month). However, two criteria need to be met, in order for a calendar event to be draggable:

* The event needs the property `isEditable` to be set to `true`
* The event needs to be a single day event. For example, an event with `time: { start: '2022-06-24', end: '2022-06-27' }` cannot be dragged

::: tip
Since qalendar@1.18.1 the drag and drop feature is also available on touch devices.
:::

### A word on language

As stated in the configuration section, `config.locale` can be any locale understood by the browser. If no locale is set explicitly, Qalendar will use the user's default browser locale. This is made possible, since all occurrences of time or date in the calendar are localized through the native JavaScript APIs. However, since a few words ("month", "week" etc.) need to be hard coded, some words may not be translated in the selected locale. For all vocabulary where translations are missing, translations for "en-US" will be used as a fallback.

If you're using Qalendar, and translations for your specific locale are missing, consider opening a [pull request](https://github.com/tomosterlund/qalendar), editing the two files in `./src/language`.

### A more elaborate example

A month view:

<div style="height: 800px">
    <Qalendar :selected-date="new Date(2022, 0, 8)" :events="events" :config="config"  />
</div>

From this code:

```vue
<template>
  <Qalendar
    :selected-date="new Date(2022, 0, 8)"
    :events="events"
    :config="config"
  />
</template>

<script>
import { Qalendar } from "qalendar";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      events: [
        {
          title: "Meeting with Dora",
          with: "Albert Einstein",
          time: { start: "2022-01-01 04:52", end: "2022-01-01 05:37" },
          color: "green",
          isEditable: true,
          id: "de471c78cb5c",
          description:
            "Think of me as Yoda. Only instead of being little and green, I wear suites and I'm awesome.",
        },
        {
          title: "Advanced algebra",
          with: "Pheobe Buffay",
          time: { start: "2022-01-02 20:05", end: "2022-01-02 21:35" },
          colorScheme: "sports",
          isEditable: true,
          id: "6d3c0980a5cf",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
        },
        {
          title: "Break",
          with: "Marshall Eriksen",
          time: { start: "2022-01-02 22:10", end: "2022-01-02 22:55" },
          colorScheme: "meetings",
          isEditable: true,
          id: "9f1b209982f1",
          location: "Zoom",
        },
        // ... and more
      ],

      config: {
        locale: "zh-CN",
        defaultMode: "month",
        style: {
          colorSchemes: {
            meetings: {
              color: "#fff",
              backgroundColor: "#131313",
            },
            sports: {
              color: "#fff",
              backgroundColor: "#ff4081",
            },
          },
        },
      },
    };
  },
};
</script>
```

## Customization

### Custom colors for events

All events can be given the `color` property with any of the given object properties of `EVENT_COLORS` in [this file](https://github.com/tomosterlund/qalendar/blob/master/src/constants.ts). However, you can also pass further color schemes in the `config` object, which the events can then utilize, such as:

```js
data() {
    return {
        config: {
            style: {
                colorSchemes: {
                    meetings: {
                        color: '#fff',
                        backgroundColor: '#131313',
                    },
                    sports: {
                        color: '#fff',
                        backgroundColor: '#ff4081',
                    }
                }
            },
        },
        events: [
            {
                title: 'Beep',
                time: { start: '2022-05-16 08:00', end: '2022-05-16 09:00' },
                colorScheme: 'meetings',
                id: '1',
            },
            {
                title: 'Boop',
                time: { start: '2022-05-16 08:00', end: '2022-05-16 09:00' },
                colorScheme: 'sports',
                id: '2',
            },
        ]
    }
}
```

### Custom events

The Qalendar component also allows you to take full control over the looks and content of an event. The data of your event, can then be accessed via scoped, named slots in the following manner:

```vue
<template>
  <Qalendar :events="events">
    <template #weekDayEvent="eventProps">
      <div :style="{ backgroundColor: 'cornflowerblue', color: '#fff', width: '100%', height: '100%', overflow: 'hidden' }">
        <span>{{ timeFormattingFunction(eventProps.eventData.time) }}</span>

        <span>{{ eventProps.eventData.title }}</span>
      </div>
    </template>

    <template #monthEvent="monthEventProps">
      <span>{{ monthEventProps.eventData.title }}</span>
    </template>
  </Qalendar>
</template>
```

Please observe, that there are two different slots; one slot is for day and week mode, and the other for month mode. For an event to use the custom markup added through the event slot, it needs to have the property `isCustom` set to `true`. Such as:

```js
const event = {
  id: '1',
  time: { start: '2022-08-08 12:00', end: '2022-08-08 13:00' },
  isCustom: true,
}
```

Alternatively, you can set `isCustom` to an array of modes, such as `['month', 'week']`, to only use the custom markup in those modes.

### Custom event dialog

The dialog which is opened when an event is clicked can also be customized. To enable this, you first need to set the configuration option `eventDialog.isCustom` to true, and then add a scoped slot, as in the example below. Please note, that the `v-if` is crucial in order to prevent errors. Until your user clicks an event, `props.eventDialogData` will be `null`.

For programmatically closing your custom dialog, you can trigger `props.closeEventDialog` as shown in the example below.

```vue
<template>
  <Qalendar :events="events">
    <template #eventDialog="props">
      <div v-if="props.eventDialogData && props.eventDialogData.title">
        <div :style="{marginBottom: '8px'}">Edit event</div>

        <input class="flyout-input" type="text" :style="{ width: '90%', padding: '8px', marginBottom: '8px' }" >

        <button class="close-flyout" @click="props.closeEventDialog">
          Finished!
        </button>
      </div>
    </template>
  </Qalendar>
</template>
```

::: tip
Together with the data extracted from the event `event-was-clicked`, you can use a custom event dialog for letting your user edit the event directly in the calendar. Just save the id of an event that was clicked, and display some input fields in the dialog, targeting the properties of the event that was just clicked.
:::

### Intervals

The Qalendar component also allows the implementer to define intervals to be displayed in the modes `day` and `week`. This can be configured in the `config` prop, under `dayIntervals`, such as:

```js
data() {
  return {
    config: {
      dayIntervals: {
        length: 15, // Length in minutes of each interval. Accepts values 15, 30 and 60 (the latter is the default)
        height: 50, // The height of each interval
        displayClickableInterval: true, // Needs to be set explicitly to true, if you want to display clickable intervals
        intervalStyles: {backgroundColor: black, color: white},
      },
    },
  };
}
```

`dayIntervals.length` & `dayIntervals.height` can be used for changing the height of the entire calendar day. Therefore, the option `displayClickableInterval` exists, and can be set to false for anyone who wants to decide the height of a day, but does not wish to display any custom intervals.

When a clickable interval is clicked, the calendar emits the event `interval-was-clicked`, containing date-time strings for the start and end of the clicked interval. This can be useful, for letting the user add an event, based on where in a day the user clicks.

### Day boundaries

The Qalendar component also allows the implementer to define custom day boundaries for modes `day` and `week`. For example, if you do not want the calendar to display all 24 hours, but merely a selection of hours between 6AM and 6PM, you could use the `dayBoundaries` configuration option, such as:

```js
data() {
  return {
    config: {
      dayBoundaries: {
        start: 6,
        end: 18,
      },
    },
  };
}
```

The `dayBoundaries.start` and `dayBoundaries.end` options take any integer between 0 and 24.

::: tip
If you only display a few hours of a day, you might want to consider using the `dayIntervals` option, which allows you to adjust the height of each hour.
:::

### Custom current-time line
As shown above under basic configuration, there is a `showCurrentTime` option for displaying a red line, marking what time of the day it is. If you, however, want to customize the looks of this line, use the `customCurrentTime` slot as shown below, **instead** of `showCurrentTime`. Qalendar takes care of the positioning, you just need to style the line as you wish.

```vue
<template #customCurrentTime>
  <div :style="{ height: '3px', backgroundColor: 'cornflowerblue', position: 'relative' }">
    <div :style="{ position: 'absolute', left: '-7px', top: '-6px', height: '15px', width: '15px', backgroundColor: 'cornflowerblue', borderRadius: '50%' }"></div>
  </div>
</template>
```

### Disabling features

Some features of the calendar can be disabled/hidden through configuration.

| Property in config object  |                         Type                          |                   Purpose                    |
|:--------------------------:|:-----------------------------------------------------:|:--------------------------------------------:|
|       `disableModes`       | array, which can contain the values `week` or `month` |   Disable the calendar modes week or month   |
|  `eventDialog.isDisabled`  |                        boolean                        | Prevent the event dialog from showing at all |
|   `eventDialog.isCustom`   |                        boolean                        |   Enable customization of the event dialog   |

## Date picker

### Usage

The date picker from the Qalendar-header, can also be used as a stand-alone component:

```vue
<template>
  <DatePicker
    locale="en-US"
    firstDayOfWeek="sunday"
    :disable-dates="disableDates"
    :default-date="new Date(2022, 5, 1)"
    @updated="handleUpdate"
  />
</template>

<script>
import { DatePicker } from "qalendar";

export default {
  components: { DatePicker },

  data() {
    return {
      // Disables the user from selecting dates other than in June 2022
      disableDates: {
        before: new Date(2022, 5, 1),
        after: new Date(2022, 5, 31),
      },
    };
  },

  methods: {
    handleUpdate(payload) {
      const { year, month, date } = payload;
    },
  },
};
</script>
```

<DatePicker
  locale="en-US"
  first-day-of-week="sunday"
  :disable-dates="{ before: new Date(2022, 5, 1), after: new Date(2022, 5, 31) }"
  :default-date="new Date(2022, 5, 1)"
/>

The DatePicker component emits one event, `updated`, the payload of which can be spread into three variables: `year`, `month` and `date`, see example above.

### Props

|        Prop         | Type / Accepted values | Required |
|:-------------------:|:----------------------:|:--------:|
|      `locale`       |         string         |   yes    |
| `first-day-of-week` |  `sunday` or `monday`  |   yes    |
|   `default-date`    |          Date          |    no    |
|   `disable-dates`   |    disableDatesType    |    no    |

```ts
type disableDatesType = {
  before: Date,
  after: Date,
}
```

<script setup>
import Qalendar from '../src/Qalendar.vue';
import DatePicker from '../src/components/header/DatePicker.vue';
import {seededEventsDemoWeek} from './__data__/qalendar-demo';
import events from './__data__/qalendar-demo-2';

const config = {
    locale: 'zh-CN',
    defaultMode: 'month',
    style: {
        colorSchemes: {
            meetings: {
                color: '#fff',
                backgroundColor: '#131313',
            },
            sports: {
                color: '#fff',
                backgroundColor: '#ff4081',
            }
        }
    },
}

</script>
