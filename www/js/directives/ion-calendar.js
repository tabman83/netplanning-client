angular.module('NetPlanningApp').directive('ionCalendar', function($compile) {

    function appendHeader(html) {

        var header = angular.element('<ion-header-bar></<ion-header-bar>').addClass('bar-subheader');
        html.append(header);

        var table = angular.element('<table></table>').attr('width', '100%').addClass('header').addClass('stable-bg');
        header.append(table);
        var tr = angular.element('<tr></tr>');
        table.append(tr);
        for( var i=0; i<7; i++ ) {
            var label = moment().day(i).format('dd');
            var td = angular.element('<td></td>').html(label);
            if(i === 0 || i === 6 ) {
                td.addClass('assertive');
            }
            tr.append(td);
        }
    }


    return {
        restrict: 'E',
        replace: true,
        scope: {
            calendarItems: '=items',
            calendarItemClick: '=click',
        },
        compile: function($html, $attrs) {

            $html.empty();
            var root = angular.element('<div></div>').addClass('calendar');
            appendHeader(root);
            var content = angular.element('<ion-content></ion-content>').addClass('has-subheader');
            root.append(content);
            $html.append(root);

            var startDate = moment();

            for( var g=0; g<3; g++) {

                var monthObj = [];
                var today = startDate.clone().add(g,'month');
                var startOfMonth = today.clone().startOf('month');
                var endOfMonth = today.clone().endOf('month');

                for( var day = startOfMonth.clone().subtract(startOfMonth.day(), 'day'); day.isBefore(startOfMonth, 'day'); day.add(1,'day') ) {
                    monthObj.push({
                        type: 'past',
                        m: day.clone()
                    });
                }
                for( var day = startOfMonth.clone(); day.isBefore(endOfMonth, 'day') || day.isSame(endOfMonth, 'day'); day.add(1,'day') ) {
                    monthObj.push({
                        type: 'current',
                        m: day.clone()
                    });
                }
                for( var day = endOfMonth.clone().add(1,'day'); day.isBefore( endOfMonth.clone().subtract(1, 'day').add(endOfMonth.day(), 'day') ); day.add(1,'day') ) {
                    monthObj.push({
                        type: 'next',
                        m: day.clone()
                    });
                }

                var table = angular.element('<table></table>').attr('width', '100%').addClass('month')
                content.append(table);
                tr = angular.element('<tr></tr>');
                table.append(tr);
                for( var i=0; i<7; i++ ) {
                    var monthEl = monthObj[i];
                    var className = monthEl.type+'-month';
                    var td = angular.element('<td></td>').addClass(className);
                    if(today.startOf('month').day() === i) {
                        td.addClass('assertive').html(today.format('MMM').toUpperCase());
                    }
                    tr.append(td);
                }


                var table = angular.element('<table></table>').attr('width', '100%').addClass('content')
                content.append(table);
                for( var i=0; i<monthObj.length; i++) {
                    var monthEl = monthObj[i];
                    var key = monthEl.m.format('YYYY-MM-DD');
                    var tr;
                    if( i % 7 === 0 ) {
                        tr = angular.element('<tr></tr>');
                        table.append(tr);
                    }
                    var className = monthEl.type+'-month';
                    var td = angular.element('<td></td>')
                        .addClass(className)
                        .attr('ng-click','calendarItemClick(calendarItems[\''+key+'\'] ? calendarItems[\''+key+'\'].items : [])');
                    if( i % 7 === 0 || i % 7 === 6 ) {
                        td.addClass('weekend');
                    }
                    var htmlDay = angular.element('<span></span>')
                        .html(monthEl.m.format('D'))
                        .addClass(monthEl.m.isSame(moment(), 'day') ? 'badge badge-assertive': '')
                        .wrap('<div></div>')
                        .parent();
                    td.append(htmlDay);
                    var htmlData = angular.element('<span></span>')
                        .attr('ng-class', '{ \'positive\': calendarItems[\''+key+'\'].items.length }')
                        .html('&nbsp;{{calendarItems[\''+key+'\'] ? calendarItems[\''+key+'\'].items.length : \'\'}}&nbsp;')
                        .wrap('<div></div>')
                        .parent();
                    td.append(htmlData);
                    tr.append(td);
                }
            }

            return function($scope, $element, $attrs) {
                $compile($element.contents())($scope);
            };
        }
    };


});
