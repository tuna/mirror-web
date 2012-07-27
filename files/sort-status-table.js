$(document).ready(function() {
    $.tablesorter.addParser({
        id : 'status',
        is : function(s) {
            return false;
        },
        format: function(s) {
            return s.replace('未知', 0).replace('同步失败', 1).replace('正在同步', 2).replace('同步完成', 3);
        },
        type: 'numeric'
    });
    $.tablesorter.addParser({
        id : 'size',
        is : function(s) {
            return false;
        },
        format: function(s) {
            the_number = parseFloat(s);
            if (s.indexOf('K') >= 0) {
                the_number = the_number * 1024;
            }
            if (s.indexOf('M') >= 0) {
                the_number = the_number * 1024 * 1024;
            }
            if (s.indexOf('G') >= 0) {
                the_number = the_number * 1024 * 1024 * 1024;
            }
            return the_number;
        },
        type: 'numeric'
    });
    $('#status-main-table').tablesorter({
        sortList: [[1,0]],
        textExtraction: function(s){
            var $el = $(s);
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
