$(document).ready(function () {
    'use strict';
    $.tablesorter.addParser({
        id : 'status',
        is : function (s) {
            return false;
        },
        format: function (s) {
            return s.replace('未知', 0).replace('人工维护', 1).replace('同步失败', 2).replace('正在同步', 3).replace('同步完成', 4);
        },
        type: 'numeric'
    });
    $.tablesorter.addParser({
        id : 'size',
        is : function (s) {
            return false;
        },
        format: function (s) {
            // Assume unknown size as zero.
            var the_number = (s !== '-') ? parseFloat(s) : 0;
            if (s.indexOf('K') >= 0) {
                the_number = the_number * 1000;
            }
            if (s.indexOf('M') >= 0) {
                the_number = the_number * 1000 * 1000;
            }
            if (s.indexOf('G') >= 0) {
                the_number = the_number * 1000 * 1000 * 1000;
            }
            if (s.indexOf('T') >= 0) {
                the_number = the_number * 1000 * 1000 * 1000 * 1000;
            }
            return the_number;
        },
        type: 'numeric'
    });
    $('#status-main-table').tablesorter({
        sortList: [[1, 0]],
        textExtraction: function (s) {
            var $el = $(s),
                $img = $el.find('img');
            return $img.length ? $img.attr('alt') : $el.text();
        },
        headers : {
            3: {
                'sorter' : 'status'
            },
            4: {
                'sorter' : 'size'
            },
            8: {
                'sorter' : 'size'
            }
        }
    });
});
// vi: set et sw=4 sts=4:
