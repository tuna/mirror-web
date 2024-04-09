export const mirrorId = JSON.parse(
  Array.from(document.getElementsByTagName("script")).filter(
    (script) => script.type === "text/x-tuna-help-mirrorid",
  )[0]?.textContent || '""',
);
