export interface FullMirrorInfo {
  is_master: boolean;
  last_ended: string;
  last_ended_ts: number;
  last_started: string;
  last_started_ts: number;
  last_update: string;
  last_update_ts: number;
  name: string;
  next_schedule: string;
  next_schedule_ts: number;
  size: string;
  status: string;
  upstream: string;
  link_to: string;
  last_update_ago: string;
  last_ended_ago: string;
  last_started_ago: string;
  next_schedule_ago: string;
  label: string;
  show_status: boolean;
  /// The page of help page
  url: string;
}

export interface MirrorInfo extends Partial<FullMirrorInfo> {}

export interface MirrorDesc {
  name: string;
  desc: string;
}

export interface GlobalOptions {
  mirror_desc: MirrorDesc[];
  new_mirrors: string[];
  unlisted_mirrors: Partial<MirrorInfo>[];
  force_redirect_help_mirrors: string[];
  label_map: Record<string, string>;
}
