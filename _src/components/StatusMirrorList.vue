<script setup>
import { useMirrorList } from "../lib/mirrorList";
import { ref, onMounted } from "vue";

const rawMirrorList = useMirrorList();

const rollMax = 6;
const rollCur = ref(0);

const SCROLL_INTERVAL = 2000;
const doScroll = function () {
  rollCur.value += 1;
  if (rollCur.value >= rollMax) rollCur.value = 0;
};

const freezedRows = ref({});

onMounted(() => {
  setInterval(doScroll, SCROLL_INTERVAL);
});
</script>

<template>
  <table class="table text-break table-hover table-borderless">
    <thead>
      <tr class="d-none d-lg-table-row d-b3-table-row">
        <th class="col-2">Name</th>
        <th class="col-4" colspan="2">Last Update</th>
        <th class="col-4">Upstream</th>
        <th class="col-1">Status</th>
        <th class="col-1">Size</th>
      </tr>
    </thead>
    <tbody
      id="mirror-list"
      :data-tuna-roll-cur="rollCur % rollMax"
      :data-tuna-roll-max="rollMax"
      class="table-group-divider"
    >
      <tr
        v-for="mir in rawMirrorList"
        :class="[
          'row',
          'd-lg-table-row',
          'status-' + mir.status,
          mir.last_ended_ts == mir.last_update_ts ? 'last-succ' : 'last-fail',
        ]"
        :key="mir.name"
        :data-tuna-roll-freeze="freezedRows[mir.name]"
        @mouseenter="freezedRows[mir.name] = rollCur"
        @mouseleave="freezedRows[mir.name] = undefined"
      >
        <th class="col-4 d-lg-none d-bs3-def-none text-end">Name</th>
        <td class="col-8 col-lg-2">
          {{ mir.name }}{{ mir.is_master ? "" : " [slave]" }}
        </td>
        <td
          class="col-12 col-lg-4 d-lg-none d-bs3-table-cell d-lg-reduce-table-cell"
          colspan="2"
        >
          <div class="row">
            <th class="col-4 text-end">Last Success</th>
            <td class="col-8">
              {{ mir.last_update }}, {{ mir.last_update_ago }}
            </td>
            <template v-if="mir.last_ended_ts != mir.last_update_ts">
              <th class="col-4 text-end">Last Attempt</th>
              <td class="col-8">
                {{ mir.last_ended }}, {{ mir.last_ended_ago }}
              </td>
            </template>
            <th class="col-4 text-end">Next Sync</th>
            <td class="col-8" v-if="mir.status != 'syncing'">
              {{ mir.next_schedule }}, {{ mir.next_schedule_ago }}
            </td>
            <td class="col-8" v-else>Syncing Now</td>
          </div>
        </td>
        <td
          class="col-2 rolling-3 d-none d-lg-table-cell d-bs3-none d-reduce-none"
        >
          <div class="tuna-roll">
            &nbsp;
            <template v-if="mir.last_ended_ts == mir.last_update_ts">
              <div data-tuna-roll-seq="0 1 2 3">Last Successful Sync</div>
            </template>
            <template v-else>
              <div data-tuna-roll-seq="0 1">Last Successful Sync</div>
              <div data-tuna-roll-seq="2 3">Last Attempted Sync</div>
            </template>
            <div v-if="mir.status == 'syncing'" data-tuna-roll-seq="4 5">
              Sync Started
            </div>
            <div v-else data-tuna-roll-seq="4 5">Next Scheduled Sync</div>
          </div>
        </td>
        <td
          class="col-2 rolling-6 d-none d-lg-table-cell d-bs3-none d-reduce-none"
        >
          <div class="tuna-roll">
            &nbsp;
            <template v-if="mir.last_ended_ts == mir.last_update_ts">
              <div data-tuna-roll-seq="0 1 2 3">
                {{ mir.last_update_ago }}
                <div class="tooltiptext px-1">{{ mir.last_update }}</div>
              </div>
            </template>
            <template v-else>
              <div data-tuna-roll-seq="0 1">
                {{ mir.last_update_ago }}
                <div class="tooltiptext px-1">{{ mir.last_update }}</div>
              </div>
              <div
                data-tuna-roll-seq="2 3"
                v-if="mir.last_ended_ts != mir.last_update_ts"
              >
                {{ mir.last_ended_ago }}
                <div class="tooltiptext px-1">{{ mir.last_ended }}</div>
              </div>
            </template>
            <div v-if="mir.status == 'syncing'" data-tuna-roll-seq="4 5">
              {{ mir.last_started_ago }}
              <div class="tooltiptext px-1">{{ mir.last_started }}</div>
            </div>
            <div v-else data-tuna-roll-seq="4 5">
              {{ mir.next_schedule_ago }}
              <div class="tooltiptext px-1">{{ mir.next_schedule }}</div>
            </div>
          </div>
        </td>
        <th class="col-4 d-lg-none d-bs3-def-none text-end">Upstream</th>
        <td class="col-8 col-lg-4">{{ mir.upstream }}</td>
        <th class="col-4 d-lg-none d-bs3-def-none text-end">Status</th>
        <td class="col-8 col-lg-1">{{ mir.status }}</td>
        <th class="col-4 d-lg-none d-bs3-def-none text-end">Size</th>
        <td class="col-8 col-lg-1">{{ mir.size }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "../styles/sync-status.scss";
@use "../styles/_bootstrap_vars.scss" as bs;

table {
  & > tbody > tr {
    border-bottom-width: var(--bs-border-width);
  }

  & > thead > tr {
    border-bottom-width: calc(var(--bs-border-width) * 2);
    border-bottom-style: solid;
    border-bottom-color: currentColor;
  }
}

.tuna-roll {
  position: relative;
  overflow: hidden;

  > div {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    animation-timing-function: ease;
    animation-duration: 1s;
    animation-iteration-count: 1;

    /* Tooltip text */
    > .tooltiptext {
      visibility: hidden;
      width: auto;
      background-color: #555;
      color: #fff;
      text-align: center;
      border-radius: 5px;

      /* Position the tooltip text - see examples below! */
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    &:hover > .tooltiptext {
      visibility: visible;
    }
  }

  @keyframes tuna-roll-enter {
    0% {
      transform: translateY(100%);
    }

    100% {
      transform: none;
    }
  }

  @keyframes tuna-roll-leave {
    0% {
      transform: none;
    }

    100% {
      transform: translateY(-100%);
    }
  }
}

@each $attrib in ("[data-tuna-roll-cur", ".row[data-tuna-roll-freeze") {
  @for $i from 0 to 7 {
    #{$attrib}="#{$i}"] {
      .tuna-roll > div {
        animation-name: tuna-roll-leave;
        transform: translateY(100%);
      }

      .tuna-roll > div[data-tuna-roll-seq~="#{$i}"] {
        animation-name: tuna-roll-enter;
        transform: none;
      }
    }
  }
}

@media (prefers-reduced-motion) {
  .d-reduce-none {
    display: none !important;
  }
  @media (min-width: map.get(bs.$grid-breakpoints, "lg")) {
    .d-lg-reduce-table-cell {
      display: table-cell !important;
    }
  }
}
</style>
