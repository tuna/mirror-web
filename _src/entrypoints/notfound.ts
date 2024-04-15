import "./default";
import "../styles/notfound.scss";
import { issue_tag as IssueTag } from "virtual:jekyll-config";

const tag = `[${IssueTag}]`;
const bugLink = document.getElementById("new_issue_bug");
const bugURL = new URL(bugLink["href"]);
bugURL.searchParams.append("title", tag + "404 at " + location.pathname);
bugLink["href"] = bugURL.href;

const mrLink = document.getElementById("new_issue_mr");
const mrURL = new URL(mrLink["href"]);
mrURL.searchParams.append(
  "title",
  tag + "Mirror Request for new mirror " + location.pathname.split("/")[1],
);
mrLink["href"] = mrURL.href;
