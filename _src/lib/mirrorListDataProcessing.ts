import { format as TimeAgoFormat } from "timeago.js";
import { MirrorInfo, GlobalOptions } from "./types";

export default function (globalOptions: GlobalOptions) {
  const label_map = globalOptions.label_map;
  const new_mirrors = Object.fromEntries(
    globalOptions.new_mirrors.map((x) => [x, true]),
  );
  const unlisted = globalOptions.unlisted_mirrors;
  const forceHelp = Object.fromEntries(
    globalOptions.force_redirect_help_mirrors.map((m) => [m, true]),
  );
  const descriptions = Object.fromEntries(
    globalOptions.mirror_desc.map((m) => [m.name, m.desc]),
  );

  const processLinkItem = (mirrors: MirrorInfo[]) => {
    var processed: MirrorInfo[] = [];
    for (let d of mirrors) {
      if (d.link_to === undefined) {
        processed.push(d);
        continue;
      }
      for (const target of mirrors) {
        if (d.link_to === target.name) {
          d.status = target.status;
          d.label = target.label;
          d.upstream = target.upstream;
          d.show_status = target.show_status;
          d.last_update = target.last_update;
          d.last_update_ago = target.last_update_ago;
          d.last_ended = target.last_ended;
          d.last_ended_ago = target.last_ended_ago;
          processed.push(d);
          break;
        }
      }
    }
    return processed;
  };

  const stringifyTime = (ts: number): [string, string] => {
    const date = new Date(ts * 1000);
    let str = "";
    let ago = "";
    if (date.getFullYear() > 2000) {
      str =
        `${("000" + date.getFullYear()).slice(-4)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}` +
        ` ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
      ago = TimeAgoFormat(date);
    } else {
      str = "0000-00-00 00:00";
      ago = "Never";
    }
    return [str, ago];
  };

  const processMirrorItem = (d: MirrorInfo): MirrorInfo => {
    if (d.is_master === undefined) {
      d.is_master = true;
    }
    if (d.link_to !== undefined) {
      return d;
    }
    d.label = label_map[d.status];
    d.show_status = d.status !== "success";
    // Strip the second component of last_update
    [d.last_update, d.last_update_ago] = stringifyTime(d.last_update_ts);
    [d.last_ended, d.last_ended_ago] = stringifyTime(d.last_ended_ts);
    [d.last_started, d.last_started_ago] = stringifyTime(d.last_started_ts);
    [d.next_schedule, d.next_schedule_ago] = stringifyTime(d.next_schedule_ts);
    return d;
  };

  const sortAndUniqMirrors = (mirs: MirrorInfo[]): MirrorInfo[] => {
    mirs.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
    return mirs.reduce((acc: MirrorInfo[], cur: MirrorInfo) => {
      if (acc.length > 1 && acc[acc.length - 1].name == cur.name) {
        if (acc[acc.length - 1].last_update_ts && cur.last_update_ts) {
          if (acc[acc.length - 1].last_update_ts < cur.last_update_ts) {
            acc[acc.length - 1] = cur;
          }
        } else if (cur.last_update_ts) {
          acc[acc.length - 1] = cur;
        }
      } else {
        acc.push(cur);
      }
      return acc;
    }, []);
  };

  const postProcessStatusData = (
    status_data: MirrorInfo[],
    additional: MirrorInfo[],
  ) => {
    const processed = status_data
      .concat(additional)
      .map((d) => processMirrorItem(d));
    return sortAndUniqMirrors(processLinkItem(processed));
  };

  const genMainMirrorList = (
    status_data: MirrorInfo[],
    helpPages: Record<string, string>,
  ) => {
    return status_data
      .filter((d) => !(d.status == "disabled"))
      .map((d) => ({
        ...d,
        url: forceHelp[d.name] ? helpPages[d.name] : d.url ?? `/${d.name}/`,
        help_url: helpPages[d.name],
        is_new: Boolean(new_mirrors[d.name]),
        description: descriptions[d.name],
        github_release: d.url && d.url.startsWith("/github-release/"),
      }));
  };

  return {
    postProcessStatusData,
    unlistedMirrors: unlisted,
    genMainMirrorList,
  };
}
