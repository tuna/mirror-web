#!/bin/bash
HOST=${1:-"mirrors.tuna.tsinghua.edu.cn"}

echo "# robots.txt for https://$HOST" > robots.txt
echo 'User-agent: *' >> robots.txt
echo '' >> robots.txt
echo 'Disallow: /logs' >> robots.txt

(
  curl -s https://$HOST/static/tunasync.json | jq -r '.[] | .name'
  echo "lede";
  echo "raspberry-pi-os";
  echo "ctan";
  echo "cygwin";
  echo "pub";
  echo "git";
  echo "linuxbrew-bottles";
) | uniq | while read name; do
	[[ -z ${name} ]] || [[ ${name} = "tuna" ]] && continue
	echo "Disallow: /${name}" >> robots.txt
done
